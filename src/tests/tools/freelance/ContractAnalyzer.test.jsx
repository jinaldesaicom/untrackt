import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import ContractAnalyzer from '../../../tools/freelance/ContractAnalyzer.jsx'

describe('ContractAnalyzer', () => {
  it('analyzes pasted text and shows metrics, keywords, and extracted data', async () => {
    const user = userEvent.setup()
    render(
      <HelmetProvider>
        <ContractAnalyzer />
      </HelmetProvider>
    )

    const input = screen.getByPlaceholderText(/paste contract or document text here/i)
    await user.type(input, 'THIS IS IMPORTANT. The cat owes $500 on January 1, 2025.')

    expect(screen.getByText(/^words$/i)).toBeInTheDocument()
    expect(screen.getByText(/read time/i)).toBeInTheDocument()
    expect(screen.getByText(/top keywords/i)).toBeInTheDocument()
    expect(screen.getByText(/all caps phrases/i)).toBeInTheDocument()
    expect(screen.getByText(/numbers & amounts/i)).toBeInTheDocument()
    expect(screen.getByText(/dates found/i)).toBeInTheDocument()
  })
})
