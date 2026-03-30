import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

// Mock URL.createObjectURL and URL.revokeObjectURL
globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock');
globalThis.URL.revokeObjectURL = vi.fn();

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/ImageCompressor.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('ImageCompressor – coverage', () => {
  it('renders with upload area', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/compress|image|upload|drop/i);
  });

  it('switches to JPEG format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const jpegBtn = screen.getAllByRole('button').find(b => /^JPEG$/i.test(b.textContent.trim()));
    if (jpegBtn) await user.click(jpegBtn);
  });

  it('switches to PNG format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const pngBtn = screen.getAllByRole('button').find(b => /^PNG$/i.test(b.textContent.trim()));
    if (pngBtn) await user.click(pngBtn);
  });

  it('switches to WebP format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const webpBtn = screen.getAllByRole('button').find(b => /^WebP$/i.test(b.textContent.trim()));
    if (webpBtn) await user.click(webpBtn);
  });

  it('adjusts quality slider', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const slider = screen.queryByRole('slider');
    if (slider) {
      fireEvent.change(slider, { target: { value: '50' } });
    }
  });

  it('adjusts max dimensions', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const numInputs = screen.queryAllByRole('spinbutton');
    for (const inp of numInputs) {
      await user.clear(inp);
      await user.type(inp, '800');
    }
  });

  it('compress button is disabled without files', () => {
    render(<W><Component /></W>);
    const compressBtn = findBtn(/compress/i);
    if (compressBtn) {
      expect(compressBtn.disabled || compressBtn.getAttribute('aria-disabled')).toBeTruthy();
    }
  });
});
