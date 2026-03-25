import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import userEvent from '@testing-library/user-event'
import SleepCycleCalculator from '../../../tools/health/SleepCycleCalculator.jsx'

function renderTool() {
  return render(
    <HelmetProvider>
      <SleepCycleCalculator />
    </HelmetProvider>
  )
}

const TIME_REGEX = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i

describe('SleepCycleCalculator', () => {
  it('renders two mode options (wake up / sleep at)', () => {
    renderTool()
    expect(screen.getByRole('button', { name: /wake up at/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /going to sleep at/i })).toBeInTheDocument()
  })

  it('selecting wake up time shows multiple sleep time options', () => {
    renderTool()
    // Default mode is 'wakeup' — should show bedtime suggestions
    expect(screen.getByText(/go to sleep at one of these times/i)).toBeInTheDocument()
  })

  it('selecting sleep time shows multiple wake up time options', async () => {
    const user = userEvent.setup()
    renderTool()
    await user.click(screen.getByRole('button', { name: /going to sleep at/i }))
    expect(screen.getByText(/best wake-up times/i)).toBeInTheDocument()
  })

  it('shows at least 4 time options', () => {
    renderTool()
    // getSleepTimes returns options for 3,4,5,6 cycles = 4 results
    const cycleTexts = screen.getAllByText(/cycles/)
    expect(cycleTexts.length).toBeGreaterThanOrEqual(4)
  })

  it('each option shows cycle count', () => {
    renderTool()
    expect(screen.getByText(/6 cycles/)).toBeInTheDocument()
    expect(screen.getByText(/5 cycles/)).toBeInTheDocument()
    expect(screen.getByText(/4 cycles/)).toBeInTheDocument()
    expect(screen.getByText(/3 cycles/)).toBeInTheDocument()
  })

  it('recommended option (5-6 cycles) is highlighted', () => {
    renderTool()
    // 5 and 6 cycle results have a "Recommended" badge
    const recommended = screen.getAllByText(/recommended/i)
    expect(recommended.length).toBeGreaterThanOrEqual(1)
  })

  it('times are in valid HH:MM AM/PM format', () => {
    renderTool()
    // Get all displayed times — they use toLocaleTimeString with hour12
    // Look for time-like text in the DOM
    const timeElements = document.querySelectorAll('span.font-bold.font-mono')
    expect(timeElements.length).toBeGreaterThan(0)
    timeElements.forEach((el) => {
      expect(TIME_REGEX.test(el.textContent.trim())).toBe(true)
    })
  })
})
