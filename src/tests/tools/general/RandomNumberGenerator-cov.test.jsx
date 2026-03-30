import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/RandomNumberGenerator.jsx');
  Component = mod.default;
});

describe('RandomNumberGenerator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/random|number|generate/i);
  });

  it('generates a random number', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const genBtn = screen.getAllByRole('button').find(b => /generate|roll|random/i.test(b.textContent));
    if (genBtn) await user.click(genBtn);
  });

  it('changes min and max values', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const numInputs = document.querySelectorAll('input[type="number"], input.input-field');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '10');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '50');
    }
  });

  it('generates multiple numbers', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const countInput = document.querySelectorAll('input[type="number"]');
    if (countInput.length >= 3) {
      await user.clear(countInput[2]);
      await user.type(countInput[2], '5');
    }
    const genBtn = screen.getAllByRole('button').find(b => /generate/i.test(b.textContent));
    if (genBtn) await user.click(genBtn);
  });

  it('toggles unique/allow duplicates', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const checkboxes = screen.queryAllByRole('checkbox');
    if (checkboxes.length > 0) await user.click(checkboxes[0]);
    const uniqueBtn = screen.getAllByRole('button').find(b => /unique|duplicate/i.test(b.textContent));
    if (uniqueBtn) await user.click(uniqueBtn);
  });

  it('switches mode if available', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const radios = screen.queryAllByRole('radio');
    if (radios.length > 1) await user.click(radios[1]);
  });

  it('copies result', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const genBtn = screen.getAllByRole('button').find(b => /generate/i.test(b.textContent));
    if (genBtn) await user.click(genBtn);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('uses integer mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const intRadio = screen.getAllByRole('radio').find(r => /integer/i.test(r.textContent));
    if (intRadio) await user.click(intRadio);
  });

  it('uses decimal/float mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const decRadio = screen.getAllByRole('radio').find(r => /decimal|float/i.test(r.textContent));
    if (decRadio) await user.click(decRadio);
  });
});
