import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AggregationResult } from "../types";

interface AggregatorState {
  fileName: string | null;
  isDragging: boolean;
  isLoading: boolean;
  showBlocks: boolean;
  result: AggregationResult | null;
  error: string | null;
  isProcessed: boolean;
  setState: (state: Partial<AggregatorState>) => void;
  resetState: () => void;
}

export const useAggregatorStore = create<AggregatorState>()(
  persist(
    (set) => ({
      fileName: null,
      isDragging: false,
      isLoading: false,
      showBlocks: false,
      result: null,
      error: null,
      isProcessed: false,
      setState: (newState) => set((state) => ({ ...state, ...newState })),
      resetState: () =>
        set({
          fileName: null,
          isDragging: false,
          isLoading: false,
          showBlocks: false,
          result: null,
          error: null,
          isProcessed: false,
        }),
    }),
    {
      name: "aggregator-storage",
    }
  )
);
