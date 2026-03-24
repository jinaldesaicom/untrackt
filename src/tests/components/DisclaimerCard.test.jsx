import { render, screen } from '@testing-library/react'
import DisclaimerCard from '../../components/DisclaimerCard.jsx'

describe('DisclaimerCard', () => {
  it('renders the finance, legal, and health warnings with an icon', () => {
    const finance = render(<DisclaimerCard type="finance" />)
    expect(screen.getByText(/not financial advice/i)).toBeInTheDocument()
    expect(finance.container.querySelector('svg')).toBeInTheDocument()
    finance.unmount()

    render(<DisclaimerCard type="legal" />)
    expect(screen.getByText(/does not provide legal advice/i)).toBeInTheDocument()

    render(<DisclaimerCard type="health" />)
    expect(screen.getByText(/not medical advice/i)).toBeInTheDocument()
  })
})
