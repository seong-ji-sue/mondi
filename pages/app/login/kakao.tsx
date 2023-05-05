import Api from "@modules/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Kakao = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!code) {
      return;
    }
    Api.getInstance()
      .getServiceAxios()
      .post("/api/login/kakao", { code })
      .then(res => {
        const { accessToken, refreshToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        Api.getInstance().setServiceAuth({ token: accessToken });
        router.replace("/app");
      })
  }, [code]);

  return null;
}

export default Kakao;