import React, { ReactElement } from "react";
import styled from "styled-components";

const Container = styled.div<{ containerStyle?: string }>`
  cursor: pointer;
  max-width: 640px;
  width: 100%;
  position: fixed;
  bottom: 0;
  ${({ containerStyle }) => containerStyle};
`;

const Button = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #D1D1D1;
  border-radius: 60px;
`;

const FloatingButton = ({
  containerStyle = "",
  onClick,
  element
}: {
  containerStyle?: string;
  onClick: () => void;
  element: ReactElement;
}) => {
  return (
    <Container containerStyle={containerStyle}>
      <Button onClick={onClick}>
        {element}
      </Button>
    </Container>
  )
}

export default FloatingButton;