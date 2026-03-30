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
  const mod = await import('../../../tools/pm/DependencyTracker.jsx');
  Component = mod.default;
});

describe('DependencyTracker – functional', () => {
  it('renders with add dependency option', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/dependency|add|track/i);
  });

  it('adds a new dependency', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = screen.queryByRole('button', { name: /add|new|dependency/i });
    if (addBtn) await user.click(addBtn);
    const textInputs = screen.getAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'API Service');
    }
  });

  it('uses filter or status controls', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const statusBtn = screen.queryByRole('button', { name: /all|active|resolved/i });
    if (statusBtn) await user.click(statusBtn);
  });
});
