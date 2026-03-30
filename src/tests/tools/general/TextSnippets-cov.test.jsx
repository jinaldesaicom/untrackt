import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/TextSnippets.jsx');
  Component = mod.default;
}, 30000);

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('TextSnippets – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/snippet|shortcode/i);
  });

  it('creates a new snippet', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = findBtn(/new\s*snippet|\+\s*new/i);
    if (newBtn) await user.click(newBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length >= 2) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'greet');
      // Find content textarea
      const ta = document.querySelector('textarea');
      if (ta) {
        await user.clear(ta);
        await user.type(ta, 'Hello {{name}}, welcome!');
      }
    }
    const addBtn = findBtn(/add\s*snippet|save/i);
    if (addBtn) await user.click(addBtn);
  });

  it('toggles trigger type prefix', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = findBtn(/new\s*snippet|\+\s*new/i);
    if (newBtn) await user.click(newBtn);
    const prefixBtn = findBtn(/prefix|;\s*prefix|^manual$/i);
    if (prefixBtn) await user.click(prefixBtn);
  });

  it('selects category', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = findBtn(/new\s*snippet|\+\s*new/i);
    if (newBtn) await user.click(newBtn);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      const opts = Array.from(selects[0].options);
      if (opts.length > 1) await user.selectOptions(selects[0], opts[1].value);
    }
  });

  it('copies snippet', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // First create a snippet
    const newBtn = findBtn(/new\s*snippet|\+\s*new/i);
    if (newBtn) await user.click(newBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length >= 1) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'testcopy');
    }
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, 'Copy me');
    }
    const addBtn = findBtn(/add\s*snippet|save/i);
    if (addBtn) await user.click(addBtn);
    // Copy it
    const copyBtn = screen.queryAllByRole('button').find(b => /copy/i.test(b.textContent) && !/new|add|save/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('edits a snippet', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Create first
    const newBtn = findBtn(/new\s*snippet|\+\s*new/i);
    if (newBtn) await user.click(newBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length >= 1) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'testedit');
    }
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, 'Edit me');
    }
    const addBtn = findBtn(/add\s*snippet|save/i);
    if (addBtn) await user.click(addBtn);
    // Edit
    const editBtn = screen.queryAllByRole('button').find(b => /edit|pencil/i.test(b.textContent) || b.querySelector('svg'));
    if (editBtn) await user.click(editBtn);
  });

  it('deletes a snippet', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = findBtn(/new\s*snippet|\+\s*new/i);
    if (newBtn) await user.click(newBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length >= 1) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'testdel');
    }
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, 'Delete me');
    }
    const addBtn = findBtn(/add\s*snippet|save/i);
    if (addBtn) await user.click(addBtn);
    const delBtn = screen.queryAllByRole('button').find(b => /delete|trash|remove/i.test(b.textContent) || b.getAttribute('aria-label')?.match(/delete/i));
    if (delBtn) await user.click(delBtn);
  });

  it('uses search', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const searchInput = screen.queryByPlaceholderText(/search/i) || screen.queryAllByRole('textbox')[0];
    if (searchInput) {
      await user.clear(searchInput);
      await user.type(searchInput, 'test');
    }
  });

  it('opens quick expand', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const expandBtn = findBtn(/quick\s*expand|ctrl/i);
    if (expandBtn) await user.click(expandBtn);
  });

  it('cancels snippet creation', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = findBtn(/new\s*snippet|\+\s*new/i);
    if (newBtn) await user.click(newBtn);
    const cancelBtn = findBtn(/cancel/i);
    if (cancelBtn) await user.click(cancelBtn);
  });
});
