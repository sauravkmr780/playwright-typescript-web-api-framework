import {test,expect} from '@playwright/test';

test('Auto waiting ',async ({page})=>{
    test.setTimeout(50000);//overrride config test timeout
    //test.slow()//Slow test will be given triple the default timeout.. , now based on config level test timeout 60 sec * 3 = 180 sec while timeout for test execution.
    await page.goto('https://demowebshop.tricentis.com/');

   //Assertions - auto wait works
   await expect(page).toHaveURL('https://demowebshop.tricentis.com/',{timeout:6000});//overrride config assertion timeout
   await expect(page.getByText('Welcome to our store')).toBeVisible({timeout:7000});//overrride config assertion timeout

   //Actions - auto wait works
   await page.locator('#small-searchterms').fill('Laptop');
   await page.getByRole('button',{name:'Search'}).click();

   // Force actions - disables non-essential actionability checks
   await page.locator('#small-searchterms').fill('Laptop',{force:true});//it will not to actionablity check and perform force action to fill
   await page.getByRole('button',{name:'Search'}).click({force:true});//it will not to actionablity check and perform force action to click

   
})