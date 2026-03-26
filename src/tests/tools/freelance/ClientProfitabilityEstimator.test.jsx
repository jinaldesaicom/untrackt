import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import ClientProfitabilityEstimator from '../../../tools/freelance/ClientProfitabilityEstimator.jsx'

describe('ClientProfitabilityEstimator', () => {
  it('renders the client form and adds clients to the comparison list', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <ClientProfitabilityEstimator />
      </HelmetProvider>
    )

    await user.click(screen.getByRole('button', { name: /add client/i }))
    expect(screen.getByText(/client comparison/i)).toBeInTheDocument()
    expect(screen.getByText(/effective rate/i)).toBeInTheDocument()
  })
})
