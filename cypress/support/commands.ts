// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


declare namespace Cypress {
  interface Chainable {
    acceptCookie(): Chainable<Element>;

    login(email: string, password: string): Chainable<Element>;
  }
  interface Chainable<Subject> {
    maskedType(text: string): Chainable<Subject>;
  }
}

Cypress.Commands.add('maskedType', { prevSubject: 'element' }, (subject, text) => {
  const input = subject[0];
  text.split('').forEach((char) => {
    cy.wrap(input).type(char, { log: false });
  });
});


Cypress.Commands.add("acceptCookie", () => {
  // accept cookie
  cy.get('[id="cookieconsent:desc"]').should('exist');
  cy.get('[aria-label="dismiss cookie message"]').should('exist');
  cy.get('[aria-label="dismiss cookie message"]').click();
  // TODO not.exists fail
  // cy.get('[id="cookieconsent:desc"]').should('not.exist');
})

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.get('littil-user-menu').as('userMenu');
  cy.get('@userMenu').contains('Inloggen');

  cy.get('@userMenu').get('[data-cy="loginBtn"]').should('exist', 1).as('loginBtn');
  cy.get('@loginBtn').contains("Inloggen");
  // cy.get('@loginBtn').click({force: true});  werkt niet

  cy.get('@userMenu').contains('Inloggen').click({force: true});

  cy.origin(Cypress.env('auth0_tenant'), { args: { email, password} }, ({ email, password}) => {
    cy.get('input#username').type(email);
    cy.get('input#password').type(password, {log: false});
    // cy.get('input#password').maskedType(password);  // TODO not working
    cy.contains('button[value=default]', 'Doorgaan').click();
  })
  // cy.wait(1000)
  cy.contains(email);

})
