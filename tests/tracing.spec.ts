import { test, expect } from '@playwright/test';
/*
Playwright Tracing records actions, snapshots, and events during a test run. This trace can be opened later in a GUI tool called Trace Viewer.

Viewing Trace Files:
There are 3 ways to view trace files:
1. From HTML Report
•Run:npx playwright show-report
•In the report, click on the trace.zip link to open Trace Viewer.
2. Using Command Line
npx playwright show-trace trace.zip
3. Using Online Viewer
•Open: https://trace.playwright.dev/
•Drag and drop the trace.zip file to view it.

*/

test('Trace setup from playwright.config.ts setup', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin1234');//incorrect password it makes fail and capture screenshot inside test results folder
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading')).toContainText('Dashboard');
  await page.getByRole('listitem').filter({ hasText: 'mandaa user' }).locator('i').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await page.waitForTimeout(3000);
})

test('Trace setup in test using context', async ({ page,context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');//incorrect password it makes fail and capture screenshot inside test results folder
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByRole('heading')).toContainText('Dashboard');
  await page.getByRole('listitem').filter({ hasText: 'mandaa user' }).locator('i').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  await context.tracing.stop({path:'trace.zip'});//it will store traze.zip at root folder not in test-results folder
})