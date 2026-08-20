import { Page, Locator } from "@playwright/test";

export class LoginPage {
  //define the page objects
  private readonly page: Page;
  private readonly loginLink: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.usernameInput = page.locator("#loginusername");
    this.passwordInput = page.locator("#loginpassword");
    this.loginButton = page.getByRole("button", { name: "Log in" });
  }
  //actionable methods

  async launchUrl():Promise<void> //it does not return anything its optional
  {
    await this.page.goto("https://demoblaze.com/");
  }
  async clickLoginLink(){
    await this.loginLink.click();
  }
  async enterUsername(username:string) {
    await this.usernameInput.clear();
    await this.usernameInput.fill(username);
  }
  async enterPassword(password:string) {
    await this.passwordInput.clear();
    await this.passwordInput.fill(password);
  }
  async clickLoginButton()
  {
    await this.loginButton.click();
  }
  
  async performLogin(username: string, password: string):Promise<void> 
  {
    await this.clickLoginLink();
    await this.enterUsername(username)
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

}
