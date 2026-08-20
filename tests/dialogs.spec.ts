import {test,expect} from '@playwright/test';
/*
By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them.
However, you can register a dialog handler before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it.
Dialogs are JavaScript pop-ups like alert, confirm, and prompt.
Common Dialog Types
•alert(): Displays a message with an OK button.
•confirm(): Displays a message with OK and Cancel buttons.
•prompt(): Asks for user input.

The difference between page.on and page.once in Playwright comes down to how many times the event listener stays active:
page.on (Persistent Listener): Listens for the specified event continuously until the page closes or you manually unbind it. Every single time the event fires, the callback function executes.
page.once (One-Time Listener): Listens for the specified event exactly once. As soon as the event fires for the first time, Playwright runs the callback and automatically removes the listener.

*/
test('Handling an alert() Dialog',async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    //Event listener
    page.on('dialog',(dialog) => {
         console.log('dialog type is', dialog.type());//returns type of dialog
         expect(dialog.type()).toContain('alert');
         console.log('dialog text : ',dialog.message())//returns dialog message
         expect(dialog.message()).toContain('I am an alert box!');
        dialog.accept();
    });
    await page.getByRole('button',{name:'Simple Alert'}).click();
})

test('Handling an confirmation alert() Dialog with accept',async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    //Event listener
    page.on('dialog', (dialog) => {
        console.log('dialog type is', dialog.type());//returns type of dialog
        expect(dialog.type()).toContain('confirm');
        console.log(dialog.message());
        dialog.accept();
    });
    await page.getByRole('button',{name:'Confirmation Alert'}).click();
    await expect(page.locator('p#demo')).toHaveText('You pressed OK!');
})

test('Handling an confirmation alert() Dialog with dismiss',async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    //Event listener
    page.on('dialog',  (dialog) => {
        console.log('dialog type is', dialog.type());//returns type of dialog
        expect(dialog.type()).toContain('confirm');
        console.log(dialog.message());
         dialog.dismiss();
    });
    await page.getByRole('button',{name:'Confirmation Alert'}).click();
    await expect(page.locator('p#demo')).toHaveText('You pressed Cancel!');
})

test('Handling a prompt() Dialog with Input',async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    //Event listener
    const newName = 'Saurav Kumar';
    page.on('dialog',  (dialog) => {
        console.log('dialog type is', dialog.type());//returns type of dialog
        expect(dialog.type()).toContain('prompt');
        expect(dialog.defaultValue()).toBe('Harry Potter');
        console.log(dialog.message());
        expect(dialog.message()).toContain('Please enter your name:');
        dialog.accept(`${newName}`);
    });
    await page.getByRole('button',{name:'Prompt Alert'}).click();
    await expect(page.locator('p#demo')).toHaveText(`Hello ${newName}! How are you today?`);
})
