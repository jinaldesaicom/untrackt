import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HttpStatusLookup from '../../../tools/dev/HttpStatusLookup.jsx'

describe('HttpStatusLookup', () => {
  it('renders the search input and the grouped full list by default', () => {
    render(<HttpStatusLookup />)

    expect(screen.getByPlaceholderText(/search by code or keyword/i)).toBeInTheDocument()
    expect(screen.getByText('2xx')).toBeInTheDocument()
    expect(screen.getByText('4xx')).toBeInTheDocument()
    expect(screen.getByText('OK')).toBeInTheDocument()
    expect(screen.getByText('Not Found')).toBeInTheDocument()
  })

  it('finds status codes and keywords and keeps class-based styling in the results', async () => {
    const user = userEvent.setup()
    render(<HttpStatusLookup />)

    const input = screen.getByPlaceholderText(/search by code or keyword/i)
    await user.type(input, '404')
    const notFound = screen.getByText('Not Found').closest('article')
    expect(notFound).toHaveClass('bg-orange-50')

    await user.clear(input)
    await user.type(input, '500')
    expect(screen.getByText('Internal Server Error')).toBeInTheDocument()

    await user.clear(input)
    await user.type(input, 'server error')
    expect(screen.getByText('Internal Server Error')).toBeInTheDocument()
  })
})
