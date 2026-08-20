import { test, expect, Locator } from "@playwright/test";

test('Assignment related to textbox',async ({page})=>{
  /*Input Box Validation: "FirstName"
•Check if the input box is displayed.
•Check if the input box is enabled.
•Validate if it's a mandatory field.
•Verify the placeholder text.
•Enter a name in the input box.
•Retrieve and print the text from the input box.
*/    
  await page.goto('https://demoqa.com/automation-practice-form');
  const firstName:Locator = page.getByRole('textbox', { name: 'First Name' });
  await expect(firstName).toBeVisible();
  await expect(firstName).toBeEnabled();
  await expect(firstName).toHaveAttribute('required');
  await expect(firstName).toHaveAttribute('placeholder','First Name');
  const name = 'Saurav';
  await firstName.fill(name);
  await expect(firstName).toHaveValue(name);
  const enteredValue:string = await firstName.inputValue();
  console.log(`Enteted value into the textbox is ${enteredValue}`);
})

test('Assignment related to radiobutton',async ({page})=>{
  /*Radio Button Validation: "Gender"
Get the status of the "Male" radio button.
•Select the "Male" radio button.
•Retrieve and print the selected status of the "Male" radio button again.
*/    
  await page.goto('https://demoqa.com/automation-practice-form');
  const maleRadioButton:Locator = page.getByLabel('Male',{exact:true});
  console.log('status of Male radio button whether checked true/false:--> ' + await maleRadioButton.isChecked()); 
  await maleRadioButton.check();
  await expect(maleRadioButton).toBeChecked();
  console.log('status of Male radio button whether checked true/false:--> ' + await maleRadioButton.isChecked()); 

})

test('Assignment related to checkbox',async ({page})=>{
  /*Checkbox Validation: "Hobbies"
•Select the checkbox for "Reading".
•Capture all available hobbies and print the count.
•Check all hobbies using a loop.
•Uncheck all hobbies using a loop.
•Check the last 2 hobbies using loop.
•Check the first 2 hobbies using loop.
•Check hobbies randomly using a loop.
•Check hobbies based on values using a switch-case statement.
*/    
  await page.goto('https://demoqa.com/automation-practice-form');
  await page.getByLabel('Reading').check();
  await expect(page.getByLabel('Reading')).toBeChecked();
  const hobbiesLabel:Locator = page.locator('#hobbiesWrapper label.form-check-label');
  console.log(await hobbiesLabel.count());
  console.log(await hobbiesLabel.allTextContents());
  const hobbiesList : Array<string> = await hobbiesLabel.allTextContents();
  const checkboxes = hobbiesList.map(index => page.getByLabel(index))
  //Check all hobbies using a loop.
  for(const checkbox of checkboxes){
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }
  await page.waitForTimeout(3000);
  // Uncheck all hobbies using a loop.
  for(const checkbox of checkboxes){
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  }
  await page.waitForTimeout(3000);
  //Check the last 2 hobbies using loop.
  for(const checkbox of checkboxes.slice(-2)){
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }
  await page.waitForTimeout(3000);
  //Check the first 2 hobbies using loop.
  for(const checkbox of checkboxes.slice(0,2)){
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }
  await page.waitForTimeout(3000);

  //Check hobbies randomly using a loop.
  const hobby: number[] =[1,2];
  for(const i of hobby){
    await checkboxes[i].check();
    await expect(checkboxes[i]).toBeChecked();
  }
  //Check hobbies based on values using a switch-case statement.
  for(const givenHobby of hobbiesList){
    switch (givenHobby.toLowerCase()){
    case 'reading':
    case 'sports':
        await page.getByLabel(givenHobby).check({ force: true });
        await expect(page.getByLabel(givenHobby)).toBeChecked();
        console.log(`Checked hobby via switch: ${givenHobby}`);
        break;
      default:
        console.log(`Skipped hobby via switch: ${givenHobby}`);
        break;
    }
  }

})