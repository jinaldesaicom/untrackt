import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import RandomNumberGenerator from '../../../tools/general/RandomNumberGenerator.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('RandomNumberGenerator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <RandomNumberGenerator />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
