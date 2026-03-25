import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import RetirementCalculator from '../../../tools/finance/RetirementCalculator.jsx'

describe('RetirementCalculator', () => {
  it('renders retirement inputs and status outputs', () => {
    render(
      <HelmetProvider>
        <RetirementCalculator />
      </HelmetProvider>
    )

    expect(screen.getByText(/current age/i)).toBeInTheDocument()
    expect(screen.getByText(/retirement age/i)).toBeInTheDocument()
    expect(screen.getByText(/monthly expenses/i)).toBeInTheDocument()
    expect(screen.getByText(/on track|needs attention|at risk/i)).toBeInTheDocument()
  })
})
