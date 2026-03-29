import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TipSplitter from '../../../tools/general/TipSplitter.jsx'
import { HelmetProvider } from 'react-helmet-async'

describe('TipSplitter', () => {
  it('renders bill amount, tip %, and people count inputs', () => {
    render(<HelmetProvider><TipSplitter /></HelmetProvider>)
    expect(screen.getByText(/bill amount/i)).toBeInTheDocument()
    expect(screen.getByText(/number of people/i)).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('calculates correct tip amount, total, and per person for Bill $100, Tip 20%, 4 people', async () => {
    render(<HelmetProvider><TipSplitter /></HelmetProvider>)
    const spinbuttons = screen.getAllByRole('spinbutton')
    // Bill amount is first number input, people count is second
    fireEvent.change(spinbuttons[0], { target: { value: '100' } })
    fireEvent.change(spinbuttons[1], { target: { value: '4' } })
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '20' } })

    // Tip amount: $20, Total: $120, Per person: $30
    expect(screen.getByText('$20.00')).toBeInTheDocument()
    expect(screen.getByText('$120.00')).toBeInTheDocument()
    expect(screen.getByText('$30.00')).toBeInTheDocument()
  })

  it('changing number of people updates per person amount', async () => {
    render(<HelmetProvider><TipSplitter /></HelmetProvider>)
    const spinbuttons = screen.getAllByRole('spinbutton')
    fireEvent.change(spinbuttons[0], { target: { value: '100' } })

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '0' } })

    // With 0% tip and bill $100, per person depends on people count
    fireEvent.change(spinbuttons[1], { target: { value: '5' } })
    // Per person: $100 / 5 = $20.00
    expect(screen.getByText('$20.00')).toBeInTheDocument()
  })

  it('tip percentage slider updates tip amount in real-time', async () => {
    render(<HelmetProvider><TipSplitter /></HelmetProvider>)
    const spinbuttons = screen.getAllByRole('spinbutton')
    fireEvent.change(spinbuttons[0], { target: { value: '200' } })
    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '15' } })
    // Tip = $200 * 0.15 = $30
    expect(screen.getByText('$30.00')).toBeInTheDocument()
  })

  it('custom split toggle shows individual name fields', async () => {
    const user = userEvent.setup()
    render(<HelmetProvider><TipSplitter /></HelmetProvider>)
    await user.click(screen.getByText(/custom split by person/i))
    // Custom split section should show name inputs
    expect(screen.getByDisplayValue('Person 1')).toBeInTheDocument()
  })
})
