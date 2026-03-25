import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import BinaryTextConverter from '../../../tools/general/BinaryTextConverter.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('BinaryTextConverter', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <BinaryTextConverter />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
