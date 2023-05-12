import React from "react";
import styled from "styled-components";


const CardContainer = styled.div`
  margin-top: 18px;
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
  border-radius: 12px;
`

const CardContent = styled.div`
  position: absolute;
  width: 320px;
  height: 186px;
  top:262px; 
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
  width: 320px;
  height: 75px;
  background: #FFFFFF;
  border-radius: 0px 0px 12px 12px;
  border: 1px solid #e7e7e7; 
`

const Card = () => {
  return (
    <CardContainer>
      <CardWrapper>
        <CardImage />
        <CardContent>
          <BrandTitle>브랜드 명</BrandTitle>
          <BrandName>비건 립케어</BrandName>
          <BrandDescription>동물성 성분은 빼고 만들어건강한 립케어</BrandDescription>
        </CardContent>
        <CardDescription>sad</CardDescription>
      </CardWrapper>
    </CardContainer>
  )
}

export default Card;