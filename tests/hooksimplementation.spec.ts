import {test,expect,Locator,Page}  from '@playwright/test';
/*
open the app

login
  find number of products
logout

login
  add a product
logout

close the app

*/

let page:Page;
test.beforeAll('Open the application',async({browser})=>{
    const context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://demowebshop.tricentis.com/'); 
})

test.beforeEach('Login', async()=>{
 //login
 await page.getByRole('link',{name:'Log in'}).click();
 await expect(page).toHaveURL(/\/login/);
 await page.getByRole('textbox',{name:'Email:'}).fill('sauravkmr780@gmail.com');
 await page.getByRole('textbox',{name:'Password:'}).fill('@1Infosys');
 await page.getByRole('button',{name:'Log in'}).click();
 await expect(page.getByRole('link',{name:'sauravkmr780@gmail.com'})).toBeVisible();
})

test.afterEach('logout',async()=>{
 //logout
  await page.getByRole('link',{name:'Log out'}).click();
  await expect(page).toHaveURL('https://demowebshop.tricentis.com/');    
})

test.afterAll('Close the application', async ()=>{
  //close the application
  await page.close();
})

//best practice- keep all hooks outside of the group of test for usablity.

test.describe('Grouping both the test',async ()=>{
test('Find number of products',async ()=>{
 //find number of products
 const countNumberOfProducts:Locator[] = await page.locator('.product-item').all();
 await page.waitForTimeout(2000);
 console.log('Number of products count after login is ', countNumberOfProducts.length);
 expect(countNumberOfProducts.length).toBe(6);
})

test('Add a product to cart',async ()=>{
 //Add a products
 await page.locator('.product-item').filter({ hasText: '14.1-inch Laptop' }).getByRole('button',{name:'Add to cart'}).click();
  const notificationBar = page.locator('#bar-notification');
  // 3. Assert it becomes visible and extract text
  await expect(notificationBar).toBeVisible();
  const notificationText = await notificationBar.innerText();
  console.log('Notification Text:', notificationText.trim());
})
})
