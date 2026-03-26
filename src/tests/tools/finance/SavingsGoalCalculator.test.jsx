import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import SavingsGoalCalculator from '../../../tools/finance/SavingsGoalCalculator.jsx'

describe('SavingsGoalCalculator', () => {
  beforeEach(() => {
    vi.spyOn(Number.prototype, 'toLocaleString').mockImplementation(function toLocaleString() {
      return String(this.valueOf())
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders savings goal inputs and progress outputs', () => {
    render(
      <HelmetProvider>
        <SavingsGoalCalculator />
      </HelmetProvider>
    )

    expect(screen.getByDisplayValue(/emergency fund/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add goal/i })).toBeInTheDocument()
    expect(screen.getByText(/overall progress/i)).toBeInTheDocument()
    expect(screen.getByText(/total monthly needed/i)).toBeInTheDocument()
  })
})
