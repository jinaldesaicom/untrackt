import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import HeartRateZoneCalculator from '../../../tools/health/HeartRateZoneCalculator.jsx'

vi.mock('../../../components/DisclaimerCard', () => ({
  default: () => <div>Disclaimer Card</div>,
}))

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('HeartRateZoneCalculator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <HeartRateZoneCalculator />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
