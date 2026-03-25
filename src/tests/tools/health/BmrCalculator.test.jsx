import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import userEvent from '@testing-library/user-event'
import BmrCalculator from '../../../tools/health/BmrCalculator.jsx'

function renderTool() {
  return render(
    <HelmetProvider>
      <BmrCalculator />
    </HelmetProvider>
  )
}

describe('BmrCalculator', () => {
  it('renders all input fields', () => {
    renderTool()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Gender')).toBeInTheDocument()
    expect(screen.getByText('Weight')).toBeInTheDocument()
    expect(screen.getByText('Height')).toBeInTheDocument()
    expect(screen.getByText('Activity Level')).toBeInTheDocument()
    expect(screen.getAllByRole('spinbutton').length).toBeGreaterThanOrEqual(3)
    expect(screen.getAllByRole('combobox').length).toBeGreaterThanOrEqual(2)
  })

  it('with valid male inputs, shows a positive BMR value', () => {
    renderTool()
    // Defaults: male, 30yo, 70kg, 175cm — valid values
    expect(screen.getByText(/bmr \(mifflin-st jeor\)/i)).toBeInTheDocument()
    // Should show a number followed by kcal
    const kcal = screen.getAllByText(/kcal/i)
    expect(kcal.length).toBeGreaterThan(0)
  })

  it('with valid female inputs, shows a different BMR value', async () => {
    const user = userEvent.setup()
    renderTool()
    const selects = screen.getAllByRole('combobox')
    // genderSelect is the first combobox
    const maleBmrEl = screen.getByText(/BMR \(Mifflin-St Jeor\)/i).closest('div')
    const maleValue = maleBmrEl.querySelector('p:nth-child(2)')?.textContent
    await user.selectOptions(selects[0], 'female')
    const femaleBmrEl = screen.getByText(/BMR \(Mifflin-St Jeor\)/i).closest('div')
    const femaleValue = femaleBmrEl.querySelector('p:nth-child(2)')?.textContent
    expect(femaleValue).not.toBe(maleValue)
  })

  it('Mifflin-St Jeor formula: Male, 30y, 70kg, 175cm, sedentary → BMR ≈ 1,649, TDEE ≈ 1,979', async () => {
    const user = userEvent.setup()
    renderTool()
    // Set sedentary activity level (1.2) — it's the first option in ACTIVITY_LEVELS
    const selects = screen.getAllByRole('combobox')
    // Activity level is the second combobox (after gender)
    await user.selectOptions(selects[1], '1.2')
    // BMR = 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75 → 1,649
    // TDEE = 1648.75 * 1.2 = 1978.5 → 1,979
    // The component renders: {fmt(bmrMifflin)} kcal
    // Use regex to handle locale formatting differences
    expect(screen.getByText(/1[,.]?649/)).toBeInTheDocument()
    expect(screen.getByText(/1[,.]?979/)).toBeInTheDocument()
  })

  it('kg/lbs toggle switches unit label', async () => {
    const user = userEvent.setup()
    renderTool()
    // Toggle weight to lbs
    const lbsBtns = screen.getAllByRole('button', { name: /lbs/i })
    await user.click(lbsBtns[0])
    expect(lbsBtns[0]).toHaveClass('bg-indigo-600')
  })

  it('disclaimer text is visible in the component', () => {
    renderTool()
    expect(screen.getByText(/not medical advice/i)).toBeInTheDocument()
  })
})
