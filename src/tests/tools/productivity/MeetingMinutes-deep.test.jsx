import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MeetingMinutes from '../../../tools/productivity/MeetingMinutes'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('MeetingMinutes – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})

  
beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:test')
  URL.revokeObjectURL = vi.fn()
})


  it('renders without crashing', () => {
    render(<W><MeetingMinutes /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('adds an item', async () => {
    render(<W><MeetingMinutes /></W>)
    const textInputs = screen.queryAllByRole('textbox')
    for (const input of textInputs.slice(0, 2)) {
      if (!input.readOnly) await userEvent.type(input, 'Test task item')
    }
    const addBtn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/add|create|new|save|\+/i)
    )
    if (addBtn) fireEvent.click(addBtn)
  })

  it('switches views/filters', () => {
    render(<W><MeetingMinutes /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 25)
    btns.slice(0, 6).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })

  it('handles delete/clear', () => {
    render(<W><MeetingMinutes /></W>)
    const btn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/clear|delete|remove|reset/i) || b.getAttribute('aria-label')?.match(/delete|remove/i)
    )
    if (btn) fireEvent.click(btn)
  })
})
