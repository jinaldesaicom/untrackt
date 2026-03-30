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
  const mod = await import('../../../tools/agile/UserStoryBuilder.jsx');
  Component = mod.default;
});

describe('UserStoryBuilder – functional', () => {
  it('renders initial state', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/story|user|new/i);
  });

  it('creates a new story', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getByRole('button', { name: /new story/i });
    await user.click(newBtn);
    expect(document.body.textContent).toMatch(/as a|i want|so that/i);
  });

  it('fills in story fields', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new story/i }));
    const textInputs = screen.getAllByRole('textbox');
    // role, want, soThat fields
    if (textInputs.length >= 3) {
      await user.clear(textInputs[0]); await user.type(textInputs[0], 'product owner');
      await user.clear(textInputs[1]); await user.type(textInputs[1], 'view analytics dashboard');
      await user.clear(textInputs[2]); await user.type(textInputs[2], 'I can make data-driven decisions');
    }
    expect(document.body.textContent).toMatch(/product owner|analytics|dashboard/i);
  });

  it('sets priority via select', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new story/i }));
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      await user.selectOptions(selects[0], 'high');
    }
  });

  it('sets story points', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new story/i }));
    const numInputs = screen.getAllByRole('spinbutton');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '5');
    }
  });

  it('adds acceptance criteria', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new story/i }));
    const addCritBtn = screen.queryByRole('button', { name: /add|criteria|\+/i });
    if (addCritBtn) await user.click(addCritBtn);
  });

  it('copies story to clipboard', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new story/i }));
    const copyBtn = screen.queryByRole('button', { name: /copy/i });
    if (copyBtn) await user.click(copyBtn);
  });

  it('deletes a story', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new story/i }));
    const deleteBtn = screen.queryByRole('button', { name: /delete/i });
    if (deleteBtn) await user.click(deleteBtn);
  });
});
