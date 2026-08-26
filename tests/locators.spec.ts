import {test,expect,Locator} from '@playwright/test';

test('Playwright built in locators', async ({page})=>{
   await page.goto('https://sdetqa.vercel.app/pw-locators-demo-app');
/*1. Locate by Role
page.getByRole() finds elements based on how users see them (like button, checkbox, heading).
Playwright comes with multiple built-in locators. To make tests resilient, we recommend prioritizing user-facing attributes and explicit contracts such as page.getByRole().
We recommend prioritizing role locators to locate elements, as it is the closest way to how users and assistive technology perceive the page.
*/
const projectLink: Locator = page.getByRole('link',{name:'Projects'})
await expect(projectLink).toBeVisible();

const signInButton = page.getByRole('button',{name:'Sign In'});
await expect(signInButton).toBeVisible();
await signInButton.click();

/* Locate by Text
We recommend using text locators to find non interactive elements like div, span, p, etc. For interactive elements like button, a, input, etc. use role locators.
*/
const welcomeText = page.getByText('Welcome, John! 👋',{exact:true});//exact match
await expect(welcomeText).toBeVisible();



/* Locate by Label
Use this locator when locating form fields.
*/
const emailField = page.getByLabel('Email Address');
await expect(emailField).toBeVisible();
await emailField.fill('tester@gmail.com');


/* Locate by Placeholder
Use this locator when locating form elements that do not have labels but do have placeholder texts.
*/
const searchTests = page.getByPlaceholder('Search tests...');
await expect(searchTests).toBeVisible();
await searchTests.fill('placeholder practice');


/* Locate by alt text
Use this locator when your element supports alt text such as img and area elements.
*/

const playwrightLogo = page.getByAltText('Playwright logo');
await expect(playwrightLogo).toBeVisible();

/* Locate by Title
Use this locator when your element has the title attribute.
*/

const totalRunsBox = page.getByTitle('Total test runs');
await expect(totalRunsBox).toBeVisible();
await expect(totalRunsBox).toContainText('4,821');
await expect(totalRunsBox).toHaveText('4,821Total Runs');

/*Locate by test id
You can also use test ids when you choose to use the test id methodology or when you can't locate by role or text.
*/

const proPlanButton = page.getByTestId('add-to-cart-pro');
await proPlanButton.click();
await expect(proPlanButton).toBeVisible();

})