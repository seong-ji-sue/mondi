import React, { ReactElement } from "react";
import styled from "styled-components";

const OverlayContainer = styled.div`
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: flex-end;
  width: 100%;
  max-width: 498px;
  height: 100%;
  background: rgba(77, 77, 77, 0.74);
`;

const Container = styled.div<{ containerStyle?: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  padding: 37px 20px 0 20px;
  background: #fff;
  border-radius: 12px 12px 0px 0px;
  ${({ containerStyle }) => containerStyle};
`;

const BottomModal = ({ containerStyle, content }: { containerStyle?: string; content: ReactElement }) => {
  return (
    <OverlayContainer>
      <Container containerStyle={containerStyle}>
        {content}
      </Container>
    </OverlayContainer>
  )
}

export default BottomModal;