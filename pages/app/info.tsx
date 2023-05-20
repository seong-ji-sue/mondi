import Header from "@components/Header";
import { ArrowLeft } from "@components/Svg";
import Menu from "@components/Menu";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import TitleValue from "@components/TitleValue";
import { closeAlert, openAlert } from "@utils/alert";
import useAuthStore from "@stores/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px 20px 0px 20px;
`;

const WithdrawalButton = styled.div`
  width: fit-content;
  align-self: flex-end;
  margin-top: 32px;
  padding: 10px 20px;
  background: #F2F2F2;
  border-radius: 4px;
  font-weight: 500;
  font-size: 13px;
  color: #8E8E93;
  cursor: pointer;
`;

const Info = () => {
  const router = useRouter();

  const onWithdrawal = () => {
    openAlert({
      title: "서베이딜 탈퇴하시겠습니까?",
      onNo: closeAlert,
      onYes: () => {
        localStorage.clear();
        useAuthStore.setState({ state: false });
        router.replace("/app");
      }
    })
  }

  return (
    <>
      <Header
        left={<ArrowLeft onClick={() => router.back()}/>}
        title="내정보"
        right={<Menu />}
      />
      <Container>
        <TitleValue title="이름" value="서베이딜" />
        <TitleValue title="이메일" value="ask@surveydeal.co.kr" />
        <TitleValue title="휴대폰 번호" value="010-1234-5678" />
        <WithdrawalButton onClick={onWithdrawal}>회원 탈퇴하기</WithdrawalButton>
      </Container>
    </>
  )
}

export default Info;