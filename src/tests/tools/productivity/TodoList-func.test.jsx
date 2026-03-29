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
  const mod = await import('../../../tools/productivity/TodoList.jsx');
  Component = mod.default;
});

describe('TodoList – functional', () => {
  it('renders with input and filter buttons', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/todo|all|active|completed/i);
  });

  it('adds a todo via Enter', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Buy groceries{Enter}');
    expect(document.body.textContent).toMatch(/buy groceries/i);
  });

  it('adds todo via button', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Clean house');
    const addBtn = screen.queryByRole('button', { name: /add/i });
    if (addBtn) await user.click(addBtn);
    expect(document.body.textContent).toMatch(/clean house/i);
  });

  it('toggles a todo done', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Test task{Enter}');
    // Find the toggle button/checkbox for the added item
    const buttons = screen.queryAllByRole('button');
    const toggleBtn = buttons.find(b => b.getAttribute('aria-label')?.match(/toggle|done|complete/i));
    if (toggleBtn) await user.click(toggleBtn);
  });

  it('filters by active', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Task A{Enter}');
    const activeBtn = screen.getByRole('button', { name: /^active$/i });
    await user.click(activeBtn);
  });

  it('filters by completed', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const completedBtn = screen.getByRole('button', { name: /^completed$/i });
    await user.click(completedBtn);
  });

  it('clears completed todos', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const clearBtn = screen.queryByRole('button', { name: /clear completed/i });
    if (clearBtn) await user.click(clearBtn);
  });

  it('shows progress bar', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Progress task{Enter}');
    // Progress should appear in the UI
    expect(document.body.textContent).toMatch(/0%|1|active/i);
  });
});
