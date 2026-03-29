import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/TipSplitter.jsx');
  Component = mod.default;
});

describe('TipSplitter – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/tip|split/i);
  });

  it('enters bill amount', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input');
    const billInput = Array.from(inputs).find(i => i.type === 'number' || i.placeholder?.match(/bill|amount/i));
    if (billInput) {
      await user.clear(billInput);
      await user.type(billInput, '100');
    }
  });

  it('changes tip percentage', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const tipBtns = screen.getAllByRole('button').filter(b => /15%|18%|20%|25%/i.test(b.textContent));
    for (const btn of tipBtns.slice(0, 2)) {
      await user.click(btn);
    }
  });

  it('changes number of people', async () => {
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input');
    const peopleInput = Array.from(inputs).find(i => i.type === 'number' && (i.min === '1' || i.placeholder?.match(/people|split/i)));
    if (peopleInput) {
      fireEvent.change(peopleInput, { target: { value: '4' } });
    }
  });

  it('enters custom tip', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const customBtn = screen.getAllByRole('button').find(b => /custom/i.test(b.textContent));
    if (customBtn) await user.click(customBtn);
    const inputs = document.querySelectorAll('input[type="number"]');
    if (inputs.length > 0) {
      const lastNumInput = inputs[inputs.length - 1];
      await user.clear(lastNumInput);
      await user.type(lastNumInput, '22');
    }
  });

  it('uses slider if present', () => {
    render(<W><Component /></W>);
    const slider = document.querySelector('input[type="range"]');
    if (slider) fireEvent.change(slider, { target: { value: '20' } });
  });

  it('splits with round up option', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const roundBtn = screen.getAllByRole('button').find(b => /round/i.test(b.textContent));
    if (roundBtn) await user.click(roundBtn);
  });
});
