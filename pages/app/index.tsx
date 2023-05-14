import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import Card from "@components/Card";
import { Logo } from "@components/Svg";
import Menu from "@components/menu";

const Container = styled.div`
  width: 100%;
`;

const LogoImage = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`;

const TitleContainer = styled.div`
  margin: 24px 0 18px 0;
  padding: 0 22px;
`;

const TitleText = styled.p`
  color: #000000;
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 100%;
  letter-spacing: -0.408px;
  margin: 0;
`;

const SubContent = styled.p`
  color: #8A8A8D;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 130%;
  margin: 6px 0 0 0;
`;

const App = () => {
  return (
    <Container>
      <Header
        left={<>
          <LogoImage src="/imgs/favicon.png" />
          <Logo color="#26262B" width={55} height={14} />
        </>}
        right={<Menu />}
      />
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






