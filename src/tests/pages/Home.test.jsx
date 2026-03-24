import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from '../../pages/Home.jsx'
import { categories } from '../../data/tools.js'

function renderHome() {
  return render(
    <HelmetProvider>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Home />
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('Home', () => {
  it('renders hero section', () => {
    renderHome()
    expect(screen.getByText(/free tools\./i)).toBeInTheDocument()
    expect(screen.getByText(/no accounts/i)).toBeInTheDocument()
  })

  it('renders all 6 category cards', () => {
    renderHome()
    expect(categories).toHaveLength(6)
    categories.forEach((cat) => {
      // Each category link shows the category name
      const matches = screen.getAllByText(cat.name)
      expect(matches.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('search bar is present', () => {
    renderHome()
    expect(screen.getByPlaceholderText('Search tools...')).toBeInTheDocument()
  })
})
