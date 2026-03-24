import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import CategoryPage from '../../pages/CategoryPage.jsx'
import tools from '../../data/tools.js'

function renderCategoryPage(categoryId) {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[`/category/${categoryId}`]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('CategoryPage', () => {
  it('renders tools for a given category', () => {
    renderCategoryPage('dev')
    const devTools = tools.filter((t) => t.category === 'dev')
    devTools.forEach((tool) => {
      expect(screen.getByText(tool.name)).toBeInTheDocument()
    })
  })

  it('shows correct category title', () => {
    renderCategoryPage('dev')
    expect(screen.getByRole('heading', { name: /dev tools/i })).toBeInTheDocument()
  })

  it('shows correct tool count badge', () => {
    renderCategoryPage('dev')
    const devCount = tools.filter((t) => t.category === 'dev').length
    expect(screen.getByText(`${devCount} tools`)).toBeInTheDocument()
  })

  it('renders category not found for unknown category', () => {
    renderCategoryPage('nonexistent')
    expect(screen.getByText(/category not found/i)).toBeInTheDocument()
  })

  it('renders correct tools for student category', () => {
    renderCategoryPage('student')
    expect(screen.getByRole('heading', { name: /student/i })).toBeInTheDocument()
    const studentCount = tools.filter((t) => t.category === 'student').length
    expect(screen.getByText(`${studentCount} tools`)).toBeInTheDocument()
  })
})
