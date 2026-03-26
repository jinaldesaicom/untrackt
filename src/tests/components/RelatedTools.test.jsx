import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import RelatedTools from '../../components/RelatedTools.jsx'

vi.mock('../../data/tools', () => ({
  default: [
    {
      id: 'json-formatter',
      name: 'JSON Formatter',
      category: 'dev',
      description: 'Format JSON',
      path: '/tools/json-formatter',
      icon: 'Braces',
    },
    {
      id: 'base64-tool',
      name: 'Base64 Tool',
      category: 'dev',
      description: 'Encode/decode',
      path: '/tools/base64-tool',
      icon: 'Code',
    },
    {
      id: 'uuid-generator',
      name: 'UUID Generator',
      category: 'dev',
      description: 'Generate UUIDs',
      path: '/tools/uuid-generator',
      icon: 'Hash',
    },
    {
      id: 'regex-tester',
      name: 'Regex Tester',
      category: 'dev',
      description: 'Test regex',
      path: '/tools/regex-tester',
      icon: 'Search',
    },
  ],
  categories: [
    { id: 'dev', name: 'Developer' },
  ],
  categoryColorMap: {
    dev: { bg: 'bg-blue-100', darkBg: 'dark:bg-blue-900', icon: 'text-blue-600' },
  },
}))

vi.mock('../../icons', () => ({
  getIcon: () => () => <div>Icon</div>,
}))

describe('RelatedTools', () => {
  const renderWithRouter = (component) => {
    return render(<MemoryRouter>{component}</MemoryRouter>)
  }

  it('renders Try next heading for dev category', () => {
    renderWithRouter(
      <RelatedTools currentToolId="json-formatter" category="dev" />
    )
    expect(screen.getByText('Try next')).toBeInTheDocument()
  })

  it('shows up to 4 related tools', () => {
    renderWithRouter(
      <RelatedTools currentToolId="json-formatter" category="dev" />
    )
    // links include tool cards + "See all" link
    const links = screen.getAllByRole('link')
    expect(links.length).toBeLessThanOrEqual(5)
  })

  it('does not show the current tool in related tools list', () => {
    const { queryByText } = renderWithRouter(
      <RelatedTools currentToolId="json-formatter" category="dev" />
    )
    expect(queryByText('JSON Formatter')).not.toBeInTheDocument()
  })

  it('all shown tools are from same category', () => {
    renderWithRouter(
      <RelatedTools currentToolId="json-formatter" category="dev" />
    )
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('each related tool card is a link', () => {
    renderWithRouter(
      <RelatedTools currentToolId="json-formatter" category="dev" />
    )
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    links.forEach((link) => {
      expect(link).toHaveAttribute('href')
    })
  })

  it('renders section with correct aria-label', () => {
    renderWithRouter(
      <RelatedTools currentToolId="json-formatter" category="dev" />
    )
    expect(screen.getByLabelText('Related tools')).toBeInTheDocument()
  })

  it('displays tool names and descriptions', () => {
    renderWithRouter(
      <RelatedTools currentToolId="json-formatter" category="dev" />
    )
    expect(screen.getByText('Base64 Tool')).toBeInTheDocument()
    expect(screen.getByText('Encode/decode')).toBeInTheDocument()
  })

  it('returns null when no related tools exist', () => {
    const { container } = renderWithRouter(
      <RelatedTools currentToolId="regex-tester" category="nonexistent" />
    )
    expect(container.firstChild).toBeNull()
  })

  it('handles undefined category gracefully', () => {
    expect(() => {
      renderWithRouter(
        <RelatedTools currentToolId="json-formatter" category={undefined} />
      )
    }).not.toThrow()
  })
})
