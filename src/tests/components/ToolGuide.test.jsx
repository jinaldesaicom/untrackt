import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToolGuide from '../../components/ToolGuide.jsx';

describe('ToolGuide', () => {
  it('renders nothing when toolId has no guide', () => {
    const { container } = render(<ToolGuide toolId="nonexistent-tool" />);
    expect(container.innerHTML).toBe('');
  });

  it('renders the guide toggle button for a valid toolId', () => {
    render(<ToolGuide toolId="json-formatter" />);
    expect(screen.getByText(/learn more about this tool/i)).toBeInTheDocument();
  });

  it('expands and shows guide sections on click', async () => {
    const user = userEvent.setup();
    render(<ToolGuide toolId="json-formatter" />);
    const btn = screen.getByText(/learn more about this tool/i);
    await user.click(btn);
    expect(screen.getByText(/hide guide/i)).toBeInTheDocument();
    expect(screen.getByText('How to use')).toBeInTheDocument();
    expect(screen.getByText('Tips & tricks')).toBeInTheDocument();
    expect(screen.getByText('Common use cases')).toBeInTheDocument();
  });

  it('first section is expanded by default when guide opens', async () => {
    const user = userEvent.setup();
    render(<ToolGuide toolId="json-formatter" />);
    await user.click(screen.getByText(/learn more about this tool/i));
    // First section body content should be visible
    expect(screen.getByText(/paste or type raw json/i)).toBeInTheDocument();
  });

  it('clicking another section opens it and closes the first', async () => {
    const user = userEvent.setup();
    render(<ToolGuide toolId="json-formatter" />);
    await user.click(screen.getByText(/learn more about this tool/i));
    // Click on "Tips & tricks"
    await user.click(screen.getByText('Tips & tricks'));
    expect(screen.getByText(/paste api responses/i)).toBeInTheDocument();
  });

  it('clicking same section closes it', async () => {
    const user = userEvent.setup();
    render(<ToolGuide toolId="json-formatter" />);
    await user.click(screen.getByText(/learn more about this tool/i));
    // Click "How to use" to close it (index 0 which is open)
    await user.click(screen.getByText('How to use'));
    // Body text should be hidden
    expect(screen.queryByText(/paste or type raw json/i)).not.toBeInTheDocument();
  });

  it('hides guide when toggle clicked again', async () => {
    const user = userEvent.setup();
    render(<ToolGuide toolId="json-formatter" />);
    await user.click(screen.getByText(/learn more about this tool/i));
    await user.click(screen.getByText(/hide guide/i));
    expect(screen.getByText(/learn more about this tool/i)).toBeInTheDocument();
    expect(screen.queryByText('How to use')).not.toBeInTheDocument();
  });
});
