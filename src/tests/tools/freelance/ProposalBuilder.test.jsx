import { render, screen, act } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import * as storage from '../../__mocks__/storage.js'

vi.mock('../../../utils/storage.js', () => storage)

import ProposalBuilder from '../../../tools/freelance/ProposalBuilder.jsx'

describe('ProposalBuilder', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    window.print = vi.fn()
    window.confirm = vi.fn(() => true)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders proposal sections and autosaves content', async () => {
    render(
      <HelmetProvider>
        <ProposalBuilder />
      </HelmetProvider>
    )

    expect(screen.getByText(/executive summary/i)).toBeInTheDocument()
    expect(screen.getByText(/problem statement/i)).toBeInTheDocument()
    expect(screen.getByText(/scope of work/i)).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText(/write your executive summary/i), {
      target: { value: 'Custom summary' },
    })

    await act(async () => {
      vi.advanceTimersByTime(3000)
    })

    expect(storage.setItem).toHaveBeenCalled()
  })
})
