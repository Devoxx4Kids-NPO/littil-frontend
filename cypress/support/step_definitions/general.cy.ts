import { Then, When } from "@badeball/cypress-cucumber-preprocessor";

When('the user open the homepage', () => {
  cy.visit('http://localhost:4200');
  cy.contains("info@littil.org")
    .should('be.visible');
});

Then ('the user accept the cookie message', () => {
  cy.get('[id="cookieconsent:desc"]')
    .should('exist')
    .should('be.visible');
  cy.get('[aria-label="dismiss cookie message"]')
    .should('exist')
    .click();
  cy.get('[id="cookieconsent:desc"]')
    .should('not.be.visible');
})

When('the user decides to navigate to the main menu option {string}',(mainMenuOption: string) => {
  cy.get('[data-test="mainMenu"]')
    .should('exist')
    .should('be.visible');
  cy.get('[data-test="mainMenu"] [data-test="mainMenu-'+ mainMenuOption + '"] [data-test="mainMenuButton"]')
    .should('exist')
    .should('be.visible')
    .click();
  // should probably wait for the page to load
});
