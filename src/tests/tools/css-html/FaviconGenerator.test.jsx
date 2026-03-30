import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import FaviconGenerator from '../../../tools/css-html/FaviconGenerator.jsx';

const R = () => render(<HelmetProvider><MemoryRouter><FaviconGenerator /></MemoryRouter></HelmetProvider>);

describe('FaviconGenerator', () => {
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
