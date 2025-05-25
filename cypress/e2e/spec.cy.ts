describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Kinderen op een leuke en inspirerende manier kennis laten maken met programmeren.')
  })
})
