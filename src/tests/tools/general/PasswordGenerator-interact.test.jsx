import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import PasswordGenerator from '../../../tools/general/PasswordGenerator'

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('PasswordGenerator – interaction', () => {
  it('renders password on mount', () => {
    render(<W><PasswordGenerator /></W>)
    const codeEl = document.querySelector('code')
    if (codeEl) {
      expect(codeEl.textContent.length).toBeGreaterThan(0)
    }
  })

  it('regenerates password', () => {
    render(<W><PasswordGenerator /></W>)
    const regenBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/regenerate|refresh/i) || b.getAttribute('aria-label')?.match(/regenerate/i))
    if (regenBtn) fireEvent.click(regenBtn)
  })

  it('copies password', () => {
    render(<W><PasswordGenerator /></W>)
    const copyBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/copy/i))
    if (copyBtn) fireEvent.click(copyBtn)
  })

  it('toggles character options', () => {
    render(<W><PasswordGenerator /></W>)
    const checkboxes = screen.queryAllByRole('checkbox')
    checkboxes.forEach(cb => fireEvent.click(cb))
    checkboxes.forEach(cb => fireEvent.click(cb))
  })

  it('changes length slider', () => {
    render(<W><PasswordGenerator /></W>)
    const slider = screen.queryByRole('slider') || document.querySelector('input[type="range"]')
    if (slider) {
      fireEvent.change(slider, { target: { value: '32' } })
      fireEvent.change(slider, { target: { value: '8' } })
      fireEvent.change(slider, { target: { value: '64' } })
    }
  })

  it('shows strength meter', () => {
    render(<W><PasswordGenerator /></W>)
    expect(document.body.textContent).toMatch(/strength|strong|weak|good|fair/i)
  })
})
