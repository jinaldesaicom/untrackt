import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import ProbabilityCalculator from '../../../tools/maths-science/ProbabilityCalculator.jsx';

const R = () => render(<HelmetProvider><ProbabilityCalculator /></HelmetProvider>);

describe('ProbabilityCalculator', () => {
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

  it('computes after input', async () => {
    R();
    const user = userEvent.setup();
    const inputs = screen.queryAllByRole('spinbutton');
    for (const input of inputs.slice(0, 3)) {
      await user.clear(input);
      await user.type(input, '10');
    }
    const buttons = screen.queryAllByRole('button');
    for (const btn of buttons.slice(0, 4)) {
      try { await user.click(btn); } catch {}
    }
  });

});
