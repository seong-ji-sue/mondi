import axios from "axios";
import express from "express";
import { KAKAO_JS_KEY } from "../../env";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";
import { dataSource } from "../../";
import User from "../../entities/user.entity";
import { encryptAES } from "../../utils/crypto";

const kakaoRouter = express.Router();

kakaoRouter.post("/", (req, res) => {
  const { code } = req.body;

  axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_JS_KEY}&code=${code}`)
    .then(authRes => {
      return authRes.data.access_token;
    })
    .then(kakaoAccessToken => {
      return axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`
        }
      })
    })
    .then(async infoRes => {
      const { id, kakao_account } = infoRes.data;
      const { profile, name, email, phone_number, birthyear, birthday, gender } = kakao_account;
      const { nickname } = profile;
      const key = `kakao_${id}`;

      const userRepository = dataSource.getRepository(User);
      const userByKey = await userRepository.findOne({ where: { key } });

      if (userByKey) {
        userByKey.nickname = encryptAES(nickname);
        userByKey.email = encryptAES(email);
        userByKey.phoneNumber = encryptAES(phone_number);
        userByKey.name = name ? encryptAES(name) : "";
        userByKey.birthyear = birthyear ? encryptAES(birthyear) : "";
        userByKey.birthday = birthday ? encryptAES(birthday) : "";
        userByKey.gender = gender ? encryptAES(gender) : "";
        await userRepository.save(userByKey);
      } else {
        const user = new User();
        user.key = key;
        user.nickname = encryptAES(nickname);
        user.email = encryptAES(email);
        user.phoneNumber = encryptAES(phone_number);
        user.name = name ? encryptAES(name) : "";
        user.birthyear = birthyear ? encryptAES(birthyear) : "";
        user.birthday = birthday ? encryptAES(birthday) : "";
        user.gender = gender ? encryptAES(gender) : "";
        await userRepository.save(user);
      }

      const accessToken = generateAccessToken({ type: "kakao", id });
      const refreshToken = generateRefreshToken({ type: "kakao", id });
      
      res.send({ result: true, accessToken, refreshToken });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ result: false });
    })
})

export default kakaoRouter;
