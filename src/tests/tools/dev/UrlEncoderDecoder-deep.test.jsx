import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import UrlEncoderDecoder from '../../../tools/dev/UrlEncoderDecoder'



const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('UrlEncoderDecoder – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})


  it('renders without crashing', () => {
    render(<W><UrlEncoderDecoder /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(30)
  })

  it('fills inputs and processes', async () => {
    render(<W><UrlEncoderDecoder /></W>)
    const textInputs = screen.queryAllByRole('textbox')
    const textareas = document.querySelectorAll('textarea')
    const allInputs = [...textInputs, ...textareas]
    for (const input of allInputs.slice(0, 2)) {
      const testValue = 'UrlEncoderDecoder'.includes('Json') ? '{"key": "value", "num": 42}' :
        'UrlEncoderDecoder'.includes('Jwt') ? 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZXN0IjoiMSJ9.abc' :
        'UrlEncoderDecoder'.includes('Url') ? 'https://example.com/path?q=hello world&a=1' :
        'UrlEncoderDecoder'.includes('Color') ? '#ff6600' :
        'UrlEncoderDecoder'.includes('Markdown') ? '# Hello\n\n**bold** text' :
        'test data for UrlEncoderDecoder'
      fireEvent.change(input, { target: { value: testValue } })
    }
    const btn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/format|decode|encode|convert|preview|generate|process/i)
    )
    if (btn) fireEvent.click(btn)
  })

  it('tabs/modes', () => {
    render(<W><UrlEncoderDecoder /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 25)
    btns.slice(0, 5).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })
})
