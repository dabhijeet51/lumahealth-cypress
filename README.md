# Overview

This project contains Cypress end-to-end tests for the Luma Health website.
The tests validate core pages and flows including homepage, contact form, and 404 page.

This repo contains Cypress E2E tests covering:

- Homepage validation
- Navigation links (top-level nav + “Get a demo” → /book-a-demo)
- Contact form (uses the public Book a demo form)
- Responsive checks (desktop/tablet/mobile)
- 404 page behavior
- GitHub Actions CI with artifacts + Mochawesome HTML report

# Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/dabhijeet51/lumahealth-cypress.git
   cd lumahealth-cypress
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run Cypress tests:

   - Open interactive mode:

     ```bash
     npx cypress open
     ```

   - Run headless:

     ```bash
     npx cypress run
     ```

   - Run tests in headed Chrome only:

     ```bash
     npm run cy:headed
     ```

   - Run tests in headed Chrome and generate HTML report:

     ```bash
     npm run cy:headed:report
     ```

# Assumptions

- CAPTCHA would be disabled in the test environment
