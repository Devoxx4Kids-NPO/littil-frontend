describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('info@littil.org').should('be.visible')
  })
})
