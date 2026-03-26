import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReadabilityScorer from '../../../tools/student/ReadabilityScorer.jsx'

describe('ReadabilityScorer', () => {
  it('renders the input and shows readability metrics and vocabulary stats for text', async () => {
    const user = userEvent.setup()
    render(<ReadabilityScorer />)

    const input = screen.getByPlaceholderText(/paste text to score readability/i)
    await user.type(input, 'The cat sat on the mat. The dog ran to the park.')

    expect(screen.getByText(/flesch reading ease/i)).toBeInTheDocument()
    expect(screen.getByText(/flesch-kincaid grade/i)).toBeInTheDocument()
    expect(screen.getByText(/gunning fog/i)).toBeInTheDocument()
    expect(screen.getByText(/overall grade/i)).toBeInTheDocument()
    expect(screen.getByText(/unique words/i)).toBeInTheDocument()
    expect(screen.getByText(/avg word length/i)).toBeInTheDocument()
    expect(screen.getByText(/aim for under 20/i)).toBeInTheDocument()
  })
})
