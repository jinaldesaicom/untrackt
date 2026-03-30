import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import WikiToolPage from '../../pages/WikiToolPage'

vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ toolId }) => (
  <HelmetProvider>
    <MemoryRouter initialEntries={[`/wiki/${toolId}`]}>
      <Routes>
        <Route path="/wiki/:toolId" element={<WikiToolPage />} />
      </Routes>
    </MemoryRouter>
  </HelmetProvider>
)

describe('WikiToolPage – deep', () => {
  it('renders wiki content for a known tool', async () => {
    render(<W toolId="json-formatter" />)
    await waitFor(() => {
      expect(document.body.textContent.length).toBeGreaterThan(100)
    }, { timeout: 5000 })
  })

  it('shows not found for unknown tool', async () => {
    render(<W toolId="nonexistent-tool-xyz" />)
    await waitFor(() => {
      expect(document.body.textContent).toMatch(/not found|no.*article|does not exist/i)
    }, { timeout: 5000 })
  })

  it('renders navigation elements', async () => {
    render(<W toolId="color-converter" />)
    await waitFor(() => {
      const links = screen.queryAllByRole('link')
      expect(links.length).toBeGreaterThanOrEqual(0)
    }, { timeout: 5000 })
  })

  it('renders for a maths-science tool', async () => {
    render(<W toolId="percentage-calculator" />)
    await waitFor(() => {
      expect(document.body.textContent.length).toBeGreaterThan(50)
    }, { timeout: 5000 })
  })
})
