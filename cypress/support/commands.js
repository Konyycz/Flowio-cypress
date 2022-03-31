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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (jmeno, heslo) => {
    cy.visit('https://flowio.popronsystems.cz/test/')
    cy.get('[data-cy="flowio-text-input"]').type('pavelk')
    cy.get('[data-cy="flowio-password-input"]').type('ZJ1UPWFD5w7l6lo3aagg')
    cy.get('[data-cy="button accept-button"]').click()
  
  })