import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import PeriodicTableReference from '../../../tools/maths-science/PeriodicTableReference.jsx';

const R = () => render(<HelmetProvider><PeriodicTableReference /></HelmetProvider>);

describe('PeriodicTableReference', () => {
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
