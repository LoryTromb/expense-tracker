describe('Delete expense', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.addExpense('Lunch', '250', 'Food')
    cy.addExpense('Cab', '400', 'Travel')
  })

  it('removes only the deleted expense and updates count and total', () => {
    cy.contains('[data-cy="expense-item"]', 'Lunch')
      .find('[data-cy="delete-expense"]')
      .click()

    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="expense-item"]').first().should('contain', 'Cab')
    cy.get('[data-cy="count"]').should('have.text', '1')
    cy.get('[data-cy="total"]').should('have.text', '400.00')
  })

  it('shows the empty state after deleting the last expense', () => {
    cy.get('[data-cy="delete-expense"]').first().click()
    cy.get('[data-cy="delete-expense"]').first().click()

    cy.get('[data-cy="expense-item"]').should('not.exist')
    cy.get('[data-cy="empty-list"]').should('be.visible')
    cy.get('[data-cy="total"]').should('have.text', '0.00')
  })
})
