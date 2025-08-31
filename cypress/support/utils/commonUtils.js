import { notFoundPage } from "../../locators/notFoundPage";

/**
 * Validate that a given URL returns a 404 error page
 * @param {string} url - Relative path or absolute URL
 */
export function validate404Page(url) {
  // API response check
  cy.request({ url, failOnStatusCode: false }).then((resp) => {
    expect([404]).to.include(resp.status);
  });

  // UI check
  cy.visit(url, { failOnStatusCode: false });

  // Wrapper exists
  cy.get(notFoundPage.wrapper).should("exist").and("be.visible");

  // Heading contains "404" or "Page Not Found"
  cy.get(notFoundPage.heading).should(($el) => {
    const text = $el.text().toLowerCase();
    expect(text).to.match(/404|Page Not Found/i);
  });

  // Message contains friendly error text
  cy.get(notFoundPage.message).should(($el) => {
    const text = $el.text().toLowerCase();
    expect(text).to.match(/page |not be found|did not exist/i);
  });
}
