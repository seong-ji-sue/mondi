import axios from "axios";
import express from "express";
import { KAKAO_JS_KEY } from "../../env";
import { generateAccessToken, generateRefreshToken } from "../../utils/token";
import { dataSource } from "../../";
import User from "../../entities/user.entity";
import UserType from "../../entities/userType.entity";
import { encryptAES, encryptSHA512 } from "../../utils/crypto";

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
      const [phoneNumberCode, phoneNum] = phone_number.split(" ");
      const phoneNumber = `0${phoneNum}`;
      const accessToken = generateAccessToken({ type: "kakao", id });
      const refreshToken = generateRefreshToken({ type: "kakao", id });

      const user = new User();
      user.phoneNumberHash = encryptSHA512(phoneNumber);

      const userType = new UserType();
      userType.key = `kakao_${id}`;
      
      const userRepository = dataSource.getRepository(User);
      const userTypeRepository = dataSource.getRepository(UserType);

      const userFind = await userRepository.findOne({ where: { phoneNumberHash: user.phoneNumberHash } });
      if (userFind) {
        userFind.name = name ? encryptAES(name) : null;
        userFind.phoneNumberCode = encryptAES(phoneNumberCode);
        userFind.phoneNumber = encryptAES(phoneNumber);
        userFind.birthyear = birthyear ? encryptAES(birthyear) : null;
        userFind.birthday = birthday ? encryptAES(birthday) : null;
        userFind.gender = gender ? encryptAES(gender) : null;
        await userRepository.save(userFind);
        userType.user = userFind;
      } else {
        user.name = name ? encryptAES(name) : null;
        user.phoneNumberCode = encryptAES(phoneNumberCode);
        user.phoneNumber = encryptAES(phoneNumber);
        user.birthyear = birthyear ? encryptAES(birthyear) : null;
        user.birthday = birthday ? encryptAES(birthday) : null;
        user.gender = gender ? encryptAES(gender) : null;
        await userRepository.save(user);
        userType.user = user;
      }

      const userTypeFind = await userTypeRepository.findOne({ where: { key: userType.key } });
      if (userTypeFind) {
        userTypeFind.nickname = encryptAES(nickname);
        userTypeFind.email = encryptAES(email);
        await userTypeRepository.save(userTypeFind);
      } else {
        userType.nickname = encryptAES(nickname);
        userType.email = encryptAES(email);
        await userTypeRepository.save(userType);
      }
      
      res.send({ result: true, accessToken, refreshToken });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send({ result: false });
    })
})

export default kakaoRouter;
