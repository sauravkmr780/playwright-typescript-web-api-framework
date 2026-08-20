import { test, expect } from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

//Read data from CSV file -- Install csv-parse using npm install csv-parse
const csvPath  = "testdata/login_test_data.csv"; //copy relative path where csv stored
const fileContent = fs.readFileSync(csvPath,'utf-8');
const loginData = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true
});

test.describe('Data driven login test', ()=>{
//using for of loop for multidimensional array as foreachonly works with one dimensional array
for(const data of loginData as any[]){
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