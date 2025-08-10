import { Page } from "@playwright/test";
import { pageFixture } from "../../step-definitions/hooks/browserContextFixture";
import { BasePage } from "./BasePage";
import { HomePage } from "../HomePage";
import { ContactUsPage } from "../ContactUsPage";

export class PageManager {
  get page(): Page {
    return pageFixture.page;
  }
  createBasePage(): BasePage {
    return new BasePage();
  }
  createHomePage(): HomePage {
    return new HomePage();
  }

  createContactUsPage(): ContactUsPage {
    return new ContactUsPage();
  }
}
