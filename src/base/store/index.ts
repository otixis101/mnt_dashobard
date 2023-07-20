import { create } from "zustand";

interface GlobalStoreInterface {
  suggestions: string[];
}

const initialState: GlobalStoreInterface = {
  suggestions: [],
};

interface AppStore extends GlobalStoreInterface {
  setSuggestions: (suggestions: string[]) => void;
}

const useStore = create<AppStore>()((set) => ({
  ...initialState,
  setSuggestions: (suggestions) => set({ suggestions }),
}));

export default useStore;
