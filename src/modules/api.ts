import axios, { AxiosInstance } from 'axios';
import { NOT_AUTH_PATH } from 'src/values/paths';

class Api {
  private static instance: Api;
  private serviceAxios: AxiosInstance;
  private constructor() {
    this.serviceAxios = axios.create();
    const lastAccessToken = localStorage.getItem("accessToken");
    if (lastAccessToken) {
      this.serviceAxios.defaults.headers.common.Authorization = `Bearer ${lastAccessToken}`;
    }
    this.serviceAxios.interceptors.response.use(
      response => response,
      async error => {
        if ([401, 403].includes(error.response.status)) {
          try {
            const lastRefreshToken = localStorage.getItem("refreshToken");
            const res = await axios.post("/api/auth/refresh", {}, {
              headers: lastRefreshToken ? { Authorization: `Bearer ${lastRefreshToken}` } : {}
            });
            const { accessToken, refreshToken } = res.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            this.setServiceAuth({ token: accessToken });
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.serviceAxios(originalRequest);
          } catch (error) {
            if (NOT_AUTH_PATH.includes(window.location.pathname)) {
              return;
            }
            window.location.href = "/app";
          }
        }
        return Promise.reject(error);
      },
    );
  }
  public static getInstance(): Api {
    if (!this.instance) {
      this.instance = new Api();
    }
    return this.instance;
  }
  setServiceAuth({ token }: { token: string; }) {
    this.serviceAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  getServiceAxios() {
    return this.serviceAxios;
  }
}

export default Api;
