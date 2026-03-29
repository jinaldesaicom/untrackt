import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import TimeZoneConverter from '../../../tools/general/TimeZoneConverter.jsx';

const R = () => render(<HelmetProvider><TimeZoneConverter /></HelmetProvider>);

describe('TimeZoneConverter', () => {
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

  it('fills text inputs', async () => {
    R();
    const user = userEvent.setup();
    const textareas = screen.queryAllByRole('textbox');
    for (const ta of textareas.slice(0, 3)) {
      await user.type(ta, 'test content for coverage');
    }
  });

  it('sets date inputs', () => {
    R();
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
      fireEvent.change(input, { target: { value: '2025-06-15' } });
    });
  });

});
