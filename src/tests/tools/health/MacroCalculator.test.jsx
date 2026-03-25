import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import MacroCalculator from '../../../tools/health/MacroCalculator.jsx'

vi.mock('../../../components/DisclaimerCard', () => ({
  default: () => <div>Disclaimer Card</div>,
}))

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('MacroCalculator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <MemoryRouter>
          <HelmetProvider>
            <MacroCalculator />
          </HelmetProvider>
        </MemoryRouter>
      )
    }).not.toThrow()
  })
})
