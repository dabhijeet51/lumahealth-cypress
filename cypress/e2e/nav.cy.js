const NAV_PAGES = {
  Platform: {
    text: "The Patient Success Platform™",
    iframe: 'iframe[src*="patient-success-platform"]',
  },
  "Who We Serve": {
    text: "WHO WE SERVE",
    iframe: 'iframe[src*="who-we-serve"]',
  },
  Integrations: {
    text: "INTEGRATIONS",
    iframe: 'iframe[src*="integrations"]',
  },
  Learn: {
    text: "Learnings from the Luma Community",
    iframe: null, // no iframe
  },
  "About us": {
    text: "ABOUT US",
    iframe: null, // no iframe
  },
};

describe("Main navigation", () => {
  beforeEach(() => cy.visit("/"));

  Object.entries(NAV_PAGES).forEach(([navLabel, { text, iframe }]) => {
    it(`navigates via top nav: ${navLabel}`, () => {
      cy.clickTopNav(navLabel);

      if (iframe) {
        // Cypress in-built .within() on iframe’s body
        cy.get(iframe, { timeout: 20000 })
          .its("0.contentDocument")      // Cypress chainable
          .should("exist")
          .then((doc) => {
            cy.wrap(doc.body).within(() => {
              cy.contains(new RegExp(text, "i"), { timeout: 20000 })
                .should("be.visible");
            });
          });
      } else {
        cy.contains("body", new RegExp(text, "i"), { timeout: 20000 })
          .should("be.visible");
      }

      cy.location("pathname").should("not.eq", "/");
    });
  });
});
