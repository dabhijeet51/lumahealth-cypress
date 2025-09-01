import { contactPage } from "../locators/contactPage";
const data = require("../fixtures/contact.json");

describe("Contact (Book a demo) form embedded on www.lumahealth.io", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clickTopNav("Get a demo");
    cy.frameLoaded(contactPage.iframe);
  });

  it("shows required validation for all mandatory fields", () => {
    cy.validateRequiredFields(contactPage.iframe);
  });

  it("accepts valid inputs (client-side) and attempts submit", () => {
    cy.submitContactForm(contactPage.iframe, data);
  });
});
