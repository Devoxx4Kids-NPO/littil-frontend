describe('a school journey', () => {

  beforeEach(() => {
    // visit the site
    cy.visit('/');
    // accept the cookie message
    cy.acceptCookie();
  });

  it('the school user can login', () => {

    let username = Cypress.env('user_school1_username');
    let password = Cypress.env('user_school1_password');
    cy.login(username, password);

    cy.wait(1000);

    // cy.get('littil-user-menu').should('exist');
    // cy.get('[data-test="user-menu-btn"]').should('exist');

    cy.get("app-root > littil-content-container div:nth-of-type(3) img").click();
    cy.get("#menu-item-0").click();

    cy.wait(1000);

    cy.contains("Profiel").should('be.visible');
    cy.contains("Modules").should('not.be.visible');


  })

});


