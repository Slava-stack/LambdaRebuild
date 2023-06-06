import { create } from "zustand";
import { HeaderHamInterface } from "../types/types";

const headerHamStore = create<HeaderHamInterface>((set) => ({
  showHam: false,

  setShowHam: (arg) => {
    set(() => ({
      showHam: arg,
    }));
  },
}));

export default headerHamStore;
