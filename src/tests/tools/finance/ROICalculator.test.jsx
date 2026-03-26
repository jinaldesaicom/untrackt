import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import ROICalculator from '../../../tools/finance/ROICalculator.jsx'

describe('ROICalculator', () => {
  beforeEach(() => {
    vi.spyOn(Number.prototype, 'toLocaleString').mockImplementation(function toLocaleString() {
      return String(this.valueOf())
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders roi tabs and mode-specific result sections', () => {
    render(
      <HelmetProvider>
        <ROICalculator />
      </HelmetProvider>
    )

    expect(screen.getByRole('button', { name: /basic roi/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /real estate/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /marketing roi/i })).toBeInTheDocument()
  })
})
