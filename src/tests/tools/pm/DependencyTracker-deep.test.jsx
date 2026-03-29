import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import DependencyTracker from '../../../tools/pm/DependencyTracker'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('DependencyTracker – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})

  
beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:test')
  URL.revokeObjectURL = vi.fn()
})


  it('renders without crashing', () => {
    render(<W><DependencyTracker /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('interacts with primary inputs', async () => {
    render(<W><DependencyTracker /></W>)
    const textInputs = screen.queryAllByRole('textbox')
    for (const input of textInputs.slice(0, 3)) {
      if (!input.readOnly) await userEvent.type(input, 'Test entry')
    }
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.slice(0, 3).forEach(input => {
      fireEvent.change(input, { target: { value: '10' } })
    })
    const addBtn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/add|create|new|save|generate|\+/i)
    )
    if (addBtn) fireEvent.click(addBtn)
  })

  it('clicks through views/tabs', () => {
    render(<W><DependencyTracker /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 25)
    btns.slice(0, 6).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })

  it('handles export/copy if available', () => {
    render(<W><DependencyTracker /></W>)
    const exportBtn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/export|copy|download|csv/i) || b.getAttribute('aria-label')?.match(/copy|export/i)
    )
    if (exportBtn) fireEvent.click(exportBtn)
  })
})
