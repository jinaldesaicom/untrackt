import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ToolPage from '../../pages/ToolPage.jsx'
import tools from '../../data/tools.js'

vi.mock('../../components/RelatedTools', () => ({
  default: () => <div data-testid="related-tools" />,
}))
vi.mock('../../components/ToolFAQ', () => ({
  default: ({ toolId }) => <div data-testid="tool-faq">{toolId}</div>,
}))
vi.mock('../../components/ToolGuide', () => ({
  default: ({ toolId }) => <div data-testid="tool-guide">{toolId}</div>,
}))
vi.mock('../../components/DisclaimerBadge', () => ({
  default: () => <div data-testid="disclaimer-badge" />,
}))
vi.mock('../../components/SEOHead', () => ({
  default: () => null,
}))
vi.mock('../../components/Breadcrumb', () => ({
  default: () => <nav data-testid="breadcrumb" />,
}))
vi.mock('../../utils/storage', () => ({
  addRecentTool: vi.fn(),
  getRecentTools: vi.fn(() => []),
  getFavorites: vi.fn(() => []),
  toggleFavorite: vi.fn(),
  getRecentSearches: vi.fn(() => []),
  addRecentSearch: vi.fn(),
}))
vi.mock('../../utils/localStats', () => ({
  recordToolVisit: vi.fn(),
}))
vi.mock('../../wiki/data/index.js', () => ({
  hasWikiEntry: vi.fn(() => false),
}))

function renderToolPage(toolId) {
  return render(
    <HelmetProvider>
      <MemoryRouter
        initialEntries={[`/tools/${toolId}`]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/tools/:toolId" element={<ToolPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  )
}

describe('ToolPage', () => {
  it('renders a valid tool by name', async () => {
    renderToolPage('json-formatter')
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /JSON Formatter/i })).toBeInTheDocument()
    })
  })

  it('shows tool description', async () => {
    renderToolPage('json-formatter')
    await waitFor(() => {
      expect(screen.getByText(/validate and prettify json/i)).toBeInTheDocument()
    })
  })

  it('renders NotFoundPage for an unknown tool', async () => {
    renderToolPage('non-existent-tool-xyz')
    await waitFor(() => {
      expect(screen.queryByRole('heading', { level: 1, name: /JSON Formatter/i })).not.toBeInTheDocument()
      expect(screen.getByText(/drifted away/i)).toBeInTheDocument()
    })
  })

  it('renders Disclaimer badge', async () => {
    renderToolPage('json-formatter')
    await waitFor(() => {
      expect(screen.getByTestId('disclaimer-badge')).toBeInTheDocument()
    })
  })

  it('renders ToolGuide section', async () => {
    renderToolPage('json-formatter')
    await waitFor(() => {
      expect(screen.getByTestId('tool-guide')).toBeInTheDocument()
    })
  })

  it('renders ToolFAQ section', async () => {
    renderToolPage('json-formatter')
    await waitFor(() => {
      expect(screen.getByTestId('tool-faq')).toBeInTheDocument()
    })
  })

  it('renders RelatedTools section', async () => {
    renderToolPage('json-formatter')
    await waitFor(() => {
      expect(screen.getByTestId('related-tools')).toBeInTheDocument()
    })
  })

  it('renders share button', async () => {
    renderToolPage('json-formatter')
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /share this tool/i })).toBeInTheDocument()
    })
  })

  it('shows category pill', async () => {
    renderToolPage('json-formatter')
    await waitFor(() => {
      expect(screen.getByText('Dev Tools')).toBeInTheDocument()
    })
  })

  it('shows tags as links', async () => {
    renderToolPage('json-formatter')
    await waitFor(() => {
      const tagLinks = screen.getAllByRole('link').filter(
        (link) => link.getAttribute('href')?.startsWith('/tags/')
      )
      expect(tagLinks.length).toBeGreaterThanOrEqual(1)
    })
  })

  it('records tool visit on mount', async () => {
    const { recordToolVisit } = await import('../../utils/localStats.js')
    const { addRecentTool } = await import('../../utils/storage.js')
    renderToolPage('json-formatter')
    await waitFor(() => {
      expect(recordToolVisit).toHaveBeenCalledWith('json-formatter')
      expect(addRecentTool).toHaveBeenCalledWith('json-formatter')
    })
  })

  it('renders breadcrumb navigation', async () => {
    renderToolPage('json-formatter')
    await waitFor(() => {
      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
    })
  })

  it('works with a tool from a different category', async () => {
    const studentTool = tools.find((t) => t.category === 'student')
    if (studentTool) {
      renderToolPage(studentTool.id)
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1, name: new RegExp(studentTool.name, 'i') })).toBeInTheDocument()
      })
    }
  })
})
