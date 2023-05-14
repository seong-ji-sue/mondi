import React, { useRef } from "react";
import styled from "styled-components";
import { Logo,QuestionMark, Contour } from "./Svg";


const CardContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  height: 378px;
`

const CardWrapper = styled.div`
  margin: 0 20px;
`

const CardImage = styled.div`
  width: 320px;
  height:303px;
  background: url(imgs/card-image.png), #F2F2F7 ;
  border-radius: 12px 12px 0px 0px;
`

const ColorDim = styled.div`
  position: absolute;
  width: 320px;
  height: 186px;
  top:268px;
  /* top 부분 수정해야함 위치값 */
  background: linear-gradient(360deg, #A34E4E 6.37%,
     rgba(170, 81, 81, 0.91) 40.36%, 
      rgba(182, 87, 87, 0) 97.01%);
  border-radius: 0px;
`

const BrandTitle = styled.p`
  margin: 90px 0 0 16px;
  color:#F2F2F2;
  font-size:12px;
  line-height:12px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.06px;
`

const BrandName = styled.p`
  margin: 7px 0 0 16px;
  color:#F2F2F2;
  font-size:18px;
  line-height:100%;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -0.408px;
`

const BrandDescription = styled.p`
  margin: 8px 0 0 16px;
  color:#F2F2F2;
  font-size:14px;
  line-height:135%;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.32px;
  width: 140px;
  height: 38px;
`

const CardDescription = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
  height: 75px;
  background: #FFFFFF;
  border-radius: 0px 0px 12px 12px;
  border: 1px solid #e7e7e7; 
`
const Price = styled.div`
  margin: 19px 0 19px 16px;
`

const TargetPrice = styled.div`
  display:flex;
  align-items:center;
  margin: 0 0 8px 0;
`
const TargetNumber = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.408px;
  color: #48484D;
  margin: 0 5px 0 0;
`

const RegularPrice = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 100%;
  letter-spacing: -0.408px;
  color: #B5B5B8;
`


const Vote = styled.div`
  display:flex;
  align-items:center;
  margin: 26px 42px 26px 0;
`
const TitleImage = styled.img`
  width: 24;
  margin: 24;
`;

const ContourWrapper = styled.div`
  margin:20px 0;
`
const Hover = styled.div`
  cursor: pointer;
`

const VoteText = styled.span`
  margin: 0 0 0 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  color: #2A2A2B;
  letter-spacing: 0.066px;
`

const Card = () => {

  return (
    <CardContainer>
      <CardWrapper>
        <CardImage />
        <ColorDim>
          <BrandTitle>브랜드 명</BrandTitle>
          <BrandName>비건 립케어</BrandName>
          <BrandDescription>동물성 성분은 빼고 만들어건강한 립케어</BrandDescription>
        </ColorDim>
        <CardDescription>
          <Price>
            <TargetPrice>
              <TargetNumber>499,900원</TargetNumber>
              <Hover>
                <QuestionMark/>
              </Hover>
            </TargetPrice>
            <RegularPrice>(679,000원)</RegularPrice>
          </Price>
          <ContourWrapper>
            <Contour width='1' height="35" />
          </ContourWrapper>
          <Vote>
            <TitleImage src="/imgs/favicon.png" />
            <VoteText>투표하기</VoteText>
          </Vote>
        </CardDescription>
      </CardWrapper>
    </CardContainer>
  )
}

export default Card;