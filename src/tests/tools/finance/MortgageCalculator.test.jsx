import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import MortgageCalculator from '../../../tools/finance/MortgageCalculator.jsx'

describe('MortgageCalculator', () => {
  it('renders mortgage inputs, payment summary, and amortization details', () => {
    render(
      <HelmetProvider>
        <MortgageCalculator />
      </HelmetProvider>
    )

    expect(screen.getByRole('heading', { name: /loan summary/i })).toBeInTheDocument()
    expect(screen.getAllByText(/home price/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/down payment/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/principal & interest/i)).toBeInTheDocument()
    expect(screen.getByText(/total monthly/i)).toBeInTheDocument()
    expect(screen.getByText(/total interest/i)).toBeInTheDocument()
  })
})
