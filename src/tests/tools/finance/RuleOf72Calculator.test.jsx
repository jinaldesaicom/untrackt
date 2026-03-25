import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import RuleOf72Calculator from '../../../tools/finance/RuleOf72Calculator.jsx'

describe('RuleOf72Calculator', () => {
  it('renders the doubling calculator and comparison table', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <RuleOf72Calculator />
      </HelmetProvider>
    )

    const inputs = screen.getAllByRole('spinbutton')
    await user.clear(inputs[0])
    await user.type(inputs[0], '6')

    expect(screen.getAllByText(/rule of 72 estimate/i).length).toBeGreaterThan(1)
    expect(screen.getAllByText(/actual calculation/i).length).toBeGreaterThan(1)
    expect(screen.getByText(/about the rule of 72/i)).toBeInTheDocument()
  })
})
