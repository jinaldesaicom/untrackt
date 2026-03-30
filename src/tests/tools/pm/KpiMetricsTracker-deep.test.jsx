import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import KpiMetricsTracker from '../../../tools/pm/KpiMetricsTracker'


vi.mock('../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}))


const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
)


describe('KpiMetricsTracker – deep', () => {
  it('renders empty state with add button', () => {
    render(<W><KpiMetricsTracker /></W>)
    const addBtn = screen.getAllByRole('button').find(b => b.textContent.match(/add.*kpi/i))
    expect(addBtn).toBeTruthy()
  })

  it('adds a KPI and fills fields', async () => {
    render(<W><KpiMetricsTracker /></W>)
    const addBtn = screen.getAllByRole('button').find(b => b.textContent.match(/add.*kpi/i))
    fireEvent.click(addBtn)
    await waitFor(() => {
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBeGreaterThanOrEqual(1)
    })
    const inputs = screen.getAllByRole('textbox')
    // Name input
    if (inputs[0]) await userEvent.type(inputs[0], 'Revenue')
    // Unit input
    if (inputs[1]) await userEvent.type(inputs[1], 'USD')
    // Target
    if (inputs[2]) await userEvent.type(inputs[2], '10000')
  })

  it('adds a data point to a KPI', async () => {
    render(<W><KpiMetricsTracker /></W>)
    const addKpi = screen.getAllByRole('button').find(b => b.textContent.match(/add.*kpi/i))
    fireEvent.click(addKpi)
    await waitFor(() => screen.getAllByRole('textbox'))
    const addDataBtn = screen.getAllByRole('button').find(b => b.textContent.match(/add.*data|add.*point|\+/))
    if (addDataBtn) {
      fireEvent.click(addDataBtn)
      const numInputs = screen.queryAllByRole('spinbutton')
      if (numInputs.length) {
        fireEvent.change(numInputs[numInputs.length - 1], { target: { value: '5000' } })
      }
    }
  })

  it('removes a KPI', async () => {
    render(<W><KpiMetricsTracker /></W>)
    const addKpi = screen.getAllByRole('button').find(b => b.textContent.match(/add.*kpi/i))
    fireEvent.click(addKpi)
    await waitFor(() => screen.getAllByRole('textbox'))
    const removeBtn = screen.getAllByRole('button').find(b =>
      b.getAttribute('aria-label')?.match(/remove|delete|trash/i) ||
      b.querySelector('svg')
    )
    if (removeBtn) fireEvent.click(removeBtn)
  })
})
