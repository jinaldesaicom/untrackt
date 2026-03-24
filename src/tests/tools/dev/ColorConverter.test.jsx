import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as storage from '../../__mocks__/storage.js'

vi.mock('../../../utils/storage.js', () => storage)

import ColorConverter from '../../../tools/dev/ColorConverter.jsx'

describe('ColorConverter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn() },
      configurable: true,
    })
  })

  it('renders the color input, preview swatch, and converted outputs', () => {
    const { container } = render(<ColorConverter />)

    expect(screen.getByPlaceholderText(/hex, rgb, hsl, hsv, or css name/i)).toBeInTheDocument()
    expect(container.querySelector('input[type="color"]')).toBeInTheDocument()
    expect(container.querySelector('.h-24')).toBeInTheDocument()
    expect(screen.getByText(/^hex$/i)).toBeInTheDocument()
    expect(screen.getByText(/^rgb$/i)).toBeInTheDocument()
    expect(screen.getByText(/^hsl$/i)).toBeInTheDocument()
  })

  it('converts hex and rgb values and shows contrast guidance', async () => {
    const user = userEvent.setup()
    render(<ColorConverter />)

    const mainInput = screen.getByPlaceholderText(/hex, rgb, hsl, hsv, or css name/i)
    await user.clear(mainInput)
    await user.type(mainInput, '#ff0000')

    expect(screen.getByText('rgb(255, 0, 0)')).toBeInTheDocument()
    expect(screen.getByText(/hsl\(0, 100%, 50%\)/i)).toBeInTheDocument()

    await user.clear(mainInput)
    await user.type(mainInput, 'rgb(255, 0, 0)')
    expect(screen.getByText('#ff0000')).toBeInTheDocument()

    const secondColor = screen.getByPlaceholderText(/second color/i)
    await user.clear(secondColor)
    await user.type(secondColor, '#000000')
    expect(screen.getByText(/contrast ratio:/i)).toBeInTheDocument()
    expect(screen.getByText(/aa normal text:/i)).toBeInTheDocument()
  })
})
