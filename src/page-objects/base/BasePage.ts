import { pageFixture } from "./../../step-definitions/hooks/browserContextFixture";
import { Page, Locator } from "@playwright/test";

//Load env variables from .env file
import { config as loadEnv } from "dotenv";
const env = loadEnv({ path: "./env/.env" });

//Create a configuration object for easy access to env variables
const config = {
  width: parseInt(env.parsed?.BROWSER_WIDTH || "1920"),
  height: parseInt(env.parsed?.BROWSER_HEIGHT || "1080"),
};

export class BasePage {
  get page() {
    return pageFixture.page;
  }

  public async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  public async waitAndClickByRole(role: string, name: string): Promise<void> {
    const element = await this.page.getByRole(role as any, { name: name });
    await element.click();
  }

  public async waitAndClick(locator: Locator): Promise<void> {
    await locator.isVisible;
    await locator.click();
  }

  public async waitAndClickBySelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  public async switchToNewTab(): Promise<void> {
    await this.page.context().waitForEvent("page"); //reintialise the page > new tab > page

    //Retrieve all current open pages (tabs)
    const allPages = await this.page.context().pages();

    //Assign the most recent tab to pageFixture.page
    pageFixture.page = allPages[allPages.length - 1];

    //Bring the newly assigned tab to the front (Make it active)
    await this.page.bringToFront();

    //Ensure the newly assigned tab is also fully maximised
    await this.page.setViewportSize({
      width: config.width,
      height: config.height,
    });
  }
}
