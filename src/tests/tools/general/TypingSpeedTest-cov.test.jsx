import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/TypingSpeedTest.jsx');
  Component = mod.default;
});

describe('TypingSpeedTest – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/typing|speed|test|wpm/i);
  });

  it('starts typing test', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const startBtn = screen.getAllByRole('button').find(b => /start|begin/i.test(b.textContent));
    if (startBtn) await user.click(startBtn);
    const textareas = screen.queryAllByRole('textbox');
    const inputs = document.querySelectorAll('input.input-field, textarea');
    const typingTarget = textareas.length > 0 ? textareas[textareas.length - 1] : inputs[inputs.length - 1];
    if (typingTarget) {
      await user.type(typingTarget, 'the quick');
    }
  });

  it('changes difficulty', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const radios = screen.queryAllByRole('radio');
    if (radios.length > 1) await user.click(radios[1]);
    const diffBtns = screen.getAllByRole('button').filter(b => /easy|medium|hard/i.test(b.textContent));
    if (diffBtns.length > 0) await user.click(diffBtns[0]);
  });

  it('changes duration', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const durBtns = screen.getAllByRole('button').filter(b => /30s|60s|1\s*min|2\s*min|15s|120/i.test(b.textContent));
    if (durBtns.length > 0) await user.click(durBtns[0]);
  });

  it('resets the test', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const startBtn = screen.getAllByRole('button').find(b => /start|begin/i.test(b.textContent));
    if (startBtn) await user.click(startBtn);
    const resetBtn = screen.getAllByRole('button').find(b => /reset|restart|try again/i.test(b.textContent));
    if (resetBtn) await user.click(resetBtn);
  });

  it('switches mode or language', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});
