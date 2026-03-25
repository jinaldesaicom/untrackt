import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import TDEECalculator from '../../../tools/health/TDEECalculator.jsx'

vi.mock('../../../components/DisclaimerCard', () => ({
  default: () => <div>Disclaimer Card</div>,
}))

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('TDEECalculator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <MemoryRouter>
          <HelmetProvider>
            <TDEECalculator />
          </HelmetProvider>
        </MemoryRouter>
      )
    }).not.toThrow()
  })
})
