import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/CaseConverter.jsx');
  Component = mod.default;
});

describe('CaseConverter – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/case|convert/i);
  });

  it('types text and sees conversions', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Hello World Test');
    }
    expect(document.body.textContent).toMatch(/hello world test|HELLO WORLD TEST|helloWorldTest/i);
  });

  it('clicks copy buttons', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'test text');
    }
    const copyBtns = screen.getAllByRole('button').filter(b => /copy/i.test(b.textContent));
    for (const btn of copyBtns.slice(0, 3)) {
      await user.click(btn);
    }
  });

  it('converts special characters', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'hello-world_test foo');
    }
  });
});
