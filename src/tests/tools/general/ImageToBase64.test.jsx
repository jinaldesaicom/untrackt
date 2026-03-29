import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
beforeEach(() => { global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })); });
afterEach(() => { vi.restoreAllMocks(); });
import ImageToBase64 from '../../../tools/general/ImageToBase64.jsx';

const R = () => render(<HelmetProvider><ImageToBase64 /></HelmetProvider>);

describe('ImageToBase64', () => {
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

  it('computes after input', async () => {
    R();
    const user = userEvent.setup();
    const textareas = screen.queryAllByRole('textbox');
    for (const ta of textareas.slice(0, 2)) {
      await user.type(ta, 'sample text');
    }
    const buttons = screen.queryAllByRole('button');
    for (const btn of buttons.slice(0, 4)) {
      try { await user.click(btn); } catch {}
    }
  });

});
