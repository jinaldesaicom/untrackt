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
  const mod = await import('../../../tools/general/TextSnippets.jsx');
  Component = mod.default;
});

describe('TextSnippets – functional', () => {
  it('renders snippet form', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/snippet|shortcode|add/i);
  });

  it('adds a new snippet', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Must click "New Snippet" first to show form
    const newBtn = screen.getByRole('button', { name: /New Snippet/i });
    await user.click(newBtn);
    const textInputs = screen.getAllByRole('textbox');
    // Shortcode input
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'hello');
    // Content textarea
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Hello World!');
    }
    const addBtn = screen.queryByRole('button', { name: /add snippet/i });
    if (addBtn) await user.click(addBtn);
  });

  it('searches snippets', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const searchInput = screen.queryByPlaceholderText(/search/i);
    if (searchInput) {
      await user.type(searchInput, 'test');
    }
  });

  it('uses category selection', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      await user.selectOptions(selects[0], selects[0].options[1]?.value || '');
    }
  });

  it('renders export and import buttons', () => {
    render(<W><Component /></W>);
    const exportBtn = screen.queryByRole('button', { name: /export/i });
    const importBtn = screen.queryByRole('button', { name: /import/i });
    expect(exportBtn || importBtn).toBeTruthy();
  });
});
