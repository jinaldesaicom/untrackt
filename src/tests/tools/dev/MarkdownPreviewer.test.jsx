import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as storage from '../../__mocks__/storage.js'

vi.mock('../../../utils/storage.js', () => storage)

import MarkdownPreviewer from '../../../tools/dev/MarkdownPreviewer.jsx'

describe('MarkdownPreviewer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      configurable: true,
    })
    window.confirm = vi.fn(() => true)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the editor, preview, view toggles, and copy actions', () => {
    render(<MarkdownPreviewer />)

    expect(screen.getByRole('button', { name: /split view/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /editor only/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /preview only/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy markdown/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy html/i })).toBeInTheDocument()
  })

  it('renders markdown syntax in the preview and autosaves after typing', async () => {
    render(<MarkdownPreviewer />)

    const editor = screen.getByRole('textbox')
    fireEvent.change(editor, { target: { value: '# Hello\n\n**bold**\n- item\n`code`' } })

    expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument()
    expect(screen.getByText('bold').tagName).toBe('STRONG')
    expect(screen.getByText('item').tagName).toBe('LI')
    expect(screen.getByText('code').tagName).toBe('CODE')
    expect(screen.getByText(/words:/i)).toHaveTextContent(/5|6/)

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(storage.setItem).toHaveBeenCalledWith('untrackt:markdownPreviewer', '# Hello\n\n**bold**\n- item\n`code`')
  })
})
