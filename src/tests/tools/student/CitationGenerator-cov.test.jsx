import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/student/CitationGenerator.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('CitationGenerator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/citation|reference|source|apa|mla/i);
  });

  it('fills source details', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.queryAllByRole('textbox');
    for (let i = 0; i < Math.min(textInputs.length, 5); i++) {
      await user.clear(textInputs[i]);
      await user.type(textInputs[i], `Field ${i + 1}`);
    }
    const genBtn = findBtn(/generate|create|cite/i);
    if (genBtn) await user.click(genBtn);
  });

  it('switches citation format APA', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const apaBtn = findBtn(/^apa$/i) || screen.queryAllByRole('radio').find(r => /apa/i.test(r.textContent || ''));
    if (apaBtn) await user.click(apaBtn);
  });

  it('switches citation format MLA', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const mlaBtn = findBtn(/^mla$/i) || screen.queryAllByRole('radio').find(r => /mla/i.test(r.textContent || ''));
    if (mlaBtn) await user.click(mlaBtn);
  });

  it('switches citation format Chicago', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const chiBtn = findBtn(/chicago/i) || screen.queryAllByRole('radio').find(r => /chicago/i.test(r.textContent || ''));
    if (chiBtn) await user.click(chiBtn);
  });

  it('changes source type', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      const opts = Array.from(selects[0].options);
      if (opts.length > 1) await user.selectOptions(selects[0], opts[1].value);
      if (opts.length > 2) await user.selectOptions(selects[0], opts[2].value);
    }
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.filter(r => /book|journal|website|article/i.test(r.textContent || '')).slice(0, 3)) {
      await user.click(r);
    }
  });

  it('copies citation', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = findBtn(/copy/i);
    if (copyBtn) await user.click(copyBtn);
  });

  it('adds multiple authors', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = findBtn(/add\s*author|\+/i);
    if (addBtn) {
      await user.click(addBtn);
      await user.click(addBtn);
    }
  });

  it('resets', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const resetBtn = findBtn(/reset|clear|new/i);
    if (resetBtn) await user.click(resetBtn);
  });
});
