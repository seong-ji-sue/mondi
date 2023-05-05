import axios, { AxiosInstance } from 'axios';

class Api {
  private static instance: Api;
  private serviceAxios: AxiosInstance;
  private constructor() {
    this.serviceAxios = axios.create();
    this.serviceAxios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    this.serviceAxios.interceptors.response.use(
      response => response,
      async error => {
        if ([401, 403].includes(error.response.status)) {
          try {
            const res = await axios.post("/api/auth/refresh", {}, {
              headers: { Authorization: `Bearer ${localStorage.getItem("refreshToken")}` }
            });
            const { accessToken, refreshToken } = res.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            this.setServiceAuth({ token: accessToken });
            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            return this.serviceAxios(originalRequest);
          } catch (error) {
            window.location.href = "/login";
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
