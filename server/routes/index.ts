import express from "express";
import loginRouter from "./login";
import authRouter from "./auth";
import surveysRouter from "./surveys";
import myInfoRouter from "./my-info";

const serviceRouter = express.Router();

serviceRouter.use("/login", loginRouter);
serviceRouter.use("/auth", authRouter);
serviceRouter.use("/surveys", surveysRouter);
serviceRouter.use("/my-info", myInfoRouter);

export default serviceRouter;
