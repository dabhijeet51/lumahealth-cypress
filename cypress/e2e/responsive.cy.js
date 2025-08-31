const viewports = [
  { w: 1280, h: 800 },
  { w: 768, h: 1024 },
  { w: 375, h: 667 }
];

describe('Responsive layout', () => {
  viewports.forEach(vp => {
    it(`renders on ${vp.w}x${vp.h}`, () => {
      cy.viewport(vp.w, vp.h);
      cy.visit('/');
      cy.get('header,nav').should('be.visible');
      cy.get('footer').should('be.visible');
    });
  });
});