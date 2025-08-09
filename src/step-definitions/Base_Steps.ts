import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "../step-definitions/hooks/browserContextFixture";

//load env variables from .env file
import { config as loadEnv } from "dotenv";
const env = loadEnv({ path: "./env/.env" });

const config = {
  width: parseInt(env.parsed?.BROWSER_WIDTH || "1920"),
  height: parseInt(env.parsed?.BROWSER_HEIGHT || "1080"),
};

When("I switch to the new browser tab", async () => {
  await pageFixture.context.waitForEvent("page");

  const allPages = await pageFixture.context.pages();
  pageFixture.page = allPages[allPages.length - 1];

  await pageFixture.page.bringToFront();
  await pageFixture.page.setViewportSize({
    width: config.width,
    height: config.height,
  });
  // await pageFixture.page.pause();
});

Given("I wait for {int} seconds", async (seconds: number) => {
  await pageFixture.page.waitForTimeout(seconds * 1000);
});
