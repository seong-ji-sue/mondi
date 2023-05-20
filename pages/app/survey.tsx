import Header from "@components/Header";
import { ArrowLeft } from "@components/Svg";
import Menu from "@components/Menu";
import { useRouter } from "next/router";
import React from "react";

const Survey = () => {
  const router = useRouter();

  return (
    <>
      <Header
        left={<ArrowLeft onClick={() => router.back()}/>}
        title="투표함"
        right={<Menu />}
      />
      <h1>Survey</h1>
    </>
  )
}

export default Survey;