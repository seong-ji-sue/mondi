import create from "zustand";

interface IIntroState {
  faqActiveIndex: number;
}

const introState: IIntroState = {
  faqActiveIndex: -1
}

const useIntroStore = create(() => introState);

export default useIntroStore;
