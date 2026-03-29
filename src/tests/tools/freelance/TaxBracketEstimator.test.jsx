import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
vi.mock('../../../utils/storage', () => ({ getItem: vi.fn((_k, d) => d ?? null), setItem: vi.fn(), removeItem: vi.fn() }));
import TaxBracketEstimator from '../../../tools/freelance/TaxBracketEstimator.jsx';

const R = () => render(<HelmetProvider><TaxBracketEstimator /></HelmetProvider>);

describe('TaxBracketEstimator', () => {
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

});
