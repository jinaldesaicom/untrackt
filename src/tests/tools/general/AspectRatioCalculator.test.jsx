import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import AspectRatioCalculator from '../../../tools/general/AspectRatioCalculator.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('AspectRatioCalculator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <AspectRatioCalculator />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
