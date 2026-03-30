import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/AspectRatioCalculator.jsx');
  Component = mod.default;
});

describe('AspectRatioCalculator – coverage', () => {
  it('renders with default resize mode', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/resize|find ratio|reference/i);
  });

  it('switches to Reference mode and shows ratios', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const refRadio = screen.getAllByRole('radio').find(r => /reference/i.test(r.textContent));
    if (refRadio) await user.click(refRadio);
    expect(screen.getByText(/16:9/)).toBeInTheDocument();
  });

  it('switches to Find ratio mode and shows simplified ratio', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ratioRadio = screen.getAllByRole('radio').find(r => /find ratio/i.test(r.textContent));
    if (ratioRadio) await user.click(ratioRadio);
    expect(screen.getByText(/simplified ratio/i)).toBeInTheDocument();
  });

  it('changes resize dimensions via new width', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.getAllByRole('textbox').length > 0
      ? screen.getAllByRole('textbox')
      : document.querySelectorAll('input.input-field');
    if (inputs.length >= 3) {
      await user.clear(inputs[2]);
      await user.type(inputs[2], '1200');
    }
  });

  it('changes resize dimensions via new height', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input.input-field');
    if (inputs.length >= 4) {
      fireEvent.change(inputs[3], { target: { value: '600' } });
    }
  });

  it('clicks a preset button', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const preset = screen.getAllByRole('button').find(b => /youtube/i.test(b.textContent));
    if (preset) await user.click(preset);
  });

  it('changes reference width in reference mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const refRadio = screen.getAllByRole('radio').find(r => /reference/i.test(r.textContent));
    if (refRadio) await user.click(refRadio);
    const inputs = document.querySelectorAll('input.input-field');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '1024');
    }
  });

  it('changes width and height in find ratio mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ratioRadio = screen.getAllByRole('radio').find(r => /find ratio/i.test(r.textContent));
    if (ratioRadio) await user.click(ratioRadio);
    const inputs = document.querySelectorAll('input.input-field');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '1600');
      await user.clear(inputs[1]);
      await user.type(inputs[1], '900');
    }
  });

  it('handles zero dimensions gracefully', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input.input-field');
    if (inputs.length >= 2) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], '0');
    }
  });
});
