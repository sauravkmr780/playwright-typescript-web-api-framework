import { test, expect } from "@playwright/test";

test("Locator and Generic Assertions ", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");

  //Auto-retrying assertions - Locator assertions - await is must
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/"); //Auto-retrying assertions
  await expect(page.getByText("Welcome to our store")).toBeVisible(); //Auto-retrying assertions

  //Non-retrying assertions - Generic assertions - no await needed (as no auto wait follow here)
  const title = await page.title();
  expect(title).toBe("Demo Web Shop"); ////Non-retrying assertions

  const text = await page.locator("div.block-newsletter div.title strong").innerText();
  expect(text).toContain("NEWSLETTER"); //Non-retrying assertions

  //Negating matchers - applicable for both Generic and Locator assertions
  //await expect(page.getByText("Welcome to our store")).not.toBeVisible();//auto -retry
  //expect(text).not.toContain("NEWSLETTER"); //non-retry
});
