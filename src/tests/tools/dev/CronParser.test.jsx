import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CronParser from '../../../tools/dev/CronParser.jsx'

describe('CronParser', () => {
  it('renders the cron input, preset buttons, next runs, and field breakdown', () => {
    render(<CronParser />)

    expect(screen.getByPlaceholderText('0 9 * * 1')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '@daily' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '@weekly' })).toBeInTheDocument()
    expect(screen.getByText(/plain english/i)).toBeInTheDocument()
    expect(screen.getByText(/next 5 runs/i)).toBeInTheDocument()
    expect(screen.getByText(/field breakdown/i)).toBeInTheDocument()
  })

  it('describes valid expressions and loads preset values', async () => {
    const user = userEvent.setup()
    render(<CronParser />)

    expect(screen.getByText(/runs on monday at 09:00/i)).toBeInTheDocument()

    const input = screen.getByPlaceholderText('0 9 * * 1')
    await user.click(screen.getByRole('button', { name: '@daily' }))
    expect(input).toHaveValue('0 0 * * *')
    expect(screen.getByText(/at 00:00 every day/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '@weekly' }))
    expect(input).toHaveValue('0 0 * * 0')
  })

  it('shows validation errors for invalid cron expressions and still renders five run entries for valid ones', async () => {
    const user = userEvent.setup()
    render(<CronParser />)

    const input = screen.getByPlaceholderText('0 9 * * 1')
    await user.clear(input)
    await user.type(input, '* * * * *')

    const runs = screen.getByText(/next 5 runs/i).nextElementSibling
    expect(within(runs).getAllByRole('listitem')).toHaveLength(5)

    await user.clear(input)
    await user.type(input, 'bad cron')
    expect(screen.getByText(/use 5 or 6 cron fields|invalid/i)).toBeInTheDocument()
  })
})
