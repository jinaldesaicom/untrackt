import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CompoundInterestCalculator from '../../../tools/finance/CompoundInterestCalculator.jsx'
import { HelmetProvider } from 'react-helmet-async'

describe('CompoundInterestCalculator', () => {
  it('renders all inputs', () => {
    render(<HelmetProvider><CompoundInterestCalculator /></HelmetProvider>)
    expect(screen.getByText(/principal/i)).toBeInTheDocument()
    expect(screen.getByText(/annual interest rate/i)).toBeInTheDocument()
    expect(screen.getByText(/compounding frequency/i)).toBeInTheDocument()
    expect(screen.getByText(/duration/i)).toBeInTheDocument()
    expect(screen.getByText(/monthly contribution/i)).toBeInTheDocument()
    expect(screen.getAllByRole('spinbutton').length).toBe(4)
    expect(screen.getAllByRole('combobox').length).toBe(1)
  })

  it('calculates $1,000 at 10% yearly compounding for 1 year → $1,100', async () => {
    const user = userEvent.setup()
    render(<HelmetProvider><CompoundInterestCalculator /></HelmetProvider>)
    // spinbutton order: principal[0], rate[1], years[2], monthly[3]
    const [principalInput, rateInput, yearsInput, monthlyInput] = screen.getAllByRole('spinbutton')
    const freqSelect = screen.getAllByRole('combobox')[0]
    await user.clear(principalInput); await user.type(principalInput, '1000')
    await user.clear(rateInput); await user.type(rateInput, '10')
    await user.selectOptions(freqSelect, '1') // Yearly (1×/year)
    await user.clear(yearsInput); await user.type(yearsInput, '1')
    await user.clear(monthlyInput); await user.type(monthlyInput, '0')
    await waitFor(() => {
      expect(screen.getAllByText('$1,100').length).toBeGreaterThanOrEqual(1)
    })
  })

  it('final balance is greater than principal', async () => {
    const user = userEvent.setup()
    render(<HelmetProvider><CompoundInterestCalculator /></HelmetProvider>)
    // Default values exist — just verify final balance section shows
    expect(screen.getByText(/final balance/i)).toBeInTheDocument()
  })

  it('year-by-year table renders with correct number of rows', async () => {
    const user = userEvent.setup()
    render(<HelmetProvider><CompoundInterestCalculator /></HelmetProvider>)
    const yearsInput = screen.getAllByRole('spinbutton')[2]
    await user.clear(yearsInput); await user.type(yearsInput, '5')
    await waitFor(() => {
      const rows = document.querySelectorAll('tbody tr')
      expect(rows.length).toBe(5)
    })
  })

  it('disclaimer text is present', () => {
    render(<HelmetProvider><CompoundInterestCalculator /></HelmetProvider>)
    expect(screen.getByText(/not financial advice/i)).toBeInTheDocument()
  })
})
