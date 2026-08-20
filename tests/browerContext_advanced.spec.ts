import{test,expect,chromium,Browser,BrowserContext,Page} from '@playwright/test';

test('Browser settings',async ()=>{
    const browser:Browser = await chromium.launch({headless:false});// we can setup headed mode or headless in parameter based on boolean value
    const context:BrowserContext =await browser.newContext();
    const page:Page= await context.newPage();
    await page.goto('https://www.google.com/');
})

test('Context settings',async ()=>{
    const browser:Browser = await chromium.launch();
    const context:BrowserContext =await browser.newContext(
    {
        viewport: {width:700, height:700},  //to setup view port of browser
        locale:'de-DE', //we can set languague as German of application
        //proxy:{server:'http://mtproxy.com:3425'}//IMP - many product based company not directly expose server they provide proxy url through we can access server side details.
        ignoreHTTPSErrors:true //we can setup this option to avoid any http error due to safety.
    }
    );
    const page:Page= await context.newPage();
    await page.goto('https://expired.badssl.com/');
    const textTitle = await page.locator('h1').allInnerTexts();
    console.log(textTitle);
    await page.waitForTimeout(3000);
})

