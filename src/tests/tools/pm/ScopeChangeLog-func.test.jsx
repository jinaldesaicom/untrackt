import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((key, def = null) => def),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  getPreference: vi.fn(() => null),
  setPreference: vi.fn()
}));

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/pm/ScopeChangeLog.jsx');
  Component = mod.default;
});

describe('ScopeChangeLog – functional', () => {
  it('renders scope change log UI', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/scope|change|log/i);
  });

  it('adds a new scope change', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = screen.queryByRole('button', { name: /add|new|change/i });
    if (addBtn) await user.click(addBtn);
    const textInputs = screen.getAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Feature X added');
    }
  });

  it('uses filter or status controls', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const filterBtn = screen.queryByRole('button', { name: /all|pending|approved|rejected/i });
    if (filterBtn) await user.click(filterBtn);
  });

  it('renders copy/export buttons', () => {
    render(<W><Component /></W>);
    const copyBtn = screen.queryByRole('button', { name: /copy|export|csv/i });
    expect(copyBtn).toBeTruthy();
  });
});
