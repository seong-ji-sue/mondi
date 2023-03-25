import create from "zustand";

interface IAppState {
  count: number;
}

const appState: IAppState = {
  count: 0
}

const useAppStore = create(() => appState);

export default useAppStore;
