import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { getSharedData } from "../../utils/shared-data";

Then('the user set the distance to {string}', (distance: string) => {
  cy.get('[data-test="distance"]')
    .should('exist')
    .should('be.visible')
    .clear()
    .type(distance);
});

Then('the user starts the search', () =>  {
  cy.intercept('GET', '/api/v1/search?*')
    .as('apiCall');
  cy.get('[data-test="searchButton"]')
    .should('exist')
    .should('be.visible')
    .click();
  cy.wait('@apiCall');
});

Then('one of the found users is selected on the map',() => {
  cy.get('[data-test="resultMarker"]')
    .should('exist')
    .first()
    .click();
});

Then('the user decides to make contact', () => {
  cy.get('[data-test="contactButton"]')
    .should('exist')
    .should('be.visible')
    .click();
  cy.get('[data-test="contactModal"]')
    .should('exist')
    .should('be.visible');
});

Then('the user accept his email address as contact information',  () =>{
   const emailAddress: string = getSharedData('emailAddress');
   cy.get('[data-test="contactInfo"] input')
     .should('exist')
     .should('be.visible')
     .invoke('val')
     .then((actualValue) => {
       expect(actualValue).to.be.equal(emailAddress);
     });
});

Then('the user set the contact information as {string}',  (contactInformation: string) =>{
  cy.get('[data-test="contactInfo"] input')
    .should('exist')
    .should('be.visible')
    .clear()
    .type(contactInformation);
});

Then('the user set a message {string}',  (message: string) =>{
  cy.get('[data-test="message"] input')
    .should('exist')
    .should('be.visible')
    .clear()
    .type(message);
});

Then('the user sends the message',  () =>{
  cy.intercept('POST', '/api/v1/contacts')
    .as('apiCall');
  cy.get('[data-test="sendEmailButton"]')
    .should('exist')
    .should('be.visible')
    .click();
  cy.wait('@apiCall');
  cy.get('[data-test="closeButton"]')
    .should('exist')
    .should('be.visible')
    .click();
  cy.get('[data-test="contactModal"]')
    .should('not.exist');
});

Then('the user cancel the action to send a message for contact',  () =>{
  cy.intercept('POST', '/api/v1/contacts')
    .as('apiNotCalled');
  cy.get('[data-test="cancelButton"]')
     .should('exist')
     .should('be.visible')
     .click();
   cy.get('[data-test="contactModal"]')
     .should('not.exist');

  // Wait a bit to ensure any async calls would have been made
  cy.wait(1000);

  // Assert that the API call was NOT made
  cy.get('@apiNotCalled.all').should('have.length', 0);
});


Then('the user set select the {string} module on the search page', (moduleName: string) => {
  cy.get('[data-test="checkbox-' + moduleName + '"]')
    .should('exist')
    .should('be.visible')
    .click();
});

