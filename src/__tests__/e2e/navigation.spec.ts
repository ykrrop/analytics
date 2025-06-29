import { test, expect } from "@playwright/test";

test.describe("Header Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("переход по ссылке CSV Генератор", async ({ page }) => {
    await page.getByRole("link", { name: /csv генератор/i }).click();
    await expect(page).toHaveURL(/\/generator/);
  });

  test("переход по ссылке История", async ({ page }) => {
    await page.getByRole("link", { name: /история/i }).click();
    await expect(page).toHaveURL(/\/history/);
  });

  test("переход по ссылке CSV Аналитик", async ({ page }) => {
    await page.getByRole("link", { name: /csv аналитик/i }).click();
    await expect(page).toHaveURL("/");
  });
});
