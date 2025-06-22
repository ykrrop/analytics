import { create } from "zustand";

interface GeneratorState {
  isLoading: boolean;
  isDone: boolean;
  error: string | null;
  handleGenerate: () => Promise<void>;
  reset: () => void;
}

export const useGeneratorStore = create<GeneratorState>((set) => ({
  isLoading: false,
  isDone: false,
  error: null,
  handleGenerate: async () => {
    set({ error: null, isLoading: true, isDone: false });
    try {
      const sizeGb = 0.01;
      const resp = await fetch(
        `/report?size=${sizeGb}&withErrors=off&maxSpend=1000`
      );
      if (!resp.ok) {
        const ct = resp.headers.get("Content-Type") || "";
        if (ct.includes("application/json")) {
          const errData = await resp.json();
          throw new Error(errData.error || "Ошибка генерации отчета");
        }
        throw new Error("Ошибка генерации отчета");
      }
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      set({ isDone: true });
    } catch (e) {
      set({ error: (e as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => set({ isDone: false, error: null }),
}));
