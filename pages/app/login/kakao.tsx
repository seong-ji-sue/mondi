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
        useAuthStore.setState({ accessToken, refreshToken });
        router.replace("/app/terms");
      })
      .catch(() => {
        router.replace("/app/login");
      });
  }, [code]);

  return null;
}

export default Kakao;