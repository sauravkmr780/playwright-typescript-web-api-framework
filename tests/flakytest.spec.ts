import { test, expect } from "@playwright/test";
/*
What are Flaky Tests?
A flaky test is a test that sometimes passes and sometimes fails, even when there is no change in the code. These failures are usually caused by things like:
•Slow network or server response
•Delayed UI updates
•Timing issues or animations
Such tests are not reliable and can make it hard to trust your test results.

How Playwright Helps: Retries
To handle flaky tests, Playwright allows you to retry tests that fail. If a test fails, Playwright can automatically run it again, up to a set number of times.

Example Scenarios:
1.Test Passed → No retry needed
2.Test Failed → Retry → Still Failed
3.Test Failed → Retry → Passed → This is called a flaky test

How to Use Retries in Playwright
1. Configure in playwright.config.ts file:
You can set how many times to retry a failed test like this:
export default defineConfig({
retries: 3, // This will retry a failed test up to 3 times
});
2. Or Use CLI (Command Line Interface):
You can also set retries while running your tests from the terminal:
# Run all tests with 3 retry attempts
npx playwright test --retries=3
# Run a specific test file with retries
npx playwright test tests/flakytest.spec.ts --retries=3


*/
test("Flaky test validation ", async ({ page }) => {
  await page.goto('https://practicetestautomation.com/practice-test-login/');
  await page.getByRole('textbox', { name: 'Username' }).fill('student');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('heading', { name: 'Logged In Successfully' })).toBeVisible();
  await page.waitForTimeout(5000);
  await expect(page.getByRole('heading')).toContainText('Logged In Successfully');
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
})