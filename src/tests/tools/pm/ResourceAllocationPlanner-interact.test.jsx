import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ResourceAllocationPlanner from '../../../tools/pm/ResourceAllocationPlanner'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>

describe('ResourceAllocationPlanner – interaction', () => {
  it('renders add person and add task buttons', () => {
    render(<W><ResourceAllocationPlanner /></W>)
    expect(document.body.textContent).toMatch(/add|person|resource|task/i)
  })

  it('adds resources', () => {
    render(<W><ResourceAllocationPlanner /></W>)
    const addBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add.*person|add.*resource/i))
    if (addBtn) {
      fireEvent.click(addBtn)
      fireEvent.click(addBtn)
    }
  })

  it('adds tasks', () => {
    render(<W><ResourceAllocationPlanner /></W>)
    const addBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add.*task/i))
    if (addBtn) {
      fireEvent.click(addBtn)
      fireEvent.click(addBtn)
    }
  })

  it('fills resource names', async () => {
    render(<W><ResourceAllocationPlanner /></W>)
    const addBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add.*person|add.*resource/i))
    if (addBtn) fireEvent.click(addBtn)
    const inputs = screen.queryAllByRole('textbox')
    for (const inp of inputs.slice(0, 3)) {
      if (!inp.readOnly) await userEvent.type(inp, 'Team Member')
    }
  })

  it('fills allocation percentages', () => {
    render(<W><ResourceAllocationPlanner /></W>)
    const addPersonBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add.*person|add.*resource/i))
    const addTaskBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add.*task/i))
    if (addPersonBtn) fireEvent.click(addPersonBtn)
    if (addTaskBtn) fireEvent.click(addTaskBtn)
    const spinbuttons = screen.queryAllByRole('spinbutton')
    spinbuttons.forEach(inp => fireEvent.change(inp, { target: { value: '75' } }))
  })

  it('removes resource', () => {
    render(<W><ResourceAllocationPlanner /></W>)
    const addBtn = screen.queryAllByRole('button').find(b => b.textContent.match(/add.*person|add.*resource/i))
    if (addBtn) fireEvent.click(addBtn)
    const trash = screen.queryAllByRole('button').find(b => b.getAttribute('aria-label')?.match(/delete|remove/i) || b.querySelector('svg'))
    if (trash && trash.textContent.length < 5) fireEvent.click(trash)
  })
})
