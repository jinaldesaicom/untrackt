import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as storage from '../../__mocks__/storage.js'

vi.mock('../../../utils/storage.js', () => storage)

import CssGradientGenerator from '../../../tools/dev/CssGradientGenerator.jsx'

describe('CssGradientGenerator', () => {
  it('renders default color stops, gradient type controls, preview, and preset gallery', () => {
    const { container } = render(<CssGradientGenerator />)

    expect(container.querySelectorAll('input[type="color"]').length).toBeGreaterThanOrEqual(2)
    expect(screen.getByRole('button', { name: /linear/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /radial/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /copy css/i })).toBeInTheDocument()
    expect(screen.getByText(/preset gallery/i)).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /sunset|ocean|forest|candy|cool|royal|peach/i }).length).toBeGreaterThanOrEqual(6)
  })

  it('adds and removes color stops and loads a preset into the css output', async () => {
    const user = userEvent.setup()
    const { container } = render(<CssGradientGenerator />)

    await user.click(screen.getByRole('button', { name: /add color stop/i }))
    expect(container.querySelectorAll('input[type="color"]').length).toBeGreaterThanOrEqual(3)

    await user.click(screen.getAllByRole('button', { name: /remove/i })[2])
    expect(container.querySelectorAll('input[type="color"]').length).toBe(2)

    await user.click(screen.getByRole('button', { name: /sunset/i }))
    expect(screen.getByRole('textbox').value).toContain('#ff7e5f')
  })
})
