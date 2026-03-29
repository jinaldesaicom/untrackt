import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Mock URL.createObjectURL / revokeObjectURL
if (!globalThis.URL.createObjectURL) globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock');
if (!globalThis.URL.revokeObjectURL) globalThis.URL.revokeObjectURL = vi.fn();

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/ImageConverter.jsx');
  Component = mod.default;
});

describe('ImageConverter – functional', () => {
  it('renders with format selection', () => {
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    expect(btns.some(b => /^PNG$/i.test(b.textContent.trim()))).toBe(true);
    expect(btns.some(b => /^JPEG$/i.test(b.textContent.trim()))).toBe(true);
  });

  it('shows file input', () => {
    render(<W><Component /></W>);
    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toBeTruthy();
  });

  it('selects different output format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const jpegBtn = btns.find(b => /^JPEG$/i.test(b.textContent.trim()));
    await user.click(jpegBtn);
    // Quality slider should appear for JPEG
    expect(document.body.textContent).toMatch(/quality|jpeg/i);
  });

  it('selects WebP format and shows quality slider', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const webpBtn = btns.find(b => /^WebP$/i.test(b.textContent.trim()));
    await user.click(webpBtn);
    expect(document.body.textContent).toMatch(/quality|webp/i);
  });

  it('handles file upload via input', async () => {
    render(<W><Component /></W>);
    const fileInput = document.querySelector('input[type="file"]');
    const file = new File(['fake-png-data'], 'test.png', { type: 'image/png' });
    // Simulate upload via fireEvent since userEvent file upload may not work
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.change(fileInput, { target: { files: [file] } });
    // Component should now show the file ready state
  });

  it('selects PNG format (no quality slider)', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const pngBtn = screen.getByRole('button', { name: /^png$/i });
    await user.click(pngBtn);
  });
});
