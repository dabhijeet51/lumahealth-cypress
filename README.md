# Overview

This project contains Cypress end-to-end tests for the Luma Health website.
The tests validate core pages and flows including homepage, contact form, and 404 page.

This repo contains Cypress E2E tests covering:

- Homepage validation
- Navigation links (top-level nav + “Get a demo” → /book-a-demo)
- Contact form (uses the public Book a demo form)
- Bonus: Responsive checks (desktop/tablet/mobile)
- Bonus: 404 page behavior
- Bonus: GitHub Actions CI with artifacts + Mochawesome HTML report

# Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-org>/<repo>.git
   cd <repo>
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

# Assumptions

- 404 page may return HTTP 404 or 200 with custom error template.
- Contact form success message should include:

  - Heading: `Thank You!`
  - Text: `Your demo request has been received.`

- CAPTCHA may appear on form submission; post-submit checks are skipped in that case.
