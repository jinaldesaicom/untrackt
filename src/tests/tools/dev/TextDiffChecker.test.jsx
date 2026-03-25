import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextDiffChecker from '../../../tools/dev/TextDiffChecker.jsx'

describe('TextDiffChecker', () => {
  it('renders both textareas, diff mode tabs, and copy controls', () => {
    render(<TextDiffChecker />)

    expect(screen.getByPlaceholderText(/original/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/modified/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /line-by-line/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /word-by-word/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy diff as text/i })).toBeInTheDocument()
  })

  it('shows zero additions and removals for identical input and detects word changes', async () => {
    const user = userEvent.setup()
    render(<TextDiffChecker />)

    const original = screen.getByPlaceholderText(/original/i)
    const modified = screen.getByPlaceholderText(/modified/i)
    await user.type(original, 'hello world')
    await user.type(modified, 'hello world')
    expect(screen.getByText(/0 added \| 0 removed/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /word-by-word/i }))
    await user.clear(modified)
    await user.type(modified, 'hello earth')
    expect(screen.getByText(/1 added \| 1 removed/i)).toBeInTheDocument()
    expect(screen.getByText('world')).toHaveClass('bg-red-100')
    expect(screen.getByText('earth')).toHaveClass('bg-green-100')
  })

  it('swaps both textareas when requested', async () => {
    const user = userEvent.setup()
    render(<TextDiffChecker />)

    const original = screen.getByPlaceholderText(/original/i)
    const modified = screen.getByPlaceholderText(/modified/i)
    await user.type(original, 'left side')
    await user.type(modified, 'right side')
    await user.click(screen.getByRole('button', { name: /swap/i }))

    expect(original).toHaveValue('right side')
    expect(modified).toHaveValue('left side')
  })
})
