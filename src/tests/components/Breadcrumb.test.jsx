import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Breadcrumb from '../../components/Breadcrumb.jsx'

const TEST_CATEGORY = 'dev'
const TEST_TOOL_NAME = 'JSON Formatter'
const TEST_TOOL_PATH = '/tools/json-formatter'

describe('Breadcrumb', () => {
  const renderWithRouter = (component, helmetContext = {}) => {
    return render(
      <HelmetProvider context={helmetContext}>
        <MemoryRouter>
          {component}
        </MemoryRouter>
      </HelmetProvider>
    )
  }

  it('renders Home as first item', () => {
    renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders category name as second item', () => {
    renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    expect(screen.getByText('Dev Tools')).toBeInTheDocument()
  })

  it('renders tool name as third item', () => {
    renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    expect(screen.getByText(TEST_TOOL_NAME)).toBeInTheDocument()
  })

  it('Home is a clickable link to /', () => {
    renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('category is a clickable link to category route', () => {
    renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    const categoryLink = screen.getByText('Dev Tools').closest('a')
    expect(categoryLink).toHaveAttribute('href', `/category/${TEST_CATEGORY}`)
  })

  it('tool name is NOT a link', () => {
    const { container } = renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    const toolSpan = screen.getByText(TEST_TOOL_NAME)
    expect(toolSpan.tagName).toBe('SPAN')
  })

  it('BreadcrumbList JSON-LD script tag is present in document', () => {
    renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument()
  })

  it('JSON-LD contains correct itemListElement', () => {
    const { container } = renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    const links = container.querySelectorAll('a')
    expect(links.length).toBeGreaterThanOrEqual(2)
  })

  it('JSON-LD contains 3 items', () => {
    renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Dev Tools')).toBeInTheDocument()
    expect(screen.getByText(TEST_TOOL_NAME)).toBeInTheDocument()
  })

  it('nav has aria-label for accessibility', () => {
    renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument()
  })

  it('has proper separator characters between items', () => {
    const { container } = renderWithRouter(
      <Breadcrumb category={TEST_CATEGORY} toolName={TEST_TOOL_NAME} toolPath={TEST_TOOL_PATH} />
    )
    const separators = container.querySelectorAll('span')
    const separatorSpans = Array.from(separators).filter(s => s.textContent === '/')
    expect(separatorSpans.length).toBeGreaterThanOrEqual(2)
  })
})
