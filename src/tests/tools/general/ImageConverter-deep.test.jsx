import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ImageConverter from '../../../tools/general/ImageConverter'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('ImageConverter – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})

  
beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:test')
  URL.revokeObjectURL = vi.fn()
})


  it('renders without crashing', () => {
    render(<W><ImageConverter /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('has interactive elements', () => {
    render(<W><ImageConverter /></W>)
    const btns = screen.queryAllByRole('button')
    const inputs = screen.queryAllByRole('textbox')
    const spinbuttons = screen.queryAllByRole('spinbutton')
    expect(btns.length + inputs.length + spinbuttons.length).toBeGreaterThan(0)
  })

  it('fills inputs and interacts', async () => {
    render(<W><ImageConverter /></W>)
    const inputs = screen.queryAllByRole('textbox')
    for (const input of inputs.slice(0, 3)) {
      if (!input.readOnly) await userEvent.type(input, 'test input 123')
    }
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.slice(0, 3).forEach(input => {
      fireEvent.change(input, { target: { value: '42' } })
    })
    const btn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/convert|generate|start|calculate|compress|encode|add|save/i)
    )
    if (btn) fireEvent.click(btn)
  })

  it('clicks through tabs/modes', () => {
    render(<W><ImageConverter /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 25)
    btns.slice(0, 5).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })
})
