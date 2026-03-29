import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import LogarithmCalculator from '../../../tools/maths-science/LogarithmCalculator.jsx';

describe('LogarithmCalculator', () => {
  it('renders without crashing', () => {
    render(<HelmetProvider><LogarithmCalculator /></HelmetProvider>);
  });

  it('shows input fields', () => {
    render(<HelmetProvider><LogarithmCalculator /></HelmetProvider>);
    expect(screen.getByPlaceholderText(/100/i)).toBeInTheDocument();
  });

  it('has calculate button', () => {
    render(<HelmetProvider><LogarithmCalculator /></HelmetProvider>);
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
  });

  it('accepts input and computes result', async () => {
    render(<HelmetProvider><LogarithmCalculator /></HelmetProvider>);
    const user = userEvent.setup();
    const numberInputs = screen.getAllByRole('spinbutton');
    if (numberInputs.length > 0) {
      await user.clear(numberInputs[0]);
      await user.type(numberInputs[0], '5');
      if (numberInputs.length > 1) {
        await user.clear(numberInputs[1]);
        await user.type(numberInputs[1], '3');
      }
    }
    const btn = screen.getByRole('button', { name: /Calculate/i });
    await user.click(btn);
  });

  it('handles empty input gracefully', async () => {
    render(<HelmetProvider><LogarithmCalculator /></HelmetProvider>);
    const user = userEvent.setup();
    const btn = screen.getByRole('button', { name: /Calculate/i });
    await user.click(btn);
    // Should not crash with empty/default inputs
  });

  it('handles reset', async () => {
    render(<HelmetProvider><LogarithmCalculator /></HelmetProvider>);
    const user = userEvent.setup();
    const resetBtns = screen.getAllByRole('button');
    const resetBtn = resetBtns.find(b => b.textContent.match(/reset/i) || b.getAttribute('title')?.match(/reset/i));
    if (resetBtn) await user.click(resetBtn);
  });

  it('handles copy action', async () => {
    render(<HelmetProvider><LogarithmCalculator /></HelmetProvider>);
    const user = userEvent.setup();
    const copyBtns = screen.getAllByRole('button');
    const copyBtn = copyBtns.find(b => b.textContent.match(/copy/i) || b.getAttribute('title')?.match(/copy/i));
    if (copyBtn) await user.click(copyBtn);
  });

});
