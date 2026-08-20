import { test, expect, Locator } from "@playwright/test";

test("Infinite scrooling on Books", async ({ page }) => {
  test.setTimeout(120000);
  //test.slow();//it will increase timeout to 3 times 30*3=90 sec
  await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");

  let previousHeight = 0;
  while (true) {
    //scroll to page
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait for new content to load
    await page.waitForTimeout(2000);

    const currentHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });

    console.log("Previous Height", previousHeight);
    console.log("Current Height", currentHeight);
    if (currentHeight === previousHeight) {
      break;
    }
    previousHeight = currentHeight;
  }

  console.log("Reached end of the page");
  await expect(
    page.getByText("Books By Kilo. All Right Reserved.", { exact: true }),
  ).toBeVisible();
});
