import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import ToolCard from '../../components/ToolCard.jsx'

const mockTool = {
  id: 'json-formatter',
  name: 'JSON Formatter',
  description: 'Validate and prettify JSON instantly',
  category: 'dev',
  icon: 'Braces',
  path: '/tools/json-formatter',
  tags: ['json', 'format'],
}

function renderCard(tool = mockTool) {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToolCard tool={tool} />
    </MemoryRouter>
  )
}

describe('ToolCard', () => {
  it('renders tool name correctly', () => {
    renderCard()
    expect(screen.getByText('JSON Formatter')).toBeInTheDocument()
  })

  it('renders tool description correctly', () => {
    renderCard()
    expect(screen.getByText('Validate and prettify JSON instantly')).toBeInTheDocument()
  })

  it('renders category badge', () => {
    renderCard()
    expect(screen.getByText('dev')).toBeInTheDocument()
  })

  it('clicking the card navigates to correct path', () => {
    renderCard()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/tools/json-formatter')
  })
})
