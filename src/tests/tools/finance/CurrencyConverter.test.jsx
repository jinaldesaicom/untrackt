import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import CurrencyConverter from '../../../tools/finance/CurrencyConverter.jsx'

describe('CurrencyConverter', () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        result: 'success',
        base_code: 'USD',
        time_last_update_utc: 'Mon, 24 Mar 2026 00:00:00 +0000',
        rates: { USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, INR: 83.1, CAD: 1.36, AUD: 1.53 },
      }),
    })
  })

  it('fetches rates on mount and renders conversion controls and popular pairs', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <CurrencyConverter />
      </HelmetProvider>
    )

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1))
    expect(screen.getByText(/currency converter/i)).toBeInTheDocument()
    expect(screen.getByText(/popular conversions/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /swap currencies/i }))
    expect(screen.getByText(/exchange rate/i)).toBeInTheDocument()
  })
})
