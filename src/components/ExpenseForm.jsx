import { useState } from 'react'
import { CATEGORIES, validateExpense } from '../utils/expenses.js'

// Form for adding an expense.
// Props: onAdd(expense) is called with { title, amount, category } once the input is valid.
// State: title, amount and category mirror the inputs; error holds the current
// validation message. The expense list itself lives in App.
function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [error, setError] = useState(null)

  function handleSubmit(event) {
    event.preventDefault()
    const validationError = validateExpense({ title, amount })
    if (validationError) {
      setError(validationError)
      return
    }

    onAdd({ title: title.trim(), amount: Number(amount), category })
    setTitle('')
    setAmount('')
    setError(null)
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <label>
        Title
        <input
          data-cy="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        Amount
        <input
          data-cy="amount"
          inputMode="decimal"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <label>
        Category
        <select
          data-cy="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {CATEGORIES.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <button type="submit" data-cy="add-expense">
        Add expense
      </button>
      {error && (
        <p className="form-error" role="alert" data-cy="form-error">
          {error}
        </p>
      )}
    </form>
  )
}

export default ExpenseForm
