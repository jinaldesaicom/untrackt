import { render } from '@testing-library/react'
import ToolSkeleton from '../../components/ToolSkeleton.jsx'

describe('ToolSkeleton', () => {
  it('renders loading placeholder blocks with the pulse animation class', () => {
    const { container } = render(<ToolSkeleton />)

    const skeleton = container.firstChild
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('animate-pulse')
    expect(container.querySelectorAll('div').length).toBeGreaterThan(8)
  })
})
