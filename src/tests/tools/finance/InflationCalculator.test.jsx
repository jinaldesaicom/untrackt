import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import InflationCalculator from '../../../tools/finance/InflationCalculator.jsx'

describe('InflationCalculator', () => {
  it('renders both inflation modes and year-based results', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <InflationCalculator />
      </HelmetProvider>
    )

    expect(screen.getByRole('button', { name: /past/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /future/i })).toBeInTheDocument()
    expect(screen.getByText(/year-by-year/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /future/i }))
    expect(screen.getByText(/annual inflation rate/i)).toBeInTheDocument()
  })
})
