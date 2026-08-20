import { Page, Locator } from "@playwright/test";

export class CartPage{
  //define the page objects
  private readonly page: Page;
  private readonly productListOnCart: Locator;

  //constructor
  constructor(page:Page){
    this.page=page;
    this.productListOnCart = page.locator('tbody td:nth-child(2)');
  }
  //actionable methods
  //Validate added present or cart page or not
  async productPresentOnCart(product:string):Promise<boolean>
  {
  const productAdded:string[] = await this.productListOnCart.allInnerTexts();
    if(productAdded.includes(product)){
    return true;
   }
   else{
    return false;
   }
  }   



}