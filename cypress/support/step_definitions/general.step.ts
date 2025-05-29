import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the homepage', () => {
  cy.visit('http://localhost:4200');
  cy.contains("info@littil.org").should('be.visible');
});

Then ('accept the cookie', () => {
  cy.acceptCookie();
})

When('the guestTeacher logs into the system', () => {
  const userCredentials = Cypress.env('userCredentials');
  const user = userCredentials.guestTeacher;
  const { username, password } = user;
  cy.login(username, password);
  cy.contains(username).should('exist')
  // .should('be.visible')  TODO
});


When('the logged in user indicates he want to change his profile', () => {
  cy.wait(2000)
  cy.get('app-root > littil-content-container div:nth-of-type(3) img').click();
  cy.wait(2000)
  cy.get("[data-test='profiel-btn']").click();
  cy.wait(2000)
  // cy.get("littil-content-container [data-test='profiel-btn'] > button").click();

  // test cancelChangesBtn
});


Then('the guestTeacher decides to change is profile', () => {
  // Get the input field and capture its initial value
  cy.get('[data-test="address"] input') // Replace with your input's selector
    .invoke('val') // Fetch the current value
    .as('initialValue'); // Store it as an alias

  cy.get('[data-test="address"] input')
    .should('be.visible')
    .clear()
    .type('new address')

  cy.get('[data-test="cancelChangesBtn"] button')
    .should('be.visible')
    .click()

  cy.wait(2000)

  // Validate that the input value has not changed
  cy.get('@initialValue').then((initialValue) => {
    cy.get('[data-test="address"] input')
      .invoke('val') // Fetch the new value
      .should('equal', initialValue); // Assert it's different from the initial value
  });




  // test saveBtn

  cy.get('[data-test="firstName"] input')
    .should('be.visible')
    .clear()
    .type('Jan')
  cy.get('[data-test="prefix"] input')
    .should('be.visible')
    .clear()
  cy.get('[data-test="surname"] input')
    .should('be.visible')
    .clear()
    .type('Jansen')

  cy.get('[data-test="address"] input')
    .should('be.visible')
    .clear()
    .type('new address')

  cy.get('[data-test="saveProfileBtn"]')
    .should('be.visible')
    .click() // TODO issue
})
