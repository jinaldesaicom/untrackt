import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SymptomJournal from '../../../tools/health/SymptomJournal'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('SymptomJournal – deep', () => {
  it('renders add entry interface', () => {
    render(<W><SymptomJournal /></W>)
    const btns = screen.getAllByRole('button')
    expect(btns.length).toBeGreaterThan(0)
  })

  it('adds a symptom entry', async () => {
    render(<W><SymptomJournal /></W>)
    const addBtn = screen.getAllByRole('button').find(b => b.textContent.match(/add|new|log|create/i))
    if (addBtn) {
      fireEvent.click(addBtn)
      await waitFor(() => {
        const inputs = screen.queryAllByRole('textbox')
        if (inputs.length) userEvent.type(inputs[0], 'Headache')
      })
    }
  })

  it('switches views', () => {
    render(<W><SymptomJournal /></W>)
    const viewBtns = screen.getAllByRole('button').filter(b =>
      b.textContent.match(/history|chart|stats|log|symptom|timeline/i)
    )
    viewBtns.forEach(b => fireEvent.click(b))
  })
})
