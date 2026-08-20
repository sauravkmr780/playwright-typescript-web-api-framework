import{test,expect,chromium,Browser,BrowserContext,Page} from '@playwright/test';

test('Switching tabs',async ()=>{
    const browser:Browser = await chromium.launch();
    const context:BrowserContext = await browser.newContext();
    const parentPage:Page = await context.newPage();

    await parentPage.goto('https://testautomationpractice.blogspot.com/');
    //first approach- using promise.all() - Array of promises [a,b] --> Best approach
    const [childPage] = await Promise.all([
        context.waitForEvent('page'),
        parentPage.getByRole('button',{name:'New Tab'}).click()
    ])
    const text = await childPage.locator('p.description span').innerText();
    expect(text).toContain('Software Testing & Automation Tutorials');
    const pages:Page[]  = context.pages();
    console.log('How many pages created now:--> ', pages.length);
    //Approach 1 - Title of both the pages using context.page()-- index of pages
    console.log('Title of parent page: ',await pages[0].title());//Automation Testing Practice
    console.log('Title of child page: ',await pages[1].title());//SDET-QA Blog

    //Approach 2 - Title of both the pages directly (recommended approach)
    console.log('Title of parent page: ',await parentPage.title());//Automation Testing Practice
    console.log('Title of child page: ',await childPage.title());//SDET-QA Blog

    //IMP --> if we have only 2 pages second approach with direct page name is best but when multiple pages more than 2 exist using context.pages() with index value is best approach
})