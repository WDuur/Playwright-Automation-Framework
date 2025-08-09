import { World, setWorldConstructor } from "@cucumber/cucumber";

export class CucumberWorld extends World {
  // base URL
  private url?: string;

  // Person
  private firstName?: string;
  private lastName?: string;
  private emailAddress?: string;

  //setters for url, first name and last name
  setUrl(url: string) {
    this.url = url;
  }
  setFirstName(firstName: string) {
    this.firstName = firstName;
  }
  setLastName(lastName: string) {
    this.lastName = lastName;
  }
  setEmailAddress(emailAddress: string) {
    this.emailAddress = emailAddress;
  }
  //getter for url, first name and last name
  getUrl() {
    return this.url;
  }
  getFirstName() {
    return this.firstName;
  }
  getLastName() {
    return this.lastName;
  }
  getEmailAddress() {
    return this.emailAddress;
  }
}
// Tells cucumber world to use our custom world
setWorldConstructor(CucumberWorld);
