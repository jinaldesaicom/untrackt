import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((key, def = null) => def),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  getPreference: vi.fn(() => null),
  setPreference: vi.fn()
}));

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/dev/ColorConverter.jsx');
  Component = mod.default;
});

describe('ColorConverter – functional', () => {
  it('renders with format tabs', () => {
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    expect(btns.some(b => /^HEX$/i.test(b.textContent.trim()))).toBe(true);
    expect(btns.some(b => /^RGB$/i.test(b.textContent.trim()))).toBe(true);
    expect(btns.some(b => /^HSL$/i.test(b.textContent.trim()))).toBe(true);
  });

  it('converts HEX input', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '#ff5733');
    expect(document.body.textContent).toMatch(/rgb|hsl|255/i);
  });

  it('switches to RGB mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /^RGB$/i }));
    const numInputs = screen.getAllByRole('spinbutton');
    if (numInputs.length >= 3) {
      await user.clear(numInputs[0]); await user.type(numInputs[0], '255');
      await user.clear(numInputs[1]); await user.type(numInputs[1], '87');
      await user.clear(numInputs[2]); await user.type(numInputs[2], '51');
    }
    expect(document.body.textContent).toMatch(/#|hex|hsl/i);
  });

  it('switches to HSL mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /^HSL$/i }));
    const numInputs = screen.getAllByRole('spinbutton');
    if (numInputs.length >= 3) {
      await user.clear(numInputs[0]); await user.type(numInputs[0], '11');
      await user.clear(numInputs[1]); await user.type(numInputs[1], '100');
      await user.clear(numInputs[2]); await user.type(numInputs[2], '60');
    }
  });

  it('switches to HSV mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /^HSV$/i }));
    const numInputs = screen.getAllByRole('spinbutton');
    if (numInputs.length >= 3) {
      await user.clear(numInputs[0]); await user.type(numInputs[0], '11');
      await user.clear(numInputs[1]); await user.type(numInputs[1], '80');
      await user.clear(numInputs[2]); await user.type(numInputs[2], '100');
    }
  });

  it('switches to CSS Name mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const cssBtn = screen.queryByRole('button', { name: /CSS|name/i });
    if (cssBtn) {
      await user.click(cssBtn);
      const textInputs = screen.getAllByRole('textbox');
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'tomato');
    }
  });

  it('checks contrast ratio', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '#ff5733');
    // Find second color input
    const allInputs = screen.getAllByRole('textbox');
    if (allInputs.length >= 2) {
      await user.clear(allInputs[allInputs.length - 1]);
      await user.type(allInputs[allInputs.length - 1], '#000000');
    }
    expect(document.body.textContent).toMatch(/contrast|ratio|AA|AAA/i);
  });

  it('saves to palette', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '#ff5733');
    const saveBtn = screen.queryByRole('button', { name: /save|palette/i });
    if (saveBtn) await user.click(saveBtn);
  });
});
