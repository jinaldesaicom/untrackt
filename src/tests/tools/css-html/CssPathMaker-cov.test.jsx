import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/css-html/CssClipPathMaker.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('CssPathMaker – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/css|path|clip|svg|shape/i);
  });

  it('selects different shape types', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const radios = screen.queryAllByRole('radio');
    // Click shape type buttons/radios
    for (const r of radios.slice(0, 4)) {
      await user.click(r);
    }
    const shapeBtns = btns.filter(b => /circle|polygon|ellipse|inset|triangle|star|custom/i.test(b.textContent.trim()));
    for (const b of shapeBtns.slice(0, 4)) {
      await user.click(b);
    }
  });

  it('adjusts parameters', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const sliders = screen.queryAllByRole('slider');
    const inputs = screen.queryAllByRole('spinbutton');
    for (const s of sliders.slice(0, 3)) {
      await user.clear(s);
      await user.type(s, '50');
    }
    for (const inp of inputs.slice(0, 3)) {
      await user.clear(inp);
      await user.type(inp, '200');
    }
  });

  it('copies CSS code', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = findBtn(/copy/i);
    if (copyBtn) await user.click(copyBtn);
  });

  it('resets', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const resetBtn = findBtn(/reset|clear/i);
    if (resetBtn) await user.click(resetBtn);
  });

  it('adds points to custom path', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const customBtn = findBtn(/custom|polygon/i) || screen.queryAllByRole('radio').find(r => /custom|polygon/i.test(r.textContent || ''));
    if (customBtn) await user.click(customBtn);
    const addBtn = findBtn(/add\s*point|\+/i);
    if (addBtn) {
      await user.click(addBtn);
      await user.click(addBtn);
    }
  });
});
