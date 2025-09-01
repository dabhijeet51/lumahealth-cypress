import "cypress-iframe";
import { homePage } from "../locators/homePage";
// Navigate top nav by visible text
Cypress.Commands.add("clickTopNav", (label) => {
  cy.get("header, nav") // get the main header/nav
    .first()
    .within(() => {
      // Find the first <a> link that matches the label exactly (case-insensitive) and click it
      cy.contains('a', new RegExp(`^${label}$`))
        .first()
        .click({ force: true });
    });
});


// Validate homepage chrome (header, hero, footer)
Cypress.Commands.add("assertHomeChrome", () => {
  // Header
  cy.get(homePage.header).should("be.visible");

  // Hero
  cy.get(homePage.hero).first().should("exist").and("be.visible");

  // Footer
  cy.get(homePage.footer).should("exist").and("be.visible");

  // Navigation links should have href
  cy.get(homePage.navLinks).each(($el) => {
    cy.wrap($el).should("have.attr", "href").and("not.be.empty");
  });
});

// Validate required fields by submitting empty form inside iframe
Cypress.Commands.add("validateRequiredFields", (iframeSelector) => {
  const { requiredFields, errorMessage, submitButton } =
    require("../locators/contactPage").contactPage;

  cy.frameLoaded(iframeSelector);

  cy.iframe(iframeSelector).within(() => {
    // Directly click submit button to trigger all validations
    cy.get(submitButton).click({
      force: true,
    });

    // Check that required field errors appear
    requiredFields.forEach((field) => {
      cy.get(field)
        .parents(".hs-form-field, .field, form")
        .first()
        .within(() => {
          cy.get(errorMessage).should("exist").and("be.visible");
        });
    });
  });
});

// Fill valid contact form and submit inside iframe
Cypress.Commands.add("submitContactForm", (iframeSelector, data) => {
  const { fields, errorMessage, submitButton } =
    require("../locators/contactPage").contactPage;

  cy.frameLoaded(iframeSelector); // wait for iframe to load

  cy.iframe(iframeSelector).within(() => {
    // Fill form fields
    cy.get(fields.firstName).clear().type(data.firstName);
    cy.get(fields.lastName).clear().type(data.lastName);
    cy.get(fields.email).clear().type(data.workEmail);
    cy.get(fields.phone).clear().type(data.phone);
    cy.get(fields.company).clear().type(data.company);

    // Select dropdowns
    cy.get(fields.provider_range).select(data.provider_range);
    cy.get(fields.org_type).select(data.org_type);
    cy.get(fields.ehr).select(data.ehr);

    // Fill textareas
    cy.get(fields.interest).clear().type(data.interest);
    cy.get(fields.about_us).clear().type(data.about_us);

    // Submit the form
    cy.get(submitButton).click({
      force: true,
    });

    // Wait briefly to allow CAPTCHA to appear (if any)
    cy.wait(2000); // optional delay to allow CAPTCHA to render

    // Check for CAPTCHA presence inside iframe
    cy.document().then((doc) => {
      const captchaText = doc.body.innerText;
      if (captchaText.includes("protected by ")) {
        cy.log("CAPTCHA detected — skipping post-submit assertions");
        return;
      }

      // Validate success via UI
      cy.get(fields.thankYou).should("have.text", "Thank You!");
      cy.contains(
        fields.confirmation,
        "Your demo request has been received."
      ).should("be.visible");

      // Ensure no inline errors
      cy.get(errorMessage).should("not.exist");
    });
  });
});
