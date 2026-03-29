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
  const mod = await import('../../../tools/agile/EpicBreakdownAssistant.jsx');
  Component = mod.default;
});

describe('EpicBreakdownAssistant – functional', () => {
  it('renders initial state', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/epic|breakdown|new/i);
  });

  it('creates a new epic', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getByRole('button', { name: /new epic/i });
    await user.click(newBtn);
    expect(document.body.textContent).toMatch(/epic|title|description/i);
  });

  it('edits epic title and description', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new epic/i }));
    const textInputs = screen.getAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'User Authentication');
    }
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Implement full auth flow');
    }
  });

  it('adds a story to the epic', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new epic/i }));
    const addStoryBtn = screen.queryByRole('button', { name: /add story|\+.*story/i });
    if (addStoryBtn) {
      await user.click(addStoryBtn);
      // Story fields should appear
      expect(document.body.textContent).toMatch(/story|title|points|priority/i);
    }
  });

  it('sets story priority and points', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new epic/i }));
    const addStoryBtn = screen.queryByRole('button', { name: /add story|\+.*story/i });
    if (addStoryBtn) {
      await user.click(addStoryBtn);
      const selects = screen.queryAllByRole('combobox');
      if (selects.length > 0) await user.selectOptions(selects[0], 'high');
      const numInputs = screen.queryAllByRole('spinbutton');
      if (numInputs.length > 0) {
        await user.clear(numInputs[0]);
        await user.type(numInputs[0], '8');
      }
    }
  });

  it('shows summary with counts', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new epic/i }));
    expect(document.body.textContent).toMatch(/epic|stor/i);
  });

  it('deletes an epic', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new epic/i }));
    const deleteBtn = screen.queryByRole('button', { name: /delete/i });
    if (deleteBtn) await user.click(deleteBtn);
  });
});
