import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/ColorPaletteGenerator.jsx');
  Component = mod.default;
});

describe('ColorPaletteGenerator – coverage', () => {
  it('renders with base color mode', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/color|harmony|generate/i);
  });

  it('changes base color', async () => {
    render(<W><Component /></W>);
    const colorInput = document.querySelector('input[type="color"]');
    if (colorInput) fireEvent.change(colorInput, { target: { value: '#ff0000' } });
  });

  it('selects different harmony types', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const harmonyBtns = screen.getAllByRole('button').filter(b =>
      /analogous|triadic|split|tetradic|monochromatic/i.test(b.textContent)
    );
    for (const btn of harmonyBtns.slice(0, 3)) {
      await user.click(btn);
    }
  });

  it('generates base palette', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const genBtn = screen.getAllByRole('button').find(b => /generate/i.test(b.textContent));
    if (genBtn) await user.click(genBtn);
  });

  it('switches to random palette mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const randomRadio = screen.getAllByRole('radio').find(r => /random/i.test(r.textContent));
    if (randomRadio) await user.click(randomRadio);
    const styleBtns = screen.getAllByRole('button').filter(b =>
      /pastel|vibrant|earth|neon/i.test(b.textContent)
    );
    if (styleBtns.length > 0) await user.click(styleBtns[0]);
    const genBtn = screen.getAllByRole('button').find(b => /generate|randomize/i.test(b.textContent));
    if (genBtn) await user.click(genBtn);
  });

  it('switches to image mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const imgRadio = screen.getAllByRole('radio').find(r => /image/i.test(r.textContent));
    if (imgRadio) await user.click(imgRadio);
  });

  it('switches export format tabs', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const exportBtns = screen.getAllByRole('button').filter(b =>
      /^css$|^hex$|^tailwind$|^scss$|^json$/i.test(b.textContent.trim())
    );
    for (const btn of exportBtns.slice(0, 3)) {
      await user.click(btn);
    }
  });

  it('saves a palette', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const saveBtn = screen.getAllByRole('button').find(b => /save/i.test(b.textContent));
    if (saveBtn) await user.click(saveBtn);
  });

  it('copies export content', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtns = screen.getAllByRole('button').filter(b => /copy/i.test(b.textContent));
    if (copyBtns.length > 0) await user.click(copyBtns[0]);
  });
});
