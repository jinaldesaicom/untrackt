import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
vi.mock('../../../utils/storage', () => ({ getItem: vi.fn((_k, d) => d ?? null), setItem: vi.fn(), removeItem: vi.fn() }));
import CssBoxShadowGenerator from '../../../tools/css-html/CssBoxShadowGenerator.jsx';

const R = () => render(<HelmetProvider><CssBoxShadowGenerator /></HelmetProvider>);

describe('CssBoxShadowGenerator', () => {
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

  it('toggles checkboxes', async () => {
    R();
    const user = userEvent.setup();
    const cbs = screen.queryAllByRole('checkbox');
    for (const cb of cbs.slice(0, 5)) {
      await user.click(cb);
    }
  });

});
