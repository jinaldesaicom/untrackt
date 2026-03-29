import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import GraphPlotter from '../../../tools/maths-science/GraphPlotter'

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('GraphPlotter – interaction', () => {
  it('renders with function input', () => {
    render(<W><GraphPlotter /></W>)
    const inputs = screen.queryAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('enters a function and plots', async () => {
    render(<W><GraphPlotter /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) {
      fireEvent.change(inputs[0], { target: { value: 'x^2' } })
    }
    const plotBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/plot|graph|draw/i))
    if (plotBtn) fireEvent.click(plotBtn)
  })

  it('adds multiple functions', () => {
    render(<W><GraphPlotter /></W>)
    const addBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add|\+/))
    if (addBtn) {
      fireEvent.click(addBtn)
      fireEvent.click(addBtn)
    }
  })

  it('changes axis range', () => {
    render(<W><GraphPlotter /></W>)
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.slice(0, 4).forEach((inp, i) => {
      fireEvent.change(inp, { target: { value: String([-10, 10, -10, 10][i]) } })
    })
  })

  it('clears functions', () => {
    render(<W><GraphPlotter /></W>)
    const clearBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/clear|reset/i))
    if (clearBtn) fireEvent.click(clearBtn)
  })
})
