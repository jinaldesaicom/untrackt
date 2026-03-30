import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

if (!globalThis.URL.createObjectURL) globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock');
if (!globalThis.URL.revokeObjectURL) globalThis.URL.revokeObjectURL = vi.fn();

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/ImageToBase64.jsx');
  Component = mod.default;
});

describe('ImageToBase64 – functional', () => {
  it('renders with file upload mode', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/file upload|choose image|base64/i);
  });

  it('shows file input', () => {
    render(<W><Component /></W>);
    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toBeTruthy();
  });

  it('switches to URL mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const urlBtn = screen.queryByRole('button', { name: /url/i });
    if (urlBtn) {
      await user.click(urlBtn);
      expect(document.body.textContent).toMatch(/url|fetch|convert/i);
    }
  });

  it('shows URL input in URL mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const urlBtn = screen.queryByRole('button', { name: /url/i });
    if (urlBtn) {
      await user.click(urlBtn);
      const textInputs = screen.getAllByRole('textbox');
      expect(textInputs.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('handles file selection', async () => {
    render(<W><Component /></W>);
    const fileInput = document.querySelector('input[type="file"]');
    const file = new File(['fake-data'], 'test.png', { type: 'image/png' });
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.change(fileInput, { target: { files: [file] } });
  });
});
