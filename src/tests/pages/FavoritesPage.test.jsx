import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import FavoritesPage from '../../pages/FavoritesPage.jsx'

vi.mock('../../hooks/useFavorites', () => ({
  useFavorites: vi.fn(),
}))

vi.mock('../../data/tools', () => ({
  default: [
    {
      id: 'json-formatter',
      name: 'JSON Formatter',
      category: 'dev',
      description: 'Format JSON',
      path: '/tools/json-formatter',
      icon: 'Braces',
    },
    {
      id: 'password-generator',
      name: 'Password Generator',
      category: 'dev',
      description: 'Generate passwords',
      path: '/tools/password-generator',
      icon: 'Lock',
    },
  ],
}))

vi.mock('../../components/ToolGrid', () => ({
  default: ({ tools }) => (
    <div>
      {tools.map((tool) => (
        <div key={tool.id} data-testid="tool-card">{tool.name}</div>
      ))}
    </div>
  ),
}))

vi.mock('../../components/EmptyState', () => ({
  default: ({ title, description, action }) => (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && <button onClick={action.onClick}>{action.label}</button>}
    </div>
  ),
}))

import * as useFavoritesModule from '../../hooks/useFavorites'

describe('FavoritesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderPage = (component) => {
    return render(
      <HelmetProvider>
        <MemoryRouter>
          {component}
        </MemoryRouter>
      </HelmetProvider>
    )
  }

  it('renders tool cards for each favorite with favorites', () => {
    useFavoritesModule.useFavorites.mockReturnValue({
      favorites: ['json-formatter', 'password-generator'],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(() => true),
      clearFavorites: vi.fn(),
    })
    renderPage(<FavoritesPage />)
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
    expect(screen.getByText('Password Generator')).toBeInTheDocument()
  })

  it('shows correct number of tool cards', () => {
    useFavoritesModule.useFavorites.mockReturnValue({
      favorites: ['json-formatter', 'password-generator'],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(() => true),
      clearFavorites: vi.fn(),
    })
    renderPage(<FavoritesPage />)
    expect(screen.getAllByTestId('tool-card')).toHaveLength(2)
  })

  it('shows Clear all favorites button when there are favorites', () => {
    useFavoritesModule.useFavorites.mockReturnValue({
      favorites: ['json-formatter'],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(() => true),
      clearFavorites: vi.fn(),
    })
    renderPage(<FavoritesPage />)
    expect(screen.getByText('Clear all favorites')).toBeInTheDocument()
  })

  it('shows EmptyState when no favorites', () => {
    useFavoritesModule.useFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(() => false),
      clearFavorites: vi.fn(),
    })
    renderPage(<FavoritesPage />)
    expect(screen.getByText('No saved tools yet')).toBeInTheDocument()
  })

  it('EmptyState shows helpful call-to-action text', () => {
    useFavoritesModule.useFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(() => false),
      clearFavorites: vi.fn(),
    })
    renderPage(<FavoritesPage />)
    expect(screen.getByText(/pin it here/i)).toBeInTheDocument()
  })

  it('does not show tool grid when no favorites', () => {
    useFavoritesModule.useFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(() => false),
      clearFavorites: vi.fn(),
    })
    renderPage(<FavoritesPage />)
    expect(screen.queryByText('JSON Formatter')).not.toBeInTheDocument()
  })

  it('page title mentions favorite tools', () => {
    useFavoritesModule.useFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(() => false),
      clearFavorites: vi.fn(),
    })
    renderPage(<FavoritesPage />)
    expect(screen.getByText(/favorite tools/i)).toBeInTheDocument()
  })

  it('wraps in MemoryRouter for routing', () => {
    useFavoritesModule.useFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(() => false),
      clearFavorites: vi.fn(),
    })
    expect(() => {
      renderPage(<FavoritesPage />)
    }).not.toThrow()
  })

  it('clicking clear all favorites shows confirmation', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    useFavoritesModule.useFavorites.mockReturnValue({
      favorites: ['json-formatter'],
      toggleFavorite: vi.fn(),
      isFavorite: vi.fn(() => true),
      clearFavorites: vi.fn(),
    })
    renderPage(<FavoritesPage />)
    await user.click(screen.getByText('Clear all favorites'))
    expect(window.confirm).toHaveBeenCalled()
    window.confirm.mockRestore()
  })
})
