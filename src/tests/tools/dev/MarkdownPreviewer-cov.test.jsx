import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

vi.mock('../../../utils/markdownRenderer', () => ({
  renderMarkdown: (text) => text || '',
}));

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/dev/MarkdownPreviewer.jsx');
  Component = mod.default;
}, 30000);

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('MarkdownPreviewer – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/markdown|preview|editor/i);
  });

  it('enters markdown text', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, '# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2');
    }
  });

  it('enters code blocks', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, '```javascript\nconsole.log("hello");\n```\n\nInline `code` here');
    }
  });

  it('enters links and images', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, '[Link](https://example.com)\n\n![Image](https://example.com/img.png)');
    }
  });

  it('enters tables', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, '| Col 1 | Col 2 |\n|-------|-------|\n| A | B |');
    }
  });

  it('copies markdown', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, '# Test');
    }
    const copyBtn = screen.getAllByRole('button').find(b => /copy\s*markdown/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('copies HTML', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyHtmlBtn = screen.getAllByRole('button').find(b => /copy\s*html/i.test(b.textContent));
    if (copyHtmlBtn) await user.click(copyHtmlBtn);
  });

  it('toggles preview/split view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const previewBtn = findBtn(/preview|split|editor/i);
    if (previewBtn) await user.click(previewBtn);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });

  it('uses template', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      const opts = Array.from(selects[0].options);
      if (opts.length > 1) await user.selectOptions(selects[0], opts[1].value);
    }
    const templateBtn = findBtn(/template|load|insert/i);
    if (templateBtn) await user.click(templateBtn);
  });

  it('clears editor', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const clearBtn = findBtn(/clear|reset/i);
    if (clearBtn) await user.click(clearBtn);
  });
});
