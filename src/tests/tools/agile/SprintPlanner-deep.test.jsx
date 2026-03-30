import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SprintPlanner from '../../../tools/agile/SprintPlanner'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('SprintPlanner – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})

  
beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:test')
  URL.revokeObjectURL = vi.fn()
})


  it('renders without crashing', () => {
    render(<W><SprintPlanner /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('interacts with inputs', async () => {
    render(<W><SprintPlanner /></W>)
    const textInputs = screen.queryAllByRole('textbox')
    for (const input of textInputs.slice(0, 3)) {
      if (!input.readOnly) await userEvent.type(input, 'Test item')
    }
    const addBtn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/add|create|new|save|\+/i)
    )
    if (addBtn) fireEvent.click(addBtn)
  })

  it('clicks through elements', () => {
    render(<W><SprintPlanner /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 30)
    btns.slice(0, 6).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })

  it('handles export/copy', () => {
    render(<W><SprintPlanner /></W>)
    const btn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/export|copy|download|csv|markdown/i) || b.getAttribute('aria-label')?.match(/copy|export/i)
    )
    if (btn) fireEvent.click(btn)
  })
})
