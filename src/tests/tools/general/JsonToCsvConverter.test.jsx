import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import JsonToCsvConverter from '../../../tools/general/JsonToCsvConverter.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('JsonToCsvConverter', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <JsonToCsvConverter />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
