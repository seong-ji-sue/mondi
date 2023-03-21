import express from "express"
import next from "next"
import morgan from "morgan";
import moment from "moment";
import { IS_DEV, EXPRESS_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB } from "./env";
import { DataSource } from "typeorm";
import productRouter from "./routes/product";
import categoryRouter from "./routes/category";
import regionRouter from "./routes/region";
import bannerRouter from "./routes/banner";
import { PUBLIC_PATH, ENTITIY_PATH } from "@mondi/common/const";

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
  synchronize: true,
  logging: false,
  cache: true,
  dropSchema: false,
  entities: [ENTITIY_PATH]
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

  server.use("/api/product", productRouter);
  server.use("/api/category", categoryRouter);
  server.use("/api/region", regionRouter);
  server.use("/api/banner", bannerRouter);
  server.use(express.static(PUBLIC_PATH));

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