import create from "zustand";

interface IAppState {

}

const appState: IAppState = {

}

const useAppStore = create(() => appState);

export default useAppStore;
