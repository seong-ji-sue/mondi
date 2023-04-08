import create from "zustand";

interface IAppState {
  isMainStickyFooterShow: boolean;
}

const appState: IAppState = {
  isMainStickyFooterShow: false
}

const useAppStore = create(() => appState);

export default useAppStore;
