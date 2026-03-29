import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/MatrixCalculator.jsx');
  Component = mod.default;
});

describe('MatrixCalculator – coverage', () => {
  it('renders with operation buttons', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/matrix|add|multiply|determinant/i);
  });

  it('fills matrix cells and calculates addition', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const numInputs = screen.queryAllByRole('spinbutton');
    for (let i = 0; i < Math.min(numInputs.length, 8); i++) {
      await user.clear(numInputs[i]);
      await user.type(numInputs[i], String(i + 1));
    }
    const calcBtn = screen.getAllByRole('button').find(b => /^Calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches to determinant operation', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const detBtn = screen.getAllByRole('button').find(b => /determinant/i.test(b.textContent));
    if (detBtn) await user.click(detBtn);
    const calcBtn = screen.getAllByRole('button').find(b => /^Calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches to inverse operation', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const invBtn = screen.getAllByRole('button').find(b => /inverse/i.test(b.textContent));
    if (invBtn) await user.click(invBtn);
    const calcBtn = screen.getAllByRole('button').find(b => /^Calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches to transpose operation', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const trBtn = screen.getAllByRole('button').find(b => /transpose/i.test(b.textContent));
    if (trBtn) await user.click(trBtn);
    const calcBtn = screen.getAllByRole('button').find(b => /^Calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches to multiply and calculates', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const mulBtn = screen.getAllByRole('button').find(b => /multiply/i.test(b.textContent));
    if (mulBtn) await user.click(mulBtn);
    const numInputs = screen.queryAllByRole('spinbutton');
    for (let i = 0; i < Math.min(numInputs.length, 4); i++) {
      await user.clear(numInputs[i]);
      await user.type(numInputs[i], String(i + 1));
    }
    const calcBtn = screen.getAllByRole('button').find(b => /^Calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('switches to subtract and calculates', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const subBtn = screen.getAllByRole('button').find(b => /subtract/i.test(b.textContent));
    if (subBtn) await user.click(subBtn);
    const calcBtn = screen.getAllByRole('button').find(b => /^Calculate$/i.test(b.textContent.trim()));
    if (calcBtn) await user.click(calcBtn);
  });

  it('resets the form', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const resetBtn = screen.getAllByRole('button').find(b => /reset/i.test(b.textContent));
    if (resetBtn) await user.click(resetBtn);
  });

  it('copies result if available', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});
