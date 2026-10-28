// Fills the form and submits it. Shared by every spec in cypress/e2e.
Cypress.Commands.add('addExpense', (title, amount, category) => {
  if (title) cy.get('[data-cy="title"]').type(title)
  if (amount) cy.get('[data-cy="amount"]').type(amount)
  cy.get('[data-cy="category"]').select(category)
  cy.get('[data-cy="add-expense"]').click()
})
