import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { ToolLayout } from '../../components/ToolLayout.jsx';

const R = () => render(<HelmetProvider><ToolLayout title="Test" description="desc" path="/test"><p>child</p></ToolLayout></HelmetProvider>);

describe('ToolLayout', () => {
  it('renders without crashing', () => {
    R();
  });

  it('interacts with buttons', async () => {
    R();
    const user = userEvent.setup();
    const buttons = screen.queryAllByRole('button');
    for (const btn of buttons.slice(0, 4)) {
      try { await user.click(btn); } catch {}
    }
  });
});
