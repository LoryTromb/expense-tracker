describe('Invalid input', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('does not add a row for an empty title', () => {
    cy.addExpense('', '250', 'Food')

    cy.get('[data-cy="form-error"]').should('contain', 'Title is required.')
    cy.get('[data-cy="expense-item"]').should('not.exist')
    cy.get('[data-cy="count"]').should('have.text', '0')
  })

  it('does not add a row for a negative amount', () => {
    cy.addExpense('Refund', '-50', 'Other')

    cy.get('[data-cy="form-error"]').should(
      'contain',
      'Amount must be greater than zero.',
    )
    cy.get('[data-cy="expense-item"]').should('not.exist')
    cy.get('[data-cy="total"]').should('have.text', '0.00')
  })
})
