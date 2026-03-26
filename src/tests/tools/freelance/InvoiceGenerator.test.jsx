import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import * as storage from '../../__mocks__/storage.js'

vi.mock('../../../utils/storage.js', () => storage)

import InvoiceGenerator from '../../../tools/freelance/InvoiceGenerator.jsx'

describe('InvoiceGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.print = vi.fn()
    window.alert = vi.fn()
  })

  it('renders invoice sections, default invoice details, and saves templates', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <InvoiceGenerator />
      </HelmetProvider>
    )

    expect(screen.getByText(/from \(your details\)/i)).toBeInTheDocument()
    expect(screen.getByText(/to \(client details\)/i)).toBeInTheDocument()
    expect(screen.getByText(/^currency$/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue('1001')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /save template/i }))
    expect(storage.setItem).toHaveBeenCalled()
  })
})
