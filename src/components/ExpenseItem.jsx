import { formatAmount } from '../utils/expenses.js'

// One row of the expense list.
// Props: expense is { id, title, amount, category }; onDelete(id) removes it in App.
// State: none.
function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="expense-item" data-cy="expense-item">
      <span className="expense-title">{expense.title}</span>
      <span className="expense-category">{expense.category}</span>
      <span className="expense-amount">{formatAmount(expense.amount)}</span>
      <button
        type="button"
        data-cy="delete-expense"
        aria-label={`Delete ${expense.title}`}
        onClick={() => onDelete(expense.id)}
      >
        Delete
      </button>
    </li>
  )
}

export default ExpenseItem
