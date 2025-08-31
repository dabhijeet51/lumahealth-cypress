const MAIN_NAV = [
  'Platform',
  'Who We Serve',
  'Integrations',
  'Learn',
  'About us'
];

describe('Main navigation', () => {
  beforeEach(() => cy.visit('/'));

  MAIN_NAV.forEach((item) => {
    it(`navigates via top nav: ${item}`, () => {
      cy.clickTopNav(item);

      // Some items open a menu — click first visible link within the dropdown if present
      cy.get('body').then($body => {
        const maybeDropdownLink = $body.find('a[href]:visible').toArray()
          .map(el => el.innerText?.trim())
          .find(txt => txt && txt.length && txt !== item && txt.length < 40);

        if (maybeDropdownLink) {
          cy.contains('a[href]:visible', maybeDropdownLink).first().click({ force: true });
        }
      });

      // Page should load with an H1/H2 or clear content
      cy.get('h1,h2', { timeout: 15000 }).should('be.visible');
      cy.location('pathname').should('not.eq', '/'); // moved off home
    });
  });

  it('“Get a demo” goes to the demo page and loads content', () => {
    cy.contains('a,button', /Get a demo|Book a demo|Build your demo/i).first().click({ force: true });
    cy.location('pathname', { timeout: 15000 }).should('match', /\/book-a-demo/i);
    // The demo page exists and renders footer etc.
    cy.get('footer').should('be.visible');
  });
});
