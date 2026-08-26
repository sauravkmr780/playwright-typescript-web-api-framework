import {test,expect} from '@playwright/test';

test.beforeAll('setting local storage once', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://sdetqa.vercel.app/login_app");
    await page.getByLabel("username").fill("admin");
    await page.getByLabel("password").fill("admin123");
    await page.getByText('💾 Local').check();
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForSelector('text=Dashboard Welcome',{state:'visible'})
    //able to capture cookies and local storage
    await context.storageState({path:'./storage-data/adminDataCombined.json'});
    await context.close();
})

test('Inject local storage into next test cases to bypass login', async({browser})=>{
    const context = await browser.newContext({storageState:'./storage-data/adminDataCombined.json'});
    const page = await context.newPage();
    await page.goto("https://sdetqa.vercel.app/login_app");
    await page.waitForSelector('text=Dashboard Welcome',{state:'visible'});
    await expect(page.locator(':text("Dashboard Welcome")')).toBeVisible();
    await expect(page.locator('#displayUser')).toHaveText('admin');
    await context.close();
})