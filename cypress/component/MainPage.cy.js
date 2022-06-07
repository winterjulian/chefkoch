import { mount } from '@cypress/vue'
import MainPage from "../../src/components/pages/MainPage";

describe('MainPage', () => {
  it('renders the component', () => {
    mount(MainPage)
  })

  cy.get('h1').should('have.text', 'Übersicht')
})
