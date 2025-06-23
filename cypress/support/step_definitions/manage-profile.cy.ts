import {Then} from "@badeball/cypress-cucumber-preprocessor";

Then('the user decides to change his profile', () => {
  cy.get('app-root > littil-content-container div:nth-of-type(3) img')
    .should('exist')
    .should('be.visible')
    .click();
  cy.get('[data-test="userProfileButton"]')
    .should('exist')
    .should('be.visible')
    .click();
})

Then('the user can go to the profile page', () => {
  cy.get('[data-test="profileRouterLink"]')
    .should('exist')
    .should('be.visible')
    .click();
  cy.get('[data-test="changeProfilePage"]')
    .should('exist')
    .should('be.visible');
});

Then('the user can go to the modules page', () => {
  cy.get('[data-test="modulesRouterLink"]')
    .should('exist')
    .should('be.visible')
    .click();
  cy.get('[data-test="changeModulesPage"]')
    .should('exist')
    .should('be.visible');
});

Then('the user has no modules page', () => {
  cy.get('[data-test="modulesRouterLink"]')
    .should('not.exist');
});

Then('the user set the name of the school as {string}',(schoolName: string) => {
  cy.get('[data-test="schoolNameControl"] input')
    .should('exist')
    .should('be.visible')
    .clear()
    .type(schoolName);
});

Then('the actual value of the schoolName is {string}', (schoolName:  string) => {
  cy.get('[data-test="schoolNameControl"] input')
    .should('exist')
    .should('be.visible')
    .invoke('val')
    .then((actualValue) => {
      expect(actualValue).to.be.equal(schoolName);
    });
});

Then('the user cannot set the name of a school', () => {
  cy.get('[data-test="schoolNameControl"] input')
    .should('not.exist');
});

Then('the user set his firstname as {string}', (firstName: string) => {
  cy.get('[data-test="firstName"] input')
    .should('exist')
    .should('be.visible')
    .clear()
    .type(firstName);
});

Then('the actual value of the firstname is {string}', (firstName:  string) => {
  cy.get('[data-test="firstName"] input')
    .should('exist')
    .should('be.visible')
    .invoke('val')
    .then((actualValue) => {
      expect(actualValue).to.be.equal(firstName);
    });
});

Then('the user set the prefix of his surname as {string}', (prefix: string) => {
  cy.get('[data-test="prefix"] input')
    .should('exist')
    .should('be.visible')
    .clear()
    .type(prefix);
});

Then('the actual value of the prefix is {string}', (prefix:  string) => {
  cy.get('[data-test="prefix"] input')
    .should('exist')
    .should('be.visible')
    .invoke('val')
    .then((actualValue) => {
      expect(actualValue).to.be.equal(prefix);
    });
});

Then('the user set his surname as {string}', (surname: string) => {
  cy.get('[data-test="surname"] input')
    .should('exist')
    .should('be.visible')
    .clear()
    .type(surname);
});

Then('the actual value of the surname is {string}', (surname:  string) => {
  cy.get('[data-test="surname"] input')
    .should('exist')
    .should('be.visible')
    .invoke('val')
    .then((actualValue) => {
      expect(actualValue).to.be.equal(surname);
    });
});

Then('the user set the address as {string}', (address: string) => {
  cy.get('[data-test="address"] input')
    .should('exist')
    .should('be.visible')
    .clear()
    .type(address);
});

Then('the actual value of the address is {string}', (address:  string) => {
  cy.get('[data-test="address"] input')
    .should('exist')
    .should('be.visible')
    .invoke('val')
    .then((actualValue) => {
      expect(actualValue).to.be.equal(address);
    });
});

Then('the user set the postalcode as {string}', (postalcode: string) => {
  cy.get('[data-test="postalCode"] input')
    .should('exist')
    .should('be.visible')
    .clear()
    .type(postalcode);
});

Then('the actual value of the postalcode is {string}', (postalcode:  string) => {
  cy.get('[data-test="postalCode"] input')
    .should('exist')
    .should('be.visible')
    .invoke('val')
    .then((actualValue) => {
      expect(actualValue).to.be.equal(postalcode);
    });
});

Then('the user can change the status of the module {string}', (moduleName: string) =>  {
  cy.get('[data-test="moduleName'+ moduleName + '"]')
    .should('exist')
    .then(($checkbox) => {
      const isChecked = $checkbox.prop('checked');
      cy.log(`Checkbox for ${moduleName} is checked: ${isChecked}`);
      cy.wrap($checkbox).click();
    });
})

Then('the user can set the status of the module {string} to checked', (moduleName: string) =>  {
  cy.get('[data-test="moduleName'+ moduleName + '"]')
    .should('exist')
    .then(($checkbox) => {
      const isChecked = $checkbox.prop('checked');
      cy.log(`Checkbox for ${moduleName} is checked: ${isChecked}`);
      if (!isChecked) {
        cy.wrap($checkbox).click();
      }
    });
})

Then('the actual value of the module {string} is checked', (moduleName: string) =>  {
  cy.get('[data-test="moduleName'+ moduleName + '"]')
    .should('exist')
    .should('be.visible')
    .should('be.checked');
})

Then('the actual value of the module {string} is unchecked', (moduleName: string) =>  {
  cy.get('[data-test="moduleName'+ moduleName + '"]')
    .should('exist')
    .should('be.visible')
    .should('not.be.checked');
})

Then('the user can set the status of the module {string} to unchecked', (moduleName: string) =>  {
  cy.get('[data-test="moduleName'+ moduleName + '"]')
    .should('exist')
    .then(($checkbox) => {
      const isChecked = $checkbox.prop('checked');
      cy.log(`Checkbox for ${moduleName} is checked: ${isChecked}`);
      if (isChecked) {
        cy.wrap($checkbox).click();
      }
    });
})

Then('the user save the changes of the school profile', () => {
  cy.intercept('PUT', '/api/v1/schools')
    .as('apiCall');
  cy.get('[data-test="saveProfileButton"]')
    .should('exist')
    .should('be.visible')
    .click();
  cy.wait('@apiCall');
})

Then('the user can save the changes of the guest teacher profile', () => {
  cy.intercept('PUT', '/api/v1/guest-teachers')
    .as('apiCall');
  cy.get('[data-test="saveProfileButton"]')
    .should('exist')
    .should('be.visible')
    .click();
  cy.wait('@apiCall');
})

Then('the user can save the modules', () => {
  cy.intercept('POST', '**/api/v2/guest-teachers/*/modules')
    .as('apiCall');
  cy.get('[data-test=saveButton]')
    .should('exist')
    .should('be.visible')
    .click();
  cy.wait('@apiCall');
});

Then('the user cancel the changes of the profile', () => {
  cy.get('[data-test="cancelChangesButton"]')
    .should('exist')
    .should('be.visible')
    .click()
  cy.wait(1000);
});

Then('the user can cancel the changes of the modules', () => {
  cy.get('[data-test="cancelButton"]')
    .should('exist')
    .should('be.visible')
    .click();
});

Then('the user can change the availability for day {string}', (day: string) => {
  cy.get('[data-test="checkbox-' +  day + '"]')
    .should('exist')
    .then(($checkbox) => {
      const isChecked = $checkbox.prop('checked');
      cy.log(`Checkbox for ${day} is checked: ${isChecked}`);
      cy.wrap($checkbox).click();
    });
});

Then('the user can set the availability for day {string} to checked', (day: string) =>  {
  cy.get('[data-test="checkbox-'+ day + '"]')
    .should('exist')
    .then(($checkbox) => {
      const isChecked = $checkbox.prop('checked');
      cy.log(`Checkbox for ${day} is checked: ${isChecked}`);
      if (!isChecked) {
        cy.wrap($checkbox).click();
      }
    });
})

Then('the user can set the availability for day {string} to unchecked', (day: string) =>  {
  cy.get('[data-test="checkbox-'+ day + '"]')
    .should('exist')
    .then(($checkbox) => {
      const isChecked = $checkbox.prop('checked');
      cy.log(`Checkbox for ${day} is checked: ${isChecked}`);
      if (isChecked) {
        cy.wrap($checkbox).click();
      }
    });
})

Then('the actual value of the availability for day {string} is checked', (day: string) => {
  cy.get('[data-test="checkbox-'+ day + '"]')
    .should('exist')
    .should('be.visible')
    .should('be.checked');
});

Then('the actual value of the availability for day {string} is unchecked', (day: string) => {
  cy.get('[data-test="checkbox-'+ day + '"]')
    .should('exist')
    .should('be.visible')
    .should('not.be.checked');
});
