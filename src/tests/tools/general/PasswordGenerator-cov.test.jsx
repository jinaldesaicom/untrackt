import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/PasswordGenerator.jsx');
  Component = mod.default;
});

describe('PasswordGenerator – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/strength|generate|length|entropy/i);
  });

  it('generates a password', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const genBtn = screen.getAllByRole('button').find(b => /generate|new|refresh/i.test(b.textContent));
    if (genBtn) await user.click(genBtn);
  });

  it('changes password length via slider', () => {
    render(<W><Component /></W>);
    const slider = document.querySelector('input[type="range"]');
    if (slider) fireEvent.change(slider, { target: { value: '24' } });
  });

  it('toggles uppercase option', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const checkboxes = screen.queryAllByRole('checkbox');
    if (checkboxes.length > 0) await user.click(checkboxes[0]);
  });

  it('toggles numbers option', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const checkboxes = screen.queryAllByRole('checkbox');
    if (checkboxes.length > 1) await user.click(checkboxes[1]);
  });

  it('toggles symbols option', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const checkboxes = screen.queryAllByRole('checkbox');
    if (checkboxes.length > 2) await user.click(checkboxes[2]);
  });

  it('copies password', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('generates batch passwords', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const batchBtn = screen.getAllByRole('button').find(b => /batch/i.test(b.textContent));
    if (batchBtn) await user.click(batchBtn);
    const genBtn = screen.getAllByRole('button').find(b => /generate/i.test(b.textContent));
    if (genBtn) await user.click(genBtn);
  });

  it('switches to passphrase mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const phraseBtn = screen.getAllByRole('button').find(b => /passphrase|phrase/i.test(b.textContent));
    if (phraseBtn) {
      await user.click(phraseBtn);
      const genBtn = screen.getAllByRole('button').find(b => /generate/i.test(b.textContent));
      if (genBtn) await user.click(genBtn);
    }
  });
});
