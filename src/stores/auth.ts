import create from "zustand";

interface IAuthState {
  state: boolean;
  accessToken: string;
  refreshToken: string;
}

const authState: IAuthState = {
  state: false,
  accessToken: "",
  refreshToken: ""
}

const useAuthStore = create(() => authState);

export default useAuthStore;