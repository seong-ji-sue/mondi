import Header from "@components/Header";
import { ArrowLeft } from "@components/Svg";
import Menu from "@components/Menu";
import { useRouter } from "next/router";
import React from "react";

const Info = () => {
  const router = useRouter();

  return (
    <>
      <Header
        left={<ArrowLeft onClick={() => router.back()}/>}
        title="내정보"
        right={<Menu />}
      />
      <h1>Info</h1>
    </>
  )
}

export default Info;