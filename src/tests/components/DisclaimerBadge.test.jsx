import { render, screen } from '@testing-library/react'
import DisclaimerBadge from '../../components/DisclaimerBadge.jsx'

describe('DisclaimerBadge', () => {
  it('renders without crashing', () => {
    render(<DisclaimerBadge />)
  })

  it('shows privacy message text', () => {
    render(<DisclaimerBadge />)
    expect(screen.getByText(/100% private/i)).toBeInTheDocument()
    expect(screen.getByText(/no data is sent to any server/i)).toBeInTheDocument()
  })

  it('shows shield icon or privacy-related content', () => {
    const { container } = render(<DisclaimerBadge />)
    // The component wraps everything in a div with green styling
    const badge = container.firstChild
    expect(badge).toBeInTheDocument()
    // Strong tag for "100% private." is present
    const strong = container.querySelector('strong')
    expect(strong).toBeInTheDocument()
    expect(strong).toHaveTextContent('100% private.')
  })
})
