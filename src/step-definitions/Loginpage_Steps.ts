import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { pageFixture } from "../step-definitions/hooks/browserContextFixture";

let alertMessage: string;

When("I type a Username {word}", async (userName: string) => {
  await pageFixture.page
    .getByRole("textbox", { name: "Username" })
    .fill(userName);
});

When("I type a Password {word}", async (password: string) => {
  await pageFixture.page
    .getByRole("textbox", { name: "Password" })
    .fill(password);
});

When("I click on the login submit button", async () => {
  await pageFixture.page.on("dialog", async (alert) => {
    alertMessage = alert.message();
    await alert.accept();
  });
  await pageFixture.page.waitForSelector('button[type="submit"]');
  await pageFixture.page.click('button[type="submit"]');
});

Then("The alert message wil be {string}", async (expectedMessage: string) => {
  expect(alertMessage).toBe(expectedMessage);
});
