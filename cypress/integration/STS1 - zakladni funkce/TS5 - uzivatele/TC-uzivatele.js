/// <reference types="cypress" />

import * as s from "../../../support/Selectors/STS1 - zakladni funkce - selectors/TS1 - moduly"
import * as e from "../../../support/envConfig/variables/envVar"


Cypress.Cookies.defaults({
    preserve: [
        e.loginCookieName,
        e.adminGuided_cookieName,
        e.alreadyGuided_cookieName,
        e.XSRF_TOKEN_DEV_CookieName,
        e.AspNetCore_Antiforgery_CookieName,
      ]
  });

  context("TS005 - Uživatelé", () => {
    beforeEach(() => {
        cy.viewport(1500, 1000)
    });
    before(() => {
        cy.clearCookies({ domain: null });
        cy.setCookie(e.adminGuided_cookieName, e.adminGuided_cookieValue);
        cy.setCookie(e.alreadyGuided_cookieName, e.alreadyGuided_cookieValue);
        /* cy.login() */
        cy.visit('https://flowio.popronsystems.cz/test/')
    });

    it("TC000 - Otevření stránky s uživateli", () => {
        
        cy.login()
        cy.get(s.nav_settings).click() //
        cy.get('[data-cy="link link-users"]', { timeout: 10000 }).click()
        //Assert, že modul bude mít classu "css-1q0hob active", která zbarví tlačítko modře
        cy.get('[data-cy="link link-users"]').should('have.class', 'css-1q0hob active')
        //Assert, že na konci url bude "/users"
        cy.url().should('include', '/users')
    })

    it.only("TC001 - Přidání uživatele", () => {
        
        cy.login()
        cy.get(s.nav_settings).click() //
        cy.get('[data-cy="link link-users"]', { timeout: 10000 }).click()

        cy.get('[data-cy="button add-record-button"]').click()
        cy.get('[data-cy="flowio-text-input"]').eq(1).type('test_jmeno_jmeno')
        cy.get('[data-cy="flowio-text-input"]').eq(2).type('test_paja')
        cy.get('[data-cy="flowio-text-input"]').eq(3).type('test@test')
        cy.get('[data-cy="flowio-password-input"]').type('test')
        cy.get('[data-cy="button submit-form-button"]').click()
        //Jak to tady ověřit???????????????,,,
        cy.get('[data-cy="Login-input-column"]').contains('test_paja').should('be.visible')
        
    })

    it("TC002 - Přidání uživatele s prázdnými poli", () => {
        
        cy.login()
        cy.get(s.nav_settings).click() //
        cy.get('[data-cy="link link-users"]', { timeout: 10000 }).click()

        cy.get('[data-cy="button add-record-button"]').click()
        cy.get('[data-cy="button submit-form-button"]').click()
        //Jak ověřit vyplnte prosím toto pole?????
        cy.get('[data-cy="modal-header"]').contains('Přidat uživatele').should('be.visible')
        
    })

    it("TC003 - Přidání uživatele s nevyplněnou povinnou položkou", () => {
        
        cy.login()
        cy.get(s.nav_settings).click() //
        cy.get('[data-cy="link link-users"]', { timeout: 10000 }).click()
        //Assert, že modul bude mít classu "css-1q0hob active", která zbarví tlačítko modře
        cy.get('[data-cy="link link-users"]').should('have.class', 'css-1q0hob active')
        //Assert, že na konci url bude "/users"
        cy.url().should('include', '/users')

        cy.get('[data-cy="button add-record-button"]').click()
        cy.get('[data-cy="flowio-text-input"]').eq(1).type('test_jmeno_jmeno')
        cy.get('[data-cy="flowio-text-input"]').eq(2).type('test_paja')
        cy.get('[data-cy="flowio-text-input"]').eq(3).type('test@test')
        cy.get('[data-cy="button submit-form-button"]').click()
        //Jak ověřit vyplnte prosím toto pole?????
        cy.get('[data-cy="modal-header"]').contains('Přidat uživatele').should('be.visible')
        
    })

    it("TC004 - Přihlášení na nového uživatele", () => {
        
        cy.visit('https://flowio.popronsystems.cz/test/')
        cy.get('[data-cy="flowio-text-input"]', { timeout: 10000 }).type('test_paja',)
        cy.get('[data-cy="flowio-password-input"]').type('test')
        cy.get('[data-cy="button accept-button"]').click()
        cy.get('h1').contains('Vítejte v systému FLOWIO.').should('be.visible')
        
    })

    it("TC005 - Editace uživatele", () => {
        cy.login()
        cy.get(s.nav_settings).click() //
        cy.get('[data-cy="link link-users"]', { timeout: 10000 }).click()

        cy.get('[data-cy="button edit-button"]').click()
        cy.get('[data-cy="flowio-text-input"]').eq(1).type('edit_test')
        cy.get('[data-cy="flowio-text-input"]').eq(2).type('edit_paja')
        cy.get('[data-cy="flowio-text-input"]').eq(3).type('edit_test@edit_test')
        cy.get('[data-cy="button submit-form-button"]').click()
        //Jak ověřit?
        
    })

    it("TC006 - Editace uživatele s prázdnými poli", () => {
        cy.login()
        cy.get(s.nav_settings).click() //
        cy.get('[data-cy="link link-users"]', { timeout: 10000 }).click()

        cy.get('[data-cy="button edit-button"]').click()
        cy.get('[data-cy="flowio-text-input"]').eq(1).clear()
        cy.get('[data-cy="flowio-text-input"]').eq(2).clear()
        cy.get('[data-cy="flowio-text-input"]').eq(3).clear()
        cy.get('[data-cy="button submit-form-button"]').click()
        cy.contains('[data-cy="modal-header"]', 'Upravit detail v řádku')
    })
});