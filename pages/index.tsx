import Title from "@components/Title";
import useAppStore from "@stores/app";
import React from "react";
import styled from "styled-components";

const TestButton = styled.button``;

const Main = () => {
  const count = useAppStore(store => store.count);

  return (
    <>
      <Title title={`랜딩 페이지 ${count}`} />
      <TestButton
        onClick={() => {
          useAppStore.setState({ count: count + 1 })
        }}
      >더하기</TestButton>
      <TestButton
         onClick={() => {
          useAppStore.setState({ count: count - 1 })
        }}
      >빼기</TestButton>
    </>
  );
};

export default Main;