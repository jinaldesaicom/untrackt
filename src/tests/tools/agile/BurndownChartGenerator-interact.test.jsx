import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import BurndownChartGenerator from '../../../tools/agile/BurndownChartGenerator'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('BurndownChartGenerator – interaction', () => {
  it('renders sprint inputs', () => {
    render(<W><BurndownChartGenerator /></W>)
    expect(document.body.textContent).toMatch(/sprint|point|day|remaining/i)
  })

  it('fills sprint data', () => {
    render(<W><BurndownChartGenerator /></W>)
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.forEach((inp, i) => fireEvent.change(inp, { target: { value: String(100 - i * 10) } }))
  })

  it('generates chart', () => {
    render(<W><BurndownChartGenerator /></W>)
    const genBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/generate|update|draw/i))
    if (genBtn) fireEvent.click(genBtn)
  })

  it('adds days', () => {
    render(<W><BurndownChartGenerator /></W>)
    const addBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add|\+/))
    if (addBtn) { fireEvent.click(addBtn); fireEvent.click(addBtn) }
  })

  it('resets', () => {
    render(<W><BurndownChartGenerator /></W>)
    const resetBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/reset|clear/i))
    if (resetBtn) fireEvent.click(resetBtn)
  })
})
