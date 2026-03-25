import { render, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import SEOHead from '../../components/SEOHead.jsx'

describe('SEOHead', () => {
  it('renders without crashing and writes title, description, and canonical tags', async () => {
    render(
      <HelmetProvider>
        <SEOHead
          title="Regex Tester | UnTrackt"
          description="Test regular expressions privately in your browser."
          path="/tools/regex-tester"
        />
      </HelmetProvider>
    )

    await waitFor(() => expect(document.title).toBe('Regex Tester | UnTrackt'))
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      'Test regular expressions privately in your browser.'
    )
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://untrackt.com/tools/regex-tester'
    )
  })
})
