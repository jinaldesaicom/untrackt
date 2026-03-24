import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

vi.mock('qrcode.react', () => ({
  QRCodeCanvas: ({ value }) => (
    <canvas data-testid="qr-canvas" data-value={value} aria-label={`QR code for ${value}`} />
  ),
}))

import QrCodeGenerator from '../../../tools/general/QrCodeGenerator.jsx'

describe('QrCodeGenerator', () => {
  it('renders input field', () => {
    render(<QrCodeGenerator />)
    expect(screen.getByPlaceholderText(/or any text/i)).toBeInTheDocument()
  })

  it('typing text renders a QR code element', async () => {
    const user = userEvent.setup()
    render(<QrCodeGenerator />)
    const input = screen.getByPlaceholderText(/or any text/i)
    await user.clear(input)
    await user.type(input, 'https://example.com')
    expect(screen.getByTestId('qr-canvas')).toBeInTheDocument()
  })

  it('QR code is not shown for empty input', async () => {
    const user = userEvent.setup()
    render(<QrCodeGenerator />)
    const input = screen.getByPlaceholderText(/or any text/i)
    await user.clear(input)
    expect(screen.queryByTestId('qr-canvas')).not.toBeInTheDocument()
  })

  it('size selector buttons are present (Small/Medium/Large)', () => {
    render(<QrCodeGenerator />)
    expect(screen.getByRole('button', { name: /small/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /medium/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /large/i })).toBeInTheDocument()
  })

  it('download button is present when QR is generated', async () => {
    render(<QrCodeGenerator />)
    // Default value is 'https://example.com' so QR is shown
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument()
  })
})
