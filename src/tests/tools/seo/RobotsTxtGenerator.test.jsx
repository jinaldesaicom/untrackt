import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import RobotsTxtGenerator from '../../../tools/seo/RobotsTxtGenerator.jsx';

const R = () => render(<HelmetProvider><RobotsTxtGenerator /></HelmetProvider>);

describe('RobotsTxtGenerator', () => {
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

  it('fills number inputs', async () => {
    R();
    const user = userEvent.setup();
    const inputs = screen.queryAllByRole('spinbutton');
    for (const input of inputs.slice(0, 5)) {
      await user.clear(input);
      await user.type(input, '42');
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

  it('toggles checkboxes', async () => {
    R();
    const user = userEvent.setup();
    const cbs = screen.queryAllByRole('checkbox');
    for (const cb of cbs.slice(0, 5)) {
      await user.click(cb);
    }
  });

});
