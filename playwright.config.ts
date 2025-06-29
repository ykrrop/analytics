import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/__tests__/e2e",
  timeout: 30 * 1000,
  retries: 0,
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        headless: true,
        ignoreHTTPSErrors: true,
        video: "off",
        screenshot: "only-on-failure",
      },
    },
  ],
  use: {
    baseURL: "http://localhost:5173",
    viewport: { width: 1280, height: 720 },
  },
});
