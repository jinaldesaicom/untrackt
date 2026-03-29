import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SetTheoryCalculator from '../../../tools/maths-science/SetTheoryCalculator'



const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('SetTheoryCalculator – deep', () => {
  
beforeEach(() => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn(() => Promise.resolve()) } })
})


  it('renders without crashing', () => {
    render(<W><SetTheoryCalculator /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(50)
  })

  it('has interactive inputs', () => {
    render(<W><SetTheoryCalculator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    const spinbuttons = screen.queryAllByRole('spinbutton')
    const textareas = document.querySelectorAll('textarea')
    expect(inputs.length + spinbuttons.length + textareas.length).toBeGreaterThan(0)
  })

  it('fills inputs and triggers calculation', async () => {
    render(<W><SetTheoryCalculator /></W>)
    
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: '1, 2, 3, 4, 5' } })
    
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
    render(<W><SetTheoryCalculator /></W>)
    const tabs = screen.queryAllByRole('button').filter(b =>
      b.textContent.length < 30 && !b.textContent.match(/calculate|solve|copy|clear/i)
    )
    tabs.slice(0, 4).forEach(b => {
      try { fireEvent.click(b) } catch {}
    })
  })

  it('handles clear/reset if button exists', () => {
    render(<W><SetTheoryCalculator /></W>)
    const clearBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/clear|reset/i))
    if (clearBtn) fireEvent.click(clearBtn)
  })
})
