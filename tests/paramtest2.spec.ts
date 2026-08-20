import { test, expect } from '@playwright/test';

const logindata:string[][] = [
    ['sauravkmr780@gmail.com','@1Infosys','valid'],
    ['sauravkmr780@gmail.com','@5Infosys','invalid'],
    ['sauravkmr789@gmail.com','@1Infosys','invalid'],
    ['','@1Infosys','invalid'],
    ['sauravkmr789@gmail.com','','invalid'],
    ['','','invalid']
]

//grouping test using decribe block
test.describe('Data driven login test',()=>{
//using for of loop for multidimensional array as foreachonly works with one dimensional array
for(const data of logindata){
    const useremail = data[0];
    const password = data[1];
    const validity = data[2];

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


