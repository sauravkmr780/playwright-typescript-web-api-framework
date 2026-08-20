import { test, expect, Locator  } from "@playwright/test";

test('Assignment 1: Drang and Drop',async ({page})=>{
    await page.goto('https://demo.guru99.com/test/drag_drop.html');
    //draggable
    const dbAccount = page.getByText('BANK', { exact: true });
    const dbAmount = page.getByText('5000').nth(1);
    const crAccount = page.getByText('SALES', { exact: true });
    const crAmount = page.getByText('5000').nth(3);
    
    //droppable
    const dbbankaccount = page.locator('ol#bank');
    const dbbankamount = page.locator('ol#amt7');
    const crbankaccount = page.locator('ol#loan');
    const crbankamount = page.locator('ol#amt8');

    //drag and drop
    await dbAccount.dragTo(dbbankaccount);
    await dbAmount.dragTo(dbbankamount);
    await crAccount.dragTo(crbankaccount);
    await crAmount.dragTo(crbankamount);

    //after drop validation
    const afterdrop = await page.locator('a.button.button-green').first().innerText();
    expect(afterdrop).toContain('Perfect!');
})

test('Assignment 2: Find Total Number of Books available on the Scrolling Page.',async ({page})=>{
     await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');

  test.slow(); 

  let bookFound = false;
  let previousHeight = 0;

  while (true) {
    
    // Scroll to the bottom
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait for new content to load
    await page.waitForTimeout(2000);
  
    // Get current scroll height
    const currentHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    });

    console.log("==============================")
    console.log(`Previous height: ${previousHeight}`);
    console.log(`Current height: ${currentHeight}`);

    // Check if end of page is reached
    if (currentHeight === previousHeight) {
      break;
    }

    previousHeight = currentHeight;
  }
  
  console.log('*********  Reached end of page  ********');

        // Get all book titles currently loaded on the page
  const bookList:Array<string> = await page.locator('#productsDiv h3').allInnerTexts();
  console.log('Total Number of Books available on the Scrolling Page:-> ',bookList.length);

})