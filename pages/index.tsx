import { useRouter } from "next/router";
import { MainHeader } from "@components/Header";
import React from "react";
import styled from "styled-components";
import Color from "@utils/color";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
`;

const SessionContainer = styled.div<{ containerStyle?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ containerStyle }) => containerStyle};
`;

const SessionRowContainer = styled.div<{ containerStyle?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ containerStyle }) => containerStyle};
`;

const SessionText = styled.span<{ textStyle?: string }>`
  text-align: center;
  white-space: pre-line;
  ${({ textStyle }) => textStyle};
`;

const App = () => {
  return (
    <Container>
      <MainHeader />
      <SessionTitle />
      <SessionGuide />
      <SessionDesc />
      <SessionExperience />
      <SessionReview />
    </Container>
  );
};

const GoToHomeButtonContainer = styled.div`
  display: flex;
  padding: 18px 40px;
  align-items: center;
  justify-content: center;
  background: ${Color.THEME};
  border-radius: 55px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;

const SessionTitle = () => {
  const router = useRouter();

  return (
    <SessionContainer containerStyle="padding:48px 0 300px 0;background-color:#EBF2F7;">
      <SessionText textStyle="color:#1A5AFF;font-size:16px;margin-bottom:20px;">
        최대 50% 이상 비용을 절약해요!
      </SessionText>
      <SessionRowContainer containerStyle="margin-bottom:8px;">
        <SessionText textStyle="font-family:SCDream;font-size:30px;font-weight:800;">
          ‘같이 구매’&nbsp;
        </SessionText>
        <SessionText textStyle="font-family:SCDream;font-size:30px;font-weight:300;">
          할 사람을 찾을 땐
        </SessionText>
      </SessionRowContainer>
      <SessionText textStyle="font-family:SCDream;font-size:30px;font-weight:800;margin-bottom:40px;">
        공동 구매 매칭 서비스, 먼디
      </SessionText>
      <GoToHomeButtonContainer onClick={() => router.push("/home")}>
        같이 구매할 상품 보기
      </GoToHomeButtonContainer>
    </SessionContainer>
  );
}

const GuideContainer = styled.div<{ isLast: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  margin-right: ${({ isLast }) => isLast ? 0 : 24}px;
`;

const GuideIcon = styled.div`
  width: 100px;
  height: 100px;
  background: #D9D9D9;
  border-radius: 30px;
  margin-bottom: 4px;
`;

const guides = [{
  title: "이용방법"
}, {
  title: "주의사항"
}, {
  title: "파트너 신청"
}];

const SessionGuide = () => {
  return (
    <SessionContainer containerStyle="padding: 40px 0 200px 0;">
      <SessionRowContainer>
        {guides.map((guide, index) => {
          return (
            <GuideContainer
              key={`guide_${index}`}
              isLast={index === guides.length - 1}
            >
              <GuideIcon />
              {guide.title}
            </GuideContainer>
          )
        })}
      </SessionRowContainer>
    </SessionContainer>
  )
}

const SessionDesc = () => {
  return (
    <SessionContainer containerStyle="padding: 0 0 30px 0;">
      <SessionText textStyle="font-family:SCDream;font-size:30px;font-weight:500;margin-bottom:8px;">
        공동 구매 하면
      </SessionText>
      <SessionRowContainer containerStyle="margin-bottom:20px;">
        <SessionText textStyle="font-family:SCDream;font-size:30px;font-weight:500;">
          부담이&nbsp;
        </SessionText>
        <SessionText textStyle="font-family:SCDream;font-size:30px;font-weight:800;">
          2배 이상&nbsp;
        </SessionText>
        <SessionText textStyle="font-family:SCDream;font-size:30px;font-weight:500;">
          줄어요
        </SessionText>
      </SessionRowContainer>
      <SessionText textStyle="font-size:16px;color:#666;margin-bottom:294px;">
        이제 합리적인 비용으로 모두 경험하세요.
      </SessionText>
      <SessionText textStyle="font-size:20px;font-weight:500;margin-bottom:10px;">
        🏃‍♀ 퍼스널 트레이닝 기준
      </SessionText>
      <SessionText textStyle="font-size:16px;color:#666;">
        1회 기준 5만원 이용시 결제 금액 차이
      </SessionText>
    </SessionContainer>
  )
}

const SessionExperience = () => {
  return (
    <SessionContainer containerStyle="padding:94px 0 554px 0;background-color:#EBF2F7;">
      <SessionText textStyle="font-family:SCDream;font-size:26px;font-weight:500;margin-bottom:8px;">
        버튼 한번으로 간편하게,
      </SessionText>
      <SessionText textStyle="font-family:SCDream;font-size:26px;font-weight:500;margin-bottom:24px;">
        같이 구매할 사람을 만나세요.
      </SessionText>
      <SessionText textStyle="font-size:14px;margin-bottom:8px;">
        온라인부터 오프라인까지, 참 좋은 생활속 공동구매!
      </SessionText>
      <SessionText textStyle="font-size:14px;">
        이제부터 합리적인 비용으로 경험하세요.
      </SessionText>
    </SessionContainer>
  )
}

const SessionReview = () => {
  return (
    <SessionContainer containerStyle="padding:197px 0 200px 0;">
      <SessionText textStyle="font-family:SCDream;font-size:26px;font-weight:500;margin-bottom:13px;">
        “최대 반값에 구매했어요!”
      </SessionText>
      <SessionText textStyle="font-family:SCDream;font-size:26px;font-weight:500;">
        공동구매 경험 실제 후기
      </SessionText>
    </SessionContainer>
  )
}

export default App;