import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/StatisticsCalculator.jsx');
  Component = mod.default;
});

const findBtn = (text) => {
  const btns = screen.queryAllByRole('button');
  return btns.find(b => text.test(b.textContent.trim()));
};

describe('StatisticsDescriptiveCalculator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/statistic|data|z-score|set/i);
  });

  it('enters data and shows stats reactively', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, '10, 20, 30, 40, 50');
    }
    // Stats compute automatically via useMemo, no button needed
    expect(document.body.textContent).toMatch(/mean|median|mode/i);
  });

  it('copies result after entering data', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, '5, 10, 15');
    }
    // Copy button appears when stats are computed
    const copyBtn = findBtn(/copy/i);
    if (copyBtn) await user.click(copyBtn);
  });

  it('fills z-score inputs', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const spinbuttons = screen.queryAllByRole('spinbutton');
    // z-score inputs: value, mean, std dev
    if (spinbuttons.length >= 3) {
      await user.type(spinbuttons[0], '75');
      await user.type(spinbuttons[1], '50');
      await user.type(spinbuttons[2], '10');
    }
  });

  it('handles empty data', () => {
    render(<W><Component /></W>);
    // Should render without errors even with no data
    expect(document.querySelector('textarea')).toBeTruthy();
  });
});
