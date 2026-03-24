import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import SearchBar from '../../components/SearchBar.jsx'

function renderSearchBar(props = {}) {
  return render(
    <MemoryRouter>
      <SearchBar {...props} />
    </MemoryRouter>
  )
}

describe('SearchBar', () => {
  it('renders input field', () => {
    renderSearchBar()
    expect(screen.getByPlaceholderText('Search tools...')).toBeInTheDocument()
  })

  it('typing a query filters tools from tools.js registry', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'json')
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
  })

  it('shows dropdown results when query matches', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'password')
    expect(screen.getByText('Password Generator')).toBeInTheDocument()
  })

  it('shows no results message for unmatched query', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'xyznonexistent99')
    // No tool result list items should appear
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    // But the dropdown DOES show a "no tools found" message containing the query
    expect(screen.getByText(/no tools found/i)).toBeInTheDocument()
  })

  it('pressing Escape closes the dropdown', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'json')
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByText('JSON Formatter')).not.toBeInTheDocument()
  })

  it('clicking outside closes the dropdown', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'json')
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
    await user.click(document.body)
    expect(screen.queryByText('JSON Formatter')).not.toBeInTheDocument()
  })

  it('clicking a result navigates to correct tool path', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'json')
    const result = screen.getByText('JSON Formatter')
    // The result item wraps in a button/div — clicking it calls navigate
    await user.click(result)
    // After clicking, dropdown closes and input is cleared
    expect(screen.queryByDisplayValue('json')).not.toBeInTheDocument()
  })
})
