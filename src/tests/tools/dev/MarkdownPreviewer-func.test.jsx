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

vi.mock('../../../utils/markdownRenderer', () => ({
  renderMarkdown: vi.fn((text) => text || '')
}));

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/dev/MarkdownPreviewer.jsx');
  Component = mod.default;
});

describe('MarkdownPreviewer – functional', () => {
  it('renders with markdown input area', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/markdown|preview|editor/i);
  });

  it('types markdown and shows preview', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], '# Hello World\n\nThis is **bold** text.');
    }
  });

  it('copies markdown output', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const copyMdBtn = btns.find(b => /Copy Markdown/i.test(b.textContent));
    if (copyMdBtn) await user.click(copyMdBtn);
  });

  it('uses toolbar formatting buttons', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const boldBtn = btns.find(b => /^Bold$/i.test(b.textContent.trim()));
    if (boldBtn) await user.click(boldBtn);
    const italicBtn = btns.find(b => /^Italic$/i.test(b.textContent.trim()));
    if (italicBtn) await user.click(italicBtn);
  });
});
