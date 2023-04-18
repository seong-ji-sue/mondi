import { ArrowBottom, ArrowTop, Fire, Logo } from "@components/Svg";
import React, { useEffect, useRef, useState } from "react";
import Color from "src/utils/color";
import styled from "styled-components";

const TYPEFORM_URL = "";

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

let navigationOffsetTop: number | undefined;
let voteButtonOffsetTop: number | undefined;
let guideOffsetTop: number | undefined;
let cheerOffsetTop: number | undefined;
let eventOffsetTop: number | undefined;
let surveyDealOffsetTop: number | undefined;

const Main = () => {
  const [navigationIndex, setNavigationIndex] = useState<number>(0);
  const [isNavigationShow, setIsNavigationShow] = useState<boolean>(true);
  const [isNavigationSticky, setIsNavigationSticky] = useState<boolean>(false);
  const [isMainStickyFooterShow, setIsMainStickyFooterShow] = useState<boolean>(false);
  const containerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (navigationOffsetTop) {
        setIsNavigationSticky(window.pageYOffset >= navigationOffsetTop);
      }
      if (voteButtonOffsetTop) {
        setIsMainStickyFooterShow(window.pageYOffset >= voteButtonOffsetTop);
      }
      if (surveyDealOffsetTop && window.pageYOffset >= surveyDealOffsetTop) {
        setIsNavigationShow(false);
      } else if (eventOffsetTop && window.pageYOffset >= eventOffsetTop) {
        setIsNavigationShow(true);
        setNavigationIndex(3);
      } else if (cheerOffsetTop && window.pageYOffset >= cheerOffsetTop) {
        setIsNavigationShow(true);
        setNavigationIndex(2);
      } else if (guideOffsetTop && window.pageYOffset >= guideOffsetTop) {
        setIsNavigationShow(true);
        setNavigationIndex(1);
      } else {
        setIsNavigationShow(true);
        setNavigationIndex(0)
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    if (isNavigationSticky) {
      containerElement.current?.setAttribute('style', 'padding-top: 50px;');
    } else {
      containerElement.current?.removeAttribute('style');
    }
  }, [isNavigationSticky]);

  return (
    <ContainerWrapper ref={containerElement}>
      <Container>
        <Header />
        <Navigation
          navigationIndex={navigationIndex}
          isNavigationSticky={isNavigationSticky}
          isNavigationShow={isNavigationShow}
        />
        <SessionTitle isNavigationSticky={isNavigationSticky} />
        <SessionSurvey />
        <SessionGuide isNavigationSticky={isNavigationSticky} />
        <SessionCheer isNavigationSticky={isNavigationSticky} />
        <SessionCustom />
        <SessionVote />
        <SessionBenefit />
        <SessionGroupBuy />
        <SessionSafe />
        <SessionEvent isNavigationSticky={isNavigationSticky} />
        <SessionSurveyDeal isNavigationSticky={isNavigationSticky} />
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
  justify-content: space-between;
  width: calc(100% - 44px);
  padding: 12px  22px;
  background: linear-gradient(0deg, #111111, #111111), #FFFFFF;
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
      <Logo />
      <HeaderButton href={TYPEFORM_URL}>투표하고 오픈알림받기</HeaderButton>
    </HeaderContainer>
  )
}

const NavigationContainer = styled.div`
  display: flex;
  background: #111;
  width: 100%;
  max-width: 500px;
  height: 50px;
`;

const NavigationMenu = styled.div<{ selected?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Pretendard;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  ${({ selected }) => selected ? `
    color: #fff;
    border-bottom: solid 3px ${Color.THEME};
  ` : `
    color: rgba(255, 255, 255, 0.42);
    border-bottom: solid 3px #474747;
  `}
`;

const navigationMenus = ["서비스 소개", "이용방법", "투표 현황 보기", "이벤트 참여"];

const Navigation = ({
  navigationIndex,
  isNavigationSticky,
  isNavigationShow
}: {
  navigationIndex: number;
  isNavigationSticky: boolean;
  isNavigationShow: boolean;
}) => {
  const navigationElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigationOffsetTop = navigationElement.current?.offsetTop;
  }, []);

  useEffect(() => {
    const stickyStyle = 'position: fixed; top: 0; z-index: 10;';
    const hideStyle = 'display: none';
    if (isNavigationSticky && isNavigationShow) {
      navigationElement.current?.setAttribute('style', stickyStyle);
    } else if (isNavigationSticky) {
      navigationElement.current?.setAttribute('style', stickyStyle + hideStyle);
    } else if (isNavigationShow) {
      navigationElement.current?.removeAttribute('style');
    } else {
      navigationElement.current?.setAttribute('style', hideStyle);
    }
  }, [isNavigationSticky, isNavigationShow]);

  return (
    <NavigationContainer ref={navigationElement}>
      {navigationMenus.map((navigationMenu, index) => {
        return (
          <NavigationMenu
            key={`navigation_menu_${index}`}
            selected={navigationIndex === index}
            onClick={() => {
              if (index === 0) {
                window.scrollTo({ top: 56, behavior: "smooth" });
              } else if (index === 1) {
                window.scrollTo({
                  top: isNavigationSticky ? guideOffsetTop : guideOffsetTop && guideOffsetTop - 100,
                  behavior: "smooth"
                });
              } else if (index === 2) {
                window.scrollTo({
                  top: isNavigationSticky ? cheerOffsetTop : cheerOffsetTop && cheerOffsetTop - 100,
                  behavior: "smooth"
                });
              } else if (index === 3) {
                window.scrollTo({
                  top: isNavigationSticky ? eventOffsetTop : eventOffsetTop && eventOffsetTop - 100,
                  behavior: "smooth"
                });
              }
            }}
          >
            {navigationMenu}
          </NavigationMenu>
        )
      })}
    </NavigationContainer>
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
  align-self: center;
  background: ${Color.THEME};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 18px;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
`;

const SessionTitle = ({ isNavigationSticky }: { isNavigationSticky: boolean; }) => {
  const voteButtonElement = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    voteButtonOffsetTop = voteButtonElement.current?.offsetTop;
  }, [isNavigationSticky]);

  return (
    <SessionContainer
      containerStyle="
        padding: 44px 32px;
        align-items: flex-start;
        background: linear-gradient(0deg, #111111, #111111), #FFFFFF;
      "
    >
      <SessionRowContainer containerStyle="margin-bottom: 4px;">
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 30px;
            color: #19D94E;
          "
        >
          투표
        </SessionText>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 700;
            font-size: 30px;
            color: #fff;
          "
        >
          로 탄생하는
        </SessionText>
      </SessionRowContainer>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 700;
          font-size: 30px;
          color: #fff;
          margin-bottom: 2px;
        "
      >
        공동구매
      </SessionText>
      <SessionImage src="/imgs/main_title.png" imageStyle="width: 266px; align-self: center; margin-bottom: 47px;" />
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 500;
          font-size: 15px;
          color: #4CC96E;
          margin-bottom: 14px;
          align-self: center;
        "
      >이런 서비스가 필요하다면?</SessionText>
      <EstimateButton
        ref={voteButtonElement}
        href={TYPEFORM_URL}
      >투표하고 오픈알림 받기</EstimateButton>
    </SessionContainer>
  )
}

const SessionSurvey = () => {
  return (
    <SessionContainer
      containerStyle="
        padding: 42px 32px 15px 32px;
        align-items: flex-start;
        background: linear-gradient(0deg, #F5F5F5, #F5F5F5), #FFFFFF;
      "
    >
      <TitleContainer>설문조사</TitleContainer>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 800;
          font-size: 26px;
          color: #b1b1b1;
          margin-bottom: 4px;
        "
      >서베이딜은</SessionText>
      <SessionRowContainer containerStyle="margin-bottom: 4px;">
        <SessionText
          textStyle={`
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: ${Color.THEME};
          `}
        >설문조사</SessionText>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: #b1b1b1;
          "
        >를 바탕으로</SessionText>
      </SessionRowContainer>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 800;
          font-size: 26px;
          color: #b1b1b1;
          margin-bottom: 4px;
        "
      >공동구매를 열어가는</SessionText>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 800;
          font-size: 26px;
          color: #232323;
          margin-bottom: 4px;
        "
      >국내 최초의 공동구매</SessionText>
      <SessionRowContainer containerStyle="margin-bottom: 34px;">
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: #232323;
          "
        >플랫폼</SessionText>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: #b1b1b1;
          "
        >입니다.</SessionText>
      </SessionRowContainer>
      <SessionImage src="/imgs/main_survey.png" imageStyle="width: 186px; align-self: flex-end;" />
    </SessionContainer>
  )
}

const guides = [{
  title: "설문조사",
  desc: "구매 고객을 예측합니다."
}, {
  title: "설문조사",
  desc: "구매 고객을 예측합니다."
}, {
  title: "설문조사",
  desc: "구매 고객을 예측합니다."
}];

const GuideWrapperContainer = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: scroll;
  max-width: 500px;
  width: 100%;
`;

const GuideContainer = styled.div<{ isLast: boolean }>`
  display: flex;
  flex-direction: column;
  width: calc(229px - 46px);
  padding: 60px 23px 27px 23px;
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #F5F8FF;
  border-radius: 18px;
  margin-right: ${({ isLast }) => isLast ? 0 : 14}px;
`;

const GuideTitleText = styled.span`
  font-family: Pretendard;
  font-weight: 800;
  font-size: 16px;
  color: #4e5567;
  margin-bottom: 13px;
`;

const GuideDescText = styled.span`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  color: #4e5567;
`;

const SessionGuide = ({ isNavigationSticky }: { isNavigationSticky: boolean; }) => {
  const guideElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    guideOffsetTop = guideOffsetTop ? guideElement.current?.offsetTop : (guideElement.current?.offsetTop ?? 0) + 50;
  }, [isNavigationSticky]);

  return (
    <SessionContainer
      ref={guideElement}
      containerStyle="
        padding: 27px 32px 38px 32px;
        align-items: flex-start;
        background: linear-gradient(0deg, #F5F5F5, #F5F5F5), #FFFFFF;
      "
    >
      <SessionRowContainer containerStyle="margin-bottom: 20px;">
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 18px;
            color: #232323;
          "
        >서베이딜의&nbsp;</SessionText>
        <SessionText
          textStyle={`
            font-family: Pretendard;
            font-weight: 800;
            font-size: 18px;
            color: ${Color.THEME};
          `}
        >이용방법</SessionText>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 18px;
            color: #232323;
          "
        >이에요.</SessionText>
      </SessionRowContainer>
      <GuideWrapperContainer>
        {guides.map((guide, index) => {
          return (
            <GuideContainer key={`guide_${index}`} isLast={index === guides.length - 1}>
              <GuideTitleText>{guide.title}</GuideTitleText>
              <GuideDescText>{guide.desc}</GuideDescText>
            </GuideContainer>
          )
        })}
      </GuideWrapperContainer>
    </SessionContainer>
  )
}

const CheerProgressContainer = styled.div<{ containerStyle?: string; }>`
  height: 11px;
  border-radius: 5.5px;
  ${({ containerStyle }) => containerStyle};
`;

const CheerButton = styled.div`
  align-self: center;
  padding: 12px 30px;
  border-radius: 20px;
  background: ${Color.THEME};
  font-family: Pretendard;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
`;

const CHEER_COUNT = 20;
const SessionCheer = ({ isNavigationSticky }: { isNavigationSticky: boolean; }) => {
  const cheerElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cheerOffsetTop = cheerOffsetTop ? cheerElement.current?.offsetTop : (cheerElement.current?.offsetTop ?? 0) + 50;
  }, [isNavigationSticky]);

  return (
    <SessionContainer
      ref={cheerElement}
      containerStyle="
        padding: 36px 32px 39px 32px;
        align-items: flex-start;
        background: linear-gradient(0deg, #1C1C1C, #1C1C1C), #FFFFFF;
      "
    >
      <SessionRowContainer containerStyle="margin-bottom: 18px; align-items: flex-end;">
        <Fire />
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 700;
            font-size: 18px;
            color: #fff;
            margin-left: 9px;
          "
        >실제 개발까지 남은 응원</SessionText>
      </SessionRowContainer>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 500;
          font-size: 14px;
          color: #fff;
          margin-bottom: 12px;
        "
      >111명이 응원해줘야 탄생할 수 있어요</SessionText>
      <CheerProgressContainer containerStyle="width: 100%; background: #D9D9D9; margin-bottom: 6px;">
        <CheerProgressContainer containerStyle={`width: ${CHEER_COUNT / 111 * 100}%; background: ${Color.THEME};`} />
      </CheerProgressContainer>
      <SessionRowContainer containerStyle="width: 100%; justify-content: space-between; margin-bottom: 6px;">
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 500;
            font-size: 14px;
            color: #fff;
          "
        >1명</SessionText>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 500;
            font-size: 14px;
            color: #fff;
          "
        >111명</SessionText>
      </SessionRowContainer>
      <CheerButton>응원하기</CheerButton>
    </SessionContainer>
  )
}

const SessionCustom = () => {
  return (
    <SessionContainer
      containerStyle="
        padding-bottom: 28px;
        background: linear-gradient(0deg, #F5F5F5, #F5F5F5), #FFFFFF;
      "
    >
      <SessionContainer
        containerStyle="
          padding: 42px 32px 44px 32px;
          width: calc(100% - 64px);
          align-items: flex-start;
        "
      >
        <TitleContainer>고객 맞춤</TitleContainer>
        <SessionRowContainer containerStyle="margin-bottom: 4px;">
          <SessionText
            textStyle="
              font-family: Pretendard;
              font-weight: 800;
              font-size: 26px;
              color: #232323;
            "
          >내게 딱 필요한&nbsp;</SessionText>
          <SessionText
            textStyle={`
              font-family: Pretendard;
              font-weight: 800;
              font-size: 26px;
              color: ${Color.THEME};
            `}
          >공동구매</SessionText>
        </SessionRowContainer>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: #232323;
            margin-bottom: 10px;
          "
        >발견부터 경험까지</SessionText>
        <SessionText
          textStyle="
            text-align: left;
            font-family: Pretendard;
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;
            color: #747474;
          "
        >
          {`관심사 등록 시 내게 필요한\n공동구매가 만들어져요.`}
        </SessionText>
      </SessionContainer>
      <SessionImage src="/imgs/main_custom.png" imageStyle="width: 100%;" />
    </SessionContainer>
  )
}

const VoteButton = styled.div`
  position: absolute;
  bottom: -43px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 65px;
  background: ${Color.THEME};
  border-radius: 12px;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
`;

const SessionVote = () => {
  return (
    <SessionContainer
      containerStyle="
        padding: 42px 32px 52px 32px;
        align-items: flex-start;
        background: linear-gradient(0deg, #FFFFFF, #FFFFFF), #FFFFFF;
      "
    >
      <TitleContainer>투표하기</TitleContainer>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 800;
          font-size: 26px;
          color: #232323;
          margin-bottom: 4px;
        "
      >고민 부담 노노!</SessionText>
      <SessionRowContainer containerStyle="margin-bottom: 10px;">
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: #232323;
          "
        >가볍게&nbsp;</SessionText>
        <SessionText
          textStyle={`
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: ${Color.THEME};
          `}
        >투표</SessionText>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: #232323;
          "
        >하세요</SessionText>
      </SessionRowContainer>
      <SessionText
        textStyle="
          text-align: left;
          font-family: Pretendard;
          font-weight: 500;
          font-size: 14px;
          line-height: 19px;
          color: #747474;
          margin-bottom: 14px;
        "
      >
        {`부담 없이 투표하고 공구가 확인 후\n구매 결정을 해도 아무런 상관이 없어요.`}
      </SessionText>
      <SessionContainer
        containerStyle="width: 100%; position: relative; margin: 25px 0 53px 0;"
      >
        <SessionImage src="/imgs/main_vote_product_effect.png" imageStyle="width: 345px; position: absolute; top: -25px;" />
        <SessionImage src="/imgs/main_vote_product.png" imageStyle="width: 166px;" />
        <VoteButton>투표 참여하기</VoteButton>
      </SessionContainer>
    </SessionContainer>
  )
}

const BenefitDescContainer = styled.div<{ containerStyle?: string; }>`
  border: 1px solid rgba(0, 161, 44, 0.51);
  box-shadow: 1px 2px 18px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 1;
  ${({ containerStyle }) => containerStyle};
`;

const BenefitDescText = styled.span<{ textStyle?: string }>`
  font-family: Pretendard;
  font-weight: 500;
  font-size: 12px;
  color: #5D6477;
  white-space: pre-line;
  word-break: keep-all;
  ${({ textStyle }) => textStyle};
`;

const BenefitBottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 207px;
  background: linear-gradient(0deg, #00A12C, #00A12C), #F5F5F5;
`;

const SessionBenefit = () => {
  return (
    <SessionContainer containerStyle="position: relative;">
      <SessionContainer
        containerStyle="
          width: calc(100% - 64px);
          padding: 42px 32px 50px 32px;
          align-items: flex-start;
          background: linear-gradient(0deg, #F5F5F5, #F5F5F5), #FFFFFF;
        "
      >
        <TitleContainer>할인&혜택</TitleContainer>
        <SessionText
          textStyle={`
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: ${Color.THEME};
            margin-bottom: 4px;
          `}
        >투표만 해도</SessionText>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: #232323;
            margin-bottom: 10px;
          "
        >혜택이 가득</SessionText>
        <SessionText
          textStyle="
            text-align: left;
            font-family: Pretendard;
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;
            color: #747474;
            margin-bottom: 26px;
          "
        >
          {`투표에 참여 시 알림을 통해\n공구가와 혜택을 안내드려요.`}
        </SessionText>
        <BenefitDescContainer
          containerStyle="
            width: calc(100% - 21px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 6px 6px 6px 15px;
            background: linear-gradient(0deg, #F7FFF9, #F7FFF9), #FFFFFF;
            margin-bottom: 12px;
          "
        >
          <BenefitDescText textStyle="margin-right: 6px;">
            투표한 상품이 곧 오픈할 예정이에요. 확인해보세요!
          </BenefitDescText>
          <ArrowBottom size={24} color={Color.THEME} />
        </BenefitDescContainer>
        <SessionImage
          src="/imgs/main_benefit_product.png"
          imageStyle="width: 100%; z-index: 1; border-radius: 24px; margin-bottom: 12px;" />
        <BenefitDescContainer
          containerStyle="
            width: calc(100% - 40px);
            display: flex;
            align-items: center;
            padding: 12px 20px;
            background: linear-gradient(0deg, #F6FFF9, #F6FFF9), #FFFFFF;
            margin-bottom: 6px;
          "
        >
          <BenefitDescText textStyle="margin-right: 8px;">
            온라인 최저가 대비 10만원이 더 저렴해요.
          </BenefitDescText>
          <SessionImage src="/imgs/main_benefit_desc.png" imageStyle="width: 39px;" />
        </BenefitDescContainer>
        <BenefitDescContainer
          containerStyle="
            width: calc(100% - 40px);
            display: flex;
            align-items: center;
            padding: 12px 20px;
            background: #F6FFF9;
          "
        >
          <BenefitDescText textStyle="margin-right: 8px;">
            판매자분이 마이크로 고급 필터를 1+1으로 제공해요!
          </BenefitDescText>
        </BenefitDescContainer>
      </SessionContainer>
      <BenefitBottomContainer />
    </SessionContainer>
  )
}

const categories = [{
  selected: true,
  name: "투표하기"
}, {
  name: "오픈예정"
}, {
  name: "오픈"
}]

const GroupBuyCategoryWrapperContainer = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: scroll;
  max-width: 500px;
  width: 100%;
  margin-bottom: 20px;
`;

const GroupBuyCategoryContainer = styled.div<{ selected?: boolean, isLast: boolean }>`
  ${({ selected }) => selected ? `
    background: ${Color.THEME};
    box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.12);
    color: #fff;
  ` : `
    background: rgba(255, 255, 255, 0.17);
    border: 1px solid #D1D1D1;
    box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.08);
    color: #828282;
  `};
  padding: 10px 16px;
  border-radius: 25px;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 14px;
  margin-right: ${({ isLast }) => isLast ? 0 : 8}px;
`;

const GroupBuyProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  border: 1px solid #F2F2F7;
  border-radius: 20px;
  overflow: hidden;
`;

const GroupBuyProductText = styled.span<{ textStyle?: string }>`
  font-family: Pretendard;
  ${({ textStyle }) => textStyle};
`;

const GroupBuyProductButton = styled.div`
  background: ${Color.THEME};
  width: calc(100% - 36px);
  padding: 18px;
  display: flex;
  justify-content: center;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
`;

const SessionGroupBuy = () => {
  return (
    <SessionContainer
      containerStyle="
        padding: 42px 32px 46px 32px;
        align-items: flex-start;
        background: #fff;
      "
    >
      <TitleContainer>공동구매</TitleContainer>
      <SessionText
        textStyle={`
          font-family: Pretendard;
          font-weight: 800;
          font-size: 26px;
          line-height: 36px;
          color: ${Color.THEME};
          margin-bottom: 4px;
        `}
      >조금 기다렸다</SessionText>
      <SessionText
        textStyle={`
          font-family: Pretendard;
          font-weight: 800;
          font-size: 26px;
          color: ${Color.THEME};
          margin-bottom: 4px;
        `}
      >구매해도 된다면</SessionText>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 800;
          font-size: 26px;
          color: #232323;
          margin-bottom: 10px;
        "
      >중독되실 거에요.</SessionText>
      <SessionText
        textStyle="
          text-align: left;
          font-family: Pretendard;
          font-weight: 600;
          font-size: 14px;
          line-height: 19px;
          color: #747474;
          margin-bottom: 28px;
        "
      >
        {`설문 조사를 바탕으로 공동구매 진행 시\n온라인 최저가보다 할인과 혜택이 더 많아요.`}
      </SessionText>
      <GroupBuyCategoryWrapperContainer>
        {categories.map((category, index) => {
          return (
            <GroupBuyCategoryContainer
              key={`caterogy_${index}`}
              selected={category.selected}
              isLast={index === categories.length - 1}
            >
              {category.name}
            </GroupBuyCategoryContainer>
          )
        })}
      </GroupBuyCategoryWrapperContainer>
      <GroupBuyProductContainer>
        <SessionImage src="/imgs/main_group_buy_product.png" imageStyle="width: 100%;" />
        <GroupBuyProductText
          textStyle="
            font-weight: 500;
            font-size: 12px;
            padding: 18px;
            border-bottom: 1px solid #E5E5EA;
            margin-bottom: 20px;
          "
        >
          <b>2,301</b>명이 투표에 참여한 상품이에요~!
        </GroupBuyProductText>
        <GroupBuyProductText
          textStyle="
            font-weight: 800;
            font-size: 18px;
            padding: 0 18px;
            color: #121212;
            margin-bottom: 12px;
          "
        >
          멜릭서 비건 립 버터
        </GroupBuyProductText>
        <GroupBuyProductText
          textStyle="
            font-weight: 600;
            font-size: 14px;
            padding: 0 18px;
            color: #747474;
            margin-bottom: 26px;
          "
        >
          동물성 성분은 뺴고 만들어 건강한 립케어
        </GroupBuyProductText>
        <GroupBuyProductButton>투표 참여하기</GroupBuyProductButton>
      </GroupBuyProductContainer>
    </SessionContainer>
  )
}

const SessionSafe = () => {
  return (
    <SessionContainer
      containerStyle="
        padding: 42px 32px;
        align-items: flex-start;
        background: linear-gradient(0deg, rgba(245, 245, 245, 0.6), rgba(245, 245, 245, 0.6)), #FFFFFF;
      "
    >
      <TitleContainer>안전한 서비스</TitleContainer>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 800;
          font-size: 26px;
          color: #232323;
          margin-bottom: 4px;
        "
      >편리함을 넘어</SessionText>
      <SessionRowContainer containerStyle="margin-bottom: 10px;">
        <SessionText
          textStyle={`
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: ${Color.THEME};
          `}
        >안전하게&nbsp;</SessionText>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 26px;
            color: #232323;
          "
        >이용하세요</SessionText>
      </SessionRowContainer>
      <SessionText
        textStyle="
          text-align: left;
          font-family: Pretendard;
          font-weight: 500;
          font-size: 14px;
          line-height: 19px;
          color: #747474;
          margin-bottom: 3px;
        "
      >
        {`불편한 경험을 갖지 않도록\n고객 보호 정책을 우선합니다.`}
      </SessionText>
      <SessionImage src="/imgs/main_safe.png" imageStyle="width: 100%;" />
    </SessionContainer>
  )
}

const SessionEvent = ({ isNavigationSticky }: { isNavigationSticky: boolean; }) => {
  const eventElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    eventOffsetTop = eventOffsetTop ? eventElement.current?.offsetTop : (eventElement.current?.offsetTop ?? 0) + 50;
  }, [isNavigationSticky]);

  return (
    <SessionContainer
      ref={eventElement}
      containerStyle="
        padding: 42px 0 46px 0;
        background: #fff;
      "
    >
      <TitleContainer>이벤트</TitleContainer>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 800;
          font-size: 26px;
          color: #121212;
          margin-bottom: 7px;
        "
      >서베이딜 탄생 기원 이벤트</SessionText>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 400;
          font-size: 12px;
          color: #121212;
        "
      >선착순 111명에 한해 오픈 기원 이벤트를 진행하고 있어요.</SessionText>
    </SessionContainer>
  )
}

const SessionSurveyDeal = ({ isNavigationSticky }: { isNavigationSticky: boolean; }) => {
  const surveyDealElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    surveyDealOffsetTop = surveyDealElement.current?.offsetTop;
  }, [isNavigationSticky]);

  return (
    <SessionContainer
      ref={surveyDealElement}
      containerStyle={`
        padding: 112px 0 122px; 0;
        background: ${Color.THEME};
      `}
    >
      <SessionText
        textStyle="
          font-family: LocusSangsang;
          font-weight: 400;
          font-size: 26px;
          line-height: 32px;
          color: #fff;
          margin-bottom: 12px;
        "
      >{`내일이 더 여유로운 생활,\n서베이딜을 시작하세요.`}</SessionText>
      <SessionRowContainer>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 400;
            font-size: 12px;
            color: #fff;
          "
        >공동 구매 시&nbsp;</SessionText>
        <SessionText
          textStyle="
            font-family: Pretendard;
            font-weight: 800;
            font-size: 12px;
            color: #fff;
          "
        >최대 40%의&nbsp;</SessionText>
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
  question: "서베이딜은 어떻게 이용할 수 있나요?",
  answer: "카카오톡을 통해 공동구매로 진행할 상품 정보를 제안해 드리며 투표 또는 구매 정보를 확인 후 이용할 수 있습니다."
},{
  question: "투표에 참여 시 혜택이 있나요?",
  answer: "투표에 참여 한 인원에 대하여 관심 상품이 공동 구매로 진행되었을 경우 우선적으로 알림을 통해 안내를 드리고 있으며, 투표에 참여한 대상에 한하여 판매자의 추가 혜택이 있을 수 있습니다."
},{
  question: "언제 이용할 수 있나요?",
  answer: "현재는 베타 서비스를 준비중이며 런칭 후 카카오톡을 통해 안내해 드릴 예정입니다."
},{
  question: "거래 방법은 어떻게 되나요?",
  answer: "네이버 스토어를 통해 결제할 수 있으며, 당사는 어떠한 경우에도 계좌이체를 통해 현금을 받지 않습니다."
},{
  question: "투표 후 구매하지 않아도 되나요?",
  answer: "투표에 참여 후 구매하지 않아도 되며 어떠한 불이익도 없습니다."
},{
  question: "결제 후 취소 및 환불은 어떻게 하나요?",
  answer: "결제 후 취소 및 환불은 공정거래위원회의 기준에 따라 진행되니 안심하고 이용하셔도 됩니다."
}];

const FaqContainer = styled.div<{ isLast?: boolean }>`
  display: flex;
  max-width: calc(500px - 74px);
  width: calc(100% - 74px);
  padding: 20px 16px;
  border: 1px solid #DADFDB;
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
    <SessionContainer containerStyle="padding: 46px 0 52px 0; background: #F9F9F9;">
      <TitleContainer>Q&A</TitleContainer>
      <SessionText
         textStyle="
          font-family: Pretendard;
          font-weight: 800;
          font-size: 26px;
          color: #121212;
          margin-bottom: 28px;
        "
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
                    line-height: 20px;
                    color: #333;
                  "
                >{faq.question}</FaqText>
                {activeIndex === index &&
                  <FaqText
                    textStyle="
                      font-weight: 500;
                      font-size: 14px;
                      color: #5D6477;
                      line-height: 20px;
                      margin-top: 12px;
                    "
                  >
                    {faq.answer}
                  </FaqText>
                } 
              </FaqQnAContainer>
              {activeIndex === index ? <ArrowTop /> : <ArrowBottom size={16} color="#5D6477" />}
          </FaqContainer>
        )
      })}
    </SessionContainer>
  )
}

const SessionFooter = () => {
  return (
    <SessionContainer
      containerStyle="
        padding: 24px;
        background: #262626;
        align-items: flex-start;
      "
    >
      <SessionRowContainer
        containerStyle="
          width: 100%;
          margin-bottom: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        "
      >
        <Logo />
      </SessionRowContainer>
      <SessionText
        textStyle="
          width: 100%;
          margin-bottom: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
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
          서베이딜은 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
          상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.
          
          Copyright. 2023 서베이딜, Mondi All Rights Reserved.`}
      </SessionText>
      <SessionText
        textStyle="
          font-family: Pretendard;
          font-weight: 400;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.64);
        "
      >Design by Genie, Developed By Oscar, Lucus and Cobb</SessionText>
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
      >투표하고 오픈알림받기</StickyFooterEstimateButton>
    </StickyFooterContainer>
  )
}

export default Main;