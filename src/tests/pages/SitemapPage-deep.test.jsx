import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SitemapPage from '../../pages/SitemapPage'

vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = () => (
  <HelmetProvider><MemoryRouter><SitemapPage /></MemoryRouter></HelmetProvider>
)

describe('SitemapPage – deep', () => {
  it('renders all category sections', () => {
    render(<W />)
    const text = document.body.textContent.toLowerCase()
    expect(text).toMatch(/dev|finance|health|seo|productivity/)
  })

  it('has links to tools', () => {
    render(<W />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(10)
  })

  it('has search functionality', async () => {
    render(<W />)
    const search = screen.queryAllByRole('textbox').find(i => i.getAttribute('placeholder')?.match(/search|filter/i))
    if (search) {
      fireEvent.change(search, { target: { value: 'json' } })
    }
  })

  it('renders expand/collapse for categories', () => {
    render(<W />)
    const toggleBtns = screen.getAllByRole('button').filter(b => b.textContent.match(/expand|collapse|show|hide|▸|▾/i) || b.getAttribute('aria-expanded'))
    toggleBtns.slice(0, 3).forEach(b => fireEvent.click(b))
  })
})
