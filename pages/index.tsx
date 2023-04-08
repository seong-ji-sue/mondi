import { ArrowBottom, ArrowTop, Check, Logo, Search } from "@components/Svg";
import TextUnderline from "@components/TextUnderline";
import useAppStore from "@stores/app";
import React, { useEffect, useRef, useState } from "react";
import Color from "src/utils/color";
import { wonComma } from "src/utils/string";
import styled from "styled-components";

const TYPEFORM_URL = "https://vfsmop81aez.typeform.com/to/HPRBksnx";

const ContainerWrapper = styled.div`
  max-width: 500px;
  height: 100%;
  padding: 0;
  margin: 0 auto;
`;

const Container = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
  padding-bottom: 80px;
`;

const Main = () => {
  const isMainStickyFooterShow = useAppStore(state => state.isMainStickyFooterShow);

  return (
    <ContainerWrapper>
      <Container>
        <Header />
        <SessionTitle />
        <SessionComparison />
        <SessionGuide />
        <SessionFast />
        <SessionSimple />
        <SessionPlan />
        <SessionSafe />
        <SessionMondi />
        <SessionFaq />
        <SessionFooter />
        {isMainStickyFooterShow && <StickyFooter />}
      </Container>
    </ContainerWrapper>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 44px);
  padding: 12px  22px;
  background: linear-gradient(0deg, rgba(234, 240, 255, 0.5), rgba(234, 240, 255, 0.5)), #FFFFFF;
`;

const HeaderTitle = styled.span`
  font-family: Pretendard;
  font-weight: 600;
  font-size: 11px;
  color: ${Color.THEME};
  margin-left: 10px;
`;

const HeaderButton = styled.a`
  padding: 9px 14px;
  background: ${Color.THEME};
  font-family: Pretendard;
  font-weight: 400;
  font-size: 12px;
  color: #fff;
  border-radius: 18px;
  cursor: pointer;
  text-decoration: none;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo color={Color.THEME} />
      <HeaderTitle>혼수 비교 견적 서비스</HeaderTitle>
      <div style={{ flex: 1 }} />
      <HeaderButton href={TYPEFORM_URL}>무료로 견적받기</HeaderButton>
    </HeaderContainer>
  )
}

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
  word-break: keep-all;
  ${({ textStyle }) => textStyle};
`;

const SessionImage = styled.img<{ imageStyle?: string }>`
  max-width: 500px;
  width: calc(100% - 40px);
  object-fit: contain;
  ${({ imageStyle }) => imageStyle};
`;

const TitleContainer = styled.div`
  padding: 10px 16px;
  background: ${Color.THEME};
  border-radius: 25px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  margin-bottom: 18px;
`;

const EstimateButton = styled.a`
  padding: 17px 31px;
  background: ${Color.THEME};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 18px;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
`;

const SessionTitle = () => {
  const estimateElement = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const estimateElementOffsetTop = estimateElement.current?.offsetTop ?? 0;
      useAppStore.setState({ isMainStickyFooterShow: window.pageYOffset >= estimateElementOffsetTop });
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <SessionContainer
      containerStyle="
        padding: 58px 0 51px 0;
        background:linear-gradient(0deg, rgba(234, 240, 255, 0.5), rgba(234, 240, 255, 0.5)), #FFFFFF;
      "
    >
      <SessionText
        textStyle="
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 32px;
          color: #5071c5;
          margin-bottom: 4px;
        "
      >혼수 비교 견적은</SessionText>
      <SessionRowContainer containerStyle="margin-bottom: 12px;">
        <SessionText
          textStyle="
            font-family: LocusSangsang;
            font-weight: 400;
            font-size: 32px;
            color: #333;
          "
        >발품 말고&nbsp;</SessionText>
        <TextUnderline
          text="먼디"
          textStyle={`
            font-family: LocusSangsang;
            font-weight: 400;
            font-size: 32px;
            color: ${Color.THEME};
          `}
          underlineStyle="
            height: 23px;
            background: rgba(223, 232, 255, 0.68);
            bottom: 0;
          "
        />
      </SessionRowContainer>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 500;
          font-size: 15px;
          color: #5D6477;
          line-height: 19px;
          margin-bottom: 33px;
        "
      >
        {`최저가 구매, 이제 빠르고 간편하게\n비교하세요!`}
      </SessionText>
      <SessionImage src="/imgs/main_title.png" imageStyle="width: 265px; margin-bottom: 50px;" />
      <SessionText
        textStyle={`
          font-family: Pretendard;
          font-weight: 500;
          font-size: 15px;
          color: ${Color.THEME};
          margin-bottom: 14px;
        `}
      >신혼부부라면?</SessionText>
      <EstimateButton
        ref={estimateElement}
        href={TYPEFORM_URL}
      >견적 무료로 받아보기</EstimateButton>
    </SessionContainer>
  )
}

const SessionComparison = () => {
  return (
    <SessionContainer containerStyle="padding: 57px 0 50px 0;">
      <TitleContainer>비교견적</TitleContainer>
      <SessionText
        textStyle={`
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          color: ${Color.THEME};
          margin-bottom: 4px;
        `}
      >이제부터 간편하게</SessionText>
      <SessionText
        textStyle="
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          color: #000;
          margin-bottom: 12px;
        "
      >비교하세요</SessionText>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 500;
          font-size: 14px;
          line-height: 19px;
          color: #4E5567;
          margin-bottom: 40px;
        "
      >
        {`가전제품부터 가구까지,\n온라인으로 간편하게 비교하세요.`}
      </SessionText>
      <SessionImage src="/imgs/main_comparision.png" imageStyle="width: 100%;" />
    </SessionContainer>
  )
}

const GuideSearchContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 240px;
  width: calc(100% - 40px);
  padding: 16px 20px;
  background: #FFFFFF;
  box-shadow: 1px 2px 18px rgba(0, 0, 0, 0.1);
  border-radius: 18px;
`;

const GuideSearchCursor = styled.div`
  width: 2px;
  height: 28px;
  background: #B8BFD2;
  margin-right: 12px;
`;

const GuideSearchText = styled.div`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 15px;
  color: rgba(28, 29, 35, 0.6);
`;

const GuideSearchButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 11px;
  background: ${Color.THEME};
  border-radius: 35px;
`;

const SessionGuide = () => {
  return (
    <SessionContainer
      containerStyle="
        padding: 46px 0 105px 0;
        background: linear-gradient(0deg, rgba(234, 240, 255, 0.5), rgba(234, 240, 255, 0.5)), #FFFFFF;
      "
    >
      <TitleContainer>쉬운 이용</TitleContainer>
      <SessionText
        textStyle="
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          color: #333;
          margin-bottom: 4px;
        "
      >구매하려는</SessionText>
      <SessionText
        textStyle={`
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          color: ${Color.THEME};
          margin-bottom: 4px;
        `}
      >상품의 모델명만</SessionText>
      <SessionText
        textStyle="
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          color: #333;
          margin-bottom: 12px;
        "
      >입력하면 끝</SessionText>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 500;
          font-size: 14px;
          line-height: 19px;
          color: #5D6477;
          margin-bottom: 40px;
        "
      >
        {`모델명 입력 후 비교견적 요청시\n최저가를 찾도록 도와드릴게요.`}
      </SessionText>
      <GuideSearchContainer>
        <GuideSearchCursor />
        <GuideSearchText>상품의 모델명</GuideSearchText>
        <div style={{ flex: 1 }} />
        <GuideSearchButton><Search /></GuideSearchButton>
      </GuideSearchContainer>
    </SessionContainer>
  )
}

const SessionFast = () => {
  return (
    <SessionContainer>
      <SessionContainer containerStyle="
        padding: 40px 32px;
        width: calc(100% - 64px);
        align-items: flex-start;
      ">
        <TitleContainer>빠른 견적</TitleContainer>
        <SessionRowContainer containerStyle="margin-bottom: 4px;">
          <TextUnderline
            text="24시간"
            textStyle={`
              font-family: LocusSangsang;
              font-weight: 400;
              font-size: 26px;
              color: ${Color.THEME};
            `}
            underlineStyle="
              height: 14px;
              background: rgba(223, 232, 255, 0.68);
              bottom: 0;
            "
          />
          <SessionText
            textStyle="
              font-family: LocusSangsang;
              font-weight: 400;
              font-size: 26px;
              color: #333;
            "
          >&nbsp;이내에</SessionText>
        </SessionRowContainer>
        <SessionText
          textStyle="
            font-family: LocusSangsang;
            font-weight: 400;
            font-size: 26px;
            color: #333;
            margin-bottom: 12px;
          "
        >견적서를 받아보세요</SessionText>
        <SessionText
          textStyle="
            text-align: left;
            font-family: Pretendard;
            font-weight: 500;
            font-size: 14px;
            line-height: 19px;
            color: #5D6477;
          "
        >
          {`발품없이 소규모 매장부터 초대형 매장까지\n24시간 이내에 견적서를 받을 수 있어요.`}
        </SessionText>
      </SessionContainer>
      <SessionImage src="/imgs/main_fast.png" imageStyle="width: 100%;" />
    </SessionContainer>
  )
}

const SessionSimple = () => {
  return (
    <SessionContainer containerStyle="
      padding: 46px 0 50px 0;
      background: linear-gradient(0deg, #F5F8FF, #F5F8FF), #FFFFFF;
    ">
      <TitleContainer>심플한 견적서</TitleContainer>
      <SessionText
        textStyle="
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          color: #000;
          margin-bottom: 4px;
        "
      >아무리 복잡해도</SessionText>
      <SessionText
        textStyle={`
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          color: ${Color.THEME};
          margin-bottom: 12px;
        `}
      >무조건 심플하게</SessionText>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 500;
          font-size: 14px;
          line-height: 19px;
          color: #5D6477;
          margin-bottom: 28px;
        "
      >
        {`판매사원이 제안한 복잡한 견적서도\n쉽게 이해할 수 있어요`}
      </SessionText>
      <SessionImage src="/imgs/main_simple.png" imageStyle="width: 280px;" />
    </SessionContainer>
  )
}

const PlanContainer = styled.div<{ isLast?: boolean, selected?: boolean }>`
  ${({ selected }) => selected ? `border: 1px solid rgba(26, 90, 255, 0.48);` : ""}
  margin-right: ${({ isLast }) => isLast ? 0 : 10}px;
  flex: 1;
  height: 260px;
  padding: 20px 16px;
  box-shadow: 1px 2px 18px rgba(0, 0, 0, 0.1);
  border-radius: 18px;
`;

const PlanTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(98, 139, 190, 0.37);
`;

const PlanText = styled.span<{ textStyle?: string }>`
  font-family: Pretendard;
  ${({ textStyle }) => textStyle};
`;

const PlanOptionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const plans = [{
  title: "기본",
  type: "BASIC",
  price: "무료",
  optionTitle: "무료 혜택",
  credit: 3,
  options: [
    "지역 한정",
    "건 당 3개 제한",
  ]
}, {
  title: "추천",
  type: "PLUS",
  price: `₩ ${wonComma(44000)}원`,
  optionTitle: "플러스 멤버십",
  credit: 10,
  options: [
    "지역 제한 없음",
    "건 당 5개 제한",
    "다품목 지원",
    "회원 추가 혜택"
  ],
  selected: true
}]

const SessionPlan = () => {
  return (
    <SessionContainer containerStyle="
      padding: 46px 32px 50px 32px;
      align-items: flex-start;
    ">
      <TitleContainer>견적 옵션</TitleContainer>
      <SessionRowContainer containerStyle="margin-bottom: 4px;">
        <TextUnderline
          text="무료로"
          textStyle={`
            font-family: LocusSangsang;
            font-weight: 400;
            font-size: 26px;
            color: ${Color.THEME};
          `}
          underlineStyle="
            height: 14px;
            background: rgba(223, 232, 255, 0.68);
            bottom: 0;
          "
        />
        <SessionText
          textStyle={`
            font-family: LocusSangsang;
            font-weight: 400;
            font-size: 26px;
            color: ${Color.THEME};
          `}
        >&nbsp;이용해보고</SessionText>
      </SessionRowContainer>
      <SessionText
        textStyle="
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          color: #333;
          margin-bottom: 12px;
        "
      >만족하면 결제해주세요</SessionText>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 500;
          font-size: 14px;
          line-height: 19px;
          color: #5D6477;
          text-align: left;
          margin-bottom: 34px;
        "
      >
        {`멤버십 구매 후 서비스에 만족하지 못하면\n100% 환불을 도와드립니다.`}
      </SessionText>
      <SessionRowContainer containerStyle="width: 100%;">
        {plans.map((plan, index) => {
          return (
            <PlanContainer
              key={`plan_${index}`}
              isLast={index === plans.length - 1}
              selected={plan.selected}
            >
              <PlanTypeContainer>
                <PlanText
                  textStyle={`
                    font-weight: 400;
                    font-size: ${plan.selected ? 13 : 12}px;
                    color: ${plan.selected ? Color.THEME : "#5D6477"};
                    margin-bottom: 5px;
                  `}
                >{plan.title}</PlanText>
                <PlanText
                  textStyle={`
                    font-weight: 800;
                    font-size: ${plan.selected ? 24 : 23}px;
                    color: ${plan.selected ? Color.THEME : "#333"};
                    margin-bottom: 9px;
                  `}
                >{plan.type}</PlanText>
                <PlanText
                  textStyle={`
                    font-weight: 400;
                    font-size: 12px;
                    color: ${plan.selected ? Color.THEME : "#5D6477"};
                    margin-bottom: 15px;
                  `}
                >{plan.price}</PlanText>
              </PlanTypeContainer>
              <PlanText
                textStyle="
                  font-weight: 500;
                  font-size: 12px;
                  color: #333;
                "
              >{plan.optionTitle}</PlanText>
              <PlanOptionContainer style={{ marginTop: 12 }}>
                <Check color={plan.selected ? Color.THEME : "#818181"} />
                <PlanText
                  textStyle="
                    font-weight: 400;
                    @media all and (max-width: 359px) { font-size:11px; }
                    font-size: 12px;
                    color: #333;
                    margin: 0 10px 0 2px;
                  "
                >{plan.credit} 크레딧</PlanText>
                <PlanText
                  textStyle="
                    font-weight: 400;
                    font-size: 10px;
                    color: #333;
                  "
                >/ 월</PlanText>
              </PlanOptionContainer>
              {plan.options.map((option, optionIndex) => {
                return (
                  <PlanOptionContainer key={`plan_${index}_option_${optionIndex}`}>
                    <Check color={plan.selected ? Color.THEME : "#818181"} />
                    <PlanText
                      textStyle="
                        font-weight: 400;
                        @media all and (max-width: 359px) { font-size:11px; }
                        font-size: 12px;
                        color: #333;
                        margin-left: 2px;
                      "
                    >{option}</PlanText>
                  </PlanOptionContainer>
                )
              })}
            </PlanContainer>
          )
        })}
      </SessionRowContainer>
    </SessionContainer>
  )
}

const SafeImageContainer = styled.div`
  position: relative;
`;

const SafeImageBlurContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 98px;
  background: linear-gradient(0deg, #F5F8FF 19.7%, #F5F8FF 63.64%, rgba(245, 248, 255, 0) 103%);
`;

const SessionSafe = () => {
  return (
    <SessionContainer containerStyle="
      padding-top: 46px;
      background: linear-gradient(0deg, #F5F8FF, #F5F8FF), #FFFFFF;
    ">
      <TitleContainer>안전한 서비스</TitleContainer>
      <SessionText
        textStyle="
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          line-height: 32px;
          color: #333;
          margin-bottom: 12px;
        "
      >{`만족하는 견적에만\n응답해주세요`}</SessionText>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 500;
          font-size: 14px;
          line-height: 19px;
          color: #5D6477;
          margin-bottom: 40px;
        "
      >{`고객님의 개인정보는 엄격히 관리되며\n요청없이는 판매사원이 연락할 수 없어요.`}</SessionText>
      <SafeImageContainer>
        <SessionImage src="/imgs/main_safe.png" imageStyle="width: 200px;" />
        <SafeImageBlurContainer />
      </SafeImageContainer>  
    </SessionContainer>
  )
}

const SessionMondi = () => {
  return (
    <SessionContainer containerStyle={`
      padding: 112px 0 122px; 0;
      background: ${Color.THEME};
    `}>
      <SessionText
        textStyle="
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          line-height: 32px;
          color: #fff;
          margin-bottom: 12px;
        "
      >{`내일이 더 여유로운 생활,\n지금 먼디를 시작하세요.`}</SessionText>
      <SessionRowContainer containerStyle="align-items: flex-start;">
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 400;
            font-size: 12px;
            color: #fff;
          "
        >비교 견적 시</SessionText>
        <TextUnderline
          text="&nbsp;최대 20%의&nbsp;"
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 12px;
            color: #fff;
          "
          underlineStyle="
            height: 8px;
            background: rgba(223, 232, 255, 0.68);
            bottom: 0;
          "
        />
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 400;
            font-size: 12px;
            color: #fff;
          "
        >비용을 아낄 수 있어요.</SessionText>
      </SessionRowContainer>
    </SessionContainer>
  )
}

const faqs = [{
  question: "비교견적 신청시 별도의 비용이 들어가나요?",
  answer: "먼디의 비교 견적 서비스는 무료로 이용할 수 있습니다. 별도의 수수료는 발생하지 않으니 부담 없이 이용하세요."
}, {
  question: "견적은 어떻게 받나요?",
  answer: "먼디의 비교 견적 서비스는 무료로 이용할 수 있습니다. 별도의 수수료는 발생하지 않으니 부담 없이 이용하세요."
}, {
  question: "혼수가 아닌 경우 이용이 불가한가요?",
  answer: "먼디의 비교 견적 서비스는 무료로 이용할 수 있습니다. 별도의 수수료는 발생하지 않으니 부담 없이 이용하세요."
}, {
  question: "결제 후 취소 및 환불은 어떻게 해야하나요?",
  answer: "먼디의 비교 견적 서비스는 무료로 이용할 수 있습니다. 별도의 수수료는 발생하지 않으니 부담 없이 이용하세요."
}];

const FaqContainer = styled.div<{ isLast?: boolean }>`
  display: flex;
  max-width: calc(500px - 74px);
  width: calc(100% - 74px);
  padding: 20px 16px;
  border: 1px solid rgba(26, 90, 255, 0.2);
  background: #fff;
  margin-bottom: ${({ isLast }) => isLast ? 0 : 10}px;
  border-radius: 12px;
  cursor: pointer;
`;

const FaqQnAContainer = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 10px;
`;

const FaqText = styled.span<{ textStyle?: string }>`
  font-family: Pretendard;
  white-space: pre-line;
  word-break: keep-all;
  ${({ textStyle }) => textStyle};
`;

const SessionFaq = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  return (
    <SessionContainer containerStyle="padding: 46px 0 52px 0; background: #F5F8FF;">
      <TitleContainer>Q&A</TitleContainer>
      <SessionText
         textStyle={`
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          color: ${Color.THEME};
          margin-bottom: 28px;
        `}
      >자주 묻는 질문</SessionText>
      {faqs.map((faq, index) => {
        return (
          <FaqContainer
            key={`faq_${index}`}
            isLast={index === faqs.length - 1}
            onClick={() => setActiveIndex(prev => prev === index ? -1 : index)}
          >
            <FaqText
                textStyle={`
                  font-weight: 600;
                  font-size: 18px;
                  line-height: 18px;
                  color: ${Color.THEME};
                  margin-right: 8px;
                `}
              >Q</FaqText>
              <FaqQnAContainer>
                <FaqText
                  textStyle="
                    font-weight: 600;
                    font-size: 14px;
                    color: #333;
                  "
                >{faq.question}</FaqText>
                {activeIndex === index &&
                  <FaqText
                    textStyle="
                      font-weight: 500;
                      font-size: 14px;
                      color: #5D6477;
                      margin-top: 12px;
                    "
                  >
                    {faq.answer}
                  </FaqText>
                } 
              </FaqQnAContainer>
              {activeIndex === index ? <ArrowTop /> : <ArrowBottom />}
          </FaqContainer>
        )
      })}
    </SessionContainer>
  )
}

const SessionFooter = () => {
  return (
    <SessionContainer
      containerStyle={`
        padding: 24px 24px 37px 24px;
        background: ${Color.THEME};
        align-items: flex-start;
      `}
    >
      <SessionRowContainer
        containerStyle="
          width: 100%;
          margin-bottom: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        "
      >
        <Logo color="#fff" />
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 500;
            font-size: 12px;
            color: #fff;
            margin-left: 10px;
          "
        >혼수 비교 견적 서비스</SessionText>
      </SessionRowContainer>
      <SessionText
        textStyle="
          text-align: left;
          font-family: Pretendard;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          color: #fff;
        "
      >
        {`대표 : 김호철
          서울시 영등포구 당산로41길 11 당산 SK V1, 14층
          
          통신 판매번호 : 2022-서울영등포-2320호
          사업자 등록번호 : 322-81-01873
          대표 번호 : 1588-1588
          제휴 문의 : growth@mondi.kr
          먼디는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
          상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.
          
          Copyright. 2023 먼디, Mondi All Rights Reserved.`}
      </SessionText>
    </SessionContainer>
  )
}

const StickyFooterContainer = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0px;
  width: 100%;
  max-width: 500px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
`;

const StickyFooterEstimateButton = styled.a`
  width: calc(100% - 40px - 62px);
  padding: 17px 31px;
  display: flex;
  justify-content: center;
  background: ${Color.THEME};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 18px;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
`


const StickyFooter = () => {
  return (
    <StickyFooterContainer>
      <StickyFooterEstimateButton
        href={TYPEFORM_URL}
      >견적 무료로 받아보기</StickyFooterEstimateButton>
    </StickyFooterContainer>
  )
}

export default Main;