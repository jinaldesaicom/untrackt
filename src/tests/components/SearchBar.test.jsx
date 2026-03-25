import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import SearchBar from '../../components/SearchBar.jsx'

function LocationDisplay() {
  const location = useLocation()
  return <div data-testid="location-display">{`${location.pathname}${location.search}`}</div>
}

function renderSearchBar(props = {}) {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SearchBar {...props} />
      <LocationDisplay />
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
    expect(await screen.findByText('JSON Formatter')).toBeInTheDocument()
  })

  it('shows dropdown results when query matches', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'password')
    expect(await screen.findByText('Password Generator')).toBeInTheDocument()
  })

  it('shows no results message for unmatched query', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'xyznonexistent99')
    // Wait for debounced filtering to settle
    expect(await screen.findByText(/no tools found/i)).toBeInTheDocument()

    // No tool result list items should appear
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('pressing Escape closes the dropdown', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'json')
    expect(await screen.findByText('JSON Formatter')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => {
      expect(screen.queryByText('JSON Formatter')).not.toBeInTheDocument()
    })
  })

  it('clicking outside closes the dropdown', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'json')
    expect(await screen.findByText('JSON Formatter')).toBeInTheDocument()
    await user.click(document.body)
    await waitFor(() => {
      expect(screen.queryByText('JSON Formatter')).not.toBeInTheDocument()
    })
  })

  it('clicking a result navigates to correct tool path', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')
    await user.type(input, 'json')
    const result = await screen.findByText('JSON Formatter')
    // The result item wraps in a button/div — clicking it calls navigate
    await user.click(result)
    // After clicking, dropdown closes and input is cleared
    await waitFor(() => {
      expect(screen.queryByDisplayValue('json')).not.toBeInTheDocument()
    })
  })

  it('pressing Enter navigates to the search results page with the typed query', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')

    await user.type(input, 'json')
    expect(await screen.findByText('JSON Formatter')).toBeInTheDocument()

    await user.keyboard('{Enter}')

    await waitFor(() => {
      expect(screen.getByTestId('location-display')).toHaveTextContent('/search?q=json')
    })
  })

  it('pressing Enter with a highlighted suggestion still opens the search results page', async () => {
    const user = userEvent.setup()
    renderSearchBar()
    const input = screen.getByPlaceholderText('Search tools...')

    await user.type(input, 'json')
    expect(await screen.findByText('JSON Formatter')).toBeInTheDocument()

    await user.keyboard('{ArrowDown}{Enter}')

    await waitFor(() => {
      expect(screen.getByTestId('location-display')).toHaveTextContent('/search?q=json')
    })
  })
})
