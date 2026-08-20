/*
Keyboard methods
down()
up()
insertText()
press()
//You only need to press keys one by one if there is special keyboard handling on the page - in this case use locator.pressSequentially().
*/

import { test, expect } from "@playwright/test";

test("Keyboard actions validation", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  //focus on input1 element
  await page.locator("input#input1").focus();
  //pass Welcome! text into input1
  await page.keyboard.insertText("Welcome!");
  // press Control+A
  await page.keyboard.down("Control");
  await page.keyboard.press("A");
  await page.keyboard.up("Control");

  // press Control+C
  await page.keyboard.down("Control");
  await page.keyboard.press("C");
  await page.keyboard.up("Control");
  // press Tab
  await page.keyboard.press("Tab");
  // press Tab
  await page.keyboard.press("Tab");
  //press Control+V
  await page.keyboard.down("Control");
  await page.keyboard.press("V");
  await page.keyboard.up("Control");
  // press Tab
  await page.keyboard.press("Tab");
  // press Tab
  await page.keyboard.press("Tab");
  //press Control+V
  await page.keyboard.down("Control");
  await page.keyboard.press("V");
  await page.keyboard.up("Control");
  //assertion
  await expect(page.locator("input#input2")).toHaveValue("Welcome!");
  await expect(page.locator("input#input2")).toHaveValue("Welcome!");
});

test("Keyboard actions validation - simple way (recommended) ", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  //focus on input1 element
  await page.locator("input#input1").focus();
  //pass Welcome! text into input1
  await page.keyboard.insertText("Welcome!");
  // press Control+A
  await page.keyboard.press('Control+A');
  // press Control+C
  await page.keyboard.press('Control+C');
  // press Tab
  await page.keyboard.press("Tab");
  // press Tab
  await page.keyboard.press("Tab");
  //press Control+V
  await page.keyboard.press('Control+V');
  // press Tab
  await page.keyboard.press("Tab");
  // press Tab
  await page.keyboard.press("Tab");
  //press Control+V
  await page.keyboard.press('Control+V');
  //assertion
  await expect(page.locator("input#input2")).toHaveValue("Welcome!");
  await expect(page.locator("input#input2")).toHaveValue("Welcome!");
});