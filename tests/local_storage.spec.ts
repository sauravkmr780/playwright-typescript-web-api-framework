import {chromium, test} from '@playwright/test';
//applicable for cookies and local storage -- cookies and local storage alive after changing tabs
async function saveAdminStorage() 
{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://sdetqa.vercel.app/login_app");
    await page.getByLabel("username").fill("admin");
    await page.getByLabel("password").fill("admin123");
    //await page.getByLabel('🍪 Cookie').check();
    await page.getByText('💾 Local').check();
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForSelector('text=Dashboard Welcome',{state:'visible'})
    //able to capture cookies and local storage
    await context.storageState({path:'./storage-data/adminData.json'});
}

async function saveUserStorage() 
{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://sdetqa.vercel.app/login_app");
    await page.getByLabel("username").fill("testuser1");
    await page.getByLabel("password").fill("testuser123");
    //await page.getByLabel('🍪 Cookie').check();
    await page.getByText('💾 Local').check();
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForSelector('text=Dashboard Welcome',{state:'visible'})
    //able to capture cookies and local storage
    await context.storageState({path:'./storage-data/userData.json'});
}
test('just login', async()=>{
   await saveAdminStorage(); 
   await saveUserStorage();
})


