const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.lumahealth.io",
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportWidth: 1280,
    viewportHeight: 800,
    video: true,
    screenshotsFolder: "reports/screenshots",
    videosFolder: "reports/videos",
    defaultCommandTimeout: 15000, // increase for iframe
    pageLoadTimeout: 60000, // increase for slow HubSpot

    chromeWebSecurity: false, // allow cross-subdomain iframe
    experimentalOriginDependencies: true,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      return config;
    },
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "reports/mochawesome-report",
    overwrite: false,
    html: false,
    json: true,
  },
});
