import express from "express";
import { authCheck, refreshCheck } from "../../middlewares/check";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";
import { dataSource } from "../..";
import UserType from "../../entities/userType.entity";
import { decryptAES } from "../../utils/crypto";

const authRouter = express.Router();

authRouter.get("/check", authCheck, async (req, res) => {
  const userTypeRepository = dataSource.getRepository(UserType);
  userTypeRepository
    .createQueryBuilder("userType")
    .where({ key: `${req.auth.type}_${req.auth.id}` })
    .select([
      "userType.nickname", "userType.email",
      "user.name", "user.phoneNumber", "user.birthyear", "user.birthday", "user.gender"
    ])
    .leftJoin("userType.user", "user")
    .getOne()
    .then(userTypeFind => {
      return {
        nickname: userTypeFind?.nickname ? decryptAES(userTypeFind.nickname) : "",
        email: userTypeFind?.email ? decryptAES(userTypeFind.email) : "",
        name: userTypeFind?.user.name ? decryptAES(userTypeFind.user.name) : "",
        phoneNumber: userTypeFind?.user.phoneNumber ? decryptAES(userTypeFind.user.phoneNumber) : "",
        birthyear: userTypeFind?.user.birthyear ? decryptAES(userTypeFind.user.birthyear) : "",
        birthday: userTypeFind?.user.birthday ? decryptAES(userTypeFind.user.birthday) : "",
        gender: userTypeFind?.user.gender ? decryptAES(userTypeFind.user.gender) : "",
      }
    })
    .then(user => {
      res.send({ result: true, user });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ result: false });
    });
});

authRouter.post("/refresh", refreshCheck, (req, res) => {
  const { type, id } = req.auth;
  const accessToken = generateAccessToken({ type, id });
  const refreshToken = generateRefreshToken({ type, id });
  res.send({ result: true, accessToken, refreshToken });
})

export default authRouter;
