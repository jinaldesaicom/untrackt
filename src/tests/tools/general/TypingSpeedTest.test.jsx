import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import TypingSpeedTest from '../../../tools/general/TypingSpeedTest.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('TypingSpeedTest', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <TypingSpeedTest />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
