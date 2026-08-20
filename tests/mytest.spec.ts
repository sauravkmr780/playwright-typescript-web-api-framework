import {test, expect} from '@playwright/test';

//page - fixture - global variable
test('Verify page title and url',async({page})=>{
   await test.step('Validate title',async ()=>{
   await page.goto('https://www.google.com/');
   let title:string = await page.title()
   console.log( title);
   await expect(page).toHaveTitle('Google');
   })
})