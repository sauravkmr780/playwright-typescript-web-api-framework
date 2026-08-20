import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';

//Read data from excel/xls file -- Install xlsx using npm install xlsx
//Hierarcy in excel ********** excel file --> workbook --> worksheet --> rows and columns
const excelPath  = "testdata/login_test_data.xlsx"; //copy relative path where excel/xls file stored
const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const loginData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
console.log(loginData);
test.describe('Data driven login test', ()=>{
//using for of loop for multidimensional array as foreachonly works with one dimensional array
for(const data of loginData as any[]){
const useremail = data.Email;//excel column name was Email instead of email hence Email here
const password = data.Password;//excel column name was Password instead of password hence Password here
const validity = data.Validity;//excel column name was Validity instead of validity hence Validity here

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