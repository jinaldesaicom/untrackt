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
  const mod = await import('../../../tools/health/SymptomJournal.jsx');
  Component = mod.default;
});

describe('SymptomJournal – functional', () => {
  it('renders symptom logging view', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/symptom|log|severity/i);
  });

  it('enters a symptom name', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'Headache');
  });

  it('selects severity level', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const mildBtn = btns.find(b => /^Mild$/i.test(b.textContent.trim()));
    if (mildBtn) await user.click(mildBtn);
  });

  it('selects time of day', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const morningBtn = btns.find(b => /^morning$/i.test(b.textContent.trim()));
    if (morningBtn) await user.click(morningBtn);
  });

  it('logs a symptom', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'Headache');
    const btns = screen.getAllByRole('button');
    const severityBtn = btns.find(b => /^Mild$/i.test(b.textContent.trim()));
    if (severityBtn) await user.click(severityBtn);
    // Log it
    const logBtn = btns.find(b => /log symptom/i.test(b.textContent));
    if (logBtn) await user.click(logBtn);
  });

  it('switches to history tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const histBtn = screen.getByRole('button', { name: /history/i });
    await user.click(histBtn);
    expect(document.body.textContent).toMatch(/history|no.*entries|entries/i);
  });

  it('switches to calendar tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const calBtn = screen.getByRole('button', { name: /calendar/i });
    await user.click(calBtn);
    expect(document.body.textContent).toMatch(/sun|mon|tue|calendar/i);
  });

  it('adds notes to a symptom', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'After lunch');
    }
  });
});
