import { test, expect } from '@playwright/test';

test('Screenshot demo', async ({ page }) => {
   await page.goto('https://demowebshop.tricentis.com/');
   // page screenshot
   await page.screenshot({path:`screenshots/homepage${Date.now()}.png`})
   //full page screenshot
   await page.screenshot({path:`screenshots/fullpage${Date.now()}.png`,fullPage:true});
   // screenshot of particular place like - feature product
   await page.locator('div.home-page-product-grid').screenshot({path:`screenshots/featureProduct${Date.now()}.png`});
})


test('Screenshot demo only-on-failure from playwright.config.ts setup', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin1234');//incorrect password it makes fail and capture screenshot inside test results folder
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading')).toContainText('Dashboard');
  await page.getByRole('listitem').filter({ hasText: 'mandaa user' }).locator('i').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await page.waitForTimeout(3000);
})

test('Video demo retain-on-failure from playwright.config.ts setup', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin1234');//incorrect password it makes fail and capture video inside test results folder
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000);
  await expect(page.getByRole('heading')).toContainText('Dashboard');

})