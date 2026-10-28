import ExpenseItem from './ExpenseItem.jsx'

// Renders the expenses currently displayed, or a message when there are none.
// Props: expenses is the already-filtered list; onDelete(id) is passed to each row.
// State: none.
function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <p className="empty" data-cy="empty-list">
        No expenses to show.
      </p>
    )
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default ExpenseList
