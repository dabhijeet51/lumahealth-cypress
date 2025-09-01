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
  cy.get(notFoundPage.wrapper).should("exist").and("be.visible");

  // Heading contains "404" or "Page Not Found"
  cy.get(notFoundPage.heading).should(($el) => {
    const text = $el.text().toLowerCase();
    expect(text).to.match(/404|Page Not Found/i);
  });

  cy.get(notFoundPage.message).should(($el) => {
    const text = $el.text().toLowerCase();
    expect(text).to.match(/page |not be found|did not exist/i);
  });
}


/**
 * Handles both iframe and non-iframe cases.
 * @param {string} navLabel - Label of the navigation item to click
 * @param {string} expectedText - Text expected on the destination page
 * @param {string|null} iframeSelector - CSS selector for iframe (if present)
 */
export const verifyNavPage = (navLabel, expectedText, iframeSelector) => {
  cy.clickTopNav(navLabel);

  if (iframeSelector) {
    // Handle iframe-based pages
    cy.get(iframeSelector, { timeout: 20000 })
      .its("0.contentDocument")
      .should("exist")
      .then((doc) => {
        cy.wrap(doc.body).within(() => {
          cy.contains(new RegExp(expectedText, "i"), { timeout: 20000 })
            .should("be.visible");
        });
      });
  } else {
    // Handle regular DOM pages
    cy.contains("body", new RegExp(expectedText, "i"), { timeout: 20000 })
      .should("be.visible");
  }

  // Ensure navigation
  cy.location("pathname").should("not.eq", "/");
};

