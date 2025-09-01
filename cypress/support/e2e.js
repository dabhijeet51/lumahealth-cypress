import "./commands";
const addContext = require("mochawesome/addContext");

// Ignore 3rd-party errors
Cypress.on("uncaught:exception", () => false);

// Attach screenshot + video to Mochawesome
Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    const screenshotFileName = `${runnable.parent} -- ${test.title} (failed).png`;
    const screenshotPath = `reports/screenshots/${Cypress.spec.name}/${screenshotFileName}`;
    addContext({ test }, screenshotPath);

    const videoPath = `reports/videos/${Cypress.spec.name}.mp4`;
    addContext({ test }, videoPath);
  }
});
