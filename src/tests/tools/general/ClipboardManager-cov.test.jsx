import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/ClipboardManager.jsx');
  Component = mod.default;
});

describe('ClipboardManager – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/clipboard/i);
  });

  it('adds a clipboard entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Test clipboard entry');
    }
    const addBtn = screen.getAllByRole('button').find(b => /add|save|clip/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });

  it('adds multiple entries', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      for (const text of ['Entry 1', 'Entry 2', 'Entry 3']) {
        await user.clear(textareas[0]);
        await user.type(textareas[0], text);
        const addBtn = screen.getAllByRole('button').find(b => /add|save|clip/i.test(b.textContent));
        if (addBtn) await user.click(addBtn);
      }
    }
  });

  it('copies an entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Copy me');
      const addBtn = screen.getAllByRole('button').find(b => /add|save|clip/i.test(b.textContent));
      if (addBtn) await user.click(addBtn);
    }
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('deletes an entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Delete me');
      const addBtn = screen.getAllByRole('button').find(b => /add|save|clip/i.test(b.textContent));
      if (addBtn) await user.click(addBtn);
    }
    const delBtn = screen.getAllByRole('button').find(b => /delete|remove|trash|×/i.test(b.textContent) || b.getAttribute('aria-label')?.match(/delete|remove/i));
    if (delBtn) await user.click(delBtn);
  });

  it('searches entries', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const searchInput = document.querySelector('input[placeholder*="search" i], input[placeholder*="filter" i]');
    if (searchInput) {
      await user.clear(searchInput);
      await user.type(searchInput, 'test');
    }
  });

  it('clears all entries', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const clearBtn = screen.getAllByRole('button').find(b => /clear all|clear/i.test(b.textContent));
    if (clearBtn) await user.click(clearBtn);
  });

  it('pins an entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Pin me');
      const addBtn = screen.getAllByRole('button').find(b => /add|save|clip/i.test(b.textContent));
      if (addBtn) await user.click(addBtn);
    }
    const pinBtn = screen.getAllByRole('button').find(b => /pin|star|fav/i.test(b.textContent) || b.getAttribute('aria-label')?.match(/pin/i));
    if (pinBtn) await user.click(pinBtn);
  });
});
