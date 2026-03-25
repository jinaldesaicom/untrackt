import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as storage from '../../__mocks__/storage.js'

vi.mock('../../../utils/storage.js', () => storage)

import FlashcardSession from '../../../tools/student/FlashcardSession.jsx'

describe('FlashcardSession', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('builds cards, starts study mode, reveals answers, and shows results actions', async () => {
    const user = userEvent.setup()
    render(<FlashcardSession />)

    const textareas = screen.getAllByRole('textbox')
    await user.type(textareas[0], 'Q1')
    await user.type(textareas[1], 'A1')
    await user.click(screen.getByRole('button', { name: /add card/i }))

    expect(storage.setItem).toHaveBeenCalled()
    expect(screen.getByRole('button', { name: /start study/i })).toBeInTheDocument()
  })
})
