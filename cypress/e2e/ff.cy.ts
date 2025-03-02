describe("littil-login", () => {
  it("tests littil-login", () => {
    cy.viewport(784, 706);
    cy.visit("http://localhost:4200");

    // cy.visit("https://www.littil.org/home");
    // cy.get("littil-content-container [data-test='login-btn'] > button").click();
    // cy.location("href").should("eq", "https://littil.eu.auth0.com/u/login?state=hKFo2SBTcExnLW5jT1FNNlBvT2UzTEY1dDZKRWFBNTZHWG83YaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIEs0NkotTF9IN2J0ZUVUZGtPY1htMGtVMEs2M0JGSUtyo2NpZNkgbGxIM1lMMDl5cXBxSmloSXNkN0VCekZEOUM2Q3lXZUQ");
    // cy.get("#username").click();
    // cy.get("#username").type("marcel.wildenburg.68@gmail.com");
    // cy.get("#password").click();
    // cy.get("#password").type("secret-password");

    let username = Cypress.env('user_school1_username');
    let password = Cypress.env('user_school1_password');
    cy.login(username, password);



    cy.get("div.c574b8c0d > button").click();
    cy.location("href").should("eq", "https://www.littil.org/?code=RzlHrHGpTY4ovRtod31Y2GZKheHOk3-XY6XsTh4wb2Wvn&state=TGlKUG9ZeTU5THp5VS5xUVhGYTIyOVBOS2FucjZqM0J3UUNOQTRSWlB0bw%3D%3D");
    cy.get("app-root > littil-content-container div:nth-of-type(3) img").click();
    cy.get("#menu-item-0").click();
    cy.get("#MONDAY").click();
    cy.get("div.justify-between > div > littil-button-rounded:nth-of-type(1) > button").click();
    cy.get("a:nth-of-type(2) > span").click();
    cy.get("#\\33 2000000-0000-0000-0000-000000000000").click();
    cy.get("[data-test='saveButton'] > button").click();
    cy.get("div:nth-of-type(3) img").click();
    cy.get("[data-test='logout-btn']").click();
    cy.location("href").should("eq", "https://www.littil.org/");
  });
});
