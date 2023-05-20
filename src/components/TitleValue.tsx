import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleText = styled.span`
  margin: 0 0 8px 8px;
  font-weight: 400;
  font-size: 13px;
  color: #9B9B9F;
`;

const ValueText = styled.span`
  font-weight: 400;
  font-size: 16px;
  color: #2A2A2B;
  padding: 0 8px 16px 8px;
  border-bottom: 1px solid #DADADC;
  margin-bottom: 27px;
`;

const TitleValue = ({ title, value }: { title: string, value: string }) => {
  return (
    <Container>
      <TitleText>{title}</TitleText>
      <ValueText>{value}</ValueText>
    </Container>
  )
}

export default TitleValue;