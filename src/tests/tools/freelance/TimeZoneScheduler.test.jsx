import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import TimeZoneScheduler from '../../../tools/freelance/TimeZoneScheduler.jsx'

describe('TimeZoneScheduler', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      configurable: true,
    })
  })

  it('renders saved zones, overlap output, and share controls', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <TimeZoneScheduler />
      </HelmetProvider>
    )

    expect(screen.getByText(/time zones/i)).toBeInTheDocument()
    expect(screen.getByText(/24-hour timeline/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy full schedule/i })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /add zone/i }))
    expect(screen.getByText(/best meeting times found|no overlap found/i)).toBeInTheDocument()
  })
})
