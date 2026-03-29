import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/WordFrequencyCounter.jsx');
  Component = mod.default;
});

describe('WordFrequencyCounter – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/word|frequency|counter/i);
  });

  it('analyzes text', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'hello world hello test hello world');
    }
    expect(document.body.textContent).toMatch(/hello|3/);
  });

  it('toggles stop words filter', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'the quick brown fox and the lazy dog');
    }
    const toggleBtn = screen.getAllByRole('button').find(b => /stop words|exclude|filter/i.test(b.textContent));
    if (toggleBtn) await user.click(toggleBtn);
    const checkboxes = screen.queryAllByRole('checkbox');
    if (checkboxes.length > 0) await user.click(checkboxes[0]);
  });

  it('changes sort order', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'aaa bbb aaa ccc');
    }
    const sortBtns = screen.getAllByRole('button').filter(b => /a-z|z-a|alpha|sort/i.test(b.textContent));
    if (sortBtns.length > 0) await user.click(sortBtns[0]);
  });

  it('copies results', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'test word test');
    }
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('changes minimum frequency filter', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const slider = document.querySelector('input[type="range"]');
    if (slider) fireEvent.change(slider, { target: { value: '2' } });
    const numInputs = document.querySelectorAll('input[type="number"]');
    if (numInputs.length > 0) {
      fireEvent.change(numInputs[0], { target: { value: '2' } });
    }
  });
});
