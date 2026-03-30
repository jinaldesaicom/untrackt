import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import WorkingDaysCalculator from '../../../tools/freelance/WorkingDaysCalculator.jsx';

const R = () => render(<HelmetProvider><WorkingDaysCalculator /></HelmetProvider>);

describe('WorkingDaysCalculator', () => {
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
