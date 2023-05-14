import Header from "@components/Header";
import { ArrowLeft } from "@components/Svg";
import Menu from "@components/menu";
import { useRouter } from "next/router";
import React from "react";

const Vote = () => {
  const router = useRouter();

  return (
    <>
      <Header
        left={<ArrowLeft onClick={() => router.back()}/>}
        title="투표함"
        right={<Menu />}
      />
      <h1>Vote</h1>
    </>
  )
}

export default Vote;