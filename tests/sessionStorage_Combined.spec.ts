import { test, expect } from '@playwright/test';
import * as fs from 'fs';


test.describe('Session Storage Authentication Suite', () => {
  // 1. Capture and save sessionStorage once before all tests
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://sdetqa.vercel.app/login_app');
    await page.getByLabel('username').fill('admin');
    await page.getByLabel('password').fill('admin123');
    await page.getByText('⏳ Session').check();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForSelector('text=Dashboard Welcome', { state: 'visible' });

    // Capture sessionStorage data
    const sessionStorageData = await page.evaluate(() => {
      return sessionStorage;
    });

    fs.writeFileSync('./storage-data/session_data.json', JSON.stringify(sessionStorageData, null, 2));

    await context.close();
  });

  // 2. Test injecting saved sessionStorage via addInitScript
  test('Login as admin and check dashboard', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Load session data
    const sessionStorageData = JSON.parse(
      fs.readFileSync('./storage-data/session_data.json', 'utf-8')
    );

    // Inject sessionStorage before page scripts run
    await context.addInitScript((storage) => {
      for(const key in storage) {
        sessionStorage.setItem(key, storage[key]);
      };
    }, sessionStorageData);

    await page.goto('https://sdetqa.vercel.app/login_app');
    await page.waitForSelector('text=Dashboard Welcome', { state: 'visible' });
    await expect(page.locator(':text("Dashboard Welcome")')).toBeVisible();
    await expect(page.locator('#displayUser')).toHaveText('admin');

    await context.close();
  });
});