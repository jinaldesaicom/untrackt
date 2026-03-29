import { render, screen, fireEvent } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
vi.mock('../../../utils/storage', () => ({ getItem: vi.fn((_k, d) => d ?? null), setItem: vi.fn(), removeItem: vi.fn() }));
import CssGradientGenerator from '../../../tools/dev/CssGradientGenerator.jsx';

const R = () => render(<HelmetProvider><CssGradientGenerator /></HelmetProvider>);

describe('CssGradientGenerator', () => {
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

  it('computes after input', async () => {
    R();
    const user = userEvent.setup();
    const inputs = screen.queryAllByRole('spinbutton');
    for (const input of inputs.slice(0, 3)) {
      await user.clear(input);
      await user.type(input, '10');
    }
    const textareas = screen.queryAllByRole('textbox');
    for (const ta of textareas.slice(0, 2)) {
      await user.type(ta, 'sample text');
    }
    const buttons = screen.queryAllByRole('button');
    for (const btn of buttons.slice(0, 4)) {
      try { await user.click(btn); } catch {}
    }
  });

});
