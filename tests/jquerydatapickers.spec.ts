import {test,expect,Locator,Page} from '@playwright/test';

test('jQuery type Date picker validation',async ({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/');
   await expect(page).toHaveURL(/blogspot/);
   await page.locator('input#datepicker').click();
   const expectedyear = '2025';
   const expectedmonth = 'January';
   const expecteddate = '1';
   const previousLink:Locator = page.getByText('Prev', { exact: true });
   const nextLink:Locator = page.getByRole('link',{name:'Next'});

  /*
   let yearflag = true;
   while(yearflag)
    {
    const actualyear = await page.locator('span.ui-datepicker-year').innerText();
    if(expectedyear < actualyear){
        await previousLink.click();
    }
    else{
        yearflag=false;
    }
   }

   let monthflag= true;
   while(monthflag)
    {
    const actualmonth = await page.locator('span.ui-datepicker-month').innerText();
    console.log(actualmonth);
    if(expectedmonth !== actualmonth){
        await previousLink.click();
    }
    else{
        monthflag=false;
    }

   }
   await page.locator('table.ui-datepicker-calendar tbody td').getByText(expecteddate,{exact:true}).click();
   await expect(page.locator('input#datepicker')).toHaveValue('01/01/2025');
   */
   //2nd approach
  while(true){
    const actualyear = await page.locator('span.ui-datepicker-year').innerText();
    const actualmonth = await page.locator('span.ui-datepicker-month').innerText();
    if(actualyear===expectedyear && actualmonth===expectedmonth){
        break;
    }
    else{
        await previousLink.click();
    }
  }
   await page.locator('table.ui-datepicker-calendar tbody td').getByText(expecteddate,{exact:true}).click();
   await expect(page.locator('input#datepicker')).toHaveValue('01/01/2025');
})

test('jQuery Date picker',async ({page})=>{
   await page.goto('https://testautomationpractice.blogspot.com/');
   await expect(page).toHaveURL(/blogspot/);
   const inputDate:Locator = page.locator('input#datepicker');
   await expect(inputDate).toBeVisible();
   //Approach 1 using fill
   /*
   await inputDate.fill('10/03/2026');
   await expect(inputDate).toHaveValue('10/03/2026');
   */
    //Approach 2 using a single custom function
    //future date
    await selectDate('2027','October','3',page,true);
    await expect(inputDate).toHaveValue('10/03/2027');
    //past date
    //await selectDate('2024','October','3',page,false);
    //await expect(inputDate).toHaveValue('10/03/2024');
    //current date
    //await selectDate('2026','August','2',page,false);    
    //await expect(inputDate).toHaveValue('08/02/2026');
})


async function selectDate(targetYear:string, targetMonth:string, targetDate:string , page:Page, isFuture:boolean) {
   const inputDate:Locator = page.locator('input#datepicker');
   const previousLink:Locator = page.getByText('Prev', { exact: true });
   const nextLink:Locator = page.getByText('Next', { exact: true });
   await inputDate.click();
   while(true){
    const currentMonth = await page.locator('span.ui-datepicker-month').innerText();
    const currentYear = await page.locator('span.ui-datepicker-year').innerText();
    //current year and month
    if(currentMonth === targetMonth && currentYear ===targetYear){
     break;
    }
    //future year and month
    if(isFuture){
    await nextLink.click();
    }
    //previous year and month
    else {
     await previousLink.click();
    }
   }
   //select date
   const dates:Locator[] = await page.locator('table.ui-datepicker-calendar tbody td').all()
   for( let dt of dates){
       const dateText:string = await dt.innerText();
       if(dateText===targetDate){
        await dt.click();
        break;
       }
   }
}
