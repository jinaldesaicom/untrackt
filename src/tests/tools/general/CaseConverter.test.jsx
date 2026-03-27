import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import CaseConverter from '../../../tools/general/CaseConverter.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('CaseConverter', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <CaseConverter />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
