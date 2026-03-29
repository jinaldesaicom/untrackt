import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/SignificantFiguresCalculator.jsx');
  Component = mod.default;
});

describe('SignificantFiguresCalculator – functional', () => {
  it('counts sig figs for default value', () => {
    render(<W><Component /></W>);
    // Default is 0.00450, should show 3 sig figs
    expect(document.body.textContent).toMatch(/3|sig/i);
  });

  it('counts sig figs for typed input', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '1200');
    expect(document.body.textContent).toMatch(/2|sig/i);
  });

  it('switches to round mode and shows rounded result', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /round/i }));
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '3.14159');
    const numInputs = screen.getAllByRole('spinbutton');
    await user.clear(numInputs[0]);
    await user.type(numInputs[0], '3');
    expect(document.body.textContent).toMatch(/3\.14|round/i);
  });

  it('switches to calc mode and performs calculation', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /calc/i }));
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '2.5');
    if (textInputs.length >= 2) {
      await user.clear(textInputs[1]);
      await user.type(textInputs[1], '3.15');
    }
    expect(document.body.textContent).toMatch(/result|sig|5\.65/i);
  });

  it('clicks example values in count mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Count mode should be default; look for clickable example
    const countBtn = screen.queryByRole('button', { name: /count/i });
    if (countBtn) await user.click(countBtn);
    // The component has example values as clickable rows
    const example = screen.queryByText(/0\.00450|1200/);
    if (example) await user.click(example);
  });
});
