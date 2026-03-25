import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import SIPCalculator from '../../../tools/finance/SIPCalculator.jsx'

describe('SIPCalculator', () => {
  it('renders sip and lumpsum modes with growth outputs', () => {
    render(
      <HelmetProvider>
        <SIPCalculator />
      </HelmetProvider>
    )

    expect(screen.getByRole('button', { name: /sip/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /lumpsum/i })).toBeInTheDocument()
    expect(screen.getByText(/total invested/i)).toBeInTheDocument()
    expect(screen.getByText(/returns earned/i)).toBeInTheDocument()
    expect(screen.getByText(/year-by-year growth/i)).toBeInTheDocument()
  })
})
