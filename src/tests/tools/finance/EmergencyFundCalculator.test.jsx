import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import EmergencyFundCalculator from '../../../tools/finance/EmergencyFundCalculator.jsx'

describe('EmergencyFundCalculator', () => {
  beforeEach(() => {
    vi.spyOn(Number.prototype, 'toLocaleString').mockImplementation(function toLocaleString() {
      return String(this.valueOf())
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders essential expense inputs, coverage controls, and progress outputs', () => {
    render(
      <HelmetProvider>
        <EmergencyFundCalculator />
      </HelmetProvider>
    )

    expect(screen.getByRole('heading', { name: /monthly essentials/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /target settings/i })).toBeInTheDocument()
    expect(screen.getByText(/target fund|goal reached/i)).toBeInTheDocument()
    expect(screen.getByText(/^progress$/i)).toBeInTheDocument()
    expect(screen.getByText(/^shortfall$/i)).toBeInTheDocument()
  })
})
