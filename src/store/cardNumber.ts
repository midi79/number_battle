import { create } from "zustand";

const useCardNumberStore = create((set: any, get: any) => ({
    firstPlayerNumbers: [],
    secondPlayerNumbers: [],

    setFirstPlayerNumber: (newNumber: number) =>
        set((state: any) => ({ firstPlayerNumbers: [...state.firstPlayerNumbers, newNumber] })),
    setSecondPlayerNumber: (newNumber: number) =>
        set((state: any) => ({ secondPlayerNumbers: [...state.secondPlayerNumbers, newNumber] })),

    getFirstPlayerNumberTotal: () =>
        get().firstPlayerNumbers.reduce((total: number, numberVal: number) => total + numberVal, 0),
    getSecondPlayerNumberTotal: () =>
        get().secondPlayerNumbers.reduce((total: number, numberVal: number) => total + numberVal, 0),

    resetNumbers: () => set(() => ({ firstPlayerNumbers: [], secondPlayerNumbers: [] })),
}));

export default useCardNumberStore;
