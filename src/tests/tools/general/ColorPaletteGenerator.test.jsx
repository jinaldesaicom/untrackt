import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import ColorPaletteGenerator from '../../../tools/general/ColorPaletteGenerator.jsx'

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('ColorPaletteGenerator', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <ColorPaletteGenerator />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
