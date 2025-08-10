import { BasePage } from "./base/BasePage";

export class ContactUsPage extends BasePage {
  public async fillFirstName(firstName: string): Promise<void> {
    await this.page.getByPlaceholder("First Name").fill(firstName);
  }

  public async fillLastName(lastName: string): Promise<void> {
    await this.page.getByPlaceholder("Last Name").fill(lastName);
  }

  public async fillEmailAddress(emailAddress: string): Promise<void> {
    await this.page.getByPlaceholder("Email Address").fill(emailAddress);
  }

  public async fillComment(comment: string): Promise<void> {
    await this.page.getByPlaceholder("Comments").fill(comment);
  }

  public async clickOnSubmitButton(): Promise<void> {
    await this.page.waitForSelector('input[type="SUBMIT"]');
    await this.page.click('input[type="SUBMIT"]');
  }

  //get successfull
  public async getSuccessfulMessage(): Promise<string> {
    await this.page.waitForSelector("#contact_reply h1", { timeout: 60000 });
    return await this.page.innerText("#contact_reply h1");
  }
  //get unsuccesfull
  public async getErrorMessage(): Promise<string> {
    await this.page.waitForSelector("body");
    const bodyElement = await this.page.locator("body");
    return (await bodyElement.textContent()) ?? "";
  }
  //get header text
  public async getHeaderText(message: string): Promise<string> {
    await this.page.waitForSelector("//h1 | //body", {
      state: "visible",
    });
    const elements = await this.page.locator("//h1 | //body").elementHandles();
    let foundElementText = "";

    for (let element of elements) {
      let text = await element.innerText();

      if (text.includes(message)) {
        foundElementText = text;
        break;
      }
    }
    return foundElementText;
  }
}
