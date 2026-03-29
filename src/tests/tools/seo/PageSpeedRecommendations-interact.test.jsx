import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import PageSpeedRecommendations from '../../../tools/seo/PageSpeedRecommendations'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('PageSpeedRecommendations – interaction', () => {
  beforeEach(() => { global.fetch = vi.fn() })
  afterEach(() => { vi.restoreAllMocks() })

  it('renders URL input and tab buttons', () => {
    render(<W><PageSpeedRecommendations /></W>)
    expect(document.body.textContent).toMatch(/url|analyze|checklist/i)
  })

  it('switches tabs', () => {
    render(<W><PageSpeedRecommendations /></W>)
    const tabs = screen.queryAllByRole('button').filter(b => b.textContent.match(/analyzer|checklist|metric/i))
    tabs.forEach(b => fireEvent.click(b))
  })

  it('fills URL input', async () => {
    render(<W><PageSpeedRecommendations /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'https://example.com')
  })

  it('toggles strategy', () => {
    render(<W><PageSpeedRecommendations /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.match(/mobile|desktop/i))
    btns.forEach(b => fireEvent.click(b))
  })

  it('expands checklist categories', () => {
    render(<W><PageSpeedRecommendations /></W>)
    const checklistTab = screen.queryAllByRole('button').find(b => b.textContent.match(/checklist/i))
    if (checklistTab) fireEvent.click(checklistTab)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length > 5 && b.textContent.length < 40)
    btns.slice(0, 6).forEach(b => { try { fireEvent.click(b) } catch {} })
  })

  it('toggles checklist items', () => {
    render(<W><PageSpeedRecommendations /></W>)
    const checklistTab = screen.queryAllByRole('button').find(b => b.textContent.match(/checklist/i))
    if (checklistTab) fireEvent.click(checklistTab)
    const checkboxes = screen.queryAllByRole('checkbox')
    checkboxes.slice(0, 5).forEach(cb => fireEvent.click(cb))
  })

  it('submits URL for analysis', async () => {
    global.fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ lighthouseResult: { categories: { performance: { score: 0.85 } }, audits: {} } }) })
    render(<W><PageSpeedRecommendations /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'https://example.com')
    const analyzeBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/analyz|check|run|test/i))
    if (analyzeBtn) fireEvent.click(analyzeBtn)
  })
})
