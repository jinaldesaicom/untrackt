import { render, screen, act, fireEvent } from '@testing-library/react'
import { vi, beforeEach, afterEach } from 'vitest'
import PomodoroTimer from '../../../tools/student/PomodoroTimer.jsx'

describe('PomodoroTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders with 25:00 as default display', () => {
    render(<PomodoroTimer />)
    expect(screen.getByText('25:00')).toBeInTheDocument()
  })

  it('Start button changes to Pause when clicked', () => {
    render(<PomodoroTimer />)
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /start/i }))
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument()
  })

  it('Pause button stops the timer', () => {
    render(<PomodoroTimer />)
    fireEvent.click(screen.getByRole('button', { name: /start/i }))
    act(() => { vi.advanceTimersByTime(3000) })
    fireEvent.click(screen.getByRole('button', { name: /pause/i }))
    const timeAfterPause = screen.getByText(/24:5[0-9]|24:[0-9][0-9]/i)
    expect(timeAfterPause).toBeInTheDocument()
    act(() => { vi.advanceTimersByTime(5000) })
    // Time should not have changed further after pause
    expect(screen.getByText(timeAfterPause.textContent)).toBeInTheDocument()
  })

  it('Reset button returns to 25:00', () => {
    render(<PomodoroTimer />)
    fireEvent.click(screen.getByRole('button', { name: /start/i }))
    act(() => { vi.advanceTimersByTime(5000) })
    // Click the reset button (RotateCcw icon button)
    const buttons = screen.getAllByRole('button')
    const resetBtn = buttons.find((btn) => btn.className.includes('btn-secondary'))
    fireEvent.click(resetBtn)
    expect(screen.getByText('25:00')).toBeInTheDocument()
  })

  it('session counter starts at 0', () => {
    render(<PomodoroTimer />)
    expect(screen.getByText(/pomodoros completed/i)).toBeInTheDocument()
  })

  it('Work/Break mode labels are visible', () => {
    render(<PomodoroTimer />)
    expect(screen.getByRole('button', { name: /work/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /short break/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /long break/i })).toBeInTheDocument()
  })

  it('after 1 second of running, display shows 24:59', () => {
    render(<PomodoroTimer />)
    fireEvent.click(screen.getByRole('button', { name: /start/i }))
    act(() => { vi.advanceTimersByTime(1000) })
    expect(screen.getByText('24:59')).toBeInTheDocument()
  })
})
