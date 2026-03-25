import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import TextToSlug from '../../../tools/general/TextToSlug.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('TextToSlug', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <TextToSlug />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
