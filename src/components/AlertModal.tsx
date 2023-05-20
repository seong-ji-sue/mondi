import useAppStore, { defaultAlert } from "@stores/app";
import { closeAlert } from "@utils/alert";
import Color from "@utils/color";
import React from "react";
import styled from "styled-components";

const OverlayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  max-width: 498px;
  height: 100%;
  background: rgba(80, 78, 78, 0.78);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  min-height: 186px;
  background: #fff;
  box-shadow: 1px 2px 16px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.div`
  color: #2A2A2B;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  white-space: pre-line;
  text-align: center;
`;

const DescText = styled.div`
  color: #9B9B9F;
  font-weight: 500;
  font-size: 13px;
  line-height: 17px;
  white-space: pre-line;
  text-align: center;
  margin-top: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
`;

const Button = styled.div<{ containerStyle?: string; }>`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ containerStyle }) => containerStyle};
`;

const AlertModal = ({ show, title, desc, onNo, onYes}: App.IAlert) => {
  if (!show) {
    return null;
  }

  return (
    <OverlayContainer onClick={closeAlert}>
      <Container>
        <ContentContainer>
          <TitleText>{title}</TitleText>
          <DescText>{desc}</DescText>
        </ContentContainer>
        <ButtonsContainer>
          {onNo && <Button containerStyle="background: #48484D; color: #fff;" onClick={onNo}>아니오</Button>}
          <Button containerStyle={`background: ${Color.APP_THEME}; color: #020202;`} onClick={onYes}>확인</Button>
        </ButtonsContainer>
      </Container>
    </OverlayContainer>
  )
}

export default AlertModal; 