import{test,expect, Locator} from '@playwright/test'

test('Static dropdowns',async ({page})=>{
    //single select element 
    await page.goto('https://testautomationpractice.blogspot.com/');
    //visible text
    await page.getByRole('combobox',{name:'Country:'}).selectOption('Canada');
    //single selection matching the value 
    await page.getByRole('combobox',{name:'Country:'}).selectOption({value:'uk'});
    //single selection matching the label
    await page.getByRole('combobox',{name:'Country:'}).selectOption({ label: 'India' });
    //single selection using index value
    await page.getByRole('combobox',{name:'Country:'}).selectOption({ index: 3 });
    //Validate germany is selected 
    await expect(page.getByRole('combobox',{name:'Country:'})).toHaveValue('germany');
    //count number of option from dropdown
    const dropdownOptions:Locator = page.locator('select#country option');
    console.log(await dropdownOptions.count())
    expect(await dropdownOptions.count()).toEqual(10);

    //check an option present or not
    // for (let i =0 ; i < await dropdownOptions.count() ; i++ ){
    //     let text = await dropdownOptions.nth(i).innerText();
    //     if(text.trim()==='France'){
    //       console.log('Value present');
    //       break;
    //     }
    //     else{
    //       console.log('Value absent');
    //     }
    // }

    // another way
    const textPresents:Array<string> = (await dropdownOptions.allTextContents()).map(i => i.trim());
    console.log(textPresents);
    expect(textPresents).toContain('France');

    //Print all the options present in dropdown
    const textavailable:Array<string> = (await dropdownOptions.allTextContents()).map(i => i.trim());
    for (const data of textavailable){
        console.log(data);
    }
})