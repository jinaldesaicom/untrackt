import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import ImageToBase64 from '../../../tools/general/ImageToBase64.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('ImageToBase64', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <ImageToBase64 />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
