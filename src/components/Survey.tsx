import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 12px;  
  filter: drop-shadow(1px 2px 10px rgba(0, 0, 0, 0.08));
  background: #fff;
  margin-bottom: 16px;
  cursor: pointer;
`;

const ProductContainer = styled.div`
  display: flex;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #DADADC;
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 70px;
  margin-right: 14px;
  border-radius: 4px;
  ::after {
    display: block;
    content: "";
    padding-bottom: 108.75%
  }
  background: url(/imgs/sample_product.png) no-repeat;
  background-size: contain;
`;

const ProductDescContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BarndText = styled.span<{ textStyle?: string; }>`
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 8px;
  color: #B5B5B8;
`;

const NameText = styled.span<{ textStyle?: string; }>`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 12px;
  color: #48484D;
`;

const DescText = styled.span<{ textStyle?: string; }>`
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  white-space: pre-line;
  color: #B5B5B8;
`;

const CancelButton = styled.div`
  width: fit-content;
  align-self: flex-end;
  padding: 8px 15px;
  font-weight: 500;
  font-size: 13px;
  color: #11C564;
  background: #F2F2F2;
  border-radius: 4px;
  margin-right: 3px;
`;

const Survey = () => {
  return (
    <Container>
      <ProductContainer>
        <ProductImageContainer />
        <ProductDescContainer>
          <BarndText>브랜드명</BarndText>
          <NameText>비건 립케어</NameText>
          <DescText>동물성 성분은 빼고 만든 건강한 립케어</DescText>
        </ProductDescContainer>
      </ProductContainer>
      <CancelButton>투표 취소</CancelButton>
    </Container>
  );
}

export default Survey;