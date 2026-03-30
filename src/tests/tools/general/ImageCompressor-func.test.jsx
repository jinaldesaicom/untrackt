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
  const mod = await import('../../../tools/general/ImageCompressor.jsx');
  Component = mod.default;
});

describe('ImageCompressor – functional', () => {
  it('renders with format options', () => {
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    expect(btns.some(b => /^JPEG$/i.test(b.textContent.trim()))).toBe(true);
    expect(btns.some(b => /^WebP$/i.test(b.textContent.trim()))).toBe(true);
  });

  it('shows file input and quality controls', () => {
    render(<W><Component /></W>);
    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toBeTruthy();
    expect(document.body.textContent).toMatch(/quality|max width|max height/i);
  });

  it('selects different output format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const webpBtn = btns.find(b => /^WebP$/i.test(b.textContent.trim()));
    await user.click(webpBtn);
  });

  it('changes quality slider', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const slider = screen.getByRole('slider');
    if (slider) {
      const { fireEvent } = await import('@testing-library/react');
      fireEvent.change(slider, { target: { value: '50' } });
    }
  });

  it('changes max width and height', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const numInputs = screen.getAllByRole('spinbutton');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]); await user.type(numInputs[0], '800');
      await user.clear(numInputs[1]); await user.type(numInputs[1], '600');
    }
  });
});
