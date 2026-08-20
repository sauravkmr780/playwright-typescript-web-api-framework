import{test,expect,Locator} from '@playwright/test';

test('Xpath locator validation',async ({page})=>{
   await page.goto('https://demowebshop.tricentis.com/')
   //absolute xpath
//    const logo:Locator = page.locator('xpath=/html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]');
//    await expect(logo).toBeVisible();
   //relative xpath
   const logo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
   await expect(logo).toBeVisible();
})