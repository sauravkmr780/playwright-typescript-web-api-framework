import {test,expect} from '@playwright/test';

test('Auto complete dropdown validation',async ({page})=>{
   await page.goto('https://www.flipkart.com/');
   await page.waitForTimeout(2000);
   await page.getByRole('button',{name:'✕'}).click();
   await page.getByRole('textbox',{name:'Search for Products, Brands and More'}).fill('smart');
   //get auto suggestion --> in DOM press --> cont+ shift+ P --> run command - emulate focused --> click it show focused list
   //print all avaialble options
   const text:Array<string> = await page.getByRole('listitem').allTextContents();
   console.log(text);
   //select one item - smart tv
   await page.getByRole('listitem').getByText('smart tv',{exact:true}).click();
})