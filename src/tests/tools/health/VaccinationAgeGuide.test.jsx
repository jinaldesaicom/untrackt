import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import VaccinationAgeGuide from '../../../tools/health/VaccinationAgeGuide.jsx'

vi.mock('../../../components/DisclaimerCard', () => ({
  default: () => <div>Disclaimer Card</div>,
}))

vi.mock('../../../components/SEOHead', () => ({
  default: () => <div>SEO Head</div>,
}))

describe('VaccinationAgeGuide', () => {
  it('renders without crashing', () => {
    expect(() => {
      render(
        <HelmetProvider>
          <VaccinationAgeGuide />
        </HelmetProvider>
      )
    }).not.toThrow()
  })
})
