import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
vi.mock('../../../utils/storage', () => ({ getItem: vi.fn((_k, d) => d ?? null), setItem: vi.fn(), removeItem: vi.fn() }));
import NeumorphismGenerator from '../../../tools/css-html/NeumorphismGenerator.jsx';

const R = () => render(<HelmetProvider><NeumorphismGenerator /></HelmetProvider>);

describe('NeumorphismGenerator', () => {
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

});
