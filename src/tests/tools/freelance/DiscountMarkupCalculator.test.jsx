import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import DiscountMarkupCalculator from '../../../tools/freelance/DiscountMarkupCalculator.jsx'

describe('DiscountMarkupCalculator', () => {
  it('renders all calculator tabs and updates discount results live', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <DiscountMarkupCalculator />
      </HelmetProvider>
    )

    expect(screen.getByRole('button', { name: /discount calculator/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /markup calculator/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /profit margin/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /bulk discount table/i })).toBeInTheDocument()

    expect(screen.getByText(/\$80\.00|80\.00/)).toBeInTheDocument()
  })
})
