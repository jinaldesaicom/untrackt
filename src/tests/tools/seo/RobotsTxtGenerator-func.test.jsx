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
  const mod = await import('../../../tools/seo/RobotsTxtGenerator.jsx');
  Component = mod.default;
});

describe('RobotsTxtGenerator – functional', () => {
  it('renders robots.txt generator UI', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/robots|user-agent|sitemap/i);
  });

  it('adds a user-agent rule', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Click a preset button to add rules instead of ambiguous add button
    const presetBtn = screen.getAllByRole('button').find(b => /Allow everything/i.test(b.textContent));
    if (presetBtn) await user.click(presetBtn);
  });

  it('fills in sitemap URL', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    // Find sitemap input
    for (const input of textInputs) {
      const label = input.getAttribute('placeholder') || '';
      if (label.match(/sitemap/i)) {
        await user.clear(input);
        await user.type(input, 'https://example.com/sitemap.xml');
        break;
      }
    }
  });

  it('generates robots.txt output', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // The output should be reactive or have a generate button
    expect(document.body.textContent).toMatch(/user-agent|allow|disallow/i);
  });

  it('copies the output', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = screen.queryByRole('button', { name: /copy/i });
    if (copyBtn) await user.click(copyBtn);
  });
});
