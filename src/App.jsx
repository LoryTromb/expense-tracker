import { useState } from 'react'
import CategoryFilter from './components/CategoryFilter.jsx'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import {
  ALL_CATEGORIES,
  calculateTotal,
  filterExpenses,
  formatAmount,
} from './utils/expenses.js'

// Owns all expense data and the active filter; children receive values and callbacks.
function App() {
  const [expenses, setExpenses] = useState([])
  const [filter, setFilter] = useState(ALL_CATEGORIES)

  const visibleExpenses = filterExpenses(expenses, filter)
  const total = calculateTotal(visibleExpenses)

  function addExpense(expense) {
    setExpenses((current) => [
      ...current,
      { id: crypto.randomUUID(), ...expense },
    ])
  }

  function deleteExpense(id) {
    setExpenses((current) => current.filter((expense) => expense.id !== id))
  }

  return (
    <main className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={addExpense} />
      <section className="summary">
        <CategoryFilter value={filter} onChange={setFilter} />
        <p>
          Showing <strong data-cy="count">{visibleExpenses.length}</strong>{' '}
          {visibleExpenses.length === 1 ? 'expense' : 'expenses'}
        </p>
        <p>
          Total: <strong data-cy="total">{formatAmount(total)}</strong>
        </p>
      </section>
      <ExpenseList expenses={visibleExpenses} onDelete={deleteExpense} />
    </main>
  )
}

export default App
