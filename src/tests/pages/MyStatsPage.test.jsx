import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MyStatsPage from '../../pages/MyStatsPage.jsx'
import * as localStats from '../../utils/localStats'

vi.mock('../../utils/localStats', () => ({
  getMostUsedTools: vi.fn(() => [
    { toolId: 'json-formatter', visits: 15 },
    { toolId: 'password-generator', visits: 8 },
    { toolId: 'base64-tool', visits: 5 },
  ]),
  getTotalVisits: vi.fn(() => 28),
  getStreak: vi.fn(() => 3),
  clearAllStats: vi.fn(),
  getToolStats: vi.fn(() => ({
    visits: 5,
    lastVisited: new Date().toISOString(),
  })),
  getAllStats: vi.fn(() => ({
    totalVisits: 28,
    tools: { 'json-formatter': { visits: 15 } },
    history: [],
    daily: {},
  })),
  getRecentVisits: vi.fn(() => []),
}))

vi.mock('../../utils/storage', () => ({
  clearFavorites: vi.fn(),
  clearAllUntracktStorage: vi.fn(),
}))

vi.mock('../../utils/errorReporter', () => ({
  getErrorLog: vi.fn(() => []),
  clearErrorLog: vi.fn(),
}))

vi.mock('../../data/tools', () => ({
  default: [
    {
      id: 'json-formatter',
      name: 'JSON Formatter',
      category: 'dev',
      description: 'Format JSON',
    },
    {
      id: 'password-generator',
      name: 'Password Generator',
      category: 'dev',
      description: 'Generate passwords',
    },
  ],
  categories: [{ id: 'dev', name: 'Developer' }],
}))

describe('MyStatsPage', () => {
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

  it('renders total visits count', () => {
    renderPage(<MyStatsPage />)
    expect(screen.getByText(/28/)).toBeInTheDocument()
  })

  it('renders current streak', () => {
    renderPage(<MyStatsPage />)
    expect(screen.getByText(/3/)).toBeInTheDocument()
  })

  it('renders most used tools section', () => {
    renderPage(<MyStatsPage />)
    expect(screen.getByRole('heading', { name: /Your most used tools/i })).toBeInTheDocument()
  })

  it('shows top tool name', () => {
    renderPage(<MyStatsPage />)
    expect(screen.getAllByText('JSON Formatter').length).toBeGreaterThan(0)
  })

  it('has Clear usage stats button', () => {
    renderPage(<MyStatsPage />)
    expect(screen.getByText(/Clear.*stats/i)).toBeInTheDocument()
  })

  it('has Clear favorites button', () => {
    renderPage(<MyStatsPage />)
    expect(screen.getByRole('button', { name: /Clear.*favorites/i })).toBeInTheDocument()
  })

  it('has Clear all preferences button', () => {
    renderPage(<MyStatsPage />)
    const buttons = screen.getAllByRole('button')
    const clearAllButton = buttons.find((btn) => btn.textContent.includes('Clear all'))
    expect(clearAllButton).toBeInTheDocument()
  })

  it('privacy message about local storage present', () => {
    renderPage(<MyStatsPage />)
    expect(screen.getAllByText(/stored locally on your device only/i).length).toBeGreaterThan(0)
  })

  it('page has noindex meta tag', () => {
    renderPage(<MyStatsPage />)
    expect(screen.getByRole('heading', { name: /My usage stats/i })).toBeInTheDocument()
  })

  it('wraps in MemoryRouter and HelmetProvider', () => {
    expect(() => {
      renderPage(<MyStatsPage />)
    }).not.toThrow()
  })

  it('Clear usage stats button triggers confirmation', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    renderPage(<MyStatsPage />)
    const clearButton = screen.getByText(/Clear.*stats/i)
    await user.click(clearButton)
    expect(window.confirm).toHaveBeenCalled()
    window.confirm.mockRestore()
  })

  it('renders with zero stats gracefully', () => {
    localStats.getTotalVisits.mockReturnValue(0)
    localStats.getStreak.mockReturnValue(0)
    localStats.getMostUsedTools.mockReturnValue([])
    localStats.getAllStats.mockReturnValue({
      totalVisits: 0,
      tools: {},
      history: [],
      daily: {},
    })
    renderPage(<MyStatsPage />)
    expect(screen.getByText(/No local stats yet/i)).toBeInTheDocument()
  })

  it('displays usage heatmap', () => {
    localStats.getAllStats.mockReturnValue({
      totalVisits: 10,
      tools: { 'json-formatter': { visits: 10 } },
      history: [],
      daily: { '2026-01-01': 2, '2026-01-02': 1 },
    })
    renderPage(<MyStatsPage />)
    expect(screen.getByRole('heading', { name: /Usage heatmap/i })).toBeInTheDocument()
  })
})
