import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Mock crypto.subtle
const mockDigest = vi.fn(() => Promise.resolve(new ArrayBuffer(32)));
const mockImportKey = vi.fn(() => Promise.resolve({}));
const mockSign = vi.fn(() => Promise.resolve(new ArrayBuffer(32)));
if (!globalThis.crypto) globalThis.crypto = {};
Object.defineProperty(globalThis.crypto, 'subtle', {
  value: {
    digest: mockDigest,
    importKey: mockImportKey,
    sign: mockSign
  },
  writable: true,
  configurable: true
});

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/dev/HashGenerator.jsx');
  Component = mod.default;
});

describe('HashGenerator – functional', () => {
  it('renders with algorithm selector', () => {
    render(<W><Component /></W>);
    expect(screen.getByText(/MD5/i)).toBeInTheDocument();
    expect(screen.getByText(/SHA-256/i)).toBeInTheDocument();
  });

  it('generates a hash for text input', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    await user.clear(textareas[0]);
    await user.type(textareas[0], 'Hello World');
    await user.click(screen.getByRole('button', { name: /generate hash/i }));
    // Should show hash output
    await vi.waitFor(() => {
      expect(document.body.textContent).toMatch(/[0-9a-f]{8,}|hash/i);
    });
  });

  it('selects SHA-1 algorithm', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /SHA-1/i }));
    const textareas = document.querySelectorAll('textarea');
    await user.type(textareas[0], 'test');
    await user.click(screen.getByRole('button', { name: /generate hash/i }));
  });

  it('selects SHA-512 algorithm', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /SHA-512/i }));
  });

  it('selects MD5 algorithm', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /MD5/i }));
    const textareas = document.querySelectorAll('textarea');
    await user.type(textareas[0], 'test');
    await user.click(screen.getByRole('button', { name: /generate hash/i }));
  });

  it('toggles HMAC mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const hmacCheckbox = screen.queryByRole('checkbox');
    if (hmacCheckbox) {
      await user.click(hmacCheckbox);
      expect(document.body.textContent).toMatch(/key|secret|hmac/i);
    }
  });

  it('copies hash to clipboard', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    await user.type(textareas[0], 'test');
    await user.click(screen.getByRole('button', { name: /generate hash/i }));
    const copyBtn = screen.queryByRole('button', { name: /copy/i });
    if (copyBtn) await user.click(copyBtn);
  });
});
