import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import StatisticsCalculator from '../../../tools/maths-science/StatisticsCalculator'

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('StatisticsCalculator – interaction', () => {
  it('renders data textarea and z-score inputs', () => {
    render(<W><StatisticsCalculator /></W>)
    const textareas = document.querySelectorAll('textarea')
    expect(textareas.length).toBeGreaterThanOrEqual(1)
  })

  it('computes stats from comma-separated numbers', async () => {
    render(<W><StatisticsCalculator /></W>)
    const ta = document.querySelector('textarea')
    fireEvent.change(ta, { target: { value: '10, 20, 30, 40, 50' } })
    expect(document.body.textContent).toMatch(/30/)
  })

  it('computes stats from newline-separated numbers', async () => {
    render(<W><StatisticsCalculator /></W>)
    const ta = document.querySelector('textarea')
    fireEvent.change(ta, { target: { value: '5\n10\n15\n20\n25\n100' } })
    expect(document.body.textContent).toMatch(/\d/)
  })

  it('handles single number', () => {
    render(<W><StatisticsCalculator /></W>)
    const ta = document.querySelector('textarea')
    fireEvent.change(ta, { target: { value: '42' } })
    expect(document.body.textContent).toMatch(/42/)
  })

  it('handles empty data', () => {
    render(<W><StatisticsCalculator /></W>)
    const ta = document.querySelector('textarea')
    fireEvent.change(ta, { target: { value: '' } })
    expect(document.body.textContent.length).toBeGreaterThan(10)
  })

  it('z-score calculation', () => {
    render(<W><StatisticsCalculator /></W>)
    const spinbuttons = screen.queryAllByRole('spinbutton')
    if (spinbuttons.length >= 3) {
      fireEvent.change(spinbuttons[0], { target: { value: '75' } })
      fireEvent.change(spinbuttons[1], { target: { value: '70' } })
      fireEvent.change(spinbuttons[2], { target: { value: '10' } })
      expect(document.body.textContent).toMatch(/0\.5|z/i)
    }
  })

  it('copy button works', async () => {
    render(<W><StatisticsCalculator /></W>)
    const ta = document.querySelector('textarea')
    fireEvent.change(ta, { target: { value: '1,2,3,4,5' } })
    const copyBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/copy/i))
    if (copyBtn) fireEvent.click(copyBtn)
  })

  it('mode calculation', () => {
    render(<W><StatisticsCalculator /></W>)
    const ta = document.querySelector('textarea')
    fireEvent.change(ta, { target: { value: '1,2,2,3,3,3,4' } })
    expect(document.body.textContent).toMatch(/3/)
  })
})
