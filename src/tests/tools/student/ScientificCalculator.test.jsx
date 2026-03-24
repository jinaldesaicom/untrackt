import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as storage from '../../__mocks__/storage.js'

vi.mock('../../../utils/storage.js', () => storage)

import ScientificCalculator from '../../../tools/student/ScientificCalculator.jsx'

describe('ScientificCalculator', () => {
  it('renders digit, operator, memory, and history controls', () => {
    render(<ScientificCalculator />)

    expect(screen.getByRole('button', { name: '0' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '9' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'M+' })).toBeInTheDocument()
    expect(screen.getByText(/history/i)).toBeInTheDocument()
  })
})
