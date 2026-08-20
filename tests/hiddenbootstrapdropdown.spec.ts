import{test,expect} from '@playwright/test';

test('Validation on hidden bootstrap dropdown list',async ({page})=>{
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.locator('form i').nth(2).click();
  await page.waitForTimeout(2000);
  //print all available options
  const availableText:string[] = await page.locator('[role="listbox"] div span').allTextContents();
  console.log(availableText);
  //select an option
  await page.getByText('Chief Financial Officer',{exact: true}).click();
})