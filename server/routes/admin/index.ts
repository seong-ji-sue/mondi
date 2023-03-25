import express from "express";
import testRouter from "./test";

const adminRouter = express.Router();

adminRouter.use('/test', testRouter);

export default adminRouter;
