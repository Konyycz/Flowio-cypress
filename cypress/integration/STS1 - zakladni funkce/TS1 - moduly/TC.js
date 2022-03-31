/// <reference types="cypress" />
//jak řadit ty soubory, zda více TC.js souborů, jak to spouštět atd.
//login v commandech nebo kde?
//každý TC se přihlašuje stále dokola - dobře/špatně?
//sekne se mi to na loginu - jak počkat až je viditelný nějaký element na stránce
//vyskakovací okno "jste tady poprvé..."
//jestli přidaný modul potom smazat a ověřit že tam už není

import * as s from "../../../support/Selectors/STS1 - zakladni funkce - selectors/TS1 - moduly"

Cypress.Cookies.defaults({
    //preserve: ["ewaLogin-988130453"],
  });

  context("Login", () => {
    beforeEach(() => {
        cy.viewport(1500, 1000)
    });
    before(() => {
     cy.clearCookies()
    });

    it("TC000", () => {
        
        cy.login()
        cy.get(s.nav_settings).click() //
        cy.get(s.link_modules).click()
        //https://flowio.popronsystems.cz/test/administration/modules ověřit, že ověřuje url /admin/modules
        //zkontrolovat, že se zobrazují řádky, zbarví se tlačítko moduly modře
    });

    it.only("TC001", () => {
        
        cy.login()
        cy.get(s.nav_settings).click() //
        cy.get(s.link_modules).click()
        cy.get(s.add_button).click()
        cy.contains(s.input_container, "Název").type("Cypress_test")
        cy.get(s.submit_button).click() //
        cy.contains(s.name_input, 'Cypress_test').should('be.visible') // selektor na row

    });

    it("TC002", () => {
        
        cy.login()
        cy.get(s.nav_settings).click() //
        cy.get(s.link_modules).click()
        cy.get(s.add_button).click()
        cy.get(':nth-child(2) > .css-n9uglt').click()
        cy.get(s.submit_button).click()
        cy.contains("Přidat modul")

    });

    it("TC003", () => {
        
        cy.login()
        cy.get(s.nav_settings).click()
        cy.get(s.link_modules).click()
        cy.get(s.add_button).click()
        cy.get(':nth-child(2) > .css-n9uglt').click()
        cy.get('[data-cy="input flowio-icon-input"]').click()
        cy.get('.icon-wrapper').eq(0).click()
        cy.get(s.submit_button).click()
        cy.contains("Přidat modul")

    });

    it("TC004", () => { // neni hotovo
        
        cy.login()
        cy.get(s.nav_settings).click()
        cy.get(s.link_modules).click()
        cy.get(s.add_button).click()
        cy.get(':nth-child(2) > .css-n9uglt').click()
        cy.get('[data-cy="input flowio-icon-input"]').click()
        cy.get('.icon-wrapper').eq(0).click()
        cy.get(s.submit_button).click()
        cy.contains("Přidat modul")

    });

    it("TC005", () => { //neni hotovo
        
        cy.login()
        cy.get(s.nav_settings).click()
        cy.get(s.link_modules).click()
        cy.get(s.add_button).click()
        cy.get(':nth-child(2) > .css-n9uglt').click()
        cy.get('[data-cy="input flowio-icon-input"]').click()
        cy.get('.icon-wrapper').eq(0).click()
        cy.get(s.submit_button).click()
        cy.contains("Přidat modul")

    });
  });

