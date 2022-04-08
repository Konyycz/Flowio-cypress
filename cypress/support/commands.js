Cypress.Commands.add('login', (jmeno, heslo) => {
    cy.visit('https://flowio.popronsystems.cz/test/')
    cy.wait(500)
    cy.get('[data-cy="flowio-text-input"]', { timeout: 10000 }).type('pavelk')
    cy.get('[data-cy="flowio-password-input"]').type('ZJ1UPWFD5w7l6lo3aagg')
    cy.get('[data-cy="button accept-button"]').click()
  
  })