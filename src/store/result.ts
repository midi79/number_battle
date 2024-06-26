import { create } from "zustand";

const useResultStore = create((set: any, get: any) => ({
    firstPlayerResult: [],
    secondPlayerResult: [],

    setFirstPlayerResult: (newResult: string) =>
        set((state: any) => ({ firstPlayerResult: [...state.firstPlayerResult, newResult] })),
    setSecondPlayerResult: (newResult: string) =>
        set((state: any) => ({ secondPlayerResult: [...state.secondPlayerResult, newResult] })),

    getFirstPlayerWinTotal: () => get().firstPlayerResult.filter((item: string) => item === "WIN").length,

    getSecondPlayerWinTotal: () => get().secondPlayerResult.filter((item: string) => item === "WIN").length,
}));

export default useResultStore;
