import Api from "@modules/api";
import useAuthStore from "@stores/auth";
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
        useAuthStore.setState({ state: true });
        router.replace("/app/terms");
      });
  }, [code]);

  return null;
}

export default Kakao;