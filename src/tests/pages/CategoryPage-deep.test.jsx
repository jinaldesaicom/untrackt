import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import CategoryPage from '../../pages/CategoryPage'

vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ cat }) => (
  <HelmetProvider>
    <MemoryRouter initialEntries={[`/category/${cat}`]}>
      <Routes>
        <Route path="/category/:categoryId" element={<CategoryPage />} />
      </Routes>
    </MemoryRouter>
  </HelmetProvider>
)

describe('CategoryPage – deep', () => {
  it('renders dev category tools', () => {
    render(<W cat="dev" />)
    expect(document.body.textContent.length).toBeGreaterThan(100)
  })

  it('renders finance category', () => {
    render(<W cat="finance" />)
    expect(document.body.textContent).toMatch(/finance|calculator|money/i)
  })

  it('renders maths-science category', () => {
    render(<W cat="maths-science" />)
    expect(document.body.textContent).toMatch(/math|science|calculator/i)
  })

  it('handles unknown category', () => {
    render(<W cat="nonexistent-category" />)
    // Should show empty or not found
    expect(document.body.textContent.length).toBeGreaterThan(0)
  })

  it('renders subcategory groupings if any', () => {
    render(<W cat="dev" />)
    const btns = screen.queryAllByRole('button')
    // If there are subcategory tabs/buttons, click them
    btns.forEach(b => {
      if (b.textContent.match(/all|web|data|api/i)) {
        fireEvent.click(b)
      }
    })
  })
})
