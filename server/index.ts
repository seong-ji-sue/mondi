import express from "express"
import next from "next"
import morgan from "morgan";
import moment from "moment";
import { IS_DEV, EXPRESS_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } from "./env";
import { DataSource } from "typeorm";
import routes from "./routes";
import path from "path";
import bodyParser from "body-parser";
import { Entities } from "./entities";

const app = next({ dev: IS_DEV })
const handle = app.getRequestHandler()

const ipv6Toip = (ip: string) => {
  if (!ip) return ip;
  if (ip.substr(0, 7) == "::ffff:") return ip.substr(7);
  return ip;
};

export const dataSource = new DataSource({
  type: "mysql",
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DB,
  synchronize: false,
  logging: false,
  dropSchema: false,
  entities: [...Entities]
});

app.prepare().then(async () => {
  const server = express()

  await dataSource.initialize();

  morgan.token("remote-addr", (req: express.Request) => {
    const clientIp = req.headers["x-real-ip"]?.toString() || req.ip;
    return ipv6Toip(clientIp);
  });
  morgan.token("date", () => {
    return moment().format("YYYY-MM-DD HH:mm:ss");
  });
  server.use(morgan("combined"));

  server.use(bodyParser.json());

  server.use("/uploads", express.static(path.join(__dirname, "../../uploads")))

  server.use("/api", routes);

  server.all('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(EXPRESS_PORT, () => {
    if (process.send) {
      process.send('ready');
    }
    console.log(`> Ready on http://localhost:${EXPRESS_PORT}`)
  });
})