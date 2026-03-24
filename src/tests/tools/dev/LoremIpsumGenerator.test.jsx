import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoremIpsumGenerator from '../../../tools/dev/LoremIpsumGenerator.jsx'

describe('LoremIpsumGenerator', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      configurable: true,
    })
  })

  it('renders the controls, generates output, and displays copy and regenerate actions', () => {
    render(<LoremIpsumGenerator />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^copy$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /regenerate/i })).toBeInTheDocument()
    expect(screen.getByText(/word count:/i)).toBeInTheDocument()
    expect(screen.getAllByRole('textbox')[1].value.length).toBeGreaterThan(0)
  })

  it('supports word counts, classic opening control, and html tag output', async () => {
    const user = userEvent.setup()
    render(<LoremIpsumGenerator />)

    const [typeSelect, countInput] = [screen.getByRole('combobox'), screen.getByRole('spinbutton')]
    await user.selectOptions(typeSelect, 'words')
    await user.clear(countInput)
    await user.type(countInput, '5')
    await user.click(screen.getByLabelText(/start with "lorem ipsum/i))

    const output = screen.getAllByRole('textbox')[1]
    expect(output.value.trim().split(/\s+/)).toHaveLength(5)

    await user.selectOptions(typeSelect, 'paragraphs')
    await user.click(screen.getByLabelText(/include html tags/i))
    expect(output.value).toContain('<p>')
  })
})
