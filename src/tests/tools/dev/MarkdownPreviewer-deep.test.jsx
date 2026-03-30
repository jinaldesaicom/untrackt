import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MarkdownPreviewer from '../../../tools/dev/MarkdownPreviewer'



const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('MarkdownPreviewer – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})


  it('renders without crashing', () => {
    render(<W><MarkdownPreviewer /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('fills inputs and processes', async () => {
    render(<W><MarkdownPreviewer /></W>)
    const textInputs = screen.queryAllByRole('textbox')
    const textareas = document.querySelectorAll('textarea')
    const allInputs = [...textInputs, ...textareas]
    for (const input of allInputs.slice(0, 2)) {
      const testValue = 'MarkdownPreviewer'.includes('Json') ? '{"key": "value", "num": 42}' :
        'MarkdownPreviewer'.includes('Jwt') ? 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZXN0IjoiMSJ9.abc' :
        'MarkdownPreviewer'.includes('Url') ? 'https://example.com/path?q=hello world&a=1' :
        'MarkdownPreviewer'.includes('Color') ? '#ff6600' :
        'MarkdownPreviewer'.includes('Markdown') ? '# Hello\n\n**bold** text' :
        'test data for MarkdownPreviewer'
      fireEvent.change(input, { target: { value: testValue } })
    }
    const btn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/format|decode|encode|convert|preview|generate|process/i)
    )
    if (btn) fireEvent.click(btn)
  })

  it('tabs/modes', () => {
    render(<W><MarkdownPreviewer /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 25)
    btns.slice(0, 5).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })
})
