import { test, expect } from "@playwright/test";
import fs from "fs";
test("Login as admin and check dashboard", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  //load session data
  const sessionStorageData = JSON.parse(
    fs.readFileSync("./storage-data/session_data.json", "utf-8"),
  );
  await context.addInitScript((storage) => {
    Object.keys(storage).forEach((key) => {
      sessionStorage.setItem(key, storage[key]);
    });
  }, sessionStorageData);

  await page.goto("https://sdetqa.vercel.app/login_app");
  await page.waitForSelector("text=Dashboard Welcome", { state: "visible" });
  await expect(page.locator(':text("Dashboard Welcome")')).toBeVisible();
  await expect(page.locator("#displayUser")).toHaveText("admin");
  await context.close();
});
