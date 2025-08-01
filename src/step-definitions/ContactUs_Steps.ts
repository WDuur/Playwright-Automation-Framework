import { Given, When } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";

let browser: Browser;
let context: any;
let page: Page;

When("I type a first name", async () => {
  // @ts-ignore
  await page.getByPlaceholder("First Name").fill("Wietze");
});
