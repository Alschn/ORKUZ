import { test, expect } from "@playwright/test";

test("hello world heading", async ({ page }) => {
  await page.goto("/");

  const heading = page.locator("h1", { hasText: "Hello world" });

  expect(heading).toBeDefined();
});

test("dark mode toggle", async ({ page }) => {
  await page.goto("/");

  const toggleButton = page.locator("button", { hasText: "Toggle theme" });

  await expect(toggleButton).toBeVisible();

  const htmlStyle = await page.getAttribute("html", "style");
  const currentMode = htmlStyle!.includes("dark") ? "dark" : "light";
  expect(currentMode).toBe("light");

  await toggleButton.click();

  const newHtmlStyle = await page.getAttribute("html", "style");
  expect(newHtmlStyle).toContain("dark");
});
