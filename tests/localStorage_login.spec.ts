import {test, expect} from '@playwright/test';

test('Login as admin and check dashboard', async({browser})=>{
    //attaching local storage
    const context = await browser.newContext({storageState:'./storage-data/adminData.json'});
    const page = await context.newPage();
    await page.goto("https://sdetqa.vercel.app/login_app");
    await page.waitForSelector('text=Dashboard Welcome',{state:'visible'});
    await expect(page.locator(':text("Dashboard Welcome")')).toBeVisible();
    await expect(page.locator('#displayUser')).toHaveText('admin');
    await context.close();

})

test('Login as user and check dashboard', async({browser})=>{
    //attaching local storage
    const context = await browser.newContext({storageState:'./storage-data/userData.json'});
    const page = await context.newPage();
    await page.goto("https://sdetqa.vercel.app/login_app");
    await page.waitForSelector('text=Dashboard Welcome',{state:'visible'});
    await expect(page.locator(':text("Dashboard Welcome")')).toBeVisible();
    await expect(page.locator('#displayUser')).toHaveText('testuser1');
    await context.close();

})