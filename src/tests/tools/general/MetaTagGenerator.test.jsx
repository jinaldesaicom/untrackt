import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import MetaTagGenerator from '../../../tools/general/MetaTagGenerator.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('MetaTagGenerator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <MetaTagGenerator />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
