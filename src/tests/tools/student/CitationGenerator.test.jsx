import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as storage from '../../__mocks__/storage.js'

vi.mock('../../../utils/storage.js', () => storage)

import CitationGenerator from '../../../tools/student/CitationGenerator.jsx'

describe('CitationGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      configurable: true,
    })
  })

  it('renders the citation styles, source selector, and reference list actions', () => {
    render(<CitationGenerator />)

    expect(screen.getByRole('button', { name: /apa/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /mla/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /chicago/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add to list/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /export list/i })).toBeInTheDocument()
  })
})
