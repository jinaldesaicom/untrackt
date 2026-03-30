import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
vi.mock('../../../utils/storage', () => ({ getItem: vi.fn((_k, d) => d ?? null), setItem: vi.fn(), removeItem: vi.fn() }));
import EnergyLevelPlanner from '../../../tools/productivity/EnergyLevelPlanner.jsx';

const R = () => render(<HelmetProvider><EnergyLevelPlanner /></HelmetProvider>);

describe('EnergyLevelPlanner', () => {
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
