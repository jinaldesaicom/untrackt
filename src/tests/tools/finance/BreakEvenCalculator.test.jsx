import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import BreakEvenCalculator from '../../../tools/finance/BreakEvenCalculator.jsx'

describe('BreakEvenCalculator', () => {
  it('renders product and investment modes with break-even outputs', () => {
    const { container } = render(
      <HelmetProvider>
        <BreakEvenCalculator />
      </HelmetProvider>
    )

    expect(screen.getByRole('heading', { name: /product\/business mode/i })).toBeInTheDocument()
    expect(screen.getByText(/break-even units/i)).toBeInTheDocument()
    expect(screen.getByText(/profit\/loss at various volumes/i)).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
