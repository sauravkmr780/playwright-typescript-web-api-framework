import { test, expect } from "@playwright/test";
/*
Why Use Tags?
Tags help you:
•Organize test suites (e.g., smoke, regression, sanity).
•Save time during development or quick validations.

1. Run all sanity tests:
npx playwright test tests/tagging.spec.ts --grep "@sanity"
2. Run all regression tests:
npx playwright test tests/tagging.spec.ts --grep "@regression"
3. Run tests which are belongs to both sanity & regression
npx playwright test tests/tagging.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"
(?=.*@sanity) ensures the tag @sanity is present.
(?=.*@regression) ensures the tag @regression is also present.
Combined, it matches tests that include both tags.
4. Run tests belongs to either sanity or regression.
npx playwright test tests/tagging.spec.ts --grep "@sanity|@regression"
5. Run only sanity tests which are not belongs to regression
npx playwright test tests/tagging.spec.ts --grep "@sanity" --grep-invert "@regression"

IMP - Configure tags in playwright.config.ts file:
export default defineConfig({
grep: /@sanity/,
grepInvert:/@regression/

});
*/

test('@sanity test 1',async ({page})=>{
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})

test('@regression test 2',async ({page})=>{
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})

test('@sanity @regression test 3',async ({page})=>{
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})
//Best practice to use this appriach
test('test 4',{tag:'@sanity'},async ({page})=>{
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})

test('test 5',{tag:['@sanity','@regression']},async ({page})=>{
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})
