import { Close, Logout, MenuIcon } from "@components/Svg";
import useAppStore, { defaultAlert } from "@stores/app";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 498px;
  height: 100%;
  padding-bottom: 30px;
  background: #fff;
  transform: translate(-20px);
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 50px;
  padding: 0 20px;
  align-items: center;
  justify-content: flex-end;
`;

const MenusContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  flex: 1;
`;

const MenuText = styled.span<{ selected?: boolean }>`
  font-size: 24px;
  font-weight: 700;
  color: ${({ selected }) => selected ? "#2A2A2B" : "#C2C2C5"};
  margin-bottom: 40px;
  cursor: pointer;
`;

const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: #FAFAFA;
  cursor: pointer;
`;

const LogoutButtonText = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #48484D;
  margin-right: 8px;
`;

const menus = [{
  path: "/app",
  name: "홈"
}, {
  path: "/app/vote",
  name: "투표함"
}, {
  path: "/app/info",
  name: "내정보"
}, {
  name: "문의하기"
}];

const Menu = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <MenuIcon onClick={() => setVisible(true)} />
      {visible &&
        <Container>
          <HeaderContainer>
            <Close onClick={() => setVisible(false)} />
          </HeaderContainer>
          <MenusContainer>
            {menus.map((menu, index) => {
              return (
                <MenuText
                  key={`menu_${index}`}
                  selected={menu.path === router.pathname}
                  onClick={() => {
                    if (menu.path) {
                      router.replace(menu.path)
                    }
                  }}
                >{menu.name}</MenuText>
              )
            })}
          </MenusContainer>
          <LogoutButton
            onClick={() => {
              useAppStore.setState({
                alert: {
                  show: true,
                  title: "로그아웃 하시겠습니까?",
                  onNo: () => useAppStore.setState({ alert: defaultAlert }),
                  onYes: () => {
                    localStorage.clear();
                    if (router.pathname === "/app") {
                      setVisible(false);
                      return;
                    }
                    router.replace("/app");
                  }
                }
              })
            }}
          >
            <LogoutButtonText>로그아웃</LogoutButtonText>
            <Logout />
          </LogoutButton>
        </Container>
      }
    </>
  )
}

export default Menu;