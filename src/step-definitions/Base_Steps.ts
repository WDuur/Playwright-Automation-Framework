import { Given, When } from "@cucumber/cucumber";
import { pageFixture } from "../step-definitions/hooks/browserContextFixture";

When("I switch to the new browser tab", async () => {
  await pageFixture.context.waitForEvent("page");

  const allPages = await pageFixture.context.pages();
  pageFixture.page = allPages[allPages.length - 1];

  await pageFixture.page.bringToFront();
  await pageFixture.page.setViewportSize({ width: 1920, height: 1080 });
  // await pageFixture.page.pause();
});

Given("I wait for {int} seconds", async (seconds: number) => {
  await pageFixture.page.waitForTimeout(seconds * 1000);
});
