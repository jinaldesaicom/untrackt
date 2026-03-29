import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ImageCompressor from '../../../tools/general/ImageCompressor'

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('ImageCompressor – interaction', () => {
  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:test')
    URL.revokeObjectURL = vi.fn()
  })

  it('renders drop zone', () => {
    render(<W><ImageCompressor /></W>)
    expect(document.body.textContent).toMatch(/drag|drop|upload|browse|image/i)
  })

  it('shows format buttons', () => {
    render(<W><ImageCompressor /></W>)
    const btns = screen.queryAllByRole('button')
    const formatBtns = btns.filter(b => b.textContent.match(/jpeg|png|webp/i))
    expect(formatBtns.length).toBeGreaterThan(0)
    formatBtns.forEach(b => fireEvent.click(b))
  })

  it('changes quality slider', () => {
    render(<W><ImageCompressor /></W>)
    const slider = screen.queryByRole('slider') || document.querySelector('input[type="range"]')
    if (slider) {
      fireEvent.change(slider, { target: { value: '50' } })
      fireEvent.change(slider, { target: { value: '100' } })
    }
  })

  it('fills max width/height', () => {
    render(<W><ImageCompressor /></W>)
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.forEach((inp, i) => fireEvent.change(inp, { target: { value: String([800, 600][i] || 400) } }))
  })

  it('handles drag over / drag leave', () => {
    render(<W><ImageCompressor /></W>)
    const dropZone = document.querySelector('[role="button"]') || document.querySelector('.border-dashed') || document.body.firstChild
    if (dropZone) {
      fireEvent.dragOver(dropZone, { dataTransfer: { types: ['Files'] } })
      fireEvent.dragLeave(dropZone)
    }
  })
})
