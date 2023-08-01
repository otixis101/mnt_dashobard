import { create } from "zustand";

interface GlobalStoreInterface {
  createPersonData: DbCreatePerson | null;
  user: DbPerson | null;
}

const initialState: GlobalStoreInterface = {
  createPersonData: null,
  user: null,
};

interface AppStore extends GlobalStoreInterface {
  setPersonData: (createPersonData: DbCreatePerson) => void;
  setUser: (user: DbPerson) => void;
}

const useStore = create<AppStore>()((set) => ({
  ...initialState,
  setPersonData: (data) => set({ createPersonData: data }),
  setUser: (user) => set({ user }),
}));

export default useStore;
