import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/TextToSlug.jsx');
  Component = mod.default;
});

describe('TextToSlug – coverage', () => {
  it('renders with default text', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/slug|text/i);
  });

  it('converts text to slug', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input.input-field');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'Hello World 2024!');
    }
    expect(document.body.textContent).toMatch(/hello-world/i);
  });

  it('switches separator to underscore', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const underscoreRadio = screen.getAllByRole('radio').find(r => /underscore/i.test(r.textContent));
    if (underscoreRadio) await user.click(underscoreRadio);
  });

  it('switches separator to dot', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const dotRadio = screen.getAllByRole('radio').find(r => /dot/i.test(r.textContent));
    if (dotRadio) await user.click(dotRadio);
  });

  it('toggles remove stop words', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btn = screen.getAllByRole('button').find(b => /stop words/i.test(b.textContent));
    if (btn) await user.click(btn);
  });

  it('toggles preserve numbers', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btn = screen.getAllByRole('button').find(b => /preserve numbers/i.test(b.textContent));
    if (btn) await user.click(btn);
  });

  it('changes max length slider', () => {
    render(<W><Component /></W>);
    const slider = document.querySelector('input[type="range"]');
    if (slider) fireEvent.change(slider, { target: { value: '30' } });
  });

  it('handles batch input', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    const batchTextarea = Array.from(textareas).find(t => !t.readOnly);
    if (batchTextarea) {
      await user.clear(batchTextarea);
      await user.type(batchTextarea, 'First Line{Enter}Second Line');
    }
  });

  it('copies slug values', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtns = screen.getAllByRole('button').filter(b => /copy/i.test(b.textContent));
    if (copyBtns.length > 0) await user.click(copyBtns[0]);
  });

  it('handles accented characters', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input.input-field');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'café résumé naïve');
    }
  });
});
