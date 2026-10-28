import {
  calculateTotal,
  filterExpenses,
  formatAmount,
  validateExpense,
} from './expenses.js'

const lunch = { id: '1', title: 'Lunch', amount: 250, category: 'Food' }
const cab = { id: '2', title: 'Cab', amount: 400, category: 'Travel' }

describe('validateExpense', () => {
  it('accepts a valid expense', () => {
    expect(validateExpense({ title: 'Lunch', amount: '250' })).toBeNull()
  })

  it('rejects an empty or whitespace-only title', () => {
    expect(validateExpense({ title: '', amount: '10' })).toBe('Title is required.')
    expect(validateExpense({ title: '   ', amount: '10' })).toBe(
      'Title is required.',
    )
  })

  it('rejects a missing or non-numeric amount', () => {
    expect(validateExpense({ title: 'Lunch', amount: '' })).toBe(
      'Amount must be a number.',
    )
    expect(validateExpense({ title: 'Lunch', amount: 'abc' })).toBe(
      'Amount must be a number.',
    )
    expect(validateExpense({ title: 'Lunch', amount: '12abc' })).toBe(
      'Amount must be a number.',
    )
  })

  it('rejects zero and negative amounts', () => {
    expect(validateExpense({ title: 'Lunch', amount: '0' })).toBe(
      'Amount must be greater than zero.',
    )
    expect(validateExpense({ title: 'Lunch', amount: '-5' })).toBe(
      'Amount must be greater than zero.',
    )
  })

  it('rejects amounts over 1,00,000 but accepts exactly 1,00,000', () => {
    expect(validateExpense({ title: 'Rent', amount: '100000.01' })).toBe(
      'Amount cannot exceed 100,000.',
    )
    expect(validateExpense({ title: 'Rent', amount: '100000' })).toBeNull()
  })
})

describe('calculateTotal', () => {
  it('returns 0 for no expenses', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('sums the amounts', () => {
    expect(calculateTotal([lunch, cab])).toBe(650)
  })

  it('avoids floating point drift', () => {
    expect(calculateTotal([{ amount: 0.1 }, { amount: 0.2 }])).toBe(0.3)
  })
})

describe('formatAmount', () => {
  it('always shows two decimal places', () => {
    expect(formatAmount(650)).toBe('650.00')
    expect(formatAmount(0.5)).toBe('0.50')
  })
})

describe('filterExpenses', () => {
  it('returns everything for All', () => {
    expect(filterExpenses([lunch, cab], 'All')).toEqual([lunch, cab])
  })

  it('keeps only the chosen category', () => {
    expect(filterExpenses([lunch, cab], 'Travel')).toEqual([cab])
    expect(filterExpenses([lunch, cab], 'Bills')).toEqual([])
  })
})
