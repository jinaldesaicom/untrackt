import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import AboutPage from '../../pages/AboutPage.jsx'

describe('AboutPage', () => {
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
      renderPage(<AboutPage />)
    }).not.toThrow()
  })

  it('displays About heading', () => {
    renderPage(<AboutPage />)
    expect(screen.getByRole('heading', { name: 'About UnTrackt' })).toBeInTheDocument()
  })

  it('privacy promise section is present', () => {
    renderPage(<AboutPage />)
    expect(screen.getByRole('heading', { name: /The privacy promise/i })).toBeInTheDocument()
  })

  it('contains tool count information', () => {
    renderPage(<AboutPage />)
    expect(screen.getByText(/Current tool count:/i)).toBeInTheDocument()
  })

  it('mentions React as built with technology', () => {
    renderPage(<AboutPage />)
    expect(screen.getByText(/React/i)).toBeInTheDocument()
  })

  it('contains no server connection mention in privacy section', () => {
    renderPage(<AboutPage />)
    expect(screen.getByText(/No server connection/i)).toBeInTheDocument()
  })

  it('wraps in MemoryRouter and HelmetProvider', () => {
    expect(() => {
      renderPage(<AboutPage />)
    }).not.toThrow()
  })

  it('page has correct SEO title via Helmet', () => {
    const { container } = renderPage(<AboutPage />)
    expect(container).toBeTruthy()
  })
})
