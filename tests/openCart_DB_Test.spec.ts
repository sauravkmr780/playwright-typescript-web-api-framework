/*
dependency :npm install mysql2 dotenv
Frontend - http://localhost/opencart/upload/
Backend- http://localhost/opencart/upload/admin/index.php
credential - admin/admin
DB Access Url - http://localhost/phpmyadmin/
*/

import {test,expect} from '@playwright/test';
import {executeQuery} from '../utils/dbClient';
import {faker} from '@faker-js/faker';

test.describe('Open Cart user registration and database validation',()=>{
test('End to End User Registration Validation', async ({page,browser})=>{
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const email = faker.internet.email();
  const phone = faker.phone.number() ;
  const password = faker.internet.password();
  console.log('Frontend_URL value:', process.env.Frontend_URL);
  console.log('Email value:', email);

  //Frontend user registration and success message confimation 
  await page.goto(process.env.Frontend_URL!);
  await page.getByRole('link', { name: ' My Account' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: '* First Name' }).fill(firstname);
  await page.getByRole('textbox', { name: '* Last Name' }).fill(lastname);
  await page.getByRole('textbox', { name: '* E-Mail' }).fill(email);
  await page.getByRole('textbox', { name: '* Telephone' }).fill(phone);
  await page.getByRole('textbox', { name: '* Password', exact: true }).fill(password);
  await page.getByRole('textbox', { name: '* Password Confirm' }).fill(password);
  await page.getByRole('checkbox').check();
  await expect(page.getByRole('checkbox')).toBeChecked();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('h1')).toContainText('Your Account Has Been Created!');
  await expect(page.locator('#content')).toContainText('Congratulations! Your new account has been successfully created!');
  await page.close();

  // Backend validation by opening a isolated browser
  const adminPage = await browser.newPage();
  await adminPage.goto(process.env.Backend_URL!);
  await adminPage.getByRole('textbox', { name: 'Username' }).fill(process.env.Backend_Username!);
  await adminPage.getByRole('textbox', { name: 'Password' }).fill(process.env.Backend_Password!);
  await adminPage.getByRole('button', { name: 'Login' }).click();
  await adminPage.getByText('×').click();
  await adminPage.getByRole('link', { name: ' Customers ' }).click();
  await adminPage.getByRole('link', { name: 'Customers' }).click();
  await adminPage.getByRole('textbox', { name: 'E-Mail' }).fill(email);
  await expect(adminPage.getByRole('textbox', { name: 'E-Mail' })).toHaveValue(email);
  await adminPage.getByRole('button', { name: 'Filter' }).click();
  await expect(adminPage.getByRole('table')).toContainText(email);

  //Database validation vs ui details
  const sql = " SELECT firstname, lastname, email FROM `oc_customer` WHERE email = ? ";
  const dbresult = await executeQuery(sql,[email] as any[] );
  console.log('Database Result',dbresult);
  expect(dbresult).toHaveLength(1);
  expect(dbresult[0].firstname).toBe(firstname);
  expect(dbresult[0].lastname).toBe(lastname);  
  expect(dbresult[0].email).toBe(email);

})
})
