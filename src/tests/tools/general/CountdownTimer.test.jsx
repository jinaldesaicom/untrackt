import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import CountdownTimer from '../../../tools/general/CountdownTimer.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('CountdownTimer', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <CountdownTimer />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
