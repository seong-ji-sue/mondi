import { wonComma } from "@utils/string";
import React from "react";
import styled from "styled-components";
import { LogoIcon, QuestionMark } from "./Svg";
import useAppStore, { defaultAlert } from "@stores/app";
import Color from "@utils/color";

const Container = styled.div`
  overflow: hidden;
  border-radius: 12px;  
  filter: drop-shadow(1px 2px 10px rgba(0, 0, 0, 0.08));
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  ::after {
    display: block;
    content: "";
    padding-bottom: 108.75%
  }
  background: url(/imgs/sample_product.png) no-repeat;
  background-size: contain;
`;

const ContentContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 0 13px 16px;
`;

const BarndText = styled.span<{ textStyle?: string; }>`
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 7px;
  color: #F2F2F2;
`;

const NameText = styled.span<{ textStyle?: string; }>`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 8px;
  color: #F2F2F2;
`;

const DescText = styled.span<{ textStyle?: string; }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  white-space: pre-line;
  color: #F2F2F2;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 19px 0;
  background: #fff;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 16px;
  border-right: 1px solid #DADADC;
`;

const PriceRowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const PriceText = styled.span`
  margin-right: 5px;
  font-weight: 700;
  font-size: 16px;
  color: #48484D;
`;

const OriginPriceText = styled.span`
  font-weight: 400;
  font-size: 13px;
  color: #B5B5B8;
`;

const VoteContainer = styled.div`
  flex: 1;
  align-items: center;
  display: flex;
  padding-left: 28px;
`;

const VoteText = styled.span<{ activate: boolean }>`
  font-weight: 600;
  font-size: 16px;
  color: ${({ activate }) => activate ? "#2A2A2B" : "#C2C2C5"};
`;

const Product = ({ activate }: { activate: boolean; }) => {
  return (
    <Container>
      <ImageContainer>
        <ContentContainer>
          <BarndText>브랜드명</BarndText>
          <NameText>비건 립케어</NameText>
          <DescText>{`동물성 성분은 빼고 만들어\n건강한 립케어`}</DescText>
        </ContentContainer>
      </ImageContainer>
      <BottomContainer>
        <PriceContainer>
          <PriceRowContainer>
            <PriceText>{wonComma(499900)}원</PriceText>
            <QuestionMark 
              onClick={() => {
                useAppStore.setState({
                  alert: {
                    show: true,
                    title: "목표가란?",
                    desc: `‘목표가’는 실제 판매 금액이 아닌\n목표하는 공구 가격이에요.\n실제 판매 금액은 달라 질 수 있어요.`,
                    onYes: () => useAppStore.setState({ alert: defaultAlert })
                  }
                })
              }}
            />
          </PriceRowContainer>
          <OriginPriceText>{`(${wonComma(679000)})`}</OriginPriceText>
        </PriceContainer>
        <VoteContainer>
          <LogoIcon color={activate ? Color.APP_THEME : "#E2E2E2"} style={{ marginRight: 10 }} />
          <VoteText activate={activate}>{activate ? "투표하기" : "투표 완료"}</VoteText>
        </VoteContainer>
      </BottomContainer>
    </Container>
  )
}

export default Product;