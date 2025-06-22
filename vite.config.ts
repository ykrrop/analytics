import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/aggregate": "http://localhost:3000",
      "/report": "http://localhost:3000",
    },
  },
});
