import{test,expect, Locator} from '@playwright/test';
import{faker} from '@faker-js/faker';


//Textbox
//Radio buttons

test('Text input actions validation',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    //testdata setup
    const name:string = faker.helpers.fromRegExp(/[A-Z][a-z]{3,6} [A-Z][a-z]{3,6}/);
    const email:string = `${faker.string.alphanumeric(5)}@test.com`;
    const phone:string = faker.phone.number({ style: 'national' }).replace(/\D/g, '');;
    const address:string = faker.location.postalAddress();
    //locator setup
    const enterName:Locator = page.getByRole('textbox',{name:'Enter Name'});
    const enterEmail:Locator = page.getByPlaceholder('Enter EMail');
    const enterPhone:Locator = page.getByPlaceholder('Enter Phone');
    const enterAddress:Locator = page.getByRole('textbox',{name:'Address:'});
    //assertions
    await expect(enterName).toBeVisible();
    await expect(enterName).toBeEnabled();
    const maxlength:string|null = await enterName.getAttribute('maxlength');
    console.log(maxlength);
    expect(maxlength).toBe('15');
    await expect(enterName).toHaveAttribute('maxlength','15');
    await enterName.fill(name);
    const enteredName:string  = await enterName.inputValue();//inputValue() method return value from textbox
    console.log(`Entered Name Value is ${enteredName}`);
    await expect(enterName).toHaveValue(name);
    await enterEmail.fill(email);
    await expect(enterEmail).toHaveValue(email);
    await enterPhone.fill(phone);
    await expect(enterPhone).toHaveValue(phone);
    await enterAddress.fill(address);
    await expect(enterAddress).toHaveValue(address);
})

test('Radio buttons actions validation',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    //locator setup
    const radioMale:Locator = page.getByLabel('Male', {exact: true});
    const radioFemale:Locator = page.getByLabel('Female', {exact: true});

    //assertions
    await expect(radioMale).toBeVisible();
    if(!(await radioMale.isChecked())){
     await radioMale.check();
     await expect(radioMale).toBeChecked();
    }
    else{
     await radioMale.uncheck();
     await expect(radioMale).not.toBeChecked();
     await radioFemale.check();
     await expect(radioFemale).toBeChecked();
    }

})

test('Checkbox actions validation',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    //locator setup
    const allCheckbox:Locator = page.locator('input.form-check-input[type="checkbox"]');
    const sundayLabel:Locator = page.getByLabel('Sunday');

    //assertions
    //Select a specific checkbox
    // await sundayLabel.check();
    // await expect(sundayLabel).toBeChecked();
    // const totalCheckboxes = await allCheckbox.count();
    //console.log(totalCheckboxes);//7
    //Select all checkboxes
    /*
    for(let i=0 ; i <totalCheckboxes; i++){
        await allCheckbox.nth(i).check();
        await expect(allCheckbox.nth(i)).toBeChecked();
    }*/
    //Uncheck last 3 checkboxes
    /*
    for(let i=0 ; i <totalCheckboxes-3; i++){
        await allCheckbox.nth(i).check();
        await expect(allCheckbox.nth(i)).toBeChecked();
    }*/


    //2nd way - Select all checkboxes and assert each is checked or not
    const days:Array<string> = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const checkboxes:Array<Locator> = days.map(index => page.getByLabel(index));
    for (let checkbox of checkboxes){
       await checkbox.check();
       await expect(checkbox).toBeChecked();
    }
    await page.waitForTimeout(3000);//adding wait to see realtime execution

    //Last 3 uncheck box selection and validation
    for (let checkbox of checkboxes.slice(-3)){
       await checkbox.uncheck();
       await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(3000);

    //Toggle checkboxes - if checked pls uncheck , else uncheck , pls check and assert. 
    for (let checkbox of checkboxes){
        if(await checkbox.isChecked()){
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
        }
        else{
        await checkbox.check();
        await expect(checkbox).toBeChecked(); 
        }
    }
    await page.waitForTimeout(3000);

    //Select by specific indexes (e.g. 1, 3, 6)
    const indexes: number[] = [1,3,6]
    for(let i of indexes){
        await checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked(); 
    }
    await page.waitForTimeout(3000);
    //Select checkbox by label name , eg..select checkbox if day is Friday
    const weekday = 'Friday';
    for (let i of days){
        if(i.toLocaleLowerCase() === weekday.toLowerCase()){
        const checkbox = page.getByLabel(i);
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        } 
    }
    await page.waitForTimeout(3000);

})