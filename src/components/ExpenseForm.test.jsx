import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExpenseForm from './ExpenseForm.jsx'

function renderForm() {
  const onAdd = vi.fn()
  render(<ExpenseForm onAdd={onAdd} />)
  return { onAdd, user: userEvent.setup() }
}

describe('ExpenseForm', () => {
  it('submits a valid expense and clears the inputs', async () => {
    const { onAdd, user } = renderForm()

    await user.type(screen.getByLabelText('Title'), '  Lunch ')
    await user.type(screen.getByLabelText('Amount'), '250.5')
    await user.selectOptions(screen.getByLabelText('Category'), 'Travel')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    expect(onAdd).toHaveBeenCalledWith({
      title: 'Lunch',
      amount: 250.5,
      category: 'Travel',
    })
    expect(screen.getByLabelText('Title')).toHaveValue('')
    expect(screen.getByLabelText('Amount')).toHaveValue('')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('offers the four categories and defaults to Food', () => {
    renderForm()

    const options = screen.getAllByRole('option').map((option) => option.value)
    expect(options).toEqual(['Food', 'Travel', 'Bills', 'Other'])
    expect(screen.getByLabelText('Category')).toHaveValue('Food')
  })

  it('rejects an empty title', async () => {
    const { onAdd, user } = renderForm()

    await user.type(screen.getByLabelText('Amount'), '250')
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    expect(onAdd).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Title is required.')
  })

  it.each([
    ['abc', 'Amount must be a number.'],
    ['0', 'Amount must be greater than zero.'],
    ['-20', 'Amount must be greater than zero.'],
    ['100001', 'Amount cannot exceed 100,000.'],
  ])('rejects the amount %s', async (amount, message) => {
    const { onAdd, user } = renderForm()

    await user.type(screen.getByLabelText('Title'), 'Lunch')
    await user.type(screen.getByLabelText('Amount'), amount)
    await user.click(screen.getByRole('button', { name: 'Add expense' }))

    expect(onAdd).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(message)
  })
})
