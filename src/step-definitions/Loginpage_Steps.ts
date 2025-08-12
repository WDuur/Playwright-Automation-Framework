import { CucumberWorld } from "./world/cucumberWorld";
import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

let alertMessage: string;

Given("I navigate to the login page", async function (this: CucumberWorld) {
  await this.loginPage.navigateToLoginPage();
});

When(
  "I type a Username {word}",
  async function (this: CucumberWorld, userName: string) {
    await this.loginPage.fillUserName(userName);
  }
);

When(
  "I type a Password {word}",
  async function (this: CucumberWorld, password: string) {
    await this.loginPage.fillPassword(password);
  }
);

When(
  "I click on the login submit button",
  async function (this: CucumberWorld) {
    this.loginPage.page.on("dialog", async (alert) => {
      alertMessage = alert.message();
      await alert.accept();
    });
    await this.loginPage.clickOnLoginButton();
  }
);

Then(
  "The alert message wil be {string}",
  async function (this: CucumberWorld, expectedMessage: string) {
    expect(alertMessage).toBe(expectedMessage);
  }
);
