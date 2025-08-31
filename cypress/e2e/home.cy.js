describe("Homepage Validation", () => {
  it("loads and shows key elements (header, hero, footer)", () => {
    cy.visit("/");
    cy.assertHomeChrome();
  });
});
