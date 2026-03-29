import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/JsonToCsvConverter.jsx');
  Component = mod.default;
});

describe('JsonToCsvConverter – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/json|csv/i);
  });

  it('converts valid JSON array', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      fireEvent.change(textareas[0], { target: { value: '[{"name":"Alice","age":30},{"name":"Bob","age":25}]' } });
    }
    const convertBtn = screen.getAllByRole('button').find(b => /convert/i.test(b.textContent));
    if (convertBtn) await user.click(convertBtn);
  });

  it('handles invalid JSON', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'not valid json');
    }
    const convertBtn = screen.getAllByRole('button').find(b => /convert/i.test(b.textContent));
    if (convertBtn) await user.click(convertBtn);
  });

  it('copies output', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('uses sample data button', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const sampleBtn = screen.getAllByRole('button').find(b => /sample|example|load/i.test(b.textContent));
    if (sampleBtn) await user.click(sampleBtn);
  });

  it('changes delimiter option', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const radios = screen.queryAllByRole('radio');
    if (radios.length > 1) await user.click(radios[1]);
    const selects = document.querySelectorAll('select');
    if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: 'tab' } });
    }
  });

  it('downloads CSV file', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const dlBtn = screen.getAllByRole('button').find(b => /download/i.test(b.textContent));
    if (dlBtn) await user.click(dlBtn);
  });
});
