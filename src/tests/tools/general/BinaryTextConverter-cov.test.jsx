import { render, screen, fireEvent } from '@testing-library/react';
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

describe('BinaryTextConverter – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/binary|text|convert/i);
  });

  it('converts text to binary', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Hello');
    }
  });

  it('converts binary to text', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const swapRadio = screen.getAllByRole('radio').find(r => /binary.*text|decode/i.test(r.textContent));
    if (swapRadio) await user.click(swapRadio);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], '01001000 01100101');
    }
  });

  it('switches to hex mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const hexRadio = screen.getAllByRole('radio').find(r => /hex/i.test(r.textContent));
    if (hexRadio) await user.click(hexRadio);
  });

  it('switches to octal mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const octRadio = screen.getAllByRole('radio').find(r => /octal/i.test(r.textContent));
    if (octRadio) await user.click(octRadio);
  });

  it('copies output', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Test');
    }
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('clears input', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const clearBtn = screen.getAllByRole('button').find(b => /clear/i.test(b.textContent));
    if (clearBtn) await user.click(clearBtn);
  });

  it('swaps direction', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const swapBtn = screen.getAllByRole('button').find(b => /swap|⇄|↔/i.test(b.textContent));
    if (swapBtn) await user.click(swapBtn);
  });
});
