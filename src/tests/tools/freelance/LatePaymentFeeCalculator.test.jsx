import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import LatePaymentFeeCalculator from '../../../tools/freelance/LatePaymentFeeCalculator.jsx'

describe('LatePaymentFeeCalculator', () => {
  it('renders fee inputs, calculates overdue results, and shows the reminder template', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <LatePaymentFeeCalculator />
      </HelmetProvider>
    )

    expect(screen.getByRole('heading', { name: /invoice details/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /late fee settings/i })).toBeInTheDocument()
    expect(screen.getByText(/payment reminder template/i)).toBeInTheDocument()

    const amount = screen.getAllByRole('spinbutton')[0]
    await user.clear(amount)
    await user.type(amount, '1000')
    expect(screen.getByText(/^total now due$/i)).toBeInTheDocument()
  })
})
