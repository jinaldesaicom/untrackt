import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import PrivacyPage from '../../pages/PrivacyPage.jsx'

describe('PrivacyPage', () => {
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
      renderPage(<PrivacyPage />)
    }).not.toThrow()
  })

  it('displays Privacy Policy heading', () => {
    renderPage(<PrivacyPage />)
    expect(screen.getByRole('heading', { name: 'Privacy Policy' })).toBeInTheDocument()
  })

  it('explains what is stored in localStorage', () => {
    renderPage(<PrivacyPage />)
    expect(screen.getByRole('heading', { name: /3\. Local Storage/i })).toBeInTheDocument()
    expect(screen.getByText(/browser localStorage/i)).toBeInTheDocument()
  })

  it('states no cookies are used', () => {
    renderPage(<PrivacyPage />)
    expect(screen.getByText(/no.*cookies|cookies.*not/i)).toBeInTheDocument()
  })

  it('mentions Cloudflare hosting', () => {
    renderPage(<PrivacyPage />)
    expect(screen.getByText(/Cloudflare/i)).toBeInTheDocument()
  })

  it('has contact email or contact section', () => {
    renderPage(<PrivacyPage />)
    expect(screen.getByText(/privacy@untrackt\.com/i)).toBeInTheDocument()
  })

  it('displays Last updated date', () => {
    renderPage(<PrivacyPage />)
    expect(screen.getByText(/[Ll]ast.*updated|updated/i)).toBeInTheDocument()
  })

  it('mentions third-party services section', () => {
    renderPage(<PrivacyPage />)
    expect(screen.getByRole('heading', { name: /4\. Third-Party Services/i })).toBeInTheDocument()
  })

  it('mentions currency converter API', () => {
    renderPage(<PrivacyPage />)
    expect(screen.getByText(/open\.er-api\.com/i)).toBeInTheDocument()
  })

  it('states nothing leaves the device mention', () => {
    renderPage(<PrivacyPage />)
    expect(screen.getByText(/stays on your device\. It never leaves your browser/i)).toBeInTheDocument()
  })

  it('wraps in MemoryRouter and HelmetProvider', () => {
    expect(() => {
      renderPage(<PrivacyPage />)
    }).not.toThrow()
  })
})
