import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import MedicalUnitConverter from '../../../tools/health/MedicalUnitConverter.jsx'

vi.mock('../../../components/DisclaimerCard', () => ({
  default: () => <div>Disclaimer Card</div>,
}))

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('MedicalUnitConverter', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <MedicalUnitConverter />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
