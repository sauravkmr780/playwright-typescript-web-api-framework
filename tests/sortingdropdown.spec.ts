import {test,expect} from'@playwright/test';

test('Verify dropdown is sorted or not', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const optionAvailable = (await page.locator('select#animals option').allTextContents()).map(index=> index.trim());
    console.log('original array', optionAvailable);
    console.log('sorted array', optionAvailable.sort());
    expect(optionAvailable.sort()).toBe(optionAvailable);

    // sort() is mutable to it change original array and sort all times
})

test('Check dropdown is sorted or not', async ({ page }) => {
    // sort() is mutable to it change original array and sort all times
    await page.goto('https://testautomationpractice.blogspot.com/');
    const optionAvailable = (await page.locator('select#colors option').allTextContents()).map(index=> index.trim());
    console.log('original array', [...optionAvailable]);//prevent sort() mutation using ...approach
    console.log('sorted array', [...optionAvailable].sort());
    expect([...optionAvailable].sort()).not.toBe([...optionAvailable]);

})