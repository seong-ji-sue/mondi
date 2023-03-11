import React, { ReactElement } from "react";
import styled from "styled-components";

const OverlayContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 200;
  display: flex;
  max-width: 640px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Container = styled.div`
  max-width: 80%;
  max-height: 80%;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ContentContainer = styled.div<{ containerStyle: string }>`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: calc(100% - 50px);
  overflow: scroll;
  ${({ containerStyle }) => containerStyle};
`;

const CloseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #D1D1D1;
  height: 50px;
  font-weight: 500;
  font-size: 14px;
  color: #999;
`;

const Modal = ({
  containerStyle = "",
  element,
  onClose
}: {
  containerStyle?: string;
  element: ReactElement;
  onClose: () => void;
}) => {
  return (
    <OverlayContainer>
      <Container>
        <ContentContainer containerStyle={containerStyle}>
          {element}
        </ContentContainer>
        <CloseContainer onClick={onClose}>닫기</CloseContainer>
      </Container>
    </OverlayContainer>
  );
}

const AlertMessage = styled.span`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-align: center;
  color: #222;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const AlertModal = ({
  onClose,
  message
}: {
  onClose: () => void;
  message: string;
}) => {
  return (
    <Modal
      containerStyle="width:300px;height:200px;"
      onClose={onClose}
      element={
        <AlertMessage>{message}</AlertMessage>
      }
    />
  )
}

export default Modal;