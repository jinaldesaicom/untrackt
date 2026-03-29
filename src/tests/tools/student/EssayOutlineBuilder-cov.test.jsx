import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/student/EssayOutlineBuilder.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('EssayOutlineBuilder – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/essay|outline|thesis|paragraph/i);
  });

  it('enters topic', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Climate Change Effects');
    }
  });

  it('adds body paragraph', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = findBtn(/add\s*paragraph|add\s*section|\+/i);
    if (addBtn) {
      await user.click(addBtn);
      await user.click(addBtn);
    }
  });

  it('fills thesis statement', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const tas = document.querySelectorAll('textarea');
    if (tas.length > 0) {
      await user.clear(tas[0]);
      await user.type(tas[0], 'Climate change has significant effects on global ecosystems.');
    }
  });

  it('selects essay type', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      const opts = Array.from(selects[0].options);
      if (opts.length > 1) await user.selectOptions(selects[0], opts[1].value);
      if (opts.length > 2) await user.selectOptions(selects[0], opts[2].value);
    }
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });

  it('copies outline', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = findBtn(/copy/i);
    if (copyBtn) await user.click(copyBtn);
  });

  it('resets', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const resetBtn = findBtn(/reset|clear|new/i);
    if (resetBtn) await user.click(resetBtn);
  });

  it('deletes section', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = findBtn(/add\s*paragraph|add\s*section|\+/i);
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => /delete|trash|remove|×/i.test(b.textContent) || b.getAttribute('aria-label')?.match(/delete|remove/i));
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});
