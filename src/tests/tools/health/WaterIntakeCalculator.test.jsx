import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import userEvent from '@testing-library/user-event'
import WaterIntakeCalculator from '../../../tools/health/WaterIntakeCalculator.jsx'

function renderTool() {
  return render(
    <HelmetProvider>
      <WaterIntakeCalculator />
    </HelmetProvider>
  )
}

describe('WaterIntakeCalculator', () => {
  it('renders weight input and activity/climate selectors', () => {
    renderTool()
    expect(screen.getByText('Weight')).toBeInTheDocument()
    expect(screen.getByText('Activity Level')).toBeInTheDocument()
    expect(screen.getByText('Climate')).toBeInTheDocument()
    expect(screen.getAllByRole('spinbutton').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('combobox').length).toBeGreaterThanOrEqual(2)
  })

  it('with valid input shows water amount in litres', () => {
    renderTool()
    // Default: 70kg, sedentary, temperate
    // base = 70 * 0.033 = 2.31L
    expect(screen.getAllByText(/2\.3L/).length).toBeGreaterThanOrEqual(1)
  })

  it('water amount is a positive number', () => {
    renderTool()
    const litreTexts = screen.getAllByText(/\d+\.\d+L/)
    const value = parseFloat(litreTexts[0].textContent)
    expect(value).toBeGreaterThan(0)
  })

  it('shows number of glasses', () => {
    renderTool()
    // Default 70kg, sedentary = 2.31L / 0.25 = ~10 glasses
    expect(screen.getByText(/glasses \(250ml\)/i)).toBeInTheDocument()
  })

  it('changing activity level changes the output', async () => {
    const user = userEvent.setup()
    renderTool()
    const sedentaryText = screen.getAllByText(/\d+\.\d+L/)[0].textContent

    const selects = screen.getAllByRole('combobox')
    await user.selectOptions(selects[0], '1')
    // Very active adds 1.0L
    const activeText = screen.getAllByText(/\d+\.\d+L/)[0].textContent
    expect(activeText).not.toBe(sedentaryText)
  })

  it('changing climate changes the output', async () => {
    const user = userEvent.setup()
    renderTool()
    const normalText = screen.getAllByText(/\d+\.\d+L/)[0].textContent

    const selects = screen.getAllByRole('combobox')
    await user.selectOptions(selects[1], '0.7')
    const hotText = screen.getAllByText(/\d+\.\d+L/)[0].textContent
    expect(hotText).not.toBe(normalText)
  })

  it('kg/lbs toggle works', async () => {
    const user = userEvent.setup()
    renderTool()
    const lbsBtn = screen.getByRole('button', { name: /lbs/i })
    await user.click(lbsBtn)
    expect(lbsBtn).toHaveClass('bg-indigo-600')
    // Weight input is still present
    expect(screen.getAllByRole('spinbutton').length).toBeGreaterThanOrEqual(1)
  })
})
