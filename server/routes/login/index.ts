import express from "express";
import kakaoRouter from "./kakao";

const loginRouter = express.Router();

loginRouter.use("/kakao", kakaoRouter);

export default loginRouter;
