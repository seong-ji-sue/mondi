import create from "zustand";

interface IAppState {
  alert: App.IAlert;
}

export const defaultAlert = {
  show: false,
  title: "",
  onYes: () => {}
}

const appState: IAppState = {
  alert: defaultAlert
}

const useAppStore = create(() => appState);

export default useAppStore;
