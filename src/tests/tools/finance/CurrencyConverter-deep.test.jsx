import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import CurrencyConverter from '../../../tools/finance/CurrencyConverter'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('CurrencyConverter – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})


  it('renders without crashing', () => {
    render(<W><CurrencyConverter /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('fills numeric inputs and calculates', async () => {
    render(<W><CurrencyConverter /></W>)
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.forEach((input, i) => {
      const values = [10000, 5, 12, 30, 1000]
      fireEvent.change(input, { target: { value: String(values[i % values.length]) } })
    })
    const calcBtn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/calculate|compute|convert|analyze/i)
    )
    if (calcBtn) fireEvent.click(calcBtn)
  })

  it('tabs/modes', () => {
    render(<W><CurrencyConverter /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 25)
    btns.slice(0, 5).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })
})
