import { Given, When } from "@cucumber/cucumber";
import { Browser, chromium, Page } from "playwright";

let browser: Browser;
let context: any;
let page: Page;

const baseUrl = "https://webdriveruniversity.com/";

Given("I navigate to webdriveruniversity homepage", async () => {
  console.log("Step 1, navigate to webdriveruniversity homepage");
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  page = await context.newPage();
  await page.goto(baseUrl);
});

When("I click on the contact us button", async () => {
  console.log("Step 2, click on the contact us button");
  // await page.pause();
  // getByRole('link', { name: 'CONTACT US Contact Us Form' })
  const contactUs_Button = await page.getByRole("link", {
    name: "CONTACT US Contact Us Form",
  });
  await contactUs_Button.click();
});
