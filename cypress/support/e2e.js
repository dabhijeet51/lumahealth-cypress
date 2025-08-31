import "./commands";

Cypress.on("uncaught:exception", () => {
  // Marketing sites often pull 3rd-party scripts; don’t fail the run for those
  return false;
});
