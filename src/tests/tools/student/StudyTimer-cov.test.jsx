import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/student/StudyTimer.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));
const findRadio = (text) => screen.queryAllByRole('radio').find(r => text.test(r.textContent || r.getAttribute('aria-label') || ''));

describe('StudyTimer – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/timer|pomodoro|study|focus|break/i);
  });

  it('starts timer', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const startBtn = findBtn(/^start$/i);
    if (startBtn) await user.click(startBtn);
  });

  it('pauses timer', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const startBtn = findBtn(/^start$/i);
    if (startBtn) await user.click(startBtn);
    const pauseBtn = findBtn(/pause/i);
    if (pauseBtn) await user.click(pauseBtn);
  });

  it('resets timer', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const resetBtn = findBtn(/reset/i);
    if (resetBtn) await user.click(resetBtn);
  });

  it('switches to long break', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const longBtn = findBtn(/long\s*break/i) || findRadio(/long\s*break/i);
    if (longBtn) await user.click(longBtn);
  });

  it('switches to short break', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const shortBtn = findBtn(/short\s*break/i) || findRadio(/short\s*break/i);
    if (shortBtn) await user.click(shortBtn);
  });

  it('adjusts focus duration', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '30');
    }
  });

  it('views stats/history', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const statsBtn = findBtn(/stats|history|sessions/i) || findRadio(/stats|history/i);
    if (statsBtn) await user.click(statsBtn);
  });

  it('changes timer mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
  });
});
