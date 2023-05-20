import Header from "@components/Header";
import { ArrowLeft } from "@components/Svg";
import Menu from "@components/Menu";
import { useRouter } from "next/router";
import React from "react";
import SurveyCard from "@components/Survey";
import styled from "styled-components";

const Conatiner = styled.div`
  padding: 15px 20px 0 20px;
`;

const Survey = () => {
  const router = useRouter();

  return (
    <>
      <Header
        left={<ArrowLeft onClick={() => router.back()}/>}
        title="투표함"
        right={<Menu />}
      />
      <Conatiner>
        <SurveyCard />
        <SurveyCard />
      </Conatiner>
    </>
  )
}

export default Survey;