import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ToolGrid from '../../components/ToolGrid.jsx';

const mockTools = [
  { id: 'tool-a', name: 'Tool A', path: '/tools/a', description: 'Desc A', category: 'dev', icon: 'Code', tags: [] },
  { id: 'tool-b', name: 'Tool B', path: '/tools/b', description: 'Desc B', category: 'dev', icon: 'Code', tags: [] },
  { id: 'tool-c', name: 'Tool C', path: '/tools/c', description: 'Desc C', category: 'dev', icon: 'Code', tags: [] },
  { id: 'tool-d', name: 'Tool D', path: '/tools/d', description: 'Desc D', category: 'dev', icon: 'Code', tags: [] },
];

describe('ToolGrid', () => {
  it('renders empty state when tools is empty', () => {
    render(<MemoryRouter><ToolGrid tools={[]} /></MemoryRouter>);
    expect(screen.getByText(/no tools found/i)).toBeInTheDocument();
  });

  it('renders empty state for null/undefined tools', () => {
    render(<MemoryRouter><ToolGrid tools={null} /></MemoryRouter>);
    expect(screen.getByText(/no tools found/i)).toBeInTheDocument();
  });

  it('renders tool cards when tools provided', () => {
    render(<MemoryRouter><ToolGrid tools={mockTools} /></MemoryRouter>);
    expect(screen.getByText('Tool A')).toBeInTheDocument();
    expect(screen.getByText('Tool B')).toBeInTheDocument();
  });

  it('filters out falsy values from tools array', () => {
    render(<MemoryRouter><ToolGrid tools={[mockTools[0], null, undefined, mockTools[1]]} /></MemoryRouter>);
    expect(screen.getByText('Tool A')).toBeInTheDocument();
    expect(screen.getByText('Tool B')).toBeInTheDocument();
  });

  it('handles keyboard navigation in grid', () => {
    render(<MemoryRouter><ToolGrid tools={mockTools} /></MemoryRouter>);
    const grid = screen.getByRole('status');
    // ArrowRight, ArrowLeft, ArrowDown, ArrowUp
    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    fireEvent.keyDown(grid, { key: 'ArrowLeft' });
    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    fireEvent.keyDown(grid, { key: 'ArrowUp' });
    fireEvent.keyDown(grid, { key: 'Enter' });
    fireEvent.keyDown(grid, { key: ' ' });
    // Non-handled key
    fireEvent.keyDown(grid, { key: 'Tab' });
  });
});
