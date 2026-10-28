export const CATEGORIES = ['Food', 'Travel', 'Bills', 'Other']
export const ALL_CATEGORIES = 'All'
export const MAX_AMOUNT = 100000

// Returns an error message for invalid input, or null when the expense is valid.
export function validateExpense({ title, amount }) {
  if (!title || title.trim() === '') return 'Title is required.'

  const raw = String(amount ?? '').trim()
  const value = Number(raw)
  if (raw === '' || !Number.isFinite(value)) return 'Amount must be a number.'
  if (value <= 0) return 'Amount must be greater than zero.'
  if (value > MAX_AMOUNT) return 'Amount cannot exceed 100,000.'

  return null
}

// Sums in integer cents so totals like 0.1 + 0.2 come out exact.
export function calculateTotal(expenses) {
  const cents = expenses.reduce(
    (sum, expense) => sum + Math.round(expense.amount * 100),
    0,
  )
  return cents / 100
}

export function formatAmount(value) {
  return value.toFixed(2)
}

export function filterExpenses(expenses, category) {
  if (category === ALL_CATEGORIES) return expenses
  return expenses.filter((expense) => expense.category === category)
}
