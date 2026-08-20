import { test, expect, Locator, Page } from "@playwright/test";

test("Verify pagination table and retrive all data", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/core/basic_init/alt_pagination.html",
  );
  await expect(page).toHaveURL(/pagination/);
  const previousButton: Locator = page.getByLabel("Previous");
  const nextButton: Locator = page.getByLabel("Next");
  await expect(previousButton).toBeDisabled();
  await expect(nextButton).toBeEnabled();

  let hasmorepages = true;
  while (hasmorepages) {
    const rows: Locator[] = await page.locator("table#example tbody tr").all();
    for (const data of rows) {
      console.log(await data.locator("td").allInnerTexts());
    }
    if (await nextButton.isEnabled()) {
      await nextButton.click();
      await expect(previousButton).toBeEnabled();
    } else {
      hasmorepages = false;
      await expect(nextButton).toBeDisabled();
    }
  }
});
test("Verify row count in pagination table", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/core/basic_init/alt_pagination.html",
  );
  await expect(page).toHaveURL(/pagination/);
  const previousButton: Locator = page.getByLabel("Previous");
  const nextButton: Locator = page.getByLabel("Next");
  await expect(previousButton).toBeDisabled();
  await expect(nextButton).toBeEnabled();
  const availableValues = [10, 25, 50, 100];
  for (const data of availableValues) {
    await page.locator("select#dt-length-0").selectOption({ label: `${data}` });
    await page.waitForTimeout(3000);
    expect(
      await page.locator("table#example tbody tr").count(),
    ).toBeLessThanOrEqual(data);
  }
});
test("Verify search name in pagination table", async ({ page }) => {
  await page.goto(
    "https://datatables.net/examples/core/basic_init/alt_pagination.html",
  );
  await expect(page).toHaveURL(/pagination/);
  await page.getByRole("searchbox").fill("Unity Butler");
  await page.waitForTimeout(2000);
  const rows:Locator[] = await page.locator("table#example tbody tr").all();
  if (rows.length >= 1) {
    for (const data of rows) {
      const texts: string[] = await data.locator("td").allInnerTexts();
      console.log(texts);
      expect(texts[0]).toEqual("Unity Butler");
    }
  } else {
    console.log("No row found with search text");
  }
});
