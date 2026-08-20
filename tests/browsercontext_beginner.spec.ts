import {test,expect,Page,BrowserContext, chromium, Browser, webkit} from '@playwright/test';
//if we use page directly it understand browser is set at playwright.config.ts file and act accordingly.
/*
Browser
•Represents an actual browser instance (like Chromium, Firefox, or WebKit).
•Created using playwright.chromium.launch(), firefox.launch(), or webkit.launch().
•It's a heavyweight object—ideally created once per test suite.
•Supports headless or headed mode.

BrowserContext
•Think of it as a new, isolated user session (like an incognito profile).
•It shares the underlying browser instance but has separate cookies, cache, local storage, etc.
•You can have multiple contexts in one browser—ideal for multi-user testing.
Why use it?
•Isolation between tests.
•Efficient parallel test execution using the same browser process.

Page
•Represents a tab inside a browser context.
•Most interactions (click, fill, navigate, etc.) happen through the Page object.
•You can create multiple pages per context.

Hierarchy Overview
Browser
└── BrowserContext (1..n)
└── Page (1..n)

*/
test('Browser context demo', async () => {
   // set up your own browser(chromium, firefox , webkit) first instead of playwright.config.ts setup
   const browser:Browser = await webkit.launch();
   // setup context of same browser
   const context:BrowserContext  = await browser.newContext();
   //set up page of same context
   const page:Page  = await context.newPage();
   //navigate to url
   await page.goto('https://testautomationpractice.blogspot.com/');
});

test('Multiple pages demo with same context', async () => {
   // set up your own browser(chromium, firefox , webkit) first instead of playwright.config.ts setup
   const browser:Browser = await chromium.launch();
   // setup context of same browser
   const context:BrowserContext  = await browser.newContext();
   //set up page of same context
   const page1:Page  = await context.newPage();
   const page2:Page  = await context.newPage();

   console.log('Number of pages created: ', context.pages().length);
   //navigate to url
   await page1.goto('https://testautomationpractice.blogspot.com/');
   await expect(page1).toHaveTitle('Automation Testing Practice')
   await page2.goto('https://www.google.com/');
   await expect(page2).toHaveTitle('Google');

});


