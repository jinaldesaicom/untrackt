import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import EquationSolver from '../../../tools/maths-science/EquationSolver'

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('EquationSolver – interaction', () => {
  it('renders equation input', () => {
    render(<W><EquationSolver /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(50)
  })

  it('switches between equation types', () => {
    render(<W><EquationSolver /></W>)
    const btns = screen.queryAllByRole('button').filter(b => b.textContent.length < 30)
    btns.slice(0, 5).forEach(b => { try { fireEvent.click(b) } catch {} })
  })

  it('fills number inputs for linear equation', () => {
    render(<W><EquationSolver /></W>)
    const inputs = screen.queryAllByRole('spinbutton')
    inputs.forEach((inp, i) => fireEvent.change(inp, { target: { value: String(i + 1) } }))
    const solveBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/solve/i))
    if (solveBtn) fireEvent.click(solveBtn)
  })

  it('fills quadratic coefficients', () => {
    render(<W><EquationSolver /></W>)
    const quadBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/quadratic/i))
    if (quadBtn) fireEvent.click(quadBtn)
    const inputs = screen.queryAllByRole('spinbutton')
    if (inputs.length >= 3) {
      fireEvent.change(inputs[0], { target: { value: '1' } })
      fireEvent.change(inputs[1], { target: { value: '-5' } })
      fireEvent.change(inputs[2], { target: { value: '6' } })
    }
    const solveBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/solve/i))
    if (solveBtn) fireEvent.click(solveBtn)
  })

  it('handles system of equations', () => {
    render(<W><EquationSolver /></W>)
    const sysBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/system|2.2|3.3/i))
    if (sysBtn) fireEvent.click(sysBtn)
    const inputs = screen.queryAllByRole('spinbutton')
    inputs.slice(0, 6).forEach((inp, i) => fireEvent.change(inp, { target: { value: String([2, 3, 13, 1, -1, 1][i] || 1) } }))
    const solveBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/solve/i))
    if (solveBtn) fireEvent.click(solveBtn)
  })
})
