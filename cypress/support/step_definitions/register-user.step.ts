import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { setSharedData, getSharedData } from '../../utils/shared-data';

When('the new guestTeacher indicates he want to register', () =>{
  cy.get("littil-content-container [data-test='register-btn'] > button").click();
})

Then('he is presented with a registration form', () => {
  cy.get('[data-test="registerModal"]').should("be.visible")
})

When('he gives his email as {string}',(email: string) => {
  setSharedData('email', email)
  cy.get("input").type(email);
})

Then('he confirms the registration', () => {
  cy.intercept('POST', '/api/v1/users/user').as('apiCall');
  cy.get("[data-test='registerButton'] > button").click();
  cy.wait('@apiCall');
})

Then( 'the account is created and confirmed', () => {
  cy.get('[data-test="registerConformationModal"]').should("be.visible")
})

Then('an email is send with the login details', () =>{
  cy.mhGetAllMails().then((emails) => {
    const email = emails[0];  // TODO get last email for expected userName
    cy.log("from : "+ email.From.Mailbox + "@" + email.From.Domain)
    cy.log("to : " + email.To[0].Mailbox + "@" + email.To[0].Domain);
    const input: String = email.Content.Body;
    const keyword = "Uw wachtwoord:";
    // Find the starting position of "your email"
    // TODO refactor
    const startIndex = input.indexOf(keyword);
    if (startIndex !== -1) {
      // Find the position of the first "<" after "your email"
      const endIndex = input.indexOf('\n', startIndex);
      if (endIndex !== -1) {
        // Extract the substring from "your email" to the first "\n"
        const result = input.substring(startIndex + 15, endIndex).trim();
        setSharedData('password', result);
      } else {
        console.log("No '<' character found after the keyword.");
      }
    } else {
      console.log("Keyword not found in the string.");
    }
  });
});

Then('the user continues with Login', () =>{
  cy.get("[data-test='loginButton'] > button").click();
})


Then( 'test email is set as shared data', () => {
  setSharedData('email', 'test-mwi-23@littil.org');
  setSharedData('password', 'JbXj95-iXk4VR')

  console.log(getSharedData('username'));
})

Then('the user can complete his profile as guestTeacher', () =>{
  cy.get('[data-test="firstname"]').should('be.visible').type('firstname');
  cy.get('[data-test="prefix"]').should('be.visible').type('prefix');
  cy.get('[data-test="surname"]').should('be.visible').type('surname');
  // todo why is input required for next
  cy.get('[data-test="address"] input').should('be.visible').type('address');
  cy.get('[data-test="houseNumber"] input').should('be.visible').type('2');
  cy.get('[data-test="zipCode"] input').should('be.visible').type('2441BW');
  cy.wait(1000);

  cy.get('[data-test="savingProfileBtn"]').should('be.visible').click({force: true});
})


When('the users decides to login', () => {
  // cy.wait(2000);

  cy.get('littil-user-menu').as('userMenu');
  cy.get('@userMenu').contains('Inloggen');

  cy.get('@userMenu').get('[data-test="login-btn"]').should('exist', 1).as('loginBtn');


});

Then('the user deletes his profile', ()=> {
  let username: string = getSharedData('email');
  cy.get('[data-test="enable_delete_profile"]').should('exist').click();

  cy.get('[data-test="deleteProfileConfirmEmail"]').should('be.visible').type(username);
  // cy.intercept('DELETE', '/api/v1/guest-teachers').as('apiCall'); todo include / ?
  cy.get('[data-test="deleteProfileBtn"]').should('be.visible').click();
  // cy.wait('@apiCall')  TODO fail because id is probably missingor / in cy.intercept
})


Then('the user login with the given login details', () => {
  let username = getSharedData<string>('email')
  let password = getSharedData<string>('password')

  cy.get('@loginBtn').contains("Inloggen");
  cy.get('@userMenu').contains('Inloggen').click({force: true});

  const sentArgs = { username: username, password: password }
  cy.origin('https://dev-g60bne29.eu.auth0.com',
    { args: sentArgs },
    ({ username, password }) => {
      cy.location("href").should("contains", "https://dev-g60bne29.eu.auth0.com/u/login?");
      cy.get("#username").type(username);
      cy.get("#password").type(password);
      cy.contains('button[value=default]', 'Doorgaan').click();
      // // cy.get("div.c4d5413ce > button").click();
      // cy.location("href").should("contains", "https://dev-g60bne29.eu.auth0.com/u/consent");
      // //cy.get("button.c5494d417").click()
      // cy.contains('button[value=accept]', 'Accepteren').click();
    })
  cy.location("href").should("contains", "http://localhost:4200/");


});

// Then('the user login with the given login details', () => {
Then('the user login for the first time and accept the account', () => {
  let username = getSharedData<string>('email')
  let password = getSharedData<string>('password')


  const sentArgs = { username: username, password: password }
  cy.origin('https://dev-g60bne29.eu.auth0.com',
    { args: sentArgs },
    ({ username, password }) => {
      cy.location("href").should("contains", "https://dev-g60bne29.eu.auth0.com/u/login?");
      cy.get("#username").type(username);
      cy.get("#password").type(password);
      cy.contains('button[value=default]', 'Doorgaan').click();
      // cy.get("div.c4d5413ce > button").click();
      cy.location("href").should("contains", "https://dev-g60bne29.eu.auth0.com/u/consent");
      //cy.get("button.c5494d417").click()
      cy.contains('button[value=accept]', 'Accepteren').click();
    })
    cy.location("href").should("contains", "http://localhost:4200/");
})

Then('the user can logout', () => {
  cy.wait(2000);
  cy.get('app-root > littil-content-container div:nth-of-type(3) img').should('be.visible').click();
  // cy.get('button[data-cy="userMenu"]').should('be.visible').first().click()
  cy.get('[data-test="logout-btn"]').should('be.visible').click();
  cy.get('[data-test="login-btn"]').should('exist');

})
