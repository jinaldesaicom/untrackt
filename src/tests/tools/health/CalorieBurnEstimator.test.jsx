import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import CalorieBurnEstimator from '../../../tools/health/CalorieBurnEstimator.jsx'

vi.mock('../../../components/DisclaimerCard', () => ({
  default: () => <div>Disclaimer Card</div>,
}))

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('CalorieBurnEstimator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <CalorieBurnEstimator />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
