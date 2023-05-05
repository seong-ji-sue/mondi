import express from "express";
import loginRouter from "./login";
import authRouter from "./auth";

const serviceRouter = express.Router();

serviceRouter.use("/login", loginRouter);
serviceRouter.use("/auth", authRouter);

export default serviceRouter;
