import React from "react";
import styled from "styled-components";
import Header from "@components/Header";
import Product from "@components/Product";
import { Logo, LogoIcon } from "@components/Svg";
import Menu from "@components/Menu";
import Color from "@utils/color";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const TitleText = styled.span`
  margin: 24px 0 8px 0;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;

const SubTitleText = styled.span`
  margin-bottom: 20px;
`;

const productStyle = {
  borderRadius:'12px',
  cursor:'pointer',
  margin: '20px'
}

const App = () => {

  const router = useRouter();

  return (
    <>
      <Header
        left={<>
          <LogoIcon color={Color.APP_THEME} style={{ marginRight: 4 }} />
          <Logo color="#26262B" width={55} height={14} />
        </>}
        right={<Menu />}
      />
      <Container>
        <TitleText>투표하기</TitleText>
        <SubTitleText>투표로 만들어지는 공동구매</SubTitleText>
        <Product style={productStyle} routerMove={()=>{router.push('/app/detail')}} activate />
        <Product style={productStyle} routerMove={()=>{router.push('/app/detail')}} activate={false} />
      </Container>
    </>
  )
}

export default App;






