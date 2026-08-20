import { test,expect } from "@playwright/test";

const searchItems:string[] = ['Laptop','Gift Card','Smartphone','Sneaker'];

//using for of loop
// for(const product of searchItems){
// test(`Search product test ${product}`, async ({ page }) => {
//   await page.goto('https://demowebshop.tricentis.com/');
//   await page.locator('#small-searchterms').fill(product);
//   await page.getByRole('button', { name: 'Search' }).click();
//   await expect.soft(page.locator('h2 a').nth(0)).toContainText(product);
// });
// };

//using foreach function
// searchItems.forEach((product)=>{
// test(`Search product test ${product}`, async ({ page }) => {
//   await page.goto('https://demowebshop.tricentis.com/');
//   await page.locator('#small-searchterms').fill(product);
//   await page.getByRole('button', { name: 'Search' }).click();
//   await expect.soft(page.locator('h2 a').nth(0)).toContainText(product);
// });
// });


//using describe grouping test
test.describe('Searching product', ()=>{
searchItems.forEach((product)=>{
test(`Search product test ${product}`, async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.locator('#small-searchterms').fill(product);
  await page.getByRole('button', { name: 'Search' }).click();
  await expect.soft(page.locator('h2 a').nth(0)).toContainText(product);
});
});
});




