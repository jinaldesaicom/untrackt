import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home } from 'lucide-react'
import EmptyState from '../../components/EmptyState.jsx'

describe('EmptyState', () => {
  it('renders title text', () => {
    render(
      <EmptyState
        title="No results"
        description="Try searching for something else"
      />
    )
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(
      <EmptyState
        title="Empty"
        description="Nothing here to show"
      />
    )
    expect(screen.getByText('Nothing here to show')).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    const { container } = render(
      <EmptyState
        icon={Home}
        title="Home"
        description="Welcome"
      />
    )
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders action button when action prop provided', () => {
    render(
      <EmptyState
        title="Empty"
        description="Create new item"
        action={{ label: 'Create', onClick: () => {} }}
      />
    )
    expect(screen.getByText('Create')).toBeInTheDocument()
  })

  it('clicking action button calls action.onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <EmptyState
        title="Empty"
        description="Test"
        action={{ label: 'Click me', onClick }}
      />
    )
    await user.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalled()
  })

  it('does not render button when no action prop provided', () => {
    render(
      <EmptyState
        title="Empty"
        description="No action"
      />
    )
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('icon has styling classes applied', () => {
    const { container } = render(
      <EmptyState
        icon={Home}
        title="Test"
        description="With icon"
      />
    )
    const icon = container.querySelector('svg')
    expect(icon).toHaveClass('h-12', 'w-12')
  })

  it('renders without crashing when icon not provided', () => {
    expect(() => {
      render(
        <EmptyState
          title="No icon"
          description="Just text"
        />
      )
    }).not.toThrow()
  })

  it('title is a heading element', () => {
    const { container } = render(
      <EmptyState
        title="My Title"
        description="Description"
      />
    )
    expect(container.querySelector('h2')).toHaveTextContent('My Title')
  })

  it('renders description in paragraph', () => {
    const { container } = render(
      <EmptyState
        title="Title"
        description="My description"
      />
    )
    expect(container.querySelector('p')).toHaveTextContent('My description')
  })
})
