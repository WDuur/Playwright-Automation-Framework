import { AfterAll, BeforeAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";

//load env variables from .env file
import { config as loadEnv } from "dotenv";
const env = loadEnv({ path: "./env/.env" });

//create a configiguration object for easy  acces to env variables
const config = {
  headless: env.parsed?.HEADLESS === "true",
  browser: env.parsed?.UI_AUTOMATION_BROWSER || "chromium",
  width: parseInt(env.parsed?.BROWSER_WIDTH || "1920"),
  height: parseInt(env.parsed?.BROWSER_HEIGHT || "1080"),
};

let browser: Browser;

BeforeAll(async () => {
  console.log("BeforeAll");
});

AfterAll(async () => {
  console.log("AfterAll");
});

Before(async () => {
  browser = await chromium.launch({ headless: false });
  pageFixture.context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  pageFixture.page = await pageFixture.context.newPage();
});

After(async function ({ pickle, result }) {
  if (result?.status === Status.FAILED) {
    if (pageFixture.page) {
      const screenshotPath = `./reports/screenshots/${
        pickle.name
      }-${Date.now()}.png`;
      const image = await pageFixture.page.screenshot({
        path: screenshotPath,
        type: "png",
      });
      await this.attach(image, "image/png");
    } else {
      console.error("Page undefined");
    }
  }
  await pageFixture.page.close();
  await browser.close();
});
