import { test, expect } from "@playwright/test";
/*
Hard Assertion- Yes, it is the default assertion type.Stops test execution immediately after failure.Critical checks where failure should block further steps.Reports failure and halts the test.
Soft assertion - Continues executing remaining steps even if it fails. Reports failure but aggregates it at the end of the test.Continues executing remaining steps even if it fails.
*/

test("Hard and soft Assertions ", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");

  //Hard assertions on Locator assertion type
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/"); 
  //Soft assertions on Locator assertion type
  await expect.soft(page.getByText("Welcome to our store")).toBeVisible(); 

  //Soft assertions on Generic assertion type
  const title = await page.title();
  expect.soft(title).toBe("Demo Web Shop"); ////Non-retrying assertions
  //Hard assertions on Generic assertion type
  const text = await page.locator("div.block-newsletter div.title strong").innerText();
  expect.soft(text).toContain("NEWSLETTER"); //Non-retrying assertions
});
