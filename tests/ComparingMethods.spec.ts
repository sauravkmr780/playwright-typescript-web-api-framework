import { test, expect, Locator } from "@playwright/test";

test("Comparing methods", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com/");
  //const productTitle: Locator = page.locator("h2.product-title");
  //using innertext()
  //   for(let i =0; i <await productTitle.count(); i++){
  //      console.log(await productTitle.nth(i).innerText());
  //   }
  //using textContent()
  //   for(let i =0; i <await productTitle.count(); i++){
  //      console.log(await productTitle.nth(i).textContent());
  //   }
  //using allInnerTexts method
//   const allTexts2: string[] = await productTitle.allInnerTexts();
//   console.log(allTexts2);
  //using allTextContents
//   const allTexts1: string[] = await productTitle.allTextContents();
//   console.log(allTexts1);
  //1) innerText() vs textcontent()
  //console.log(await productTitle.nth(1).innerText());//14.1-inch Laptop
  //console.log(await productTitle.nth(1).textContent());//            14.1-inch Laptop

  //innerText() --> Returns the visible text of an element.Ignores hidden elements.Removes extra whitespace and line breaks.
  //textContent() --> Returns all text including from hidden elements.Retains whitespaces, tabs, and line breaks.Often needs trimming for cleaner output.
  //Use innerText() when you need clean, visible-only text. Use textContent() when hidden content or exact raw text is required.

  //2)allInnerTexts() vs allTextContents()
//     //using allInnerTexts method
//   const allText1: string[] = await productTitle.allInnerTexts();
//   console.log(allText1);
//   //using allTextContents
//   const allText2: string[] = await productTitle.allTextContents();
//   console.log(allText2);

  //allInnerTexts(): Returns an array of visible text strings (from all matched elements).Automatically cleans up whitespace.
  //allTextContents():Returns an array of raw text strings (including from hidden elements).Keeps extra whitespace and line breaks.Often followed by .map(text => text.trim()) for cleanup.
  //allInnerTexts() is simpler for most test output logs, while allTextContents() gives complete raw content.


  //3) all() method
    const productTitleLocatorList: Locator[] = await page.locator("h2.product-title").all();
    console.log('**********using normal for loop ******************');
    for(let i=0; i<(productTitleLocatorList.length);i++){
        console.log(await productTitleLocatorList[i].innerText());
    }
    console.log('**********using for in loop ******************');
    for(let i in productTitleLocatorList){
        console.log(await productTitleLocatorList[i].innerText());
    }
    console.log('**********using for of loop ******************');
    for(const data of productTitleLocatorList){
        console.log(await data.innerText());
    }
    console.log('**********using for each loop ******************');
    //Runs all in parallel — much faster
    const texts = await Promise.all(
    productTitleLocatorList.map(el => el.innerText())
    );
    texts.forEach(text => console.log(text));

});
