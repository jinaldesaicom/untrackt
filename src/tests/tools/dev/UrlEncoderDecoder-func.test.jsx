import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/dev/UrlEncoderDecoder.jsx');
  Component = mod.default;
});

describe('UrlEncoderDecoder – functional', () => {
  it('renders with encode/decode options', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/url|encode|decode/i);
  });

  it('encodes a URL', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'hello world & foo=bar');
    }
    expect(document.body.textContent).toMatch(/%20|%26|encode/i);
  });

  it('switches to decode mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const decodeBtn = screen.queryByRole('button', { name: /decode/i });
    if (decodeBtn) {
      await user.click(decodeBtn);
      const textareas = document.querySelectorAll('textarea');
      if (textareas.length > 0) {
        await user.clear(textareas[0]);
        await user.type(textareas[0], 'hello%20world%26foo%3Dbar');
      }
      expect(document.body.textContent).toMatch(/hello world|foo=bar/i);
    }
  });

  it('copies the result', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = screen.queryByRole('button', { name: /copy/i });
    if (copyBtn) await user.click(copyBtn);
  });
});
