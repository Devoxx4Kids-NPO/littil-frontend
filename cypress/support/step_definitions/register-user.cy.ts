import {Then, When} from "@badeball/cypress-cucumber-preprocessor";
import {setSharedData} from "../../utils/shared-data";

When('the new user decides to start the registration', () => {
  cy.get('littil-content-container [data-test="register-btn"] > button')
    .click();
});

Then('the registration form is present', () => {
  cy.get('[data-test="registerModal"]')
    .should("be.visible");
});

Then('the user sets his unique email address', () => {
  const email: string  = `e2e-test-${Date.now()}@e2e.littil.org`;
  setSharedData('emailAddress', email)
  cy.get('[data-test="inputEmail"]')
    .type(email);
})

Then('the user confirms the registration', () => {
  cy.intercept('POST', '/api/v1/users/user')
    .as('apiCall');
  cy.get('[data-test="registerButton"] > button')
    .click();
  cy.wait('@apiCall');
})

Then( 'the account is created and confirmed', () => {
  cy.get('[data-test="registerConformationModal"]')
    .should('exist')
    .should("be.visible")
})

Then('the user continues the registration with Login', () =>{
  cy.get('[data-test="loginButton"] > button')
    .should('exist')
    .should('be.visible')
    .click();
  cy.origin(Cypress.env('auth0_tenant'), () => {
    cy.get('input#username')
      .should('exist');
  });
})

Then('the user stops the registration', () => {
  cy.get('[data-test="closeButton"]')
    .should('exist')
    .should('be.visible')
    .click();
  cy.get('[data-test="registerConformationModal"]')
    .should("not.exist");
});

Then('the user decides to create a profile for a school', () => {
  cy.get('[data-test="inputRadio"] input')
    .should('exist')
    .get('[data-test=radio-schools]')
    .should('exist')
    .should('be.visible')
    .click();
});

Then('the user decides to create a profile for a guest teacher', () => {
  cy.get('[data-test="inputRadio"] input')
    .should('exist')
    .get('[data-test=radio-guest_teachers]')
    .should('exist')
    .should('be.visible')
    .click();
});

