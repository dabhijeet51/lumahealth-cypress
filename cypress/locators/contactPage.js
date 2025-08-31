export const contactPage = {
  // HubSpot iframe selector
  iframe: 'iframe[src*="book-a-demo-embed"]',

  // Form fields inside iframe
  fields: {
    firstName: 'input[name="firstname"]',
    lastName: 'input[name="lastname"]',
    email: 'input[name="email"]',
    phone: 'input[name="phone"]',
    company: 'input[name="organization_name"]',
    provider_range: 'select[name="provider_range"]',
    org_type: 'select[name="organization_type"]',
    ehr: 'select[name="ehr"]',
    interest: '.input textarea[name="what_are_you_interested_in_"]',
    about_us: '.input textarea[name="how_d_you_hear_about_us_"]',
    thankYou: "h1 span",
    confirmation: "p span", // use with text match
  },

  // Generic error message inside HubSpot form
  errorMessage: ".hs-error-msg, .error, .field-error",

  // Top nav "Get a demo" button
  getDemoButton: 'a[href*="book-a-demo"], button:contains("Get a demo")',

  //Submit button on Contact form
  submitButton: 'button[type="submit"], input[type="submit"]',

  // Required fields array
  requiredFields: [
    'input[name="firstname"]',
    'input[name="lastname"]',
    'input[name="email"]',
    'input[name="phone"]',
    'input[name="organization_name"]',
    'select[name="provider_range"]',
    'select[name="organization_type"]',
    'select[name="ehr"]',
    '.input textarea[name="what_are_you_interested_in_"]',
    '.input textarea[name="how_d_you_hear_about_us_"]',
  ],
};
