import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import TaxBracketEstimator from '../../../tools/freelance/TaxBracketEstimator.jsx'

describe('TaxBracketEstimator', () => {
  it('renders country and income controls and shows tax summary outputs', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <TaxBracketEstimator />
      </HelmetProvider>
    )

    expect(screen.getByText(/^country$/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue('US')).toBeInTheDocument()
    expect(screen.getByText(/gross annual income/i)).toBeInTheDocument()

    const income = screen.getByRole('spinbutton')
    await user.clear(income)
    await user.type(income, '50000')

    expect(screen.getByText(/effective tax rate/i)).toBeInTheDocument()
    expect(screen.getByText(/estimated tax owed/i)).toBeInTheDocument()
    expect(screen.getByText(/monthly take-home/i)).toBeInTheDocument()
  })
})
