import { Given, When } from "@cucumber/cucumber";
//import { pageFixture } from "../step-definitions/hooks/browserContextFixture";
import logger from "../logger/logger";
import { CucumberWorld } from "./world/cucumberWorld";

const baseUrl = "https://webdriveruniversity.com/";

Given(
  "I navigate to webdriveruniversity homepage",
  async function (this: CucumberWorld) {
    try {
      await this.homePage.navigate(baseUrl);
      logger.info(`Accessing URL: ${baseUrl}`);
      this.setUrl(baseUrl);
    } catch (error) {
      logger.error(`Error navigating to ${baseUrl}: ${error}`);
    }
  }
);

When("I click on the contact us button", async function (this: CucumberWorld) {
  this.homePage.clickOnContactUsButton();
});

When(
  "I click on the login portal button",
  async function (this: CucumberWorld) {
    this.homePage.clickOnLoginPortalButton();
  }
);
