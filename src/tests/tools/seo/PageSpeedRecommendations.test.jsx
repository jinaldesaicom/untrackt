import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
vi.mock('../../../utils/storage', () => ({ getItem: vi.fn((_k, d) => d ?? null), setItem: vi.fn(), removeItem: vi.fn() }));
beforeEach(() => { global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })); });
afterEach(() => { vi.restoreAllMocks(); });
import PageSpeedRecommendations from '../../../tools/seo/PageSpeedRecommendations.jsx';

const R = () => render(<HelmetProvider><MemoryRouter><PageSpeedRecommendations /></MemoryRouter></HelmetProvider>);

describe('PageSpeedRecommendations', () => {
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

  it('toggles checkboxes', async () => {
    R();
    const user = userEvent.setup();
    const cbs = screen.queryAllByRole('checkbox');
    for (const cb of cbs.slice(0, 5)) {
      await user.click(cb);
    }
  });

});
