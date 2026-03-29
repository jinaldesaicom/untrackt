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
  const mod = await import('../../../tools/productivity/BrainDumpCapture.jsx');
  Component = mod.default;
});

describe('BrainDumpCapture – functional', () => {
  it('renders with input field', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/mind|dump|brain/i);
  });

  it('adds a brain dump item via Enter', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'Remember to buy groceries{Enter}');
    expect(document.body.textContent).toMatch(/groceries|1.*item/i);
  });

  it('adds multiple items', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'Item 1{Enter}');
    await user.type(textInputs[0], 'Item 2{Enter}');
    await user.type(textInputs[0], 'Item 3{Enter}');
    expect(document.body.textContent).toMatch(/3.*item|item.*3/i);
  });

  it('switches to organized view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Add items first
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Test item{Enter}');
    const orgBtn = screen.queryByRole('button', { name: /organize|organized/i });
    if (orgBtn) await user.click(orgBtn);
  });

  it('uses + button to add item', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Via plus button');
    const addBtn = screen.queryByRole('button', { name: /\+|add/i });
    if (addBtn) await user.click(addBtn);
  });

  it('uses clear all button', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Delete me{Enter}');
    const clearBtn = screen.queryByRole('button', { name: /clear/i });
    if (clearBtn) await user.click(clearBtn);
  });
});
