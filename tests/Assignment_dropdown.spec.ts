import { test, expect, Locator  } from "@playwright/test";

test('Verify Product Sorting and Information Retrieval',async ({page})=>{
   //Navigate to the Webpage:
   await page.goto('https://www.bstackdemo.com/');
   //Interact with the "Order by" Dropdown:
   const selectDropdown:Locator = page.locator('#__next > div > div > main > div.shelf-container > div.shelf-container-header > div.sort > select');
   await expect(selectDropdown).toBeVisible();
   await expect(selectDropdown).toBeEnabled();
   await selectDropdown.selectOption({value:'lowestprice'});
   await expect(selectDropdown).toHaveValue('lowestprice');
   await page.waitForTimeout(5000);
   //Retrieve and Print Product Information:
   const productPriceList: string[] = await page.locator('.shelf-item__price div.val b').allTextContents();
   console.log(productPriceList);
   const productNameList: string[] = await page.locator('p.shelf-item__title').allTextContents();
   console.log(productNameList);
   expect(productPriceList.length).toEqual(productNameList.length);

   for (let i =0 ; i <productNameList.length; i++){
      console.log(`Product Name is ${productNameList[i]} and its price is ${productPriceList[i]}`);
   }
   //Identify and Print the Lowest Priced Product:
   console.log(`Lowest priced Product Name is ${productNameList[0]} and its price is ${productPriceList[0]}`);
   //Identify and Print the Highest Priced Product:
   console.log(`Highest priced Product Name is ${productNameList[productNameList.length-1]} and its price is ${productPriceList[productPriceList.length-1]}`);

})