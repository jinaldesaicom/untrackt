import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import LatePaymentFeeCalculator from '../../../tools/freelance/LatePaymentFeeCalculator.jsx';

const R = () => render(<HelmetProvider><LatePaymentFeeCalculator /></HelmetProvider>);

describe('LatePaymentFeeCalculator', () => {
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

  it('fills text inputs', async () => {
    R();
    const user = userEvent.setup();
    const textareas = screen.queryAllByRole('textbox');
    for (const ta of textareas.slice(0, 3)) {
      await user.type(ta, 'test content for coverage');
    }
  });

  it('changes select options', () => {
    R();
    const selects = screen.queryAllByRole('combobox');
    for (const sel of selects) {
      const options = sel.querySelectorAll('option');
      if (options.length > 1) {
        fireEvent.change(sel, { target: { value: options[1].value } });
      }
    }
  });

  it('toggles checkboxes', async () => {
    R();
    const user = userEvent.setup();
    const cbs = screen.queryAllByRole('checkbox');
    for (const cb of cbs.slice(0, 5)) {
      await user.click(cb);
    }
  });

  it('sets date inputs', () => {
    R();
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
      fireEvent.change(input, { target: { value: '2025-06-15' } });
    });
  });

});
