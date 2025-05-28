import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I visit the homepage', () => {
  cy.visit('/');
});

Then('I should see the title {string}', (title: string) => {
  cy.contains('h1', title).should('be.visible');
});
