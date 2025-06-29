import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"],
    },
    exclude: ["node_modules", "src/__tests__/e2e/**", "**/*.e2e.*"],
  },
});
