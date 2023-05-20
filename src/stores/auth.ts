import create from "zustand";

interface IAuthState {
  state: boolean;
}

const authState: IAuthState = {
  state: false
}

const useAuthStore = create(() => authState);

export default useAuthStore;