import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SvgOptimizer from '../../../tools/dev/SvgOptimizer.jsx'

describe('SvgOptimizer', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      configurable: true,
    })
  })

  it('renders the svg input, optimize button, output stats, copy button, and preview', () => {
    render(<SvgOptimizer />)

    expect(screen.getByPlaceholderText(/paste raw svg/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /optimize/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy output/i })).toBeInTheDocument()
    expect(screen.getByText(/preview/i)).toBeInTheDocument()
  })

  it('removes comments and reports a reduction after optimization', async () => {
    const user = userEvent.setup()
    render(<SvgOptimizer />)

    const input = screen.getByPlaceholderText(/paste raw svg/i)
    await user.clear(input)
    await user.type(input, '<svg><!-- comment --><path d="M0 0" />   </svg>')
    await user.click(screen.getByRole('button', { name: /optimize/i }))

    const output = screen.getAllByRole('textbox')[1]
    expect(output.value).not.toContain('comment')
    expect(screen.getByText(/reduction:/i)).toBeInTheDocument()
  })
})
