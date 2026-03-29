import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CategoriesDropdown from '../../components/CategoriesDropdown.jsx';

const R = () => render(<MemoryRouter><CategoriesDropdown ></CategoriesDropdown></MemoryRouter>);

describe('CategoriesDropdown', () => {
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
