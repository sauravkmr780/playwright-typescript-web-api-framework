import {test,expect, Locator, Page} from '@playwright/test';

//Reusable function setup
async function selectDate(page:Page,inputDate:string) {
    const datesAvilableValue:Locator[] = await page.locator('table.ui-datepicker-calendar tbody td[data-event="click"]').all();
    for( const dt of datesAvilableValue){
         const dateText = await dt.innerText();
        if(dateText===inputDate){
            await dt.click();
            break;
        }
    }
}

type ShortMonth = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
const monthMap: Record<ShortMonth, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04',
  May: '05', Jun: '06', Jul: '07', Aug: '08',
  Sep: '09', Oct: '10', Nov: '11', Dec: '12'
};

function convertMonth(month: ShortMonth): string {
  return monthMap[month];
}

type LongMonth = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
const monthLongMap: Record<LongMonth, string> = {
  January: '01', February: '02', March: '03', April: '04',
  May: '05', June: '06', July: '07', August: '08',
  September: '09', October: '10', November: '11', December: '12'
};

function convertLongMonth(month: LongMonth): string {
  return monthLongMap[month];
}


async function dateSelection(page:Page,inputDate:string,inputMonth:string,inputYear:string) {
  await page.locator('select.ui-datepicker-month').selectOption({label:inputMonth});
  const monthSelected:string = await page.locator('select.ui-datepicker-month').locator('option[selected="selected"]').innerText();
  expect(monthSelected).toEqual(inputMonth);
  await page.locator('select.ui-datepicker-year').selectOption({label:inputYear});
  const yearSelected:string = await page.locator('select.ui-datepicker-year').locator('option[selected="selected"]').innerText();
  expect(yearSelected).toEqual(inputYear);
  //select date
  const datesOption:Locator[] = await page.locator('table.ui-datepicker-calendar tbody').locator('td[data-event="click"]').all();
  for( const dt of datesOption){
      const dateText = await dt.innerText();
      if(dateText===inputDate){
        await dt.click();
      }
  }
}

//*********************Code starts here********************************* */

test('Lab Assignment 1: jQuery Date Picker (Contains Drop Downs)',async ({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/')
  await expect(page).toHaveURL(/blogspot/);
  const year:string ='2027';
  const month:string ='Dec';
  const date:string = '31';
  const convertDateFormat = date.padStart(2,'0');
  const convertMonthFormat = convertMonth('Dec');

  await expect(page.locator('input#txtDate')).toBeVisible();
  await page.locator('input#txtDate').click();
  const defaultMonth:string = await page.getByRole('combobox',{name:'Select month'}).locator('option[selected="selected"]').innerText();
  const defaultYear:string = await page.getByRole('combobox',{name:'Select year'}).locator('option[selected="selected"]').innerText();
  
  if(defaultMonth === month && defaultYear === year){
    //select date
    await selectDate(page,date);
  }
  else{
    await page.getByRole('combobox',{name:'Select month'}).selectOption({label:month});
    await page.getByRole('combobox',{name:'Select year'}).selectOption({label:year});
    await selectDate(page,date);
  }
  await expect(page.locator('input#txtDate')).toHaveValue(`${convertDateFormat}/${convertMonthFormat}/${year}`);

})

test('Lab Assignment 2: Select Date Range (using fill())',async ({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/')
  await expect(page).toHaveURL(/blogspot/);
  await page.getByPlaceholder('Start Date').fill('1993-11-12');
  await expect(page.getByPlaceholder('Start Date')).toHaveValue('1993-11-12');
  await page.getByPlaceholder('End Date').fill('1997-03-26');
  await expect(page.getByPlaceholder('End Date')).toHaveValue('1997-03-26');
})

test('Lab Assignment 3: Dummy Ticket Booking',async ({page})=>{
  await page.goto('https://www.dummyticket.com/dummy-ticket-for-visa-application/');
  await page.locator('#product_549').check();
  await expect(page.locator('#opc-messages')).toContainText('"Dummy ticket for Visa Application" added to your order. Complete your order below.');
  await page.getByRole('textbox', { name: 'First / Given name' }).fill('Akash');
  await expect(page.getByRole('textbox', { name: 'First / Given name' })).toHaveValue('Akash');
  await page.getByRole('textbox', { name: 'Last / Surname' }).fill('Ratore');
  await expect(page.getByRole('textbox', { name: 'Last / Surname' })).toHaveValue('Ratore');
  //dob date - date picker
  const dobYear = '2001';
  const dobMonth = 'Mar';
  const dobDate = '2';
  const convertedMonthValue = convertMonth(`${dobMonth}`);
  const convertedDateValue = dobDate.padStart(2,'0');
  await page.locator('#dob').click();
  await dateSelection(page,dobDate,dobMonth,dobYear);
  await expect(page.locator('#dob')).toHaveValue(`${convertedDateValue}/${convertedMonthValue}/${dobYear}`);
  await page.getByRole('radio', { name: 'Male', exact: true }).check();
  await expect(page.getByRole('radio', { name: 'Male', exact: true })).toBeChecked();
  await page.getByRole('radio', { name: 'One Way' }).check();
  await expect(page.getByRole('radio', { name: 'One Way' })).toBeChecked();;
  await page.getByRole('textbox', { name: 'From city / Origin' }).fill('Toronto');
  await expect(page.getByRole('textbox', { name: 'From city / Origin' })).toHaveValue('Toronto');
  await page.getByRole('textbox', { name: 'To city. /Dest.' }).fill('Mumbai');
  await expect(page.getByRole('textbox', { name: 'To city. /Dest.' })).toHaveValue('Mumbai');
  //Departure Date - date picker
  await page.locator('#departon').click();
  const departYear = '2026';
  const departMonth = 'Sep';
  const departDate = '15';
  const converteddepartMonthValue = convertMonth(`${departMonth}`);
  const converteddepartDateValue = departDate.padStart(2,'0');
  await dateSelection(page,departDate,departMonth,departYear);
  await expect(page.locator('#departon')).toHaveValue(`${converteddepartDateValue}/${converteddepartMonthValue}/${departYear}`);
  await page.getByRole('textbox', { name: 'Additional information (' }).fill('Need visa as soon as possible');
  await expect(page.getByRole('textbox', { name: 'Additional information (' })).toHaveValue('Need visa as soon as possible');
  await page.locator('#select2-reasondummy-container').click();
  await page.getByRole('option', { name: 'Visa application' }).click();
  await expect(page.locator('#select2-reasondummy-container')).toContainText('×Visa application');
  //appointment Date - date picker
  await page.locator('#appoinmentdate').click();
  const appntYear = '2024';
  const appntMonth = 'Dec';
  const appntDate = '10';
  const convertedApptMonthValue = convertMonth(`${appntMonth}`);
  const convertedApptDateValue = appntDate.padStart(2,'0');
  await dateSelection(page,appntDate,appntMonth,appntYear);
  await expect(page.locator('#appoinmentdate')).toHaveValue(`${convertedApptDateValue}/${convertedApptMonthValue}/${appntYear}`);
  await page.getByRole('radio', { name: 'Email' }).check();
  await expect(page.getByRole('radio', { name: 'Email' })).toBeChecked();
  await page.getByRole('textbox', { name: 'Billing Name / Company (' }).fill('Akash Rathore');
  await expect(page.getByRole('textbox', { name: 'Billing Name / Company (' })).toHaveValue('Akash Rathore');
  await page.getByRole('textbox', { name: 'Street address' }).fill('123 Scott Street');
  await expect(page.getByRole('textbox', { name: 'Street address' })).toHaveValue('123 Scott Street');
  await page.getByRole('textbox', { name: 'Town / City' }).fill('Niagara Falls');
  await expect(page.getByRole('textbox', { name: 'Town / City' })).toHaveValue('Niagara Falls');
  await page.getByRole('textbox', { name: 'Postcode' }).fill('L2C 6M1');
  await expect(page.getByRole('textbox', { name: 'Postcode' })).toHaveValue('L2C 6M1');
  await page.getByRole('textbox', { name: 'Email address' }).fill('abc.123@gmail.com');
  await expect(page.getByRole('textbox', { name: 'Email address' })).toHaveValue('abc.123@gmail.com');
  await page.getByRole('textbox', { name: 'Phone ' }).fill('+12345678956');
  await expect(page.getByRole('textbox', { name: 'Phone ' })).toHaveValue('+12345678956');
  await page.locator('#select2-billing_state-container').click();
  await page.getByRole('option', { name: 'Ontario' }).click();
  await expect(page.locator('#select2-billing_state-container')).toContainText('Ontario');
  await page.locator('#select2-billing_country-container').click();
  await page.getByRole('option', { name: 'Canada' }).click();
  await expect(page.locator('#select2-billing_country-container')).toContainText('Canada');
  
  //verify product details
  const selectedRadioOption = await page.locator('.product-item.selected').innerText();
  const expectedproductDetaiils:string = selectedRadioOption.split('—')[0].trim();
  const actualProduct = await page.locator('table.shop_table tbody td.product-name .product-details').innerText();
  expect(actualProduct).toEqual(expectedproductDetaiils);
  const expectedpriceDetaiils:string = selectedRadioOption.split('—')[1].trim();
  const actualPrice = await page.locator('table.shop_table tbody td.product-total').innerText();
  expect(actualPrice).toEqual(expectedpriceDetaiils);
})

test('Lab Assignment: 4: IRCTC',async ({page})=>{
 await page.goto('https://www.irctc.co.in/nget/train-search');
 await expect(page).toHaveURL(/train-search/);
 await page.locator('button[type="submit"]:nth-child(2)').click();
 await page.getByRole('textbox').click();

 const year='2026';
 const month = 'October';
 const date = '15';

 const formattedDate = date.padStart(2,'0');
 const formattedMonth = convertLongMonth('October');


 while(true)
  {
  const currentMonth = await page.locator('span.ui-datepicker-month').innerText();
  const currentYear = await page.locator('span.ui-datepicker-year').innerText();
   if(currentMonth === month && currentYear ===year){
    break;
   }
   else{
    await page.locator('a.ui-datepicker-next').click();
   }
  }
  //Select date
  const datevalues:Locator[] = await page.locator('table tbody tr td a.ui-state-default').all();
  for(const dt of datevalues){
    const text = await dt.innerText();
    if(text===date){
    await dt.click();
    break;
    }
  }

  //assert  date selection is correct
   await expect(page.getByRole('textbox')).toHaveValue(`${formattedDate}/${formattedMonth}/${year}`);

})


