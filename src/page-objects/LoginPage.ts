import { BasePage } from "./base/BasePage";

export class LoginPage extends BasePage {
  public async navigateToLoginPage(): Promise<void> {
    await this.navigate(
      "https://webdriveruniversity.com/Login-Portal/index.html"
    );
  }

  public async fillUserName(userName: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Username" }).fill(userName);
  }

  public async fillPassword(password: string): Promise<void> {
    await this.page.getByRole("textbox", { name: "Password" }).fill(password);
  }

  public async clickOnLoginButton(): Promise<void> {
    // await this.page.waitForSelector('button[type="submit"]');
    // await this.page.click('button[type="submit"]');
    const loginButton = await this.page.locator("#login-button");
    await loginButton.hover();
    await loginButton.click({ force: true });
  }
}
