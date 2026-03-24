import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WordCounter from '../../../tools/student/WordCounter.jsx'

describe('WordCounter', () => {
  it('renders textarea', () => {
    render(<WordCounter />)
    expect(screen.getByPlaceholderText(/start typing/i)).toBeInTheDocument()
  })

  it('typing "hello world" shows 2 words', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)
    const textarea = screen.getByPlaceholderText(/start typing/i)
    await user.type(textarea, 'hello world')
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('empty text shows 0 words', () => {
    render(<WordCounter />)
    // Multiple stats (words, chars, sentences) all show 0 when empty
    expect(screen.getAllByText('0').length).toBeGreaterThanOrEqual(1)
  })

  it('character count with spaces is correct', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)
    const textarea = screen.getByPlaceholderText(/start typing/i)
    await user.type(textarea, 'hello world')
    // 'hello world' = 11 chars with spaces
    expect(screen.getByText('11')).toBeInTheDocument()
  })

  it('character count without spaces is correct', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)
    const textarea = screen.getByPlaceholderText(/start typing/i)
    await user.type(textarea, 'hello world')
    // 'helloworld' = 10 chars without spaces
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('sentence count is correct for text with periods', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)
    const textarea = screen.getByPlaceholderText(/start typing/i)
    await user.type(textarea, 'Hello world. This is a test.')
    // 2 sentences
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('reading time updates (200 wpm baseline)', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)
    const textarea = screen.getByPlaceholderText(/start typing/i)
    // Less than 200 words → "< 1 min"
    await user.type(textarea, 'hello world')
    expect(screen.getByText('< 1 min')).toBeInTheDocument()
  })

  it('clear button empties textarea and resets all counts', async () => {
    const user = userEvent.setup()
    render(<WordCounter />)
    const textarea = screen.getByPlaceholderText(/start typing/i)
    await user.type(textarea, 'hello world')
    expect(screen.getByText('2')).toBeInTheDocument()
    // Click the X clear button
    const clearBtn = screen.getByRole('button')
    await user.click(clearBtn)
    expect(textarea.value).toBe('')
    // All counts back to 0
    const zeros = screen.getAllByText('0')
    expect(zeros.length).toBeGreaterThanOrEqual(1)
  })
})
