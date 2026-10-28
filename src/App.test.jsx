import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

async function addExpense(user, title, amount, category) {
  await user.type(screen.getByLabelText('Title'), title)
  await user.type(screen.getByLabelText('Amount'), amount)
  await user.selectOptions(screen.getByLabelText('Category'), category)
  await user.click(screen.getByRole('button', { name: 'Add expense' }))
}

function rows() {
  return screen.queryAllByRole('listitem')
}

describe('App', () => {
  it('starts empty with a zero total', () => {
    render(<App />)

    expect(screen.getByText('No expenses to show.')).toBeInTheDocument()
    expect(screen.getByText('0.00')).toBeInTheDocument()
  })

  it('lists added expenses with a count and a 2-decimal total', async () => {
    const user = userEvent.setup()
    render(<App />)

    await addExpense(user, 'Lunch', '250', 'Food')
    await addExpense(user, 'Cab', '400.5', 'Travel')

    expect(rows()).toHaveLength(2)
    expect(within(rows()[0]).getByText('Lunch')).toBeInTheDocument()
    expect(within(rows()[1]).getByText('400.50')).toBeInTheDocument()
    expect(screen.getByText(/Showing/)).toHaveTextContent('Showing 2 expenses')
    expect(screen.getByText('650.50')).toBeInTheDocument()
  })

  it('filters by category and updates the list, count and total', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Lunch', '250', 'Food')
    await addExpense(user, 'Cab', '400', 'Travel')

    await user.selectOptions(screen.getByLabelText('Show'), 'Food')

    expect(rows()).toHaveLength(1)
    expect(within(rows()[0]).getByText('Lunch')).toBeInTheDocument()
    expect(screen.getByText(/Showing/)).toHaveTextContent('Showing 1 expense')
    expect(screen.getByText('250.00', { selector: 'strong' })).toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText('Show'), 'Bills')
    expect(screen.getByText('No expenses to show.')).toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText('Show'), 'All')
    expect(rows()).toHaveLength(2)
  })

  it('deletes only the chosen expense and updates the total', async () => {
    const user = userEvent.setup()
    render(<App />)
    await addExpense(user, 'Lunch', '250', 'Food')
    await addExpense(user, 'Cab', '400', 'Travel')

    await user.click(screen.getByRole('button', { name: 'Delete Lunch' }))

    expect(rows()).toHaveLength(1)
    expect(screen.queryByText('Lunch')).not.toBeInTheDocument()
    expect(screen.getByText('Cab')).toBeInTheDocument()
    expect(screen.getByText('400.00', { selector: 'strong' })).toBeInTheDocument()
  })

  it('does not add a row for invalid input', async () => {
    const user = userEvent.setup()
    render(<App />)

    await addExpense(user, 'Refund', '-50', 'Other')

    expect(rows()).toHaveLength(0)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
