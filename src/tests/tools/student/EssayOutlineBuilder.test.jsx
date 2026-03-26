import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as storage from '../../__mocks__/storage.js'

vi.mock('../../../utils/storage.js', () => storage)

import EssayOutlineBuilder from '../../../tools/student/EssayOutlineBuilder.jsx'

describe('EssayOutlineBuilder', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.confirm = vi.fn(() => true)
  })

  it('renders the outline sections, adds body paragraphs, and autosaves edits', async () => {
    const user = userEvent.setup()
    render(<EssayOutlineBuilder />)

    expect(screen.getAllByText(/introduction/i)[0]).toBeInTheDocument()
    expect(screen.getByText(/body paragraphs/i)).toBeInTheDocument()
    expect(screen.getAllByText(/conclusion/i)[0]).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/thesis statement/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/hook/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /add paragraph/i }))
    expect(screen.getAllByPlaceholderText(/topic sentence/i).length).toBeGreaterThan(1)

    await user.type(screen.getByPlaceholderText(/thesis statement/i), 'Privacy should be the default.')
    await act(async () => Promise.resolve())
    expect(storage.setItem).toHaveBeenCalled()
    expect(screen.getByText(/live outline preview/i)).toBeInTheDocument()
  })
})
