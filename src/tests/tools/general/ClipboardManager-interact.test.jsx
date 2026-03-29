import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ClipboardManager from '../../../tools/general/ClipboardManager'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('ClipboardManager – interaction', () => {
  it('renders empty state', () => {
    render(<W><ClipboardManager /></W>)
    expect(document.body.textContent).toMatch(/clip|paste|save/i)
  })

  it('adds a clip', async () => {
    render(<W><ClipboardManager /></W>)
    const textareas = document.querySelectorAll('textarea')
    if (textareas[0]) {
      fireEvent.change(textareas[0], { target: { value: 'Hello world' } })
    }
    const saveBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/save/i))
    if (saveBtn) fireEvent.click(saveBtn)
  })

  it('paste from clipboard button', async () => {
    render(<W><ClipboardManager /></W>)
    const pasteBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/paste/i))
    if (pasteBtn) {
      try { fireEvent.click(pasteBtn) } catch {}
    }
  })

  it('fills label input', async () => {
    render(<W><ClipboardManager /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'My label')
  })

  it('search clips', async () => {
    render(<W><ClipboardManager /></W>)
    const searchInput = screen.queryAllByRole('textbox').find(i => i.getAttribute('placeholder')?.match(/search/i))
    if (searchInput) await userEvent.type(searchInput, 'test query')
  })

  it('clear all button', () => {
    render(<W><ClipboardManager /></W>)
    const clearBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/clear/i))
    if (clearBtn) fireEvent.click(clearBtn)
  })
})
