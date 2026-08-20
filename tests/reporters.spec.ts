import { test, expect } from '@playwright/test';

test.beforeEach('Launching app',async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
})

test.afterEach('Closing app',async({page})=>{
    await page.close();
})

test.describe(()=>{
test('Visiblity test', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
});

test('Title test', async ({ page }) => {
  await expect(page).toHaveTitle('Demo Web Shop');
});

test('Login test', async ({ page }) => {
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('sauravkmr780@gmail.com');
  await page.getByRole('textbox', { name: 'Password:' }).fill('@1Infosys');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('body')).toContainText('sauravkmr780@gmail.com');
  await expect(page.locator('body')).toContainText('Log out');
  await page.getByRole('link', { name: 'Log out' }).click();
});

test('Search product test', async ({ page }) => {
  await page.locator('#small-searchterms').fill('Laptop');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: '14.1-inch Laptop', exact: true }).click();
  await expect(page.locator('h1')).toContainText('14.1-inch Laptop');
});
})

/* =========================================================================
   ALLURE REPORT SETUP STEPS FOR PLAYWRIGHT
   =========================================================================
   1. Install Allure Playwright Adapter:
      npm install -D allure-playwright

   2. Configure reporter in playwright.config.ts:
      reporter: "allure-playwright",

   3. Install Allure Command Line tool locally:
      npm install allure-commandline --save-dev

   4. Add scripts to package.json:
      "scripts": {
        "allure:generate": "allure generate allure-results --clean -o allure-report",
        "allure:open": "allure open allure-report",
        "allure:report": "npm run allure:generate && npm run allure:open"
      }

   5. Run the tests & generate/view report:
      npx playwright test
      npm run allure:report
   ========================================================================= */   