import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HashGenerator from '../../../tools/dev/HashGenerator.jsx'

describe('HashGenerator', () => {
  beforeEach(() => {
    vi.stubGlobal('crypto', {
      subtle: {
        digest: vi.fn().mockResolvedValue(new ArrayBuffer(32)),
        importKey: vi.fn().mockResolvedValue('key'),
        sign: vi.fn().mockResolvedValue(new ArrayBuffer(32)),
      },
    })
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      configurable: true,
    })
  })

  it('renders text input, algorithm tabs, hmac toggle, and file upload controls', () => {
    const { container } = render(<HashGenerator />)

    expect(screen.getByPlaceholderText(/enter text to hash/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'MD5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'SHA-1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'SHA-256' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'SHA-512' })).toBeInTheDocument()
    expect(screen.getByLabelText(/hmac mode/i)).toBeInTheDocument()
    expect(container.querySelector('input[type="file"]')).toBeInTheDocument()
  })

  it('generates a sha-256 hash and exposes a copy action', async () => {
    const user = userEvent.setup()
    render(<HashGenerator />)

    await user.type(screen.getByPlaceholderText(/enter text to hash/i), 'hello world')
    await user.click(screen.getByRole('button', { name: /generate hash/i }))

    const output = screen.getByText(/^[0-9a-f]{64}$/i)
    expect(output.textContent).toHaveLength(64)
    expect(screen.getByRole('button', { name: /copy/i })).toBeEnabled()
  })

  it('shows the secret input when hmac mode is enabled', async () => {
    const user = userEvent.setup()
    render(<HashGenerator />)

    await user.click(screen.getByLabelText(/hmac mode/i))

    expect(screen.getByPlaceholderText(/secret key/i)).toBeInTheDocument()
  })
})
