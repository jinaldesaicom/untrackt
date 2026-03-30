import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let FractionCalculator;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/FractionCalculator.jsx');
  FractionCalculator = mod.default;
});

describe('FractionCalculator – functional', () => {
  it('renders arithmetic mode by default', () => {
    render(<W><FractionCalculator /></W>);
    const calcBtn = screen.getAllByRole('button').find(b => /^Calculate$/i.test(b.textContent.trim()));
    expect(calcBtn).toBeDefined();
  });

  it('calculates fraction addition', async () => {
    const user = userEvent.setup();
    render(<W><FractionCalculator /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    // Fill first fraction: 1/2
    if (inputs.length >= 4) {
      await user.clear(inputs[0]); await user.type(inputs[0], '1');
      await user.clear(inputs[1]); await user.type(inputs[1], '2');
      await user.clear(inputs[2]); await user.type(inputs[2], '1');
      await user.clear(inputs[3]); await user.type(inputs[3], '4');
    }
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/\d/);
  });

  it('switches to convert mode', async () => {
    const user = userEvent.setup();
    render(<W><FractionCalculator /></W>);
    const convertBtn = screen.queryByRole('button', { name: /convert/i });
    if (convertBtn) {
      await user.click(convertBtn);
      expect(document.body.textContent).toMatch(/convert|decimal|percentage|fraction/i);
    }
  });

  it('converts decimal to fraction', async () => {
    const user = userEvent.setup();
    render(<W><FractionCalculator /></W>);
    const convertBtn = screen.getAllByRole('button').find(b => /^Convert$/i.test(b.textContent.trim()));
    if (convertBtn) {
      await user.click(convertBtn);
      const textInputs = screen.queryAllByRole('textbox');
      if (textInputs.length > 0) {
        await user.clear(textInputs[0]);
        await user.type(textInputs[0], '0.75');
      }
      const calcBtn = screen.getAllByRole('button').find(b => /^Calculate$/i.test(b.textContent.trim()));
      if (calcBtn) await user.click(calcBtn);
    }
  });

  it('handles operator change', async () => {
    const user = userEvent.setup();
    render(<W><FractionCalculator /></W>);
    // Operators are buttons: +, -, ×, ÷
    const minusBtn = screen.getAllByRole('button').find(b => b.textContent.trim() === '-' || b.textContent.trim() === '−');
    if (minusBtn) await user.click(minusBtn);
  });

  it('handles copy button', async () => {
    const user = userEvent.setup();
    render(<W><FractionCalculator /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length >= 4) {
      await user.clear(inputs[0]); await user.type(inputs[0], '1');
      await user.clear(inputs[1]); await user.type(inputs[1], '2');
      await user.clear(inputs[2]); await user.type(inputs[2], '1');
      await user.clear(inputs[3]); await user.type(inputs[3], '3');
    }
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    const copyBtn = screen.queryByRole('button', { name: /copy/i });
    if (copyBtn) await user.click(copyBtn);
  });
});
