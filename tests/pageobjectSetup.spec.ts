import{test,expect} from '@playwright/test';
import { LoginPage} from '../pages/loginpage';
import { HomePage } from '../pages/homepage';
import { CartPage } from '../pages/cartpage';

const username = 'testSk728785';
const password = '@1Infosys';
const product = 'Nexus 6';

test('User can log in, add a product to cart, and see it listed in cart',async ({page})=>{
   const loginpage = new LoginPage(page);
   const homepage = new HomePage(page);
   const cartpage = new CartPage(page);

   //Navigate to URL
   await loginpage.launchUrl();
   await expect(page).toHaveURL('https://demoblaze.com/');
   //await expect(page)
   await loginpage.performLogin(username,password);
   //confirm login successful or not
   await expect(page.getByRole('link',{name:`Welcome ${username}`}),'Login unsuccessful with these credentials').toBeVisible();
   //Add a specific product to cart and accept alert
   await homepage.addProduct(product);
   //click cart link
   await homepage.gotoCart();
   await expect(page).toHaveURL(/cart/);
   await page.waitForTimeout(2000);
   //Validate cart holds product added or not.
   const isExist:boolean = await cartpage.productPresentOnCart(product);
   expect(isExist, `Product "${product}" should be present in the cart`).toBeTruthy();

})