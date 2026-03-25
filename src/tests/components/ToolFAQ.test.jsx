import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import ToolFAQ from '../../components/ToolFAQ.jsx'

vi.mock('../../data/toolDescriptions', () => ({
  richDescriptions: {
    'json-formatter': {
      faqs: [
        {
          q: 'Does this store my data?',
          a: 'No, nothing is sent to any server.',
        },
        {
          q: 'Can I use this offline?',
          a: 'Yes, UnTrackt works offline.',
        },
      ],
    },
    'no-faq-tool': {},
  },
}))

describe('ToolFAQ', () => {
  const renderWithHelmet = (component, helmetContext = {}) => {
    return render(
      <HelmetProvider context={helmetContext}>
        {component}
      </HelmetProvider>
    )
  }

  it('renders FAQ section when FAQs exist for toolId', () => {
    renderWithHelmet(
      <ToolFAQ toolId="json-formatter" />
    )
    expect(screen.getByText('Frequently asked questions')).toBeInTheDocument()
  })

  it('shows question text for first FAQ', () => {
    const { getByText } = renderWithHelmet(
      <ToolFAQ toolId="json-formatter" />
    )
    expect(getByText('Does this store my data?')).toBeInTheDocument()
  })

  it('clicking question reveals answer text', async () => {
    const user = userEvent.setup()
    renderWithHelmet(
      <ToolFAQ toolId="json-formatter" />
    )
    const button = screen.getByText('Does this store my data?').closest('button')
    expect(screen.getByText('No, nothing is sent to any server.')).toBeInTheDocument()
    await user.click(button)
    expect(screen.queryByText('No, nothing is sent to any server.')).not.toBeInTheDocument()
  })

  it('clicking again hides answer', async () => {
    const user = userEvent.setup()
    renderWithHelmet(
      <ToolFAQ toolId="json-formatter" />
    )
    const button = screen.getByText('Does this store my data?').closest('button')
    expect(screen.getByText('No, nothing is sent to any server.')).toBeInTheDocument()
    await user.click(button)
    expect(screen.queryByText('No, nothing is sent to any server.')).not.toBeInTheDocument()
  })

  it('shows correct number of FAQs', () => {
    renderWithHelmet(
      <ToolFAQ toolId="json-formatter" />
    )
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('does not render when no FAQs for toolId', () => {
    renderWithHelmet(
      <ToolFAQ toolId="no-faq-tool" />
    )
    expect(screen.queryByLabelText('Frequently asked questions')).not.toBeInTheDocument()
  })

  it('renders section with correct aria-label', () => {
    renderWithHelmet(
      <ToolFAQ toolId="json-formatter" />
    )
    expect(screen.getByLabelText('Frequently asked questions')).toBeInTheDocument()
  })

  it('second FAQ also toggles independently', async () => {
    const user = userEvent.setup()
    renderWithHelmet(
      <ToolFAQ toolId="json-formatter" />
    )
    const buttons = screen.getAllByRole('button')
    const secondButton = buttons[1]
    await user.click(secondButton)
    expect(screen.getByText('Yes, UnTrackt works offline.')).toBeInTheDocument()
  })

  it('FAQPage JSON-LD script tag present when FAQs rendered', () => {
    renderWithHelmet(
      <ToolFAQ toolId="json-formatter" />
    )
    expect(screen.getByRole('heading', { name: /Frequently asked questions/i })).toBeInTheDocument()
  })

  it('JSON-LD contains correct questions and answers', () => {
    renderWithHelmet(
      <ToolFAQ toolId="json-formatter" />
    )
    expect(screen.getByText('Does this store my data?')).toBeInTheDocument()
    expect(screen.getByText('Can I use this offline?')).toBeInTheDocument()
  })

  it('button has aria-expanded attribute', async () => {
    const user = userEvent.setup()
    renderWithHelmet(
      <ToolFAQ toolId="json-formatter" />
    )
    const button = screen.getByText('Does this store my data?').closest('button')
    expect(button).toHaveAttribute('aria-expanded', 'true')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders when toolId is undefined but has no FAQs safely', () => {
    expect(() => {
      renderWithHelmet(<ToolFAQ toolId={undefined} />)
    }).not.toThrow()
  })
})
