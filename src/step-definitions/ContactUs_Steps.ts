import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { CucumberWorld } from "./world/cucumberWorld";
import logger from "../logger/logger";

When("I type a first name", async function (this: CucumberWorld) {
  logger.info(`base url stored in world: ${this.getUrl()}`);
  await this.contactUsPage.fillFirstName("wietze");
});

When("I type a last name", async function (this: CucumberWorld) {
  await this.contactUsPage.fillLastName("Duurdinges");
});

When("I type an email adress", async function (this: CucumberWorld) {
  await this.contactUsPage.fillEmailAddress("wietze.duurdinges@st.hanze.nl");
});

When("I type a random comment", async function (this: CucumberWorld) {
  await this.contactUsPage.fillComment(
    `please can you contact me? \nThanks, ${this.getFirstName()} ${this.getLastName()} \n\n email: ${this.getEmailAddress()}`
  );
});

When("I type a comment", async function (this: CucumberWorld) {
  await this.contactUsPage.fillComment("This is a test comment van wietze");
});

When("I click on the submit button", async function (this: CucumberWorld) {
  await this.contactUsPage.clickOnSubmitButton();
});

Then(
  "I should be presented width a successfull contact us submission message",
  async function () {
    const successMessage = await this.ContactUsPage.getSuccessfulMessage();
    expect(successMessage).toBe("Thank You for your Message!");
  }
);

Then(
  "I should be presented with unsuccesful contact us message",
  async function (this: CucumberWorld) {
    const errorMessage = await this.contactUsPage.getErrorMessage(); //this.contactUsPage;
    await expect(errorMessage).toMatch(
      /Error: (all fields are required|Invalid email address)/
    );
  }
);

// cucumber expressions
When(
  "I type a specific first name {string}",
  async function (this: CucumberWorld, firstName: string) {
    await this.contactUsPage.fillFirstName(firstName);
  }
);

When(
  "I type a specific last name {string}",
  async function (this: CucumberWorld, lastName: string) {
    await this.contactUsPage.fillLastName(lastName);
  }
);

When(
  "I type an specific email adress {string}",
  async function (this: CucumberWorld, email: string) {
    await this.contactUsPage.fillEmailAddress(email);
  }
);

When(
  "I type a specific text {string}  and a number {int} within the comment input field",
  async function (this: CucumberWorld, text: string, number: number) {
    await this.contactUsPage.fillComment(`${text} ${number}`);
  }
);

//Random data
When("I type a random first name", async function (this: CucumberWorld) {
  const ramdomFirstName = faker.person.firstName();
  this.setFirstName(ramdomFirstName);
  await this.contactUsPage.fillFirstName(ramdomFirstName);
});

When("I type a random last name", async function (this: CucumberWorld) {
  const ramdomLastName = faker.person.lastName();
  this.setLastName(ramdomLastName);
  await this.contactUsPage.fillLastName(ramdomLastName);
});

When("I type an random email adress", async function (this: CucumberWorld) {
  const ramdomEmail = faker.internet.email();
  this.setEmailAddress(ramdomEmail);
  await this.contactUsPage.fillEmailAddress(ramdomEmail);
});

// Scenarios outline

When(
  "I type a first name {word} and a last name {word}",
  async function (this: CucumberWorld, firstName: string, lastName: string) {
    await this.contactUsPage.fillFirstName(firstName);
    await this.contactUsPage.fillLastName(lastName);
  }
);

When(
  "I type a email address {string} and a comment {string}",
  async function (this: CucumberWorld, emailAddress: string, comment: string) {
    await this.contactUsPage.fillEmailAddress(emailAddress);
    await this.contactUsPage.fillComment(comment);
  }
);

Then(
  "I should be presented width header text {string}",
  async function (this: CucumberWorld, message: string) {
    const headerText = await this.contactUsPage.getHeaderText(message);
    expect(headerText).toContain(message);
  }
);
