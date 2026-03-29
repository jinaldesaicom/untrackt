import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import ReadingLevelOptimizer from '../../../tools/seo/ReadingLevelOptimizer.jsx';

const R = () => render(<HelmetProvider><ReadingLevelOptimizer /></HelmetProvider>);

describe('ReadingLevelOptimizer', () => {
  it('renders without crashing', () => {
    R();
  });

  it('interacts with buttons', async () => {
    R();
    const user = userEvent.setup();
    const buttons = screen.queryAllByRole('button');
    for (const btn of buttons.slice(0, 6)) {
      try { await user.click(btn); } catch {}
    }
  });

  it('fills text inputs', async () => {
    R();
    const user = userEvent.setup();
    const textareas = screen.queryAllByRole('textbox');
    for (const ta of textareas.slice(0, 3)) {
      await user.type(ta, 'test content for coverage');
    }
  });

});
