import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { pageFixture } from "../step-definitions/hooks/browserContextFixture";

When("I type a first name", async () => {
  await pageFixture.page.getByPlaceholder("First Name").fill("Wietze");
});

When("I type a last name", async () => {
  await pageFixture.page.getByPlaceholder("Last Name").fill("Duurdinges");
});

When("I type an email adress", async () => {
  await pageFixture.page
    .getByPlaceholder("Email Address")
    .fill("wietze.duurdinges@st.hanze.nl");
});

When("I type a comment", async () => {
  await pageFixture.page
    .getByPlaceholder("Comments")
    .fill("This is a test commentvan wietze");
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
When("I type a random first name", async () => {
  const ramdomFirstName = faker.person.firstName();
  await pageFixture.page.getByPlaceholder("First Name").fill(ramdomFirstName);
});

When("I type a random last name", async () => {
  const ramdomLastName = faker.person.lastName();
  await pageFixture.page.getByPlaceholder("Last Name").fill(ramdomLastName);
});

When("I type an random email adress", async () => {
  const ramdomEmail = faker.internet.email();
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
