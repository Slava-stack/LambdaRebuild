import { create } from "zustand";
import { QueriesInterface } from "../types/types";

const useQueriesStore = create<QueriesInterface>((set) => ({
  queries: [],
  queryResult: 0,

  addQuery: (arg) => {
    set((state) => {
      const newArr = [arg, ...state.queries].slice(0, 5);
      return { queries: newArr };
    });
  },
  addQueryResult: (queryResult) => {
    set((state) => ({
      queryResult: queryResult + state.queryResult,
    }));
  },
}));

export default useQueriesStore;
