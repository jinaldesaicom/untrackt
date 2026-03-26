import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuadraticSolver from '../../../tools/student/QuadraticSolver.jsx'

describe('QuadraticSolver', () => {
  it('shows roots, discriminant details, vertex, and graph output', async () => {
    const user = userEvent.setup()
    const { container } = render(<QuadraticSolver />)

    const inputs = screen.getAllByRole('textbox')
    await user.clear(inputs[0])
    await user.type(inputs[0], '1')
    await user.clear(inputs[1])
    await user.type(inputs[1], '-5')
    await user.clear(inputs[2])
    await user.type(inputs[2], '6')

    expect(screen.getByText(/discriminant/i)).toBeInTheDocument()
    expect(screen.getByText(/2 real roots/i)).toBeInTheDocument()
    expect(screen.getByText(/root 1:/i)).toHaveTextContent('3.0000')
    expect(screen.getByText(/root 2:/i)).toHaveTextContent('2.0000')
    expect(screen.getByText(/vertex/i)).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
