import { create } from "zustand";

interface GlobalStoreInterface {
  signUpData: DbCreatePerson | null;
}

const initialState: GlobalStoreInterface = {
  signUpData: null,
};

interface AppStore extends GlobalStoreInterface {
  setSignUpData: (signUpData: DbCreatePerson) => void;
}

const useStore = create<AppStore>()((set) => ({
  ...initialState,
  setSignUpData: (signUpData) => set({ signUpData }),
}));

export default useStore;
