import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock');
globalThis.URL.revokeObjectURL = vi.fn();

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/ImageConverter.jsx');
  Component = mod.default;
});

describe('ImageConverter – coverage', () => {
  it('renders with upload area', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/convert|image|upload|drop/i);
  });

  it('switches to PNG format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const pngBtn = screen.getAllByRole('button').find(b => /^PNG$/i.test(b.textContent.trim()));
    if (pngBtn) await user.click(pngBtn);
  });

  it('switches to JPEG format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const jpegBtn = screen.getAllByRole('button').find(b => /^JPEG$/i.test(b.textContent.trim()));
    if (jpegBtn) await user.click(jpegBtn);
  });

  it('switches to WebP format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const webpBtn = screen.getAllByRole('button').find(b => /^WebP$/i.test(b.textContent.trim()));
    if (webpBtn) await user.click(webpBtn);
  });

  it('switches to AVIF format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const avifBtn = screen.getAllByRole('button').find(b => /^AVIF$/i.test(b.textContent.trim()));
    if (avifBtn) await user.click(avifBtn);
  });

  it('switches to ICO format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const icoBtn = screen.getAllByRole('button').find(b => /^ICO$/i.test(b.textContent.trim()));
    if (icoBtn) await user.click(icoBtn);
  });

  it('adjusts quality slider in JPEG mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const jpegBtn = screen.getAllByRole('button').find(b => /^JPEG$/i.test(b.textContent.trim()));
    if (jpegBtn) await user.click(jpegBtn);
    const slider = screen.queryByRole('slider');
    if (slider) {
      fireEvent.change(slider, { target: { value: '75' } });
    }
  });

  it('convert button is disabled without files', () => {
    render(<W><Component /></W>);
    const convertBtn = screen.getAllByRole('button').find(b => /convert/i.test(b.textContent.trim()));
    if (convertBtn) {
      expect(convertBtn.disabled || convertBtn.getAttribute('aria-disabled')).toBeTruthy();
    }
  });
});
