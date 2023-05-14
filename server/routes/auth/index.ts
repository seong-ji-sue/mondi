import express from "express";
import { authCheck, refreshCheck } from "../../middlewares/check";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";

const authRouter = express.Router();

authRouter.get("/check", authCheck, async (req, res) => {
  res.send({ result: true });
});

authRouter.post("/refresh", refreshCheck, (req, res) => {
  const { type, id } = req.auth;
  const accessToken = generateAccessToken({ type, id });
  const refreshToken = generateRefreshToken({ type, id });
  res.send({ result: true, accessToken, refreshToken });
})

export default authRouter;
