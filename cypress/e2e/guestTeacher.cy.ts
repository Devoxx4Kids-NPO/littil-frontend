describe('a guestTeacher journey', () => {

  beforeEach(() => {
    // visit the site
    cy.visit('/');
    // accept the cookie message
    cy.acceptCookie();
  });

  it('the guestTeacher user can login', () => {

    let username = Cypress.env('user_guestteacher1_username');
    let password = Cypress.env('user_guestteacher1_password');
    cy.login(username, password);

    cy.wait(1000);

    // cy.get('littil-user-menu').should('exist');
    // cy.get('[data-test="user-menu-btn"]').should('exist');

    cy.get("app-root > littil-content-container div:nth-of-type(3) img").click();
    // Breaking down the CSS selector:
    //   app-root: Selects the app-root element, which is usually the root component in an Angular application.
    //   >: The child combinator, which selects direct child elements.
    //   littil-content-container: Selects the littil-content-container element, a direct child of app-root.
    //   div:nth-of-type(3): Selects the third div element among its siblings within the littil-content-container element.
    //   img: Selects the img (image) element that is a child of the third div.
    //
    // In summary, cy.get("app-root > littil-content-container div:nth-of-type(3) img") selects the image
    // (img) element inside the third div element within the littil-content-container element, which is a
    // direct child of the app-root element. This allows you to interact with or assert something about that
    // specific image element during your Cypress tests.



    cy.get("#menu-item-0").click();

    cy.wait(1000);

    cy.contains("Profiel").should('be.visible');
    // cy.contains("Modules").should('be.visible'); // not working yet

    cy.get("#MONDAY").click();


    // cy.get("div.justify-between > div > littil-button-rounded:nth-of-type(1) > button").click();

    // select Modules option
    cy.get("a:nth-of-type(2) > span").click();  // TODO not working
    cy.wait(2000)

    // cy.get("#\\33 2000000-0000-0000-0000-000000000000").click();
    // cy.get("[data-test='saveButton'] > button").click();

    // uitloggen
    cy.contains(username).should('exist');
    cy.get("div:nth-of-type(3) img").click();
    // In summary, cy.get("div:nth-of-type(3) img") selects the image (img) element inside
    // the third div element on the page. This is useful when you want to interact with or
    // assert something about that specific image element during your Cypress tests.

    cy.get("[data-test='logout-btn']").click();
    cy.location("href").should("eq", "http://localhost:4200/home");


  })

});


