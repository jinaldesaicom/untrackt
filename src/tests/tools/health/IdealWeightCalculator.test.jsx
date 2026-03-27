import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import IdealWeightCalculator from '../../../tools/health/IdealWeightCalculator.jsx'

vi.mock('../../../components/DisclaimerCard', () => ({
  default: () => <div>Disclaimer Card</div>,
}))

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('IdealWeightCalculator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <IdealWeightCalculator />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
