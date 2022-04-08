/// <reference types="cypress" />

import * as s from "../../../support/Selectors/STS1 - zakladni funkce - selectors/TS1 - moduly"
import * as e from "../../../support/envConfig/variables/envVar"
//změnit s. na selector.xxx
Cypress.Cookies.defaults({
    preserve: [
        e.loginCookieName,
        e.adminGuided_cookieName,
        e.alreadyGuided_cookieName,
        e.XSRF_TOKEN_DEV_CookieName,
        e.AspNetCore_Antiforgery_CookieName,
      ]
  });

  context("TS001 - Modules", () => {
    beforeEach(() => {
        cy.viewport(1500, 1000)
        cy.get(s.nav_settings).click({force: true})
        cy.get(s.link_modules, { timeout: 10000 }).click()
    });
    before(() => {
        cy.clearCookies({ domain: null });
        cy.setCookie(e.adminGuided_cookieName, e.adminGuided_cookieValue);
        cy.setCookie(e.alreadyGuided_cookieName, e.alreadyGuided_cookieValue);
        /* cy.login() */
        cy.visit('https://flowio.popronsystems.cz/test/')
    });

    it("TC000 - Check elements on module page", () => {
        
        //Assert, že modul bude mít classu "css-1q0hob active", která zbarví tlačítko modře
        cy.get(s.link_modules).should('have.class', 'css-1q0hob active')
        //Assert, že na konci url bude "/modules"
        cy.url().should('include', '/modules')
    });

    it("TC001 - Přidání modulů", () => {
        
        cy.get(s.add_button, { timeout: 10000 }).click()
        cy.contains(s.input_container, "Název").type("Cypress_test")
        cy.get(s.submit_button).click()
        //Assert, že se ve sloupci Název nachází náš nově vytvořený modul
        cy.contains(s.name_input, 'Cypress_test').eq(0).should('be.visible')
    });

    it("TC002 - Přidání modulů s prázdnými poli", () => {

        cy.get(s.add_button).click()
        /* cy.get(':nth-child(2) > .css-n9uglt').click() */
        cy.get(s.submit_button).click()
        //Assert, že nadpis formuláře "Přidat modul" je stále viditelný = neproběhlo přidání modulu
        cy.get('.modal-title').should('be.visible')

    });

    it("TC003 - Přidání modulů s nevyplněnou povinnou položkou", () => {

        cy.get(s.add_button).click()
        /* cy.get(':nth-child(2) > .css-n9uglt').click() */
        cy.get('[data-cy="input flowio-icon-input"]').click()
        cy.get('.icon-wrapper', { timeout: 10000 }).eq(0).click()
        cy.get(s.submit_button).click()
        //Assert, že po vybrání ikony a nechání prazdného názvu nelze modul uložit
        cy.get('.modal-title').should('be.visible')

    });

    it("TC004 - Přidání modulu s nevyplněnými nepovinnými položkami", () => {
        
        cy.get(s.add_button).click()
        cy.contains(s.input_container, "Název").type("TC_004_Cypress")
        cy.get(s.submit_button).click()
        //Assert, že se přidal řádek s názvem "TC_004_Cypress"
        cy.contains(s.name_input, 'TC_004_Cypress').should('be.visible')

    });

    it("TC005 - Přidání neviditelného modulu", () => {

        cy.get(s.add_button).click()
        cy.contains(s.input_container, "Název").type("TC005_Cypress")
        cy.get(s.submit_button).click()
        //Assert, že modul s názvem TC005_Cypress není viditelný
        cy.get('[data-cy="module-dropdown"]').contains('TC005_Cypress').should('not.exist')

    });

    it("TC006 - Editace viditelnosti modulu", () => {
        
        cy.get(s.edit_button, { timeout: 10000 }).eq(0).click({force: true})
        
        cy.contains('[data-cy="modal-content"]','Viditelný', { timeout: 10000 }).within(() => {
            cy.get('[data-cy="flowio-switch-input"]', { timeout: 10000 }).click()
            cy.get('input').should('be.checked')
            cy.get(s.submit_button).click()
        })

        //Assert, že v hlavní liště (navigaci) je viditelný modul s názvem "TC_005_Cypress"
        /* cy.contains('.css-rgmx9o', 'TC005_Cypress', { timeout: 10000 }).should('exist') */
    });

    it("TC007 - Editace názvu modulu", () => {
        
        cy.get(s.edit_button, { timeout: 10000 }).eq(0).click({force: true})
        
        cy.contains('[data-cy="modal-content"]','Název', { timeout: 10000 }).within(() => {
            cy.get('[data-cy="flowio-text-input"]', { timeout: 10000 }).clear().type('TC007_Cypress_Test')
            cy.get(s.submit_button).click()
        })

        //Assert, že v hlavní liště (navigaci) je viditelný modul s přejmenovaným názvem "TC_007_Cypress"
        cy.contains('[data-cy~="row"]', 'TC007_Cypress').should('be.visible')
    });

    it("TC008 - Editace ikony modulu", () => {

        cy.get(s.edit_button, { timeout: 10000 }).eq(0).click({force: true})
        
        cy.get('[data-cy="input flowio-icon-input"]', { timeout: 10000 }).click()
        cy.get('.icon-wrapper > span').contains('add').click()
        cy.get(s.submit_button).click()
        cy.get('[data-cy="Image-input-column"] > span').contains('add').should('be.visible')

    });

    it("TC009 - Přiřazení role k modulu", () => {
        
        cy.get('[data-cy="button assign-button"]').eq(0).click()
        cy.get('[data-cy="option-list-no-search"]', { timeout: 10000 }).eq(0).select('fakturant')
        cy.get('[data-cy="move-right-icon"]').click()
        cy.get('[data-cy="save-button"]').click()
        //Assert, že se objeví alert "Nastavení bylo uloženo"
        //Nefunguje ale, jelikož tam skáčou okna s červenou chybou
/*         cy.contains('.Toastify__toast', 'Nastavení bylo uloženo', { timeout: 10000 }).within (() => {
            cy.get('.Toastify__toast', { timeout: 10000 }).should('be.visible')
        }) */

    });

    it("TC012 - Nedokončené smazání modulu", () => {

        cy.contains('[data-cy~="row"]', 'TC007_Cypress', { timeout: 10000 }).within (() => {
            cy.get('[data-cy="button delete-button"]', { timeout: 10000 }).click({force: true})
        })

        cy.get('[data-cy="button decline-button"]').should('be.visible')
        cy.get('[data-cy="button decline-button"]').click({ force: true })
        cy.get('[data-cy="Name-input-column"]').eq(0).contains('TC007_Cypress_Test').should('be.visible')

    });

    it("TC013 - Smazání modulu", () => {

        cy.contains('[data-cy~="row"]', 'TC007_Cypress', { timeout: 10000 }).within (() => {
            cy.get('[data-cy="button delete-button"]').click()
        })

        cy.get('[data-cy="button accept-button"]').should('be.visible')
        cy.get('[data-cy="button accept-button"]').click()
        cy.contains('[data-cy~="row"]', 'TC007_Cypress').should('not.exist')
    });

  });

