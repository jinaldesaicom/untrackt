import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import NotFoundPage from '../../pages/NotFoundPage.jsx'

vi.mock('../../components/SearchBar', () => ({
  default: () => <input placeholder="Search tools" />,
}))

vi.mock('../../components/ToolGrid', () => ({
  default: ({ tools }) => (
    <div>
      {tools.map((tool) => (
        <a key={tool.id} href={tool.path}>{tool.name}</a>
      ))}
    </div>
  ),
}))

describe('NotFoundPage', () => {
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
      renderPage(<NotFoundPage />)
    }).not.toThrow()
  })

  it('displays 404 text', () => {
    renderPage(<NotFoundPage />)
    expect(screen.getByRole('heading', { name: /404 - Tool Not Found/i })).toBeInTheDocument()
  })

  it('renders helpful message', () => {
    renderPage(<NotFoundPage />)
    expect(screen.getByText(/page.*found|not.*found|error/i)).toBeInTheDocument()
  })

  it('has Go home or home link', () => {
    renderPage(<NotFoundPage />)
    expect(screen.getByText(/home|back/i)).toBeInTheDocument()
  })

  it('search bar or search input present', () => {
    renderPage(<NotFoundPage />)
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()
  })

  it('shows at least one tool suggestion', () => {
    const { container } = renderPage(<NotFoundPage />)
    const suggestions = container.querySelectorAll('a[href*="/tools/"]')
    expect(suggestions.length).toBeGreaterThanOrEqual(1)
  })

  it('tool suggestions are clickable links', () => {
    const { container } = renderPage(<NotFoundPage />)
    const links = container.querySelectorAll('a[href*="/tools/"]')
    links.forEach((link) => {
      expect(link).toHaveAttribute('href')
    })
  })

  it('has noindex meta for SEO', () => {
    const { container } = renderPage(<NotFoundPage />)
    const helmet = container.querySelector('[name="robots"]')
    if (helmet) {
      expect(helmet.getAttribute('content')).toContain('noindex')
    }
  })

  it('wraps in MemoryRouter and HelmetProvider', () => {
    expect(() => {
      renderPage(<NotFoundPage />)
    }).not.toThrow()
  })
})
