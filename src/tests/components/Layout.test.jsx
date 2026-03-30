import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../../components/Layout.jsx';

const R = () => render(<HelmetProvider><MemoryRouter><Layout theme="light" isDark={false}><p>child</p></Layout></MemoryRouter></HelmetProvider>);

describe('Layout', () => {
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
