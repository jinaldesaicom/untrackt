import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import BloodPressureClassifier from '../../../tools/health/BloodPressureClassifier.jsx'

vi.mock('../../../components/DisclaimerCard', () => ({
  default: () => <div>Disclaimer Card</div>,
}))

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('BloodPressureClassifier', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <BloodPressureClassifier />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
