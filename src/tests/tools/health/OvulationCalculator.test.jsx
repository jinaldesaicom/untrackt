import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import OvulationCalculator from '../../../tools/health/OvulationCalculator.jsx'

vi.mock('../../../components/DisclaimerCard', () => ({
  default: () => <div>Disclaimer Card</div>,
}))

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('OvulationCalculator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <OvulationCalculator />
        </HelmetProvider>
      )
    }).not.toThrow()
  })

  it('renders weekday headers without duplicate key warnings', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <HelmetProvider>
        <OvulationCalculator />
      </HelmetProvider>
    )

    expect(consoleError).not.toHaveBeenCalledWith(
      expect.stringContaining('Encountered two children with the same key')
    )

    consoleError.mockRestore()
  })
})
