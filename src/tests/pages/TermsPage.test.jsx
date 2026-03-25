import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import TermsPage from '../../pages/TermsPage.jsx'

describe('TermsPage', () => {
  const renderPage = (component) => {
    return render(
      <HelmetProvider>
        <MemoryRouter>
          {component}
        </MemoryRouter>
      </HelmetProvider>
    )
  }

  it('renders without crashing', () => {
    expect(() => {
      renderPage(<TermsPage />)
    }).not.toThrow()
  })

  it('displays Terms heading', () => {
    renderPage(<TermsPage />)
    expect(screen.getByRole('heading', { name: 'Terms of Use' })).toBeInTheDocument()
  })

  it('disclaimer section mentions not financial advice', () => {
    renderPage(<TermsPage />)
    expect(screen.getByText(/not.*financial.*advice|financial.*disclaimer/i)).toBeInTheDocument()
  })

  it('disclaimer section mentions not medical advice', () => {
    renderPage(<TermsPage />)
    expect(screen.getByText(/not.*medical.*advice|medical.*disclaimer/i)).toBeInTheDocument()
  })

  it('states not legal advice', () => {
    renderPage(<TermsPage />)
    expect(screen.getByText(/not.*legal.*advice|legal.*disclaimer/i)).toBeInTheDocument()
  })

  it('mentions MIT license or open source', () => {
    renderPage(<TermsPage />)
    expect(screen.getByText(/available under the MIT License/i)).toBeInTheDocument()
  })

  it('has contact section', () => {
    renderPage(<TermsPage />)
    expect(screen.getByText(/support@untrackt\.com/i)).toBeInTheDocument()
  })

  it('wraps in MemoryRouter and HelmetProvider', () => {
    expect(() => {
      renderPage(<TermsPage />)
    }).not.toThrow()
  })
})
