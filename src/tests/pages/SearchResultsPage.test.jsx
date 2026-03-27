import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SearchResultsPage from '../../pages/SearchResultsPage.jsx'
import { searchTools } from '../../search/searchEngine.js'

function renderSearchResults(entry = '/search?q=json') {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[entry]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('SearchResultsPage', () => {
  it('renders tools matching the q query parameter', () => {
    renderSearchResults('/search?q=json')

    const expectedMatches = searchTools('json', 50)

    expect(screen.getByRole('heading', { name: /search results/i })).toBeInTheDocument()
    expect(screen.getAllByText((_, element) => element?.tagName === 'P' && (element.textContent?.includes(`Showing ${expectedMatches.length} result`) ?? false))).toHaveLength(1)
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
    expect(screen.getByText('JSON to CSV Converter')).toBeInTheDocument()
  })

  it('shows an empty state when no tools match the query', () => {
    renderSearchResults('/search?q=zzznomatchzzz')

    expect(screen.getByText(/showing 0 results for/i)).toBeInTheDocument()
    expect(screen.getByText(/no tools found/i)).toBeInTheDocument()
  })

  it('shows guidance when q is missing', () => {
    renderSearchResults('/search')

    expect(screen.getByText(/no query provided/i)).toBeInTheDocument()
    expect(screen.getByText(/this page only renders results from the url query string/i)).toBeInTheDocument()
  })
})