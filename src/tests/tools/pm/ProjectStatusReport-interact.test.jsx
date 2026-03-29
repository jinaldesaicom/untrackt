import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ProjectStatusReport from '../../../tools/pm/ProjectStatusReport'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('ProjectStatusReport – interaction', () => {
  it('renders project name and date inputs', () => {
    render(<W><ProjectStatusReport /></W>)
    const inputs = screen.queryAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
  })

  it('fills project name', async () => {
    render(<W><ProjectStatusReport /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Project Alpha')
  })

  it('clicks RAG status buttons', () => {
    render(<W><ProjectStatusReport /></W>)
    const btns = screen.queryAllByRole('button')
    const ragBtns = btns.filter(b => b.textContent.match(/🟢|🟡|🔴|green|amber|red/i))
    ragBtns.forEach(b => fireEvent.click(b))
  })

  it('fills textareas', () => {
    render(<W><ProjectStatusReport /></W>)
    const textareas = document.querySelectorAll('textarea')
    Array.from(textareas).forEach((ta, i) => {
      fireEvent.change(ta, { target: { value: ['Key update item ' + i, 'Risk item ' + i, 'Next step ' + i][i] || 'Content' } })
    })
  })

  it('copies report', () => {
    render(<W><ProjectStatusReport /></W>)
    const copyBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/copy/i) || b.getAttribute('aria-label')?.match(/copy/i))
    if (copyBtn) fireEvent.click(copyBtn)
  })

  it('exports report', () => {
    render(<W><ProjectStatusReport /></W>)
    const exportBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/export|download/i))
    if (exportBtn) fireEvent.click(exportBtn)
  })

  it('resets report', () => {
    render(<W><ProjectStatusReport /></W>)
    const resetBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/reset|clear/i))
    if (resetBtn) fireEvent.click(resetBtn)
  })
})
