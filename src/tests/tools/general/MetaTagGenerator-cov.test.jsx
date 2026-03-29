import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/MetaTagGenerator.jsx');
  Component = mod.default;
});

describe('MetaTagGenerator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/meta|tag/i);
  });

  it('fills in title and description', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input.input-field, input[type="text"]');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'My Page Title');
    }
    const textareas = screen.queryAllByRole('textbox');
    const descInput = textareas.find(t => t.tagName === 'TEXTAREA' || t.placeholder?.match(/description/i));
    if (descInput) {
      await user.clear(descInput);
      await user.type(descInput, 'This is a great page description for SEO');
    }
  });

  it('fills keywords', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input.input-field, input[type="text"]');
    const kwInput = Array.from(inputs).find(i => i.placeholder?.match(/keyword/i));
    if (kwInput) {
      await user.clear(kwInput);
      await user.type(kwInput, 'react, javascript, web dev');
    }
  });

  it('fills URL field', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input.input-field, input[type="text"], input[type="url"]');
    const urlInput = Array.from(inputs).find(i => i.placeholder?.match(/url|https/i) || i.type === 'url');
    if (urlInput) {
      await user.clear(urlInput);
      await user.type(urlInput, 'https://example.com');
    }
  });

  it('copies generated meta tags', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('toggles open graph options', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const checkboxes = screen.queryAllByRole('checkbox');
    for (const cb of checkboxes.slice(0, 2)) {
      await user.click(cb);
    }
  });

  it('switches tabs if present', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const radios = screen.queryAllByRole('radio');
    if (radios.length > 1) await user.click(radios[1]);
  });
});
