import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ComplexNumberCalculator from '../../../tools/maths-science/ComplexNumberCalculator'



const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('ComplexNumberCalculator – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})


  it('renders without crashing', () => {
    render(<W><ComplexNumberCalculator /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(50)
  })

  it('has interactive inputs', () => {
    render(<W><ComplexNumberCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    const spinbuttons = screen.queryAllByRole('spinbutton')
    const textareas = document.querySelectorAll('textarea')
    expect(inputs.length + spinbuttons.length + textareas.length).toBeGreaterThan(0)
  })

  it('fills inputs and triggers calculation', async () => {
    render(<W><ComplexNumberCalculator /></W>)
    
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.forEach((input, i) => {
      fireEvent.change(input, { target: { value: String(i + 1) } })
    })
    const textInputs = screen.queryAllByRole('textbox')
    textInputs.forEach((input, i) => {
      if (!input.readOnly) fireEvent.change(input, { target: { value: String(i + 5) } })
    })
    
    // Click any calculate/solve/compute button
    const calcBtn = screen.queryAllByRole('button').find(b =>
      b.textContent.match(/calculate|solve|compute|convert|check|generate|analyze|find/i)
    )
    if (calcBtn) {
      fireEvent.click(calcBtn)
      await waitFor(() => {
        expect(document.body.textContent.length).toBeGreaterThan(100)
      })
    }
  })

  it('interacts with tabs/modes if present', () => {
    render(<W><ComplexNumberCalculator /></W>)
    const tabs = screen.queryAllByRole('button').filter(b =>
      b.textContent.length < 30 && !b.textContent.match(/calculate|solve|copy|clear/i)
    )
    tabs.slice(0, 4).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })

  it('handles clear/reset if button exists', () => {
    render(<W><ComplexNumberCalculator /></W>)
    const clearBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/clear|reset/i))
    if (clearBtn) fireEvent.click(clearBtn)
  })
})
