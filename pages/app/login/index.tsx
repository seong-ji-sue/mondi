import { Kakao } from "@components/Svg";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #E6EDFF;
`;

const TitleContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8.2vh 32px 6.8vh 32px;
  background: linear-gradient(0deg, #1F1F1F, #1F1F1F), linear-gradient(0deg, #FFFFFF, #FFFFFF), #E6EDFF;
`;

const TitleTextContainer = styled.div<{ containerStyle?: string }>`
  font-size: 30px;
  ${({ containerStyle }) => containerStyle};
`;

const MainText = styled.span`
  font-weight: 800;
  color: #19D94E;
`;

const BasicText = styled.span`
  font-weight: 700;
  color: #fff;
`;

const TitleImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const TitleImage = styled.div`
  flex: 1;
  max-width: 286px;
  background: url(/imgs/login_title.png) no-repeat;
  background-size: contain;
  background-position: center top;
`;

const LoginContainer = styled.div`
  padding: 5.7vh 20px 14vh 20px;
  display: flex;
  flex-direction: column;
`;

const KakaoLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F9EB00;
  border-radius: 8px;
  padding: 14px;
  cursor: pointer;
  margin-bottom: 12px;
`;

const KakaoLoginButtonText = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: #2a2400;
  margin-left: 10px;
`;

const LoginDescText = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: #cdcdcd;
  white-space: pre-line;
`;

const Login = () => {
  const onKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.KAKAO_REDIRECT_URI
    });
  }

  return (
    <Container>
      <TitleContainer>
        <TitleTextContainer containerStyle="margin-bottom: 4px;">
          <MainText>투표</MainText>
          <BasicText>로 탄생하는</BasicText>
        </TitleTextContainer>
        <TitleTextContainer containerStyle="margin-bottom: 4.2vh;">
          <BasicText>공동구매&nbsp;</BasicText>
          <MainText>서베이딜</MainText>
        </TitleTextContainer>
        <TitleImageContainer><TitleImage /></TitleImageContainer>
      </TitleContainer>
      <LoginContainer>
        <KakaoLoginButton
          onClick={onKakaoLogin}
        >
          <Kakao />
          <KakaoLoginButtonText>카카오톡으로 3초만에 시작하기</KakaoLoginButtonText>
        </KakaoLoginButton>
        <LoginDescText>{`계정생성 시 서베이딜의 개인정보처리방침 및\n이용약관에 동의하게 됩니다.`}</LoginDescText>
      </LoginContainer>
    </Container>
  )
}

export default Login;