import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import CreditCardPayoffCalculator from '../../../tools/finance/CreditCardPayoffCalculator.jsx';

const R = () => render(<HelmetProvider><CreditCardPayoffCalculator /></HelmetProvider>);

describe('CreditCardPayoffCalculator', () => {
  it('renders without crashing', () => {
    R();
  });

  it('interacts with buttons', async () => {
    R();
    const user = userEvent.setup();
    const buttons = screen.queryAllByRole('button');
    for (const btn of buttons.slice(0, 6)) {
      try { await user.click(btn); } catch {}
    }
  });

  it('fills number inputs', async () => {
    R();
    const user = userEvent.setup();
    const inputs = screen.queryAllByRole('spinbutton');
    for (const input of inputs.slice(0, 5)) {
      await user.clear(input);
      await user.type(input, '42');
    }
  });

});
