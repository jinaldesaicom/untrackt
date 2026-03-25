import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import CreditCardPayoffCalculator from '../../../tools/finance/CreditCardPayoffCalculator.jsx'

describe('CreditCardPayoffCalculator', () => {
  beforeEach(() => {
    vi.spyOn(Number.prototype, 'toLocaleString').mockImplementation(function toLocaleString() {
      return String(this.valueOf())
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders payoff inputs, comparison table, and amortization summary', () => {
    render(
      <HelmetProvider>
        <CreditCardPayoffCalculator />
      </HelmetProvider>
    )

    expect(screen.getByRole('heading', { name: /balance & rate/i })).toBeInTheDocument()
    expect(screen.getByText(/interest rate/i)).toBeInTheDocument()
    expect(screen.getByText(/payoff time/i)).toBeInTheDocument()
    expect(screen.getByText(/total interest/i)).toBeInTheDocument()
    expect(screen.getByText(/comparison/i)).toBeInTheDocument()
  })
})
