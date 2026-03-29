import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MobileSearchOverlay from '../../components/MobileSearchOverlay.jsx';

const R = () => render(<MemoryRouter><MobileSearchOverlay open={true} onClose={vi.fn()} /></MemoryRouter>);

describe('MobileSearchOverlay', () => {
  it('renders without crashing', () => {
    R();
  });

  it('interacts with buttons', async () => {
    R();
    const user = userEvent.setup();
    const buttons = screen.queryAllByRole('button');
    for (const btn of buttons.slice(0, 4)) {
      try { await user.click(btn); } catch {}
    }
  });
});
