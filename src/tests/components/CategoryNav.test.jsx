import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CategoryNav from '../../components/CategoryNav.jsx';

const R = () => render(<MemoryRouter><CategoryNav mobile={false}></CategoryNav></MemoryRouter>);

describe('CategoryNav', () => {
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
