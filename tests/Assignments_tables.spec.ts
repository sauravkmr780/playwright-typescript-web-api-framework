import { test, expect, Locator } from "@playwright/test";
/*
Lab 1: Handling Dynamic Web Tables
URL: https://testautomationpractice.blogspot.com/
Objective: Extract and compare process data from a dynamic web table.
Test Scenarios:
•Retrieve the CPU Load value for the Chrome process and compare it against the value displayed in the yellow label.
•Retrieve the Memory Usage value for the Firefox process and compare it against the value displayed in the blue label.
•Retrieve the Network Speed value for the Chrome process and compare it against the value displayed in the orange label.
•Retrieve the Disk Space value for the Firefox process and compare it against the value displayed in the violet label.
*/

test("Validate Handling Dynamic Web Tables", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await expect(page).toHaveURL(/blogspot/);
  //expected Value
const [expectedCpuLoadChrome,expectedMemorySizeFirefox,expectedNetworkSpeedChrome,expectedDiskSpaceFirefox] = await page.locator("div#displayValues strong").allInnerTexts();
  //actual values
  const rows: Locator[] = await page.locator("table#taskTable tbody tr").all();
  for (const row of rows) {
    const extractedData: string[] = await row.locator("td").allInnerTexts();
    if (extractedData[0] === "Chrome") {
      for (const data of extractedData) {
        if (data.includes("%")) {
          expect(data).toEqual(expectedCpuLoadChrome);
        } else if (data.includes("Mbps")) {
          expect(data).toEqual(expectedNetworkSpeedChrome);
        }
      }
    } else if (extractedData[0] === "Firefox") {
      for (const data of extractedData) {
        if (data.includes("MB/s")) {
          expect(data).toEqual(expectedDiskSpaceFirefox);
        } else if (data.includes("MB")) {
          expect(data).toEqual(expectedMemorySizeFirefox);
        }
      }
    }
  }
});


/*
Lab 2: Extract Data from a Paginated Table
URL: https://testautomationpractice.blogspot.com/
Objective: Read and print data from a table that uses pagination.
*/

test('Extract Data from a Paginated Table',async ({page})=>{
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page).toHaveURL(/blogspot/);
  const totalPages:number = await page.locator('ul#pagination li').count();
  console.log('loopCount ',totalPages);
  for(let i =0; i<totalPages ; i++){
    const rows:Locator[] = await page.locator('table#productTable tbody tr').all();
    for(const row of rows){
       const rowData = await row.locator('td').allInnerTexts();
       console.log(rowData);
    }
    if(i<totalPages-1){
    await page.locator('ul#pagination li').nth(i+1).click();
    }
  }
})

/*
Lab 3: BlazeDemo – Flight Booking Automation
Step 1: Launch the Website
•Navigate to https://blazedemo.com/
Step 2: Select Departure and Destination
•Select "Boston" as the departure city and "London" as the destination using the dropdown options.
Step 3: Search for Flights
•Click on the Find Flights button after selecting cities.
Step 4: Capture Flight Prices
•Locate the results table and extract flight prices.
•Store all prices in an array and print the total number of available flights.
Step 5: Identify the Lowest Price
•Sort the array of prices and determine the flight with the lowest fare.
Step 6: Choose the Cheapest Flight
•Find the corresponding table row with the lowest price and click Choose This Flight.
Step 7: Enter Passenger Information
•Fill in the booking form with the following details:
oName: John
oAddress: 1403 American Beauty Ln
oCity: Columbus
oState: OH
oZip Code: 43240
oCredit Card Number: 6789 0673 4523 1267
oCredit Card Year: 2023
oName on Card: John Canedy
•Click the Purchase Flight button.
Step 8: Confirm Purchase
•Validate the success message: "Thank you for your purchase".
•Print "Success !! Passed" if the message appears; otherwise, print "Failed".
*/

test("End-to-End-Flight Booking Automation", async ({ page }) => {
  await page.goto("https://blazedemo.com/");
  await expect(page).toHaveURL("https://blazedemo.com/");
  const fromPortDropdown: Locator = page.locator('select[name="fromPort"]');
  const toPortDropdown: Locator = page.locator('select[name="toPort"]');
  await fromPortDropdown.selectOption("Boston");
  await expect(fromPortDropdown).toHaveValue("Boston");
  await toPortDropdown.selectOption("London");
  await expect(toPortDropdown).toHaveValue("London");
  await page.getByRole("button", { name: "Find Flights" }).click();
  await expect(page.locator("table")).toBeVisible();
  // Find column index dynamically by header name
  const headers = await page.locator("table thead th").allInnerTexts();
  const priceIndex = headers.indexOf("Price");
  console.log(priceIndex);
  const rows = await page.locator("table tbody tr").all();
  const priceTexts: string[] = [];
  for (const row of rows) {
    const cells = await row.locator("td").allInnerTexts();
    priceTexts.push(cells[priceIndex]);
  }
  console.log("Extracted flight prices:", priceTexts);
  /* commented index based filtering
  const priceTexts:string[]=  await page.locator('table tbody tr td:nth-child(7)').allInnerTexts();
  console.log('Extracted flight prices: ',priceTexts);
  */
  const totalAvilableOptions: number = await page.locator("table tbody tr").count();
  console.log("Total available flights is ", totalAvilableOptions);
  const numericPrices = priceTexts.map((priceStr) =>parseFloat(priceStr.replace("$", "").trim()));
  const lowestPrice = Math.min(...numericPrices);
  await page.locator("table tbody tr").filter({ hasText: `${lowestPrice}` }).getByRole("button", { name: "Choose This Flight" }).click();
  const name: Locator = page.getByLabel("Name", { exact: true });
  await name.fill("John");
  await expect(name).toHaveValue("John");
  const address: Locator = page.getByRole("textbox", { name: "Address" });
  await address.fill("1403 American Beauty Ln");
  await expect(address).toHaveValue("1403 American Beauty Ln");
  const city: Locator = page.getByRole("textbox", { name: "City" });
  await city.fill("Columbus");
  await expect(city).toHaveValue("Columbus");
  const state: Locator = page.getByRole("textbox", { name: "State" });
  await state.fill("OH");
  await expect(state).toHaveValue("OH");
  const zipCode: Locator = page.getByRole("textbox", { name: "Zip Code" });
  await zipCode.fill("43240");
  await expect(zipCode).toHaveValue("43240");
  const creditCardNumber: Locator = page.getByRole("textbox", {name: "Credit Card Number"});
  await creditCardNumber.fill("6789 0673 4523 1267");
  await expect(creditCardNumber).toHaveValue("6789 0673 4523 1267");
  const year: Locator = page.getByRole("textbox", { name: "Year" });
  await year.fill("2023");
  await expect(year).toHaveValue("2023");
  const nameOnCard: Locator = page.getByRole("textbox", {name: "Name on Card"});
  await nameOnCard.fill("John Canedy");
  await expect(nameOnCard).toHaveValue("John Canedy");
  await page.getByRole("button", { name: "Purchase Flight" }).click();
  const successMessage = await page.locator("h1").innerText();
  expect(successMessage).toContain("Thank you for your purchase");
  if (successMessage.includes("Thank you for your purchase")) {
    console.log("Success !! Passed");
  } else {
    console.log("Failed");
  }
});