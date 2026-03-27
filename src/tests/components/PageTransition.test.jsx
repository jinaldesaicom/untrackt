import { render } from '@testing-library/react'
import PageTransition from '../../components/PageTransition.jsx'

describe('PageTransition', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <PageTransition>
        <div>Test content</div>
      </PageTransition>
    )
    expect(getByText('Test content')).toBeInTheDocument()
  })

  it('applies fade-in animation class on mount', () => {
    const { container } = render(
      <PageTransition>
        <div>Content</div>
      </PageTransition>
    )
    const wrapper = container.firstChild
    expect(wrapper).toHaveClass('animate-page-in')
  })

  it('children are visible after render', () => {
    const { getByText } = render(
      <PageTransition>
        <div>Visible content</div>
      </PageTransition>
    )
    const content = getByText('Visible content')
    expect(content).toBeVisible()
  })

  it('does not crash with no children', () => {
    expect(() => {
      render(<PageTransition />)
    }).not.toThrow()
  })

  it('applies animation class to wrapper div', () => {
    const { container } = render(
      <PageTransition>
        <span>Test</span>
      </PageTransition>
    )
    const div = container.querySelector('div')
    expect(div.className).toContain('animate-page-in')
  })
})
