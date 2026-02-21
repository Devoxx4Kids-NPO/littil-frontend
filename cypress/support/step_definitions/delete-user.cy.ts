import {Then} from "@badeball/cypress-cucumber-preprocessor";
import {getSharedData} from "../../utils/shared-data";

Then('the user deletes his guest teacher profile', ()=> {
  let emailAddress: string = getSharedData('emailAddress');
  cy.get('[data-test="deleteProfileRouterLink"]')
    .should('exist')
    .click();
    cy.get('[data-test="deleteProfilePage"]')
      .should('exist')
      .should('be.visible');
  cy.get('[data-test="emailInput"]')
    .should('be.visible')
    .type(emailAddress)

  cy.intercept('DELETE', '/api/v1/guest-teachers/*')
    .as('apiCall');
  cy.get('[data-test="deleteProfileButton"]')
    .should('be.visible')
    .click();
  cy.wait('@apiCall');
})

Then('the user deletes his school profile', ()=> {
  let emailAddress: string = getSharedData('emailAddress');
  cy.get('[data-test="deleteProfileRouterLink"]')
    .should('exist')
    .click();
    cy.get('[data-test="deleteProfilePage"]')
      .should('exist')
      .should('be.visible');
  cy.get('[data-test="emailInput"]')
    .should('be.visible')
    .type(emailAddress)

  cy.intercept('DELETE', '/api/v1/schools/*')
    .as('apiCall');
  cy.get('[data-test="deleteProfileButton"]')
    .should('be.visible')
    .click();
  cy.wait('@apiCall');
})
