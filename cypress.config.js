const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.lumahealth.io",
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportWidth: 1280,
    viewportHeight: 800,
    video: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    defaultCommandTimeout: 15000, // increase for iframe
    pageLoadTimeout: 60000, // increase for slow HubSpot

    chromeWebSecurity: false, // allow cross-subdomain iframe
    experimentalOriginDependencies: true,
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
  },
});
