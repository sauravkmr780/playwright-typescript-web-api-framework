import{test,expect, BrowserContext,Page} from '@playwright/test';

test('Basic Auth pop up validation',async ({browser})=>{
    /*
    //Approach 1--> pass username and password in URL
    //https://the-internet.herokuapp.com/basic_auth
    //https://username:password@the-internet.herokuapp.com/basic_auth
    //entering username and password as admin
    const context:BrowserContext  = await browser.newContext();
    const page:Page = await context.newPage();
    await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth')
    await expect(page.locator('#content p')).toContainText('Congratulations!');
    await expect(page.getByText('Congratulations!')).toBeVisible();
    */
    //Approach 2--> pass credentials in browser context (Best recommended approach)
    const context:BrowserContext  = await browser.newContext({httpCredentials:{username:'admin',password:'admin'}});
    const page:Page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await expect(page.locator('#content p')).toContainText('Congratulations!');
    await expect(page.getByText('Congratulations!')).toBeVisible()
})