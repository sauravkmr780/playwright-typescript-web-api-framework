import { test, expect } from '@playwright/test';
//import logindata from '../testdata/logindata.json';
import fs from 'fs';


/* Below is working
//grouping test using decribe block
test.describe('Data driven login test', ()=>{
//using for of loop for multidimensional array as foreachonly works with one dimensional array
for(const data of logindata){
    const useremail = data.email;
    const password = data.password;
    const validity = data.validity;

test(`Login test with login useremail ${useremail} password ${password} validity ${validity}`, async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill(useremail);
  await page.getByRole('textbox', { name: 'Password:' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  //Asssert login is success or not
  if(validity.toLowerCase() ==='valid'){
    //login successful
      await expect(page.locator('body')).toContainText(useremail);
      await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
      console.log(`validity status is ${validity}`);
  }
  else{
    //login unsucessful
    await expect(page.getByRole('link', { name: 'Log out' })).not.toBeVisible();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
    console.log(`validity status is ${validity}`);

  }
})
}
});
*/

//Another way to read data from Json file 
const jsonPath  = "testdata/logindata.json"; //copy relative path where json stored
const logindata:any = JSON.parse(fs.readFileSync(jsonPath,'utf-8'));

test.describe('Data driven login test',()=>{
//using for of loop for multidimensional array as foreachonly works with one dimensional array
for(const data of logindata){
    const useremail = data.email;
    const password = data.password;
    const validity = data.validity;

test(`Login test with login useremail ${useremail} password ${password} validity ${validity}`, async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill(useremail);
  await page.getByRole('textbox', { name: 'Password:' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
  //Asssert login is success or not
  if(validity.toLowerCase() ==='valid'){
    //login successful
      await expect(page.locator('body')).toContainText(useremail);
      await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
      console.log(`validity status is ${validity}`);
  }
  else{
    //login unsucessful
    await expect(page.getByRole('link', { name: 'Log out' })).not.toBeVisible();
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
    console.log(`validity status is ${validity}`);

  }
})
}
});