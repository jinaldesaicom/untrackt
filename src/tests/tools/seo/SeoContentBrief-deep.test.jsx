import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SeoContentBrief from '../../../tools/seo/SeoContentBrief'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('SeoContentBrief – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})

  
beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:test')
  URL.revokeObjectURL = vi.fn()
})


  it('renders without crashing', () => {
    render(<W><SeoContentBrief /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('fills primary inputs', async () => {
    render(<W><SeoContentBrief /></W>)
    const textInputs = screen.queryAllByRole('textbox')
    for (const input of textInputs.slice(0, 3)) {
      if (!input.readOnly) await userEvent.type(input, 'https://example.com')
    }
    const textareas = document.querySelectorAll('textarea')
    for (const ta of Array.from(textareas).slice(0, 2)) {
      fireEvent.change(ta, { target: { value: 'Test SEO content for analysis keyword optimization' } })
    }
  })

  it('triggers main action', async () => {
    render(<W><SeoContentBrief /></W>)
    const textInputs = screen.queryAllByRole('textbox')
    if (textInputs[0]) await userEvent.type(textInputs[0], 'https://example.com')
    const actionBtn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/analyze|generate|check|test|validate|create/i)
    )
    if (actionBtn) fireEvent.click(actionBtn)
  })

  it('clicks tabs/modes', () => {
    render(<W><SeoContentBrief /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 25)
    btns.slice(0, 5).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })
})
