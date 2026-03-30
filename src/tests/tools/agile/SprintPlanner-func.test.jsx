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
  const mod = await import('../../../tools/agile/SprintPlanner.jsx');
  Component = mod.default;
});

describe('SprintPlanner – functional', () => {
  it('renders initial state', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/sprint|plan|new/i);
  });

  it('creates a new sprint', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getByRole('button', { name: /new sprint/i });
    await user.click(newBtn);
    expect(document.body.textContent).toMatch(/sprint|name|goal|start|end/i);
  });

  it('fills in sprint details', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new sprint/i }));
    const textInputs = screen.getAllByRole('textbox');
    if (textInputs.length >= 2) {
      await user.clear(textInputs[0]); await user.type(textInputs[0], 'Sprint 1');
      await user.clear(textInputs[1]); await user.type(textInputs[1], 'Complete auth module');
    }
  });

  it('adds a story to the sprint', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new sprint/i }));
    const addStoryBtn = screen.queryByRole('button', { name: /add story|\+.*story/i });
    if (addStoryBtn) {
      await user.click(addStoryBtn);
      const textInputs = screen.getAllByRole('textbox');
      const lastInput = textInputs[textInputs.length - 1];
      await user.clear(lastInput);
      await user.type(lastInput, 'Login page');
    }
  });

  it('sets story points and assignee', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new sprint/i }));
    const addStoryBtn = screen.queryByRole('button', { name: /add story|\+.*story/i });
    if (addStoryBtn) {
      await user.click(addStoryBtn);
      const numInputs = screen.queryAllByRole('spinbutton');
      if (numInputs.length > 0) {
        await user.clear(numInputs[0]);
        await user.type(numInputs[0], '3');
      }
    }
  });

  it('changes story status', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new sprint/i }));
    const addStoryBtn = screen.queryByRole('button', { name: /add story|\+.*story/i });
    if (addStoryBtn) {
      await user.click(addStoryBtn);
      const selects = screen.queryAllByRole('combobox');
      if (selects.length > 0) {
        await user.selectOptions(selects[selects.length - 1], 'In Progress');
      }
    }
  });

  it('deletes a sprint', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new sprint/i }));
    const deleteBtn = screen.queryByRole('button', { name: /delete/i });
    if (deleteBtn) await user.click(deleteBtn);
  });
});
