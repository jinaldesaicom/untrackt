import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UrlEncoderDecoder from '../../../tools/dev/UrlEncoderDecoder.jsx'

describe('UrlEncoderDecoder', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      configurable: true,
    })
  })

  it('encodes and decodes text in real time and exposes the component toggle', async () => {
    const user = userEvent.setup()
    render(<UrlEncoderDecoder />)

    expect(screen.getByLabelText(/encodeURIComponent behavior/i)).toBeInTheDocument()
    const input = screen.getByPlaceholderText(/enter text or url/i)
    const output = screen.getAllByRole('textbox')[1]

    await user.type(input, 'hello world')
    expect(output).toHaveValue('hello%20world')

    await user.click(screen.getByRole('button', { name: /^decode$/i }))
    await user.clear(input)
    await user.type(input, 'a%3D1')
    expect(screen.getAllByRole('textbox')[1]).toHaveValue('a=1')
  })

  it('parses a full url, shows query params, and rebuilds the url', async () => {
    const user = userEvent.setup()
    render(<UrlEncoderDecoder />)

    await user.click(screen.getByRole('button', { name: /parse url/i }))
    const input = screen.getByPlaceholderText(/enter text or url/i)
    await user.type(input, 'https://example.com:8080/path?a=1&b=2#section')

    expect(screen.getByText((_, element) => element?.textContent === 'Protocol: https:')).toBeInTheDocument()
    expect(screen.getByText((_, element) => element?.textContent === 'Host: example.com')).toBeInTheDocument()
    expect(screen.getByText((_, element) => element?.textContent === 'Port: 8080')).toBeInTheDocument()
    expect(screen.getByText((_, element) => element?.textContent === 'Pathname: /path')).toBeInTheDocument()
    expect(screen.getByText((_, element) => element?.textContent === 'Hash: #section')).toBeInTheDocument()
    expect(screen.getByDisplayValue('a')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('b')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2')).toBeInTheDocument()
  })
})
