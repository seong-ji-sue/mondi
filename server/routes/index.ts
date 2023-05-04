import express from "express";
import testRouter from "./test";

const serviceRouter = express.Router();

serviceRouter.use('/test', testRouter);

export default serviceRouter;
