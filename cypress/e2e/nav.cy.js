import { NAV_PAGES } from "../locators/navPage";
import { verifyNavPage } from "../support/utils/commonUtils";

describe("Main navigation", () => {
  beforeEach(() => cy.visit("/"));

  Object.entries(NAV_PAGES).forEach(([navLabel, { text, iframe }]) => {
    it(`navigates via top nav: ${navLabel}`, () => {
      verifyNavPage(navLabel, text, iframe);
    });
  });
});
