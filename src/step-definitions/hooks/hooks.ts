import { AfterAll, BeforeAll, Before, After } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import { pageFixture } from "./browserContextFixture";

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

After(async () => {
  await pageFixture.page.close();
  await browser.close();
});
