import {chromium, test} from '@playwright/test';
import fs from 'fs';
//applicable for session storage -session expires by just switching tabs
async function saveSessionStorage() 
{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://sdetqa.vercel.app/login_app");
    await page.getByLabel("username").fill("admin");
    await page.getByLabel("password").fill("admin123");
    await page.getByText('⏳ Session').check();
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForSelector('text=Dashboard Welcome',{state:'visible'});
    //capture session storage data
    const sessionStorageData = await page.evaluate(() => {
        return sessionStorage;
    });
    fs.writeFileSync('./storage-data/session_data.json', JSON.stringify(sessionStorageData));

    await context.close()
}

//calling this function
saveSessionStorage();
