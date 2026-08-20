import {test,expect}  from '@playwright/test';

/*
only
skip
fail
fixme
slow
*/

//only - Focus mode. Runs only this test and Skips all other tests.
test('test 1',async ({page})=>{
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})

//skip - Skip this test (Does not run).
test.skip('test 2',async ({page})=>{
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})

//skip the tets based on condition
test('test 3',async ({page,browserName})=>{
//test will skip if browser is firefox
 test.skip(browserName === 'firefox');
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})

//fail - Marks test as expected to fail
test.fail('test 4',async ({page})=>{
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})

//fixme - Marks test to fix; automatically skips
test.fixme('test 5',async ({page})=>{
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})

//slow - Extends timeout triple.
test('test 6',async ({page})=>{
  test.slow();//Extends timeout triple.
 await page.goto('https://www.google.com/');
 await expect(page).toHaveTitle('Google')
})