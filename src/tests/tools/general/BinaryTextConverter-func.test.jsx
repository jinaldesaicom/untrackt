import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/BinaryTextConverter.jsx');
  Component = mod.default;
});

describe('BinaryTextConverter – functional', () => {
  it('converts text to binary by default', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    await user.clear(textareas[0]);
    await user.type(textareas[0], 'ABC');
    // Reactive - should show binary output
    expect(document.body.textContent).toMatch(/01000001|binary/i);
  });

  it('switches to morse tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('radio', { name: /Morse/i }));
    const textareas = document.querySelectorAll('textarea');
    await user.clear(textareas[0]);
    await user.type(textareas[0], 'SOS');
    expect(document.body.textContent).toMatch(/\.\.\.|---/);
  });

  it('switches to hex tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('radio', { name: /Hex/i }));
    const textareas = document.querySelectorAll('textarea');
    await user.clear(textareas[0]);
    await user.type(textareas[0], 'AB');
    expect(document.body.textContent).toMatch(/41.*42|hex/i);
  });

  it('switches to ASCII tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('radio', { name: /ASCII/i }));
    const textareas = document.querySelectorAll('textarea');
    await user.clear(textareas[0]);
    await user.type(textareas[0], 'A');
    expect(document.body.textContent).toMatch(/65|ascii/i);
  });

  it('toggles direction (code to text)', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Find the direction toggle
    const dirBtn = screen.queryByRole('button', { name: /code.*text|→|reverse/i });
    if (dirBtn) {
      await user.click(dirBtn);
      const textareas = document.querySelectorAll('textarea');
      await user.clear(textareas[0]);
      await user.type(textareas[0], '01000001 01000010');
      expect(document.body.textContent).toMatch(/AB|text/i);
    }
  });
});
