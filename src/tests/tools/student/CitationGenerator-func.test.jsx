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
  const mod = await import('../../../tools/student/CitationGenerator.jsx');
  Component = mod.default;
});

describe('CitationGenerator – functional', () => {
  it('renders with style and source type options', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/APA|MLA|Chicago/i);
  });

  it('selects APA style', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const apaBtn = screen.getByRole('button', { name: /APA/i });
    await user.click(apaBtn);
  });

  it('selects MLA style', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const mlaBtn = screen.getByRole('button', { name: /MLA/i });
    await user.click(mlaBtn);
  });

  it('selects Chicago style', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const chicagoBtn = screen.getByRole('button', { name: /Chicago/i });
    await user.click(chicagoBtn);
  });

  it('generates a book citation', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Fill in book fields
    const textInputs = screen.getAllByRole('textbox');
    if (textInputs.length >= 2) {
      await user.clear(textInputs[0]); await user.type(textInputs[0], 'Smith, John');
      await user.clear(textInputs[1]); await user.type(textInputs[1], 'Introduction to Testing');
    }
    // Look for year input
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '2024');
    }
    const genBtn = screen.getByRole('button', { name: /generate/i });
    await user.click(genBtn);
    expect(document.body.textContent).toMatch(/Smith|Testing|2024/);
  });

  it('changes source type to Journal Article', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      await user.selectOptions(selects[0], 'Journal Article');
    }
  });

  it('changes source type to Website', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      await user.selectOptions(selects[0], 'Website');
    }
  });

  it('copies citation', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Generate first
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Doe, Jane');
    await user.type(textInputs[1], 'Test Book');
    await user.click(screen.getByRole('button', { name: /generate/i }));
    const copyBtn = screen.queryByRole('button', { name: /copy/i });
    if (copyBtn) await user.click(copyBtn);
  });

  it('adds citation to list', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Author');
    await user.type(textInputs[1], 'Title');
    await user.click(screen.getByRole('button', { name: /generate/i }));
    const addBtn = screen.queryByRole('button', { name: /add.*list/i });
    if (addBtn) await user.click(addBtn);
  });
});
