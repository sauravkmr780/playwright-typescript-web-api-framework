import{test,expect,chromium,Browser,BrowserContext,Page,Cookie} from '@playwright/test';

test('Context settings',async ()=>{
    const browser:Browser = await chromium.launch();
    const context:BrowserContext =await browser.newContext();
    const page:Page= await context.newPage();
    //adding cookies
    await context.addCookies([
        {name:'mycookie',value:'123456',url:'https://www.google.com/'},
    ]);
    console.log("*******cookie added****************");
    //Navigate to url
    await page.goto('https://www.google.com/');

    //get details of cookie name
    const cookieDetails:Cookie[]= await context.cookies();

    const retrivedCookies =  cookieDetails.find((i)=> i.name ==='mycookie');
    expect(retrivedCookies).toBeDefined();
    expect(retrivedCookies?.value).toBe('123456');

    //get all the cookies
    console.log('Total length of cookies ',cookieDetails.length);//Total length of cookies  5
    expect(cookieDetails.length).toBeGreaterThan(1);

    //printing cookie details
    for(const ck of cookieDetails){
        console.log(ck.name,ck.value);
    }

    //printing all cookie details
    console.log(cookieDetails);

    //delete cookies
    await context.clearCookies();
    const cookieafterclearing= await context.cookies();
    //validate cookies cleared correctly or not
    console.log('Total number of count of cookies after delete ', cookieafterclearing.length);
    expect(cookieafterclearing.length).toEqual(0);
})
