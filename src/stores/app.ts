import create from "zustand";

interface IAppState {
  alertMessage: string;
}

const appState: IAppState = {
  alertMessage: ""
}

const useAppStore = create(() => appState);

export default useAppStore;