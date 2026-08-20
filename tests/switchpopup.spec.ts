import{test,expect,chromium,Browser,BrowserContext,Page} from '@playwright/test';

test('Switching between popups',async({browser})=>{
   const context:BrowserContext = await browser.newContext();
   const page:Page= await context.newPage();
   await page.goto('https://testautomationpractice.blogspot.com/');

   await Promise.all([page.waitForEvent('popup'),page.getByRole('button',{name:'Popup Windows'}).click()])
   await page.waitForTimeout(3000);
   const allPopUpWindows:Page[] = context.pages();
   console.log('How many page created now ', allPopUpWindows.length);//3 (1 main page and 2 pages created by click)
   await page.waitForTimeout(3000);
   //Get title of all pages
   console.log('Parent page title :-> ',allPopUpWindows[0].url());//return url of parent page
   console.log('Parent page title :-> ',allPopUpWindows[1].url());//return urlof first pop up url
   console.log('Parent page title :-> ',allPopUpWindows[2].url());//return urlof second pop up url
   //perform action on specific popup then close popup window
   for(const pg of allPopUpWindows){
    const popUptitleValue = await pg.title();
    if(popUptitleValue.includes('Playwright')){
       await pg.getByRole('link',{name:'Get started'}).click();
       await pg.close();
    }
   }
   await page.waitForTimeout(3000);
}) 