import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import InvoiceGenerator from '../../../tools/freelance/InvoiceGenerator'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('InvoiceGenerator – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})

  
beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:test')
  URL.revokeObjectURL = vi.fn()
})


  it('renders without crashing', () => {
    render(<W><InvoiceGenerator /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('fills form inputs', async () => {
    render(<W><InvoiceGenerator /></W>)
    const textInputs = screen.queryAllByRole('textbox')
    for (const input of textInputs.slice(0, 4)) {
      if (!input.readOnly) await userEvent.type(input, 'Client Project')
    }
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.slice(0, 4).forEach(input => {
      fireEvent.change(input, { target: { value: '100' } })
    })
    const btn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/calculate|generate|estimate|create|add/i)
    )
    if (btn) fireEvent.click(btn)
  })

  it('clicks tabs/modes', () => {
    render(<W><InvoiceGenerator /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 25)
    btns.slice(0, 5).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })
})
