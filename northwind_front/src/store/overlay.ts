import { create } from "zustand";
import { LayoutInterface } from "../types/types";

const useLayoutStore = create<LayoutInterface>((set) => ({
  showLayout: false,
  showAside: false,

  setShowLayout: (arg: boolean) => {
    set(() => ({
      showLayout: arg,
    }));
  },

  setShowAside: (arg: boolean) => {
    set(() => ({
      showAside: arg,
    }));
  },
}));

export default useLayoutStore;
