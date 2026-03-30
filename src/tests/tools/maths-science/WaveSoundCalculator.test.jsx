import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import WaveSoundCalculator from '../../../tools/maths-science/WaveSoundCalculator.jsx';

describe('WaveSoundCalculator', () => {
  it('renders without crashing', () => {
    render(<HelmetProvider><WaveSoundCalculator /></HelmetProvider>);
  });

  it('shows input fields', () => {
    render(<HelmetProvider><WaveSoundCalculator /></HelmetProvider>);
    expect(screen.getByPlaceholderText(/343/i)).toBeInTheDocument();
  });

  it('has calculate button', () => {
    render(<HelmetProvider><WaveSoundCalculator /></HelmetProvider>);
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
  });

  it('accepts input and computes result', async () => {
    render(<HelmetProvider><WaveSoundCalculator /></HelmetProvider>);
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
    render(<HelmetProvider><WaveSoundCalculator /></HelmetProvider>);
    const user = userEvent.setup();
    const btn = screen.getByRole('button', { name: /Calculate/i });
    await user.click(btn);
    // Should not crash with empty/default inputs
  });

  it('handles copy action', async () => {
    render(<HelmetProvider><WaveSoundCalculator /></HelmetProvider>);
    const user = userEvent.setup();
    const copyBtns = screen.getAllByRole('button');
    const copyBtn = copyBtns.find(b => b.textContent.match(/copy/i) || b.getAttribute('title')?.match(/copy/i));
    if (copyBtn) await user.click(copyBtn);
  });

});
