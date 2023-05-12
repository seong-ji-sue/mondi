import Api from "@modules/api";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@components/Header";
import Card from "@components/Card";



const Container = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
`;

const TitleContainer = styled.div`
  margin: 24px 0 18px 0;
  padding: 0 22px;
`
const TitleText = styled.p`
  color: #000000;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 100%;
  letter-spacing: -0.408px;
  margin: 0;
`
const SubContent = styled.p`
  color: #8A8A8D;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 130%;
  margin: 6px 0 0 0;
`

// const UserInfoText = styled.span`
//   white-space: pre-line;
//   word-break: keep-all;
// `;

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
    <Container>
      <Header />
      <TitleContainer>
        <TitleText>투표하기</TitleText>
        <SubContent>투표로 만들어지는 공동구매</SubContent>
      </TitleContainer>
      {[1,2,3].map((num, index)=>{
        return <Card key={"card"+index} />
      })}
    </Container>
    
  )
}

export default App;






