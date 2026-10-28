describe('Expense tracker', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('adds expenses and filters by category', () => {
    cy.addExpense('Lunch', '250', 'Food')
    cy.addExpense('Cab', '400', 'Travel')

    cy.get('[data-cy="expense-item"]').should('have.length', 2)
    cy.get('[data-cy="count"]').should('have.text', '2')
    cy.get('[data-cy="total"]').should('have.text', '650.00')

    cy.get('[data-cy="filter"]').select('Food')
    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="expense-item"]').first().should('contain', 'Lunch')
    cy.get('[data-cy="count"]').should('have.text', '1')
    cy.get('[data-cy="total"]').should('have.text', '250.00')

    cy.get('[data-cy="filter"]').select('Travel')
    cy.get('[data-cy="expense-item"]').should('have.length', 1)
    cy.get('[data-cy="expense-item"]').first().should('contain', 'Cab')
    cy.get('[data-cy="total"]').should('have.text', '400.00')

    cy.get('[data-cy="filter"]').select('All')
    cy.get('[data-cy="expense-item"]').should('have.length', 2)
    cy.get('[data-cy="total"]').should('have.text', '650.00')
  })
})
