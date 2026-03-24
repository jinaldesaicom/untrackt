import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JwtDecoder from '../../../tools/dev/JwtDecoder.jsx'

const VALID_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.' +
  'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

describe('JwtDecoder', () => {
  it('renders the textarea and security warning banner', () => {
    render(<JwtDecoder />)

    expect(screen.getByPlaceholderText(/eyJhbGciOi/i)).toBeInTheDocument()
    expect(screen.getByText(/never paste production jwts into online tools/i)).toBeInTheDocument()
  })

  it('decodes a valid jwt into header, payload, signature, and issued-at details', async () => {
    const user = userEvent.setup()
    render(<JwtDecoder />)

    await user.type(screen.getByPlaceholderText(/eyJhbGciOi/i), VALID_JWT)

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Payload')).toBeInTheDocument()
    expect(screen.getByText('Signature')).toBeInTheDocument()
    expect(screen.getByText(/"alg": "HS256"/i)).toBeInTheDocument()
    expect(screen.getByText(/"typ": "JWT"/i)).toBeInTheDocument()
    expect(screen.getByText(/"name": "John Doe"/i)).toBeInTheDocument()
    expect(screen.getByText(/issued at:/i).parentElement?.textContent).toMatch(/2018|jan|january/i)
  })

  it('shows an error state for invalid jwt input', async () => {
    const user = userEvent.setup()
    render(<JwtDecoder />)

    await user.type(screen.getByPlaceholderText(/eyJhbGciOi/i), 'not-a-jwt')

    expect(screen.getByText(/jwt must contain header\.payload\.signature/i)).toBeInTheDocument()
  })
})
