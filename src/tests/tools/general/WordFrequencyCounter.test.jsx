import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import WordFrequencyCounter from '../../../tools/general/WordFrequencyCounter.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('WordFrequencyCounter', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <WordFrequencyCounter />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
