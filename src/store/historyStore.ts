import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HistoryEntry } from "../types"; // Добавляем импорт AggregationResult

interface HistoryState {
  history: HistoryEntry[];
  addToHistory: (entry: HistoryEntry) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addToHistory: (entry) =>
        set((state) => ({ history: [...state.history, entry] })),
      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((entry) => entry.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "history-storage",
    }
  )
);
