/*
Locator- identifies the element of the page.
DOM - Document Object Model.
DOM is an API interface provided by browser.

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
*/


import {test,expect, Locator} from '@playwright/test'

test('Verify playwright built in locators',async({page})=>{
   await page.goto('https://demo.nopcommerce.com/');
   //page.getByAltText() to locate an element, usually image, by its text alternative.
   const logo:Locator  =  page.getByAltText('nopCommerce demo store');
   await expect(logo).toBeVisible();

   //Find an element by the text it contains. You can match by a substring, exact string, or a regular expression when using page.getByText().
   //generally used for non interactive elements like... div,span,p,h2 etc
   //const header:Locator = page.getByText('Welcome to our store');
   await expect(page.getByText('Welcome to our store')).toBeVisible();//full string
   await expect(page.getByText('Welcome to ')).toBeVisible();//sub string, partial text
   await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible();//regular expression text start with / and space \s , i for ignore case

   /*The page.getByRole() locator reflects how users and assistive technology perceive the page, for example whether some element is a button or a checkbox. 
   When locating by role, you should usually pass the accessible name as well, so that the locator pinpoints the exact element.*/
   await page.getByRole('link',{name:'REGISTER'}).click();
   await expect(page.getByRole('heading',{name:'Register'})).toBeVisible();

   //page.getByLabel() to locate a form control by associated label's text.
   await page.getByLabel('First name:').fill('Saurav');
   await page.getByLabel('Last name:').fill('Kumar');
   await page.getByLabel('Email:').fill('abc@gmail.com');

   //page.getByPlaceholder() to locate an input by placeholder.
   await page.getByPlaceholder('Search store').fill('Apple iphone17 pro');
})

test('Verify playwright built in locators getByTitle and getByTestId',async({page})=>{
   await page.goto('file:///C:/Users/Saura/Downloads/app.html');
   //page.getByTitle() to locate an element by its title attribute.
   await expect(page.getByTitle('HyperText Markup Language')).toHaveText('HTML');

   //page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
   await expect(page.getByTestId('profile-email')).toHaveText('john.doe@example.com');
   await page.getByTestId('edit-profile-btn').click();

   /*Set a custom test id attribute
By default, page.getByTestId() will locate elements based on the data-testid attribute, but you can configure it in your test config or by calling selectors.setTestIdAttribute().
In your html you can now use data-pw as your test id instead of the default data-testid.

<button data-pw="directions">Itinéraire</button>

And then locate the element as you would normally do:
await page.getByTestId('directions').click();

Set the test id to use a custom data attribute for your tests.

playwright.config.ts

export default defineConfig({
  use: {
    testIdAttribute: 'data-pw'
  }
});
*/
})