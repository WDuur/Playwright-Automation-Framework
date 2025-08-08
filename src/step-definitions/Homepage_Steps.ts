import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "../step-definitions/hooks/browserContextFixture";

const baseUrl = "https://webdriveruniversity.com/";

Given("I navigate to webdriveruniversity homepage", async () => {
  await pageFixture.page.goto(baseUrl);
});

When("I click on the contact us button", async () => {
  console.log("Step 2, click on the contact us button");

  const contactUs_Button = await pageFixture.page.getByRole("link", {
    name: "CONTACT US Contact Us Form",
  });
  await contactUs_Button.click();
});

When("I click on the login portal button", async () => {
  const login_Button = await pageFixture.page.getByRole("link", {
    name: "LOGIN PORTAL Login Portal Are",
  });
  await login_Button.click();
});
