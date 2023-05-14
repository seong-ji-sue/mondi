import React, { ReactElement } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 50px;
  padding: 0 20px;
  align-items: center;
`;

const TitleText = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  color: #2A2A2B;
  margin: 0 10px;
`;

const Header = ({ left, title, right }: { left?: ReactElement; title?: string; right?: ReactElement; }) => {
  return (
    <Container>
      {left}
      <TitleText>{title}</TitleText>
      {right}
    </Container>
  )
}

export default Header;