import express from "express";
import loginRouter from "./login";
import authRouter from "./auth";
import surveysRouter from "./surveys";

const serviceRouter = express.Router();

serviceRouter.use("/login", loginRouter);
serviceRouter.use("/auth", authRouter);
serviceRouter.use("/surveys", surveysRouter);

export default serviceRouter;
