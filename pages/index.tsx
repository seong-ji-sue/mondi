import { useRouter } from "next/router";
import { MainHeader } from "@components/Header";
import React, { useState } from "react";
import styled from "styled-components";
import Color from "@utils/color";
import Swiper from "@components/Swiper";
import FloatingButton from "@components/FloatingButton";
import { ArrowUp, FooterBI } from "@components/Icon";

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
  word-break: keep-all;
  ${({ textStyle }) => textStyle};
`;

const SessionImage = styled.img<{ imageStyle?: string }>`
  max-width: 640px;
  width: calc(100% - 40px);
  object-fit: contain;
  ${({ imageStyle }) => imageStyle};
`;

const SessionSlideContainer = styled.div<{ containerStyle?: string }>`
  display: flex;
  flex-direction: column;
  width: calc(300px - 80px);
  background-color: #fff;
  border-radius: 20px;
  padding: 34px 40px 48px 40px;
  ${({ containerStyle }) => containerStyle};
`;

const FloatingButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const App = () => {
  return (
    <>
      <Container>
        <MainHeader />
        <SessionTitle />
        <SessionGuide />
        <SessionDesc />
        <SessionAdvantage />
        <SessionReview />
        <SessionManual />
        <SessionFaq />
        <Footer />
      </Container>
      <FloatingButtonContainer>
        <FloatingButton
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          element={<ArrowUp />}
        />
      </FloatingButtonContainer>
    </>
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
  cursor: pointer;
  margin-bottom: 62px;
`;

const SessionTitle = () => {
  const router = useRouter();

  return (
    <SessionContainer containerStyle="padding:48px 0 60px 0;">
      <SessionText textStyle="color:#1A5AFF;font-size:16px;margin-bottom:20px;">
        최대 50% 이상 비용을 절약해요!
      </SessionText>
      <SessionRowContainer containerStyle="margin-bottom:8px;">
        <SessionText textStyle={`
          font-family:SCDream;font-size:30px;font-weight:800;
          @media all and (max-width: 400px) { font-size:24px; }
        `}>
          ‘같이 구매’&nbsp;
        </SessionText>
        <SessionText textStyle={`
          font-family:SCDream;font-size:30px;font-weight:300;
          @media all and (max-width: 400px) { font-size:24px; }
        `}>
          할 사람을 찾을 땐
        </SessionText>
      </SessionRowContainer>
      <SessionText textStyle={`
        font-family:SCDream;font-size:30px;font-weight:800;margin-bottom:40px;
        @media all and (max-width: 400px) { font-size:24px; }
      `}>
        공동 구매 매칭 서비스, 먼디
      </SessionText>
      <GoToHomeButtonContainer onClick={() => router.push("/home")}>
        같이 구매할 상품 보기
      </GoToHomeButtonContainer>
      <SessionImage src="/images/main/title/desc.png" />
    </SessionContainer>
  );
}

const GuideContainer = styled.div<{ isLast: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  margin-right: ${({ isLast }) => isLast ? 0 : 24}px;
  cursor: pointer;
`;

const GuideImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 4px;
`;

const GuideImage = styled.img`
  width: 66px;
  height: 66px;
`;

const guides = [{
  title: "이용방법",
  imageSrc: "/images/main/guide/book.png"
}, {
  title: "주의사항",
  imageSrc: "/images/main/guide/check.png"
}, {
  title: "파트너 신청",
  imageSrc: "/images/main/guide/like.png"
}];

const SessionGuide = () => {
  return (
    <SessionContainer containerStyle="padding: 40px 0;background-color:#EBF2F7;">
      <SessionRowContainer>
        {guides.map((guide, index) => {
          return (
            <GuideContainer
              key={`guide_${index}`}
              isLast={index === guides.length - 1}
            >
              <GuideImageContainer>
                <GuideImage src={guide.imageSrc} />
              </GuideImageContainer>
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
    <SessionContainer containerStyle="padding: 80px 0">
      <SessionText textStyle={`
        font-family:SCDream;font-size:30px;font-weight:500;margin-bottom:8px;
        @media all and (max-width: 400px) { font-size:24px; }
      `}>
        공동 구매 하면
      </SessionText>
      <SessionRowContainer containerStyle="margin-bottom:20px;">
        <SessionText textStyle={`
          font-family:SCDream;font-size:30px;font-weight:500;
          @media all and (max-width: 400px) { font-size:24px; }
        `}>
          부담이&nbsp;
        </SessionText>
        <SessionText textStyle={`
          font-family:SCDream;font-size:30px;font-weight:800;
          @media all and (max-width: 400px) { font-size:24px; }
        `}>
          2배 이상&nbsp;
        </SessionText>
        <SessionText textStyle={`
          font-family:SCDream;font-size:30px;font-weight:500;
          @media all and (max-width: 400px) { font-size:20px; }
        `}>
          줄어요
        </SessionText>
      </SessionRowContainer>
      <SessionText textStyle="font-size:16px;color:#666;margin-bottom:40px;">
        이제 합리적인 비용으로 모두 경험하세요.
      </SessionText>
      <SessionRowContainer containerStyle="margin-bottom:10px;">
        <SessionImage src="/images/main/desc/run.png" imageStyle="width:18px;height:18px;margin-right:7px;"/>
        <SessionText textStyle="font-size:20px;font-weight:500;">
          퍼스널 트레이닝 기준
        </SessionText>
      </SessionRowContainer>
      
      <SessionText textStyle="font-size:16px;color:#666;margin-bottom:42px;">
        1회 기준 5만원 이용시 결제 금액 차이
      </SessionText>
      <SessionImage src="/images/main/desc/difference.png" imageStyle="width:320px;" />
    </SessionContainer>
  )
}

const advantages = [{
  title: "간편해요",
  content: "클릭 한 번으로 필요한\n서비스를 이용할 수 있어요.",
  imageSrc: "/images/main/advantage/puzzle.png",
  imageStyle: "width:69px;height:68px;margin-bottom:21px;"
}, {
  title: "부담없어요",
  content: "불필요한 매칭 수수료가 없어\n부담없이 이용할 수 있어요.",
  imageSrc: "/images/main/advantage/wallet.png",
  imageStyle: "width:57px;height:64px;margin-bottom:25px;"
}];

const SessionAdvantage = () => {
  return (
    <SessionContainer containerStyle="padding:80px 0;background-color:#EBF2F7;">
      <SessionText textStyle={`
        font-family:SCDream;font-size:26px;font-weight:500;margin-bottom:8px;
        @media all and (max-width: 400px) { font-size:22px; }
      `}>
        버튼 한번으로 간편하게,
      </SessionText>
      <SessionText textStyle={`
        font-family:SCDream;font-size:26px;font-weight:500;margin-bottom:20px;
        @media all and (max-width: 400px) { font-size:22px; }
      `}>
        같이 구매할 사람을 만나세요.
      </SessionText>
      <SessionText textStyle="font-size:14px;margin-bottom:8px;">
        온라인부터 오프라인까지, 참 좋은 생활속 공동구매!
      </SessionText>
      <SessionText textStyle="font-size:14px;margin-bottom:80px;">
        이제부터 합리적인 비용으로 경험하세요.
      </SessionText>
      <Swiper
        type="advantage"
        sliders={advantages.map((advantage, index) => {
          return (
            <SessionSlideContainer key={`adventage_${index}`}>
              <SessionImage src={advantage.imageSrc} imageStyle={advantage.imageStyle} />
              <SessionText textStyle="text-align:left;font-size:20px;color:#222;font-weight:700;margin-bottom:10px;">
                {advantage.title}
              </SessionText>
              <SessionText textStyle="text-align:left;font-size:14px;color:#666;">
                {advantage.content}
              </SessionText>
            </SessionSlideContainer>
          )
        })}
      />
    </SessionContainer>
  )
}

const reviews = [{
  user: "강남구 지*진",
  title: "에어컨 분해청소",
  content: "공동구매로 5만원 더 할인 받았어요.",
  date: "2023.01.22"
}, {
  user: "강남구 이*선",
  title: "공인중개사 교육",
  content: "간편하게 최저가 대비 10만원 할인 받았어요.",
  date: "2023.01.23"
}, {
  user: "강남구 김*아",
  title: "메가엠디 (공인중개사 온라인 강의)",
  content: "최저가 대비 10만원 이상을 더 저렴하게 이용했어요. 감사합니다.",
  date: "2023.01.24"
}];

const SessionReview = () => {
  return (
    <SessionContainer containerStyle="padding:80px 0 100px 0;">
      <SessionText textStyle="font-family:SCDream;font-size:26px;font-weight:500;margin-bottom:13px;">
        “최대 반값에 구매했어요!”
      </SessionText>
      <SessionText textStyle="font-family:SCDream;font-size:26px;font-weight:500;margin-bottom:60px;">
        공동구매 경험 실제 후기
      </SessionText>
      <Swiper
        type="review"
        sliders={reviews.map((review, index) => {
          return (
            <SessionSlideContainer
              key={`review_${index}`}
              containerStyle="background-color:#EBF2F7;padding: 40px 40px 30px 40px;"
            >
              <SessionText textStyle="text-align:left;font-size:18px;font-weight:700;margin-bottom:8px;">
                {review.user}
              </SessionText>
              <SessionText textStyle="text-align:left;font-size:14px;font-weight:500;color:#666;margin-bottom:20px;">
                {review.title}
              </SessionText>
              <SessionText textStyle="text-align:left;font-size:14px;color:#666;margin-bottom:30px;">
                {review.content}
              </SessionText>
              <SessionText textStyle="text-align:right;font-size:14px;font-weight:500;color:#666;">
                {review.date}
              </SessionText>
            </SessionSlideContainer>
          )
        })}
      />
    </SessionContainer>
  )
}

const ManualStartContainer = styled.div`
  width: calc(100% - 40px);
  max-width: 640px;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  background-color: ${Color.THEME};
  border-radius: 20px;
  margin-bottom: 100px;
`;

const manuals = [{
  title: "검색하기",
  desc: "이용하고자 하는\n상품을 검색하고"
}, {
  title: "자세히보기",
  desc: "가격 정보부터\n업체정보까지 확인 후"
}, {
  title: "참여하기",
  desc: "비밀 공구\n채팅방 참여하기"
}];

const ManualDescContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SessionManual = () => {
  return (
    <SessionContainer containerStyle="padding:0 0 100px 0;">
      <ManualStartContainer>
        <SessionText textStyle="color:#fff;font-size:18px;">
          {`내일이 더 여유로운 생활,\n지금 먼디를 시작하세요.`}
        </SessionText>
      </ManualStartContainer>
      <SessionText textStyle={`
        font-family:SCDream;font-size:30px;font-weight:500;margin-bottom:20px;
        @media all and (max-width: 400px) { font-size:24px; }
      `}>
        이용방법
      </SessionText>
      <SessionText textStyle="font-size:16px;color:#666;margin-bottom:60px;">
        언제 어디서든 간편하게
      </SessionText>
      <SessionImage src="/images/main/manual/manual.png" />
      <SessionRowContainer containerStyle="margin-top:30px;max-width:640px;width:calc(100% - 40px);">
        {manuals.map((manual, index) => {
          return (
            <ManualDescContainer key={`manual_${index}`}>
              <SessionText textStyle={`
                margin-bottom:10px;font-size:20px;font-weight:700;color:${Color.THEME};
                @media all and (max-width: 500px) { font-size:16px; }
                @media all and (max-width: 400px) { font-size:14px; }
              `}>
                {manual.title}
              </SessionText>
              <SessionText textStyle={`
                font-size:16px;font-weight:500;color:#666;
                @media all and (max-width: 500px) { font-size:12px; }
                @media all and (max-width: 400px) { font-size:10px; }
              `}>
                {manual.desc}
              </SessionText>
            </ManualDescContainer>
          )
        })}
      </SessionRowContainer>
    </SessionContainer>
  )
};

const faqs = [{
  question: "별도의 수수료가 발생하나요?",
  answer: "먼디의 매칭 서비스는 무료입니다. 별도의 수수료는 발생하지 않으니 부담 없이 이용하세요!"
}, {
  question: "매칭 후 이용하지 않아도 되나요?",
  answer: "매칭 후 기간 내 취소는 언제든지 가능해요. 하지만 잦은 취소로 다른 고객들이 불편할 수 있으니 가급적 구매 의사가 명확한 경우에만 신청해주세요."
}, {
  question: "결제는 누구에게 어떻게 하나요?",
  answer: "안전한 공동 구매를 위해 모든 결제는 먼디의 계좌로 이체 받고 있어요. 현재는 카톡 채널을 통해 상품 정보를 안내 후 결제 계좌와 금액을 안내 드리고 있으며 결제 해준 금액은 안전하게 보관 후 서비스를 이용하면 파트너(판매자)에게 전달합니다."
}, {
  question: "결제 후 취소 및 환불은 어떻게 해야 하나요?",
  answer: "결제 후 이용 약관에 의해 취소 및 환불을 받을 수 있으나 별도의 수수료가 발생할 수 있어요. 서비스 이용 또는 상품 수령 시 취소 및 환불이 불가 할 수 있으며 파트너(판매자)에게 문의해서 요청해야 합니다."
}, {
  question: "공동 구매를 직접 개설할 수 있나요?",
  answer: `같이 구매 할 상품 정보를 등록하면 담당자 승인을 거쳐서 사이트에 개설됩니다.
            최대 24시간 이내에 처리되며 판매자 정보 및 상품 정보를 확인할 수 없거나, 안전한 상품이 아니라고 판단 될 경우 거절될 수 있습니다.`
}];

const FaqContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  width: calc(100% - 80px - 40px);
  max-width: calc(640px - 80px);
  background-color: #fff;
  padding: 40px;
  border-radius: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const FaqLineContainer = styled.div`
  margin: 20px 0;
  height: 1px;
  background-color: #cecece;
`;

const SessionFaq = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <SessionContainer containerStyle="padding:80px 0 90px 0;background-color:#EBF2F7;">
      <SessionText textStyle={`
        font-family:SCDream;font-size:30px;font-weight:500;margin-bottom:60px;
        @media all and (max-width: 400px) { font-size:24px; }
      `}>
        자주 묻는 질문
      </SessionText>
      {faqs.map((faq, index) => {
        const isActive = index === activeIndex;
        return (
          <FaqContainer
            key={`faq_${index}`}
            isActive={isActive}
            onClick={() => setActiveIndex(index)}
          >
            <SessionRowContainer containerStyle="align-items:flex-start">
              <SessionText textStyle="text-align:left;font-family:Pretendard;color:#2C5CC0;font-size:22px;font-weight:800;margin-right:6px;">
                Q.
              </SessionText>
              <SessionText textStyle="text-align:left;font-size:18px;font-weight:500;color:#222;margin-top:1px;">
                {faq.question}
              </SessionText>
            </SessionRowContainer>
            {isActive &&
              <>
                <FaqLineContainer />
                <SessionRowContainer containerStyle="align-items:flex-start">
                  <SessionText textStyle="text-align:left;font-family:Pretendard;color:#666;font-size:22px;font-weight:800;margin-right:6px;">
                    A.
                  </SessionText>
                  <SessionText textStyle="text-align:left;font-size:16px;font-weight:500;color:#666;margin-top:3px;">
                    {faq.answer}
                  </SessionText>
                </SessionRowContainer>
              </>
            }
          </FaqContainer>
        )
      })}
    </SessionContainer>
  )
};

const FooterContainer = styled.div`
  max-width: calc(640px - 40px);
  width: calc(100% - 40px);
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CoalitionContainer = styled.a`
  background: #353535;
  padding: 8px 12px;
  border-radius: 50px;
  color: #fff;
  font-size: 10px;
  margin-bottom: 16px;
  cursor: pointer;
  text-decoration: none;
`;

const Footer = () => {
  return (
    <SessionContainer containerStyle="padding: 60px 0;background-color:#2E2E2E;">
      <FooterContainer>
        <SessionRowContainer containerStyle="margin-bottom:20px;">
          <FooterBI />
          <SessionText textStyle="font-size:18px;font-weight:500;color:#fff;margin-left:12px;">
            먼디
          </SessionText>
        </SessionRowContainer>
        <SessionText textStyle={`
          color:rgba(255,255,255,0.8);font-size:10px;margin-bottom:2px;
          @media all and (max-width: 400px) { zoom:0.8; }
        `}>
          서울시 영등포구 당산로41길 11 당산 SK V1, 14층 / 1588-1588 / 대표 : 김호철
        </SessionText>
        <SessionText textStyle={`
          color:rgba(255,255,255,0.8);font-size:10px;margin-bottom:14px;
          @media all and (max-width: 400px) { zoom:0.8; }
        `}>
          통신 판매번호 : 2022-서울영등포-2320호 / 사업자 등록번호 : 322-81-01873
        </SessionText>
        <CoalitionContainer href="mailto:growth@mondi.kr">
          제휴문의 growth@mondi.kr
        </CoalitionContainer>
        <SessionText textStyle="color:rgba(255,255,255,0.8);font-size:10px;zoom:0.8;margin-bottom:2px;">
          먼디는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
        </SessionText>
        <SessionText textStyle="color:rgba(255,255,255,0.8);font-size:10px;zoom:0.8;margin-bottom:10px;">
          상품, 상품정보, 거래에 관한 의무와 책임은 판매자에게 있습니다.
        </SessionText>
        <SessionText textStyle="color:#717171;font-size:10px;zoom:0.8;font-weight:300;">
          Copyright. 2023 Mondi All Rights Reserved.
        </SessionText>
      </FooterContainer>
    </SessionContainer>
  )
}

export default App;