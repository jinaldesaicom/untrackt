import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HtmlEntityEncoder from '../../../tools/dev/HtmlEntityEncoder.jsx'

describe('HtmlEntityEncoder', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      configurable: true,
    })
  })

  it('starts in encode mode and updates the output in real time', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityEncoder />)

    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], '<h1>Hello & World</h1>')

    expect(screen.getByRole('button', { name: /^encode$/i })).toBeInTheDocument()
    expect(inputs[1]).toHaveValue('&lt;h1&gt;Hello &amp; World&lt;/h1&gt;')
    expect(screen.getByRole('button', { name: /copy output/i })).toBeInTheDocument()
    expect(screen.getByText(/common entities/i)).toBeInTheDocument()
  })

  it('switches to decode mode and decodes named and numeric entities', async () => {
    const user = userEvent.setup()
    render(<HtmlEntityEncoder />)

    await user.click(screen.getByRole('button', { name: /^decode$/i }))
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], '&lt;&#65;&gt;')

    expect(inputs[1]).toHaveValue('<A>')
  })
})
