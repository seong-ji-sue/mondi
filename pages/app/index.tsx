import Api from "@modules/api";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const UserInfoText = styled.span`
  white-space: pre-line;
  word-break: keep-all;
`;

const App = () => {
  const [userInfo, setUserInfo] = useState<User.IInfo>({
    nickname: "", email: "", name: "", phoneNumber: "", birthyear: "", birthday: "", gender: ""
  });

  useEffect(() => {
    Api.getInstance().getServiceAxios()
      .get("/api/auth/check")
      .then(res => setUserInfo(res.data.user))
  }, []);

  return (
    <UserInfoText>
      {`닉네임: ${userInfo.nickname}
      이메일: ${userInfo.email}
      이름: ${userInfo.name}
      전화번호: ${userInfo.phoneNumber}
      출생 연도: ${userInfo.birthyear}
      생일: ${userInfo.birthday}
      성별: ${userInfo.gender}`}
    </UserInfoText>
  )
}

export default App;