import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { pageFixture } from "../step-definitions/hooks/browserContextFixture";
import { CucumberWorld } from "./world/cucumberWorld";
import logger from "../logger/logger";

When("I type a first name", async function (this: CucumberWorld) {
  logger.info(`base url stored in world: ${this.getUrl()}`);
  await pageFixture.page.getByPlaceholder("First Name").fill("Wietze");
});

When("I type a last name", async function (this: CucumberWorld) {
  await pageFixture.page.getByPlaceholder("Last Name").fill("Duurdinges");
});

When("I type an email adress", async () => {
  await pageFixture.page
    .getByPlaceholder("Email Address")
    .fill("wietze.duurdinges@st.hanze.nl");
});

When("I type a random comment", async function (this: CucumberWorld) {
  await pageFixture.page
    .getByPlaceholder("Comments")
    .fill(
      `please can you contact me? \nThanks, ${this.getFirstName()} ${this.getLastName()} \n\n email: ${this.getEmailAddress()}`
    );
});
When("I type a comment", async () => {
  await pageFixture.page
    .getByPlaceholder("Comments")
    .fill("This is a test comment van wietze");
});
When("I click on the submit button", async () => {
  await pageFixture.page.waitForSelector('input[type="SUBMIT"]');
  await pageFixture.page.click('input[type="SUBMIT"]');
});

Then(
  "I should be presented width a successfull contact us submission message",
  async () => {
    await pageFixture.page.waitForSelector("#contact_reply h1");
    const text = await pageFixture.page.innerText("#contact_reply h1");

    expect(text).toBe("Thank You for your Message!");
  }
);

Then("I should be presented with unsuccesful contact us message", async () => {
  await pageFixture.page.waitForSelector("body");
  const bodyElement = await pageFixture.page.locator("body");

  const textElement = await bodyElement.textContent();
  await expect(textElement).toMatch(
    /Error: (all fields are required|Invalid email address)/
  );
});

// cucumber expressions
When("I type a specific first name {string}", async (firstName: string) => {
  await pageFixture.page.getByPlaceholder("First Name").fill(firstName);
});

When("I type a specific last name {string}", async (lastName: string) => {
  await pageFixture.page.getByPlaceholder("Last Name").fill(lastName);
});

When("I type an specific email adress {string}", async (email: string) => {
  await pageFixture.page.getByPlaceholder("Email Address").fill(email);
});

When(
  "I type a specific text {string}  and a number {int} within the comment input field",
  async (text: string, number: number) => {
    await pageFixture.page
      .getByPlaceholder("Comments")
      .fill(`${text} ${number}`);
  }
);

//Random data
When("I type a random first name", async function (this: CucumberWorld) {
  const ramdomFirstName = faker.person.firstName();
  this.setFirstName(ramdomFirstName);
  await pageFixture.page.getByPlaceholder("First Name").fill(ramdomFirstName);
});

When("I type a random last name", async function (this: CucumberWorld) {
  const ramdomLastName = faker.person.lastName();
  this.setLastName(ramdomLastName);
  await pageFixture.page.getByPlaceholder("Last Name").fill(ramdomLastName);
});

When("I type an random email adress", async function (this: CucumberWorld) {
  const ramdomEmail = faker.internet.email();
  this.setEmailAddress(ramdomEmail);
  await pageFixture.page.getByPlaceholder("Email Address").fill(ramdomEmail);
});

// Scenarios outline

When(
  "I type a first name {word} and a last name {word}",
  async (firstName: string, lastName: string) => {
    await pageFixture.page.getByPlaceholder("First Name").fill(firstName);
    await pageFixture.page.getByPlaceholder("Last Name").fill(lastName);
  }
);

When(
  "I type a email address {string} and a comment {string}",
  async (emailAddress: string, comment: string) => {
    await pageFixture.page.getByPlaceholder("Email Address").fill(emailAddress);
    await pageFixture.page.getByPlaceholder("Comments").fill(comment);
  }
);

Then(
  "I should be presented width header text {string}",
  async (message: string) => {
    await pageFixture.page.waitForSelector("//h1 | //body", {
      state: "visible",
    });
    const elements = await pageFixture.page
      .locator("//h1 | //body")
      .elementHandles();
    let foundElementText = "";

    for (let element of elements) {
      let text = await element.innerText();

      if (text.includes(message)) {
        foundElementText = text;
        break;
      }
    }
    expect(foundElementText).toContain(message);
  }
);
