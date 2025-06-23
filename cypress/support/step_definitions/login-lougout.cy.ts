import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import {getSharedData, setSharedData} from "../../utils/shared-data";

Given('the login details of an existing user with the role {string}', (roleName: string) => {
  const userCredentials = Cypress.env('userCredentials');
  let user = undefined;
  switch (roleName) {
    case 'guestTeacher':
      user = userCredentials.guestTeacher;
      break;
    case 'school':
      user = userCredentials.school;
      break;
    default:
      throw new Error('Invalid roleName. Use "guestTeacher" or "school".');
  }
  if (user) {
    const { username, password } = user;
    setSharedData('emailAddress', username);
    setSharedData('password', password)
  }
})

When('the user decides to login',() => {
  cy.get('littil-content-container [data-test="login-btn"] > button')
    .click();
  cy.origin(Cypress.env('auth0_tenant'), () => {
    cy.get('input#username')
      .should('exist');
  });
});

Then('the user login with the given login details',() => {
  const emailAddress: string = getSharedData('emailAddress');
  const password: string = getSharedData('password');
  cy.intercept('GET', /api\/v1\/(guest-teachers|schools)\/.*/)
    .as('apiCall');
  cy.origin(Cypress.env('auth0_tenant'),
    { args: { emailAddress, password} },
    ({ emailAddress, password}) => {
      cy.get('input#username')
        .should('exist')
        .type(emailAddress);
      cy.get('input#password')
        .should('exist')
        .type(password, {log: false});
      cy.contains('button[value=default]', 'Doorgaan').click();
    });
  cy.wait('@apiCall')
  cy.wait(1000);  // TODO I don't like this, need to improve this
});

Then('the user login for the first time and accept the account', () => {
  let emailAddress = getSharedData<string>('emailAddress')
  let password = getSharedData<string>('password')
  const sentArgs = { emailAddress: emailAddress, password: password }
  cy.origin(Cypress.env('auth0_tenant'),
    { args: sentArgs },
    ({ emailAddress, password }) => {
      cy.location("href").should("contains", "https://dev-g60bne29.eu.auth0.com/u/login?");
      cy.get("input#username").type(emailAddress);
      cy.get("input#password").type(password);
      cy.contains('button[value=default]', 'Doorgaan').click();
      cy.location("href").should("contains", "https://dev-g60bne29.eu.auth0.com/u/consent");
      cy.contains('button[value=accept]', 'Accepteren').click();
    })
  cy.location("href").should("contains", "http://localhost:4200/");
})

Then('the user log out', () => {
  cy.get('app-root > littil-content-container div:nth-of-type(3) img')
    .should('exist')
    .should('be.visible')
    .click();
  cy.get('[data-test="logout-btn"]')
    .should('exist')
    .should('be.visible')
    .click();
});
