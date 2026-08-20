import {test,expect} from'@playwright/test';

test('Multi select dropdown validation', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  //1 Select option from dropdown(4 ways)
  await page.getByRole('listbox',{name:'Colors:'}).selectOption(['Red','Green','Yellow']);//using visible text
  //await page.getByRole('listbox',{name:'Colors:'}).selectOption([{value:'white'},{value:'blue'}]);//using value
  //await page.getByRole('listbox',{name:'Colors:'}).selectOption([{label:'Red'},{label:'Yellow'}]);//using label 
  //await page.getByRole('listbox',{name:'Colors:'}).selectOption([{index:1},{index:3}]);//using index value

  //2 Check number of options in dropdown
  console.log('Number of total option available in multi select dropdown is ' + await page.getByRole('listbox',{name:'Colors:'}).locator('option').count());
   expect(await page.getByRole('listbox',{name:'Colors:'}).locator('option').count()).toBe(7) 
  //3 Check option present or not
  const options:Array<string> = await page.getByRole('listbox',{name:'Colors:'}).locator('option').allTextContents();
  //console.log(options);//comes with /n and white spaces
  //Removing extra white spaces using trim , hence modification of array needed , using map
  const correctOptions:Array<string> = options.map(index=> index.trim());
  console.log(correctOptions);
  if(correctOptions.includes('White')){
  console.log('Value present');
  }
  else{
  console.log('Value absent');
  }


  //4 Print options from the dropdown
  for (let data of correctOptions){
    console.log(data);
  }
//   for (let i in correctOptions){
//     console.log(correctOptions[i]);
//   }

});