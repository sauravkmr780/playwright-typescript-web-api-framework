import {test,expect} from '@playwright/test';
/*
Automatic Scrolling (Default Behavior):
Playwright is smart enough to automatically scroll elements into view before interacting with them. 
So in most cases, you don't need to scroll manually.
*/
test('Scrolling down to bottom automatically in playwright', async ({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByText('Powered by nopCommerce', { exact: true }).click();
})

test('Scrolling inside dropdown', async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('input#comboBox').click();
    await page.getByText('Item 45').click();
    await expect(page.locator('input#comboBox')).toHaveValue('Item 45')
})

test('Scrolling inside table', async ({page})=>{
    await page.goto('https://datatables.net/examples/core/basic_init/scroll_xy.html');
    const lastname = await page.locator('table#example tbody tr td:nth-child(2)').last().innerText();
    expect(lastname).toEqual('Kelly');
    const lastemail = await page.locator('table#example tbody tr td:nth-child(9)').last().innerText();
    expect(lastemail).toEqual('c.kelly@datatables.net');
})