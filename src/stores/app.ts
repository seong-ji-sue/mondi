import create from "zustand";

interface IAppState {
  faqActiveIndex: number;
}

const appState: IAppState = {
  faqActiveIndex: -1
}

const useAppStore = create(() => appState);

export default useAppStore;
