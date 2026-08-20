import { Page, Locator } from "@playwright/test";

export class HomePage{
  //define the page objects
  private readonly page: Page;
  private readonly productList: Locator;
  private readonly addtoCartLink: Locator;
  private readonly CartLink: Locator;

  //constructor
  constructor(page:Page){
    this.page=page;
    this.productList = page.locator('h4.card-title a');
    this.addtoCartLink= page.getByRole('link',{name:'Add to cart'});
    this.CartLink = page.getByRole('link',{name:'Cart',exact:true});
    /*
    If addProduct() is called multiple times in a single test, a new duplicate listener will be attached every time.
    This can cause memory leaks, multiple dialog handling calls, or unexpected test behavior.
    */
    //Attach the dialog listener ONCE during class instantiation
    this.page.on('dialog',async (dialog)=>{
     if(dialog.message().includes('added')){
        await dialog.accept();
     }
   })
  }
  //actionable methods
  //Add a specific product to cart and alert handle
  async addProduct(product:string):Promise<void>
  {
    await this.productList.filter({ hasText: product }).click();
    await this.addtoCartLink.click();
  }
  async gotoCart()
  {
    await this.CartLink.click();
  }

}