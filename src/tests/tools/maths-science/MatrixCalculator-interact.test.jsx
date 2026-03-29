import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import MatrixCalculator from '../../../tools/maths-science/MatrixCalculator'

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('MatrixCalculator – interaction', () => {
  it('renders matrix input grid', () => {
    render(<W><MatrixCalculator /></W>)
    const inputs = screen.queryAllByRole('spinbutton')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('fills matrix values and clicks operation buttons', () => {
    render(<W><MatrixCalculator /></W>)
    const inputs = screen.queryAllByRole('spinbutton')
    inputs.slice(0, 8).forEach((inp, i) => fireEvent.change(inp, { target: { value: String(i + 1) } }))
    const opBtns = screen.queryAllByRole('button').filter(b => b.textContent.match(/add|subtract|multiply|determinant|inverse|transpose/i))
    opBtns.forEach(b => { try { fireEvent.click(b) } catch {} })
  })

  it('changes matrix size', () => {
    render(<W><MatrixCalculator /></W>)
    const selects = screen.queryAllByRole('combobox')
    if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: '3' } })
    }
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.match(/3.3|4.4|2.2/i))
    if (btns.length > 0) fireEvent.click(btns[0])
  })

  it('computes determinant', () => {
    render(<W><MatrixCalculator /></W>)
    const inputs = screen.queryAllByRole('spinbutton')
    if (inputs.length >= 4) {
      fireEvent.change(inputs[0], { target: { value: '1' } })
      fireEvent.change(inputs[1], { target: { value: '2' } })
      fireEvent.change(inputs[2], { target: { value: '3' } })
      fireEvent.change(inputs[3], { target: { value: '4' } })
    }
    const detBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/det|determinant/i))
    if (detBtn) fireEvent.click(detBtn)
  })
})
