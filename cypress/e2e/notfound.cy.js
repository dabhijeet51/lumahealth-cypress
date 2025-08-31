import { validate404Page } from "../support/utils/commonUtils";

describe("404 Page Validation", () => {
  it("Should show a proper 404 page for invalid URLs", () => {
    validate404Page("/nonexistent-page-404");
  });

  it("Another invalid path also shows 404", () => {
    validate404Page("/definitely-does-not-exist");
  });
});
