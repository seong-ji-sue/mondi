import dotenv from "dotenv";

dotenv.config();

export const IS_DEV = process.env.NODE_ENV !== "production";

export const EXPRESS_PORT = Number(process.env.EXPRESS_PORT);

export const MYSQL_HOST = process.env.MYSQL_HOST;
export const MYSQL_PORT = Number(process.env.MYSQL_PORT);
export const MYSQL_USER = process.env.MYSQL_USER;
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const MYSQL_DB = process.env.MYSQL_DB;
