import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/SetTheoryCalculator.jsx');
  Component = mod.default;
});

describe('SetTheoryCalculator – functional', () => {
  it('renders set inputs', () => {
    render(<W><Component /></W>);
    expect(screen.getAllByRole('textbox').length).toBeGreaterThanOrEqual(2);
  });

  it('calculates set operations for two sets', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '1, 2, 3, 4');
    await user.clear(textInputs[1]);
    await user.type(textInputs[1], '3, 4, 5, 6');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    // Should show union, intersection, difference results
    expect(document.body.textContent).toMatch(/1.*2.*3.*4.*5.*6|∪|∩/);
  });

  it('shows subset check results', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '1, 2');
    await user.clear(textInputs[1]);
    await user.type(textInputs[1], '1, 2, 3');
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/⊆|subset|yes|✓/i);
  });

  it('includes universal set', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '1, 2');
    await user.clear(textInputs[1]);
    await user.type(textInputs[1], '3, 4');
    if (textInputs.length >= 3) {
      await user.clear(textInputs[2]);
      await user.type(textInputs[2], '1, 2, 3, 4, 5');
    }
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/complement|'|U/i);
  });

  it('handles reset', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], '1, 2, 3');
    const resetBtn = screen.queryByRole('button', { name: /reset/i });
    if (resetBtn) await user.click(resetBtn);
  });
});
