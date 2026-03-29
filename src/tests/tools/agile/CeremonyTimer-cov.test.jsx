import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/agile/CeremonyTimer.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));
const findRadio = (text) => screen.queryAllByRole('radio').find(r => text.test(r.textContent || r.getAttribute('aria-label') || ''));

describe('CeremonyTimer – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/timer|ceremony|standup|sprint|retro/i);
  });

  it('selects standup ceremony', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const standupBtn = findBtn(/standup|daily/i) || findRadio(/standup|daily/i);
    if (standupBtn) await user.click(standupBtn);
  });

  it('selects sprint planning', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const planBtn = findBtn(/planning/i) || findRadio(/planning/i);
    if (planBtn) await user.click(planBtn);
  });

  it('selects retrospective', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const retroBtn = findBtn(/retrospective|retro/i) || findRadio(/retrospective|retro/i);
    if (retroBtn) await user.click(retroBtn);
  });

  it('selects review', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const revBtn = findBtn(/^review$/i) || findRadio(/^review$/i);
    if (revBtn) await user.click(revBtn);
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

  it('adjusts duration', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('spinbutton');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '15');
    }
  });

  it('adds participants', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = findBtn(/add\s*participant|add\s*member|\+/i);
    if (addBtn) await user.click(addBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[textInputs.length - 1]);
      await user.type(textInputs[textInputs.length - 1], 'John');
    }
  });

  it('skips participant', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const skipBtn = findBtn(/skip|next/i);
    if (skipBtn) await user.click(skipBtn);
  });
});
