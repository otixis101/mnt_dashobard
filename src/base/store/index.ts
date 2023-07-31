import { create } from "zustand";

interface GlobalStoreInterface {
  createPersonData: DbCreatePerson | null;
}

const initialState: GlobalStoreInterface = {
  createPersonData: null,
};

interface AppStore extends GlobalStoreInterface {
  setPersonData: (createPersonData: DbCreatePerson) => void;
}

const useStore = create<AppStore>()((set) => ({
  ...initialState,
  setPersonData: (data) => set({ createPersonData: data }),
}));

export default useStore;
