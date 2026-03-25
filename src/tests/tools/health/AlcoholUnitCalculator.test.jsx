import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import AlcoholUnitCalculator from '../../../tools/health/AlcoholUnitCalculator.jsx'

vi.mock('../../../components/DisclaimerCard', () => ({
  default: () => <div>Disclaimer Card</div>,
}))

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('AlcoholUnitCalculator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <AlcoholUnitCalculator />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
