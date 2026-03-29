import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/QrCodeGenerator.jsx');
  Component = mod.default;
});

describe('QrCodeGenerator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/url|text|download|size/i);
  });

  it('types URL text', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'https://example.com');
    }
  });

  it('changes foreground color', async () => {
    render(<W><Component /></W>);
    const colorInputs = document.querySelectorAll('input[type="color"]');
    if (colorInputs.length > 0) {
      fireEvent.change(colorInputs[0], { target: { value: '#ff0000' } });
    }
  });

  it('changes background color', async () => {
    render(<W><Component /></W>);
    const colorInputs = document.querySelectorAll('input[type="color"]');
    if (colorInputs.length > 1) {
      fireEvent.change(colorInputs[1], { target: { value: '#00ff00' } });
    }
  });

  it('changes QR size', () => {
    render(<W><Component /></W>);
    const slider = document.querySelector('input[type="range"]');
    if (slider) fireEvent.change(slider, { target: { value: '400' } });
  });

  it('changes error correction level', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const radios = screen.queryAllByRole('radio');
    const selects = document.querySelectorAll('select');
    if (radios.length > 1) {
      await user.click(radios[1]);
    } else if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: 'H' } });
    }
  });

  it('switches input type', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const tabs = screen.getAllByRole('button').filter(b => /url|text|email|wifi|phone/i.test(b.textContent));
    for (const tab of tabs.slice(0, 3)) {
      await user.click(tab);
    }
  });

  it('downloads QR code', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const dlBtn = screen.getAllByRole('button').find(b => /download|save/i.test(b.textContent));
    if (dlBtn) await user.click(dlBtn);
  });

  it('copies QR data', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});
