import create from "zustand";

interface IAppState {
  faqActiveIndex: number;
  alert: App.IAlert;
}

export const defaultAlert = {
  show: false,
  title: "",
  onYes: () => {}
}

const appState: IAppState = {
  faqActiveIndex: -1,
  alert: defaultAlert
}

const useAppStore = create(() => appState);

export default useAppStore;
