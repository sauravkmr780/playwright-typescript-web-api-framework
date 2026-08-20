import {test,expect, Locator} from '@playwright/test'
/*
Shadow DOM in Playwright
•Playwright natively supports working with elements inside the Shadow DOM.
•You can use CSS selectors to interact with shadow elements.
•XPath selectors do not work with elements inside the Shadow DOM in Playwright.
*/

test('Verify shadow dom',async({page})=>{
  await page.goto('https://selectorshub.com/xpath-practice-page/');
  await page.locator('#kils').fill('Saurav Kumar');
  await expect(page.locator('#kils')).toHaveValue('Saurav Kumar');
})

test('Nested shadow dom on shoping website',async({page})=>{
  await page.goto('https://shop.polymer-project.org/');
  await page.getByRole('link',{name:"Men's Outerwear Shop Now"}).click();
  await page.waitForTimeout(2000);
  const productTitle = await page.locator('div.title').all();
  console.log('Total number of product avilable after click on shop button ',productTitle.length);
  expect(productTitle.length).toEqual(16);
})