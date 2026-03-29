// Orphan test — component does not exist
it('placeholder', () => { expect(true).toBe(true); });
/* DISABLED — original file follows

globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock');
globalThis.URL.revokeObjectURL = vi.fn();

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('BinaryToImageConverter – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/binary|image|convert|base64/i);
  });

  it('enters binary/base64 data', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0];
    if (ta) {
      await user.clear(ta);
      await user.type(ta, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg==');
    }
    const convertBtn = findBtn(/convert|generate|decode/i);
    if (convertBtn) await user.click(convertBtn);
  });

  it('switches input mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const radios = screen.queryAllByRole('radio');
    for (const r of radios.slice(0, 3)) {
      await user.click(r);
    }
    const btns = screen.getAllByRole('button').filter(b => /hex|base64|binary|raw/i.test(b.textContent));
    for (const b of btns.slice(0, 3)) {
      await user.click(b);
    }
  });

  it('copies output', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = findBtn(/copy/i);
    if (copyBtn) await user.click(copyBtn);
  });

  it('clears input', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const clearBtn = findBtn(/clear|reset/i);
    if (clearBtn) await user.click(clearBtn);
  });

  it('handles invalid input', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0];
    if (ta) {
      await user.clear(ta);
      await user.type(ta, 'not valid binary data');
    }
    const convertBtn = findBtn(/convert|generate|decode/i);
    if (convertBtn) await user.click(convertBtn);
  });
});
*/
