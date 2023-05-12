import React from "react";
import styled from "styled-components";
import { Logo, Hamburger } from "@components/Svg";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 20px;
  background: #FFFFFF;
  /* width: 100%; */
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const TitleImage = styled.img`
  width: 24px;
  margin: 4px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoWrapper>
        <TitleImage src="/imgs/favicon.png" />
        <Logo color='#26262B' width="55" height="14" />
      </LogoWrapper>
      <Hamburger width="18" height="18" />
    </HeaderContainer>
  )
}

export default Header;