import { CheckCircle } from "@components/Svg";
import React, { useState } from "react";
import styled from "styled-components";
import Color from "@utils/color";
import { useRouter } from "next/router";

const OverlayContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  background: rgba(77, 77, 77, 0.74);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 82%;
  padding: 37px 20px 30px 20px;
  background: #fff;
  border-radius: 12px 12px 0px 0px;
`;

const TitleText = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #2A2A2B;
  margin-bottom: 8px;
`;

const DescText = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #9B9B9F;
  margin-bottom: 32px;
  white-space: pre-line;
`;

const TermContainer = styled.div<{ containerStyle?: string; }>`
  display: flex;
  align-items: center;
  margin-left: 10px;
  ${({ containerStyle }) => containerStyle};
`;

const TermTitle = styled.span<{ textStyle?: string; }>`
  font-weight: 500;
  font-size: 14px;
  color: #2A2A2B;
  margin-left: 10px;
  flex: 1;
  ${({ textStyle }) => textStyle};
`;

const TermLookText = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #C2C2C5;
  margin-right: 8px;
`;

const AllAgreeDescText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #9B9B9F;
  margin: 8px 0 28px 0;
  padding: 0 0 18px 40px;
  border-bottom: 0.5px solid #D7D8E0;
`;

const TermsContainer = styled.div`
  flex: 1;
`;

const ConfirmButton = styled.div<{ activate: boolean; }>`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border-radius: 8px;
  ${({ activate }) => activate ? `
    background: ${Color.APP_THEME};
    color: #020202;
    cursor: pointer;
  ` : `
    background: #F2F2F2;
    color: #B5B5B8;
  `}
`;

const terms = [{
  title: "(필수) 만 14세 이상입니다.",
  required: true
}, {
  title: "(필수) 서비스 이용약관 동의",
  required: true,
  look: true
}, {
  title: "(필수) 개인정보 처리방침 동의",
  required: true,
  look: true
}, {
  title: "(선택) 마케팅 수신 동의",
  look: true
}];

const Terms = () => {
  const router = useRouter();
  const [agrees, setAgrees] = useState(terms.map(term => ({ checked: false, required: term.required })));
  const allchecked = agrees.filter(agree => !agree.checked).length === 0;
  const buttonAcivate = agrees.filter(agree =>  !agree.checked && agree.required).length === 0;

  return (
    <OverlayContainer>
      <Container>
        <TitleText>약관에 동의해주세요</TitleText>
        <DescText>{`여러분의 개인정보와 서비스 이용 권리\n잘 지켜드릴게요`}</DescText>
        <TermContainer>
          <CheckCircle
            size={22}
            color={allchecked ? Color.APP_THEME : "#DADADC"}
            onClick={() => {
              setAgrees(terms.map(term => ({ checked: !allchecked, required: term.required })))
            }}
          />
          <TermTitle textStyle="font-weight: 700; font-size: 16px;">모두 동의</TermTitle>
        </TermContainer>
        <AllAgreeDescText>서비스 이용을 위해 아래 약관에 모두 동의합니다.</AllAgreeDescText>
        <TermsContainer>
          {terms.map((term, index) => {
            return (
              <TermContainer key={`term_${index}`} containerStyle="margin-bottom: 20px;">
                <CheckCircle
                  size={20}
                  color={agrees[index].checked ? Color.APP_THEME : "#DADADC"}
                  onClick={() => {
                    const cloneAgrees = [...agrees]
                    cloneAgrees[index].checked = !cloneAgrees[index].checked;
                    setAgrees(cloneAgrees);
                  }}
                />
                <TermTitle>{term.title}</TermTitle>
                {term.look && <TermLookText>보기</TermLookText>}
              </TermContainer>
            )
          })}
        </TermsContainer>
        <ConfirmButton
          activate={buttonAcivate}
          onClick={() => {
            if (!buttonAcivate) {
              return;
            }
            router.replace("/app");
          }}
        >확인</ConfirmButton>
      </Container>
    </OverlayContainer>
  )
}

export default Terms;