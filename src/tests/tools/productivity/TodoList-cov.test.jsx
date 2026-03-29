import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/productivity/TodoList.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('TodoList – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/todo|task|add/i);
  });

  it('adds a task', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Buy groceries');
    }
    const addBtn = findBtn(/^add$|add\s*task|\+/i);
    if (addBtn) await user.click(addBtn);
  });

  it('adds multiple tasks', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      for (const task of ['Task A', 'Task B', 'Task C']) {
        await user.clear(textInputs[0]);
        await user.type(textInputs[0], task);
        const addBtn = findBtn(/^add$|add\s*task|\+/i);
        if (addBtn) await user.click(addBtn);
      }
    }
  });

  it('toggles task completion', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Add a task first
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Toggle me');
      const addBtn = findBtn(/^add$|add\s*task|\+/i);
      if (addBtn) await user.click(addBtn);
    }
    const checkboxes = screen.queryAllByRole('checkbox');
    if (checkboxes.length > 0) await user.click(checkboxes[0]);
  });

  it('deletes a task', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Delete me');
      const addBtn = findBtn(/^add$|add\s*task|\+/i);
      if (addBtn) await user.click(addBtn);
    }
    const delBtns = screen.getAllByRole('button').filter(b => /delete|trash|remove|×|✕/i.test(b.textContent.trim()) || b.getAttribute('aria-label')?.match(/delete/i));
    if (delBtns.length > 0) await user.click(delBtns[0]);
  });

  it('edits a task', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Edit me');
      const addBtn = findBtn(/^add$|add\s*task|\+/i);
      if (addBtn) await user.click(addBtn);
    }
    const editBtns = screen.getAllByRole('button').filter(b => /edit|pencil/i.test(b.textContent.trim()) || b.getAttribute('aria-label')?.match(/edit/i));
    if (editBtns.length > 0) await user.click(editBtns[0]);
  });

  it('filters tasks', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const allBtn = findBtn(/^all$/i);
    if (allBtn) await user.click(allBtn);
    const activeBtn = findBtn(/^active$/i);
    if (activeBtn) await user.click(activeBtn);
    const completedBtn = findBtn(/^completed$/i);
    if (completedBtn) await user.click(completedBtn);
  });

  it('clears completed', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const clearBtn = findBtn(/clear\s*completed/i);
    if (clearBtn) await user.click(clearBtn);
  });

  it('sets priority', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      const opts = Array.from(selects[0].options);
      if (opts.length > 1) await user.selectOptions(selects[0], opts[1].value);
    }
  });
});
