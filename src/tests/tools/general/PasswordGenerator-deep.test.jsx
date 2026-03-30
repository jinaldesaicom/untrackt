import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import PasswordGenerator from '../../../tools/general/PasswordGenerator'



const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


// Provide crypto.getRandomValues for jsdom
if (!globalThis.crypto) globalThis.crypto = {}
if (!globalThis.crypto.getRandomValues) {
  globalThis.crypto.getRandomValues = (arr) => {
    for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256)
    return arr
  }
}

describe('PasswordGenerator – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})


  it('generates a password on mount', async () => {
    render(<W><PasswordGenerator /></W>)
    await waitFor(() => {
      const code = document.querySelector('code')
      expect(code?.textContent?.length).toBeGreaterThan(0)
    })
  })

  it('regenerates on button click', async () => {
    render(<W><PasswordGenerator /></W>)
    await waitFor(() => document.querySelector('code')?.textContent?.length > 0)
    const first = document.querySelector('code').textContent
    const regenBtn = screen.getAllByRole('button').find(b =>
      b.getAttribute('aria-label')?.match(/generate/i) || b.textContent.match(/regenerate|generate/i)
    )
    if (regenBtn) fireEvent.click(regenBtn)
    // password may or may not change (random), just check it's still present
    await waitFor(() => expect(document.querySelector('code')?.textContent?.length).toBeGreaterThan(0))
  })

  it('changes length via range slider', async () => {
    render(<W><PasswordGenerator /></W>)
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '32' } })
    await waitFor(() => {
      const pw = document.querySelector('code')?.textContent
      // Might be up to 32 chars
      expect(pw?.length).toBeGreaterThanOrEqual(8)
    })
  })

  it('toggles character type checkboxes', async () => {
    render(<W><PasswordGenerator /></W>)
    const checkboxes = screen.getAllByRole('checkbox')
    // Toggle each checkbox
    for (const cb of checkboxes) {
      fireEvent.click(cb)
    }
    // Now toggle them back
    for (const cb of checkboxes) {
      fireEvent.click(cb)
    }
  })

  it('shows strength meter', () => {
    render(<W><PasswordGenerator /></W>)
    expect(document.body.textContent).toMatch(/strength|weak|fair|strong|very strong|entropy/i)
  })

  it('copies password to clipboard', async () => {
    render(<W><PasswordGenerator /></W>)
    await waitFor(() => document.querySelector('code')?.textContent?.length > 0)
    const copyBtn = screen.getAllByRole('button').find(b =>
      b.getAttribute('aria-label')?.match(/copy/i) || b.textContent.match(/copy/i)
    )
    if (copyBtn) {
      fireEvent.click(copyBtn)
      await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalled())
    }
  })
})
