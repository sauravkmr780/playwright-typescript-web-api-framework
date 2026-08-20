import {test,expect,Page,Locator}  from '@playwright/test';

test('Boot strap date picker', async ({page})=>{
   await page.goto('https://www.booking.com/');
   await page.getByRole('button',{name:'Dismiss sign-in info.'}).click();
   const checkInDate:Locator = page.getByRole('button',{name:'Select dates Check-in date — Check-out date'});
   await checkInDate.click();
   const nextMonthButton = page.getByRole('button',{name:'Next month'});
   await expect(nextMonthButton).toBeVisible();
   const checkinYear = '2026';
   const checkinMonth = 'August';
   const checkindate='22';
   //check in date
   await selectDate(page,checkindate, checkinMonth, checkinYear);
   const checkOutYear = '2026';
   const checkOutMonth = 'August';
   const checkOutdate='27';
   //check out date
   await selectDate(page, checkOutdate, checkOutMonth, checkOutYear);

})

async function selectDate(page:Page, date:string, month:string, year:string) {
   const nextMonthButton = page.getByRole('button',{name:'Next month'});
   while(true)
   {
    const yearMonth = await page.locator('#calendar-searchboxdatepicker h3').nth(0).innerText();
    const currentYear = yearMonth.split(' ')[1].trim();
    const currentMonth = yearMonth.split(' ')[0].trim();

    if(currentYear === year && currentMonth ===month){
        break;
    }
    else{
        await nextMonthButton.click();
    }
   }
   //select date
   const dateSection:Locator[] = await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all();
   for(const dt of dateSection){
    const dateText = await dt.innerText();
    if(dateText ===date){
        await dt.click();
        break;
    }
   }
}
//=============================================================================================
//Another better way prod ready code to avoid indexing 
/*import { test, expect, Page, Locator } from '@playwright/test';

test('Booking.com Date Picker Automation', async ({ page }) => {
  await page.goto('https://www.booking.com/');

  // Dismiss sign-in popup if present
  const dismissBtn = page.getByRole('button', { name: 'Dismiss sign-in info.' });
  if (await dismissBtn.isVisible()) {
    await dismissBtn.click();
  }

  // Open calendar
  const checkInDateBtn = page.getByRole('button', { name: /Select dates|Check-in date/i });
  await checkInDateBtn.click();

  const nextMonthButton = page.getByRole('button', { name: 'Next month' });
  await expect(nextMonthButton).toBeVisible();

  // Select Check-in: August 22, 2026
  await selectDate(page, '2026-08-22', 'August 2026');

  // Select Check-out: August 27, 2026
  await selectDate(page, '2026-08-27', 'August 2026');
});

/**
 * Robust date selection handling multi-month view via Booking's data-date attributes
 */
/*
async function selectDate(page: Page, targetDateStr: string, targetMonthYear: string) {
  const nextMonthBtn = page.getByRole('button', { name: 'Next month' });

  // 1. Navigate until target month (e.g., "August 2026") is visible in EITHER month container
  while (true) {
    const visibleHeaders = await page.locator('#calendar-searchboxdatepicker h3').allInnerTexts();

    // Check if the target month is visible in either left or right container
    const isVisible = visibleHeaders.some(header => header.includes(targetMonthYear));

    if (isVisible) {
      break;
    }

    await nextMonthBtn.click();
  }

  // 2. Click the date directly using Booking's reliable data-date attribute (e.g., data-date="2026-08-22")
  const dateCell = page.locator(`span[data-date="${targetDateStr}"]`);
  await dateCell.click();
}*/
