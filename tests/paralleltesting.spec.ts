import {test, expect} from '@playwright/test';
/*
Playwright Parallelism/Parallel Testing
Playwright supports both Serial and Parallel test execution modes. You can control how your tests are run using configuration in the playwright.config.ts file or command-line options.
Serial Mode Execution
In Serial Mode, tests run one after another, without parallel execution.
1)Set Serial Mode in playwright.config.ts
fullyParallel: false,
workers: 1
•fullyParallel: false → Disables parallelism.
•workers: 1 → Only one worker is used, ensuring serial execution.
•Note: The default is 1 worker. Changing this in config won’t have an effect unless fullyParallel is set properly.

2)Set Serial Mode per Test File
To run tests in serial within a file:
test.describe.configure({ mode: 'serial' })
This ensures all tests in that describe block run sequentially.



Parallel Mode Execution
In Parallel Mode, tests run simultaneously across multiple workers for faster execution.
1)Set Parallel Mode in playwright.config.ts
fullyParallel: true,
workers: 2 // You can increase/decrease as needed
•fullyParallel: true → Enables parallelism for all tests.
•workers: 2 → allocate 2 test workers to run tests concurrently.
Example:
•4 tests → 4 workers (if workers is set to 4)
•5 tests → 5 workers

2)Parallel Mode for Specific Project/Browser
You can configure parallelism per browser/project:
export default defineConfig({
projects: [
{
name: 'chromium',
use: { ...devices['Desktop Chrome'] },
fullyParallel: true,
},
],
});

3)Set Parallel Mode per Test File
To run tests in serial within a file:
test.describe.configure({ mode: parallel })
This ensures all tests in that describe block run parallelly.

Control Workers via Command Line
You can also set the number of workers (limit workers) when running tests:
npx playwright test mytest.spec.ts --workers 3
# or
npx playwright test mytest.spec.ts --workers=3

Notes:
•You cannot set more workers than the number of tests.
•Setting --workers=1 disables parallelism (runs in serial mode).

*/
test.describe.configure({mode:'parallel'})

test.describe('Group1',async()=>{

test("test 1 ", async ({ page }) => {
// test logic
console.log('This is test 1');
});

test("test 2 ", async ({ page }) => {
// test logic
console.log('This is test 2');
});

test("test 3 ", async ({ page }) => {
// test logic
console.log('This is test 3');
});

test("test 4 ", async ({ page }) => {
// test logic
console.log('This is test 4');
});

})
