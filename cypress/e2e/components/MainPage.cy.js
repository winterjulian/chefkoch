const checkInput = 'Katzenfutter'

describe('MainPage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  it('waits until built', () => {

    cy.wait(2000);

  })

  it('clicks on the button', () => {
    cy.get('.basic-round-button').click();
    cy.get('.basic-input-field').first().type(` für Chefkoch`);
    cy.get('.basic-input-field').last().type(`Eine zauberhafte Beschreibung`);

    cy.wait(1000);

    cy.contains('Speichern').click();
  })

  it('edits the last added todo', () => {
    cy.get('.todo-frame').last().get('.fa-pencil').last().click();
    cy.get('.basic-input-field-small').first().clear().type(checkInput);
    cy.get('.fa-check').last().click();
    cy.contains(checkInput);

    cy.wait(1000);
  })

  it('deletes the last element', () => {
    cy.get('.todo-frame').last().click();
    cy.contains('Löschen').click();
    cy.contains(checkInput).should('not.exist');

    cy.wait(2000);
  })


})
