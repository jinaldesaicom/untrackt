import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import NetWorthSnapshot from '../../../tools/finance/NetWorthSnapshot.jsx'

describe('NetWorthSnapshot', () => {
  it('renders assets and liabilities controls without using localStorage', async () => {
    const user = userEvent.setup()
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
    render(
      <HelmetProvider>
        <NetWorthSnapshot />
      </HelmetProvider>
    )

    expect(screen.getByRole('heading', { name: /^assets$/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^liabilities$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add asset/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add liability/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /add asset/i }))
    expect(setItemSpy).not.toHaveBeenCalled()
    setItemSpy.mockRestore()
  })
})
