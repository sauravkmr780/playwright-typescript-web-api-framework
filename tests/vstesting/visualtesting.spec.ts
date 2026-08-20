import {test,expect} from '@playwright/test';

test('test 1 ',async ({page})=>{
  await page.goto('https://demowebshop.tricentis.com/');  
  //await page.goto('https://demowebshop.tricentis.com/register');
  //compare snapshot of the page
  //approach 1
  expect(await page.screenshot()).toMatchSnapshot('homepage.png');

  //approach 2
  //await expect(page).toHaveScreenshot();

  //compare snapshot of the element
  expect(await page.getByAltText('Tricentis Demo Web Shop').screenshot()).toMatchSnapshot('logo.png');
})