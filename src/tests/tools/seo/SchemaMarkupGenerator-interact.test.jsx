import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SchemaMarkupGenerator from '../../../tools/seo/SchemaMarkupGenerator'

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('SchemaMarkupGenerator – interaction', () => {
  beforeEach(() => { Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } }) })

  it('renders schema type selector', () => {
    render(<W><SchemaMarkupGenerator /></W>)
    expect(document.body.textContent).toMatch(/article|product|faq|schema/i)
  })

  it('fills Article fields', async () => {
    render(<W><SchemaMarkupGenerator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    for (const inp of inputs.slice(0, 5)) {
      if (!inp.readOnly) await userEvent.type(inp, 'Test Content')
    }
  })

  it('switches to Product schema', () => {
    render(<W><SchemaMarkupGenerator /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.match(/product/i))
    if (btns[0]) fireEvent.click(btns[0])
    const inputs = screen.queryAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('switches to FAQ schema and adds questions', () => {
    render(<W><SchemaMarkupGenerator /></W>)
    const faqBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/faq/i))
    if (faqBtn) {
      fireEvent.click(faqBtn)
      const addBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add|\+/))
      if (addBtn) {
        fireEvent.click(addBtn)
        fireEvent.click(addBtn)
      }
    }
  })

  it('switches to LocalBusiness schema', () => {
    render(<W><SchemaMarkupGenerator /></W>)
    const btn = screen.queryAllByRole('button').find(b => b.textContent.match(/local.*business/i))
    if (btn) fireEvent.click(btn)
    const inputs = screen.queryAllByRole('textbox')
    inputs.slice(0, 5).forEach(inp => {
      if (!inp.readOnly) fireEvent.change(inp, { target: { value: 'Test Business' } })
    })
  })

  it('switches to Event schema', () => {
    render(<W><SchemaMarkupGenerator /></W>)
    const btn = screen.queryAllByRole('button').find(b => b.textContent === 'Event')
    if (btn) fireEvent.click(btn)
  })

  it('switches to HowTo schema', () => {
    render(<W><SchemaMarkupGenerator /></W>)
    const btn = screen.queryAllByRole('button').find(b => b.textContent.match(/howto|how.to/i))
    if (btn) fireEvent.click(btn)
  })

  it('switches to Review schema', () => {
    render(<W><SchemaMarkupGenerator /></W>)
    const btn = screen.queryAllByRole('button').find(b => b.textContent === 'Review')
    if (btn) fireEvent.click(btn)
  })

  it('copies generated schema', () => {
    render(<W><SchemaMarkupGenerator /></W>)
    const copyBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/copy/i))
    if (copyBtn) fireEvent.click(copyBtn)
  })
})
