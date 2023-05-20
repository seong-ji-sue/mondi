import { Close, Logout, MenuIcon } from "@components/Svg";
import useAuthStore from "@stores/auth";
import { closeAlert, openAlert } from "@utils/alert";
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

const AuthButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  background: #FAFAFA;
  cursor: pointer;
`;

const AuthButtonText = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #48484D;
  margin-right: 8px;
`;

const menus: App.IMenu[] = [{
  name: "홈",
  path: "/app"
}, {
  name: "투표함",
  path: "/app/survey",
  auth: true
}, {
  name: "내정보",
  path: "/app/info",
  auth: true
}, {
  name: "문의하기"
}];

const Menu = () => {
  const router = useRouter();
  const authState = useAuthStore(state => state.state);
  const [visible, setVisible] = useState<boolean>(false);

  const onMenuClick = (menu: App.IMenu) => {
    if (menu.auth && !authState) {
      openAlert({
        title: "로그인이 필요한 서비스 입니다.\n로그인 하시겠습니까?",
        onNo: closeAlert,
        onYes: () => router.push("/app/login")
      })
      return;
    }
    if (menu.path) {
      router.push(menu.path)
    }
  }

  const onAuth = () => {
    if (!authState) {
      router.push("/app/login");
      return;
    }
    openAlert({
      title: "로그아웃 하시겠습니까?",
      onNo: closeAlert,
      onYes: () => {
        localStorage.clear();
        useAuthStore.setState({ state: false });
        if (router.pathname === "/app") {
          setVisible(false);
          return;
        }
        router.replace("/app");
      }
    });
  }

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
                  onClick={() => onMenuClick(menu)}
                >{menu.name}</MenuText>
              )
            })}
          </MenusContainer>
          <AuthButton onClick={onAuth}>
            <AuthButtonText>{authState ? "로그아웃" : "로그인"}</AuthButtonText>
            {authState && <Logout />}
          </AuthButton>
        </Container>
      }
    </>
  )
}

export default Menu;