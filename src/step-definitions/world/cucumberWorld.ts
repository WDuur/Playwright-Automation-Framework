import { BasePage } from "../../page-objects/base/BasePage";
import { PageManager } from "./../../page-objects/base/BaseManager";
import { World, setWorldConstructor, IWorldOptions } from "@cucumber/cucumber";

export class CucumberWorld extends World {
  public pageManager: PageManager;
  public basePage: BasePage;

  // base URL
  private url?: string;

  // Person
  private firstName?: string;
  private lastName?: string;
  private emailAddress?: string;

  //{ attach, log, parameters }: IWorldOptions are required in the constructor of your CucumberWorld class to
  //inherit functionalities from the base World class and to initialize your PageManager and BasePage.
  constructor({ attach, log, link, parameters }: IWorldOptions) {
    super({ attach, log, link, parameters }); //Pass the options to the world constructor
    this.pageManager = new PageManager(); // Initialize PageManager
    this.basePage = this.pageManager.createBasePage();
  }
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
