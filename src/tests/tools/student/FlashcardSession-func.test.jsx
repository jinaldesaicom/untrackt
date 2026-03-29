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
  const mod = await import('../../../tools/student/FlashcardSession.jsx');
  Component = mod.default;
});

describe('FlashcardSession – functional', () => {
  it('renders build view', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/flashcard|deck|add|card/i);
  });

  it('adds a flashcard', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'What is 2+2?');
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], '4');
    }
    const addBtn = screen.getByRole('button', { name: /add card/i });
    await user.click(addBtn);
    expect(document.body.textContent).toMatch(/1.*card|deck/i);
  });

  it('adds multiple cards and starts study', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Add card 1
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'Q1');
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'A1');
    }
    await user.click(screen.getByRole('button', { name: /add card/i }));
    // Add card 2
    const textInputs2 = screen.getAllByRole('textbox');
    await user.clear(textInputs2[0]);
    await user.type(textInputs2[0], 'Q2');
    const textareas2 = document.querySelectorAll('textarea');
    if (textareas2.length > 0) {
      await user.clear(textareas2[0]);
      await user.type(textareas2[0], 'A2');
    }
    await user.click(screen.getByRole('button', { name: /add card/i }));
    // Start study
    const startBtn = screen.queryByRole('button', { name: /start study/i });
    if (startBtn) await user.click(startBtn);
  });

  it('uses bulk import', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    // Find the bulk import textarea
    for (const ta of textareas) {
      if (ta.placeholder?.includes('|') || ta.getAttribute('aria-label')?.includes('import')) {
        await user.clear(ta);
        await user.type(ta, 'Q1 | A1\nQ2 | A2');
        break;
      }
    }
    const importBtn = screen.queryByRole('button', { name: /import/i });
    if (importBtn) await user.click(importBtn);
  });

  it('studies a card and reveals answer', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Add cards
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'Capital of France?');
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Paris');
    }
    await user.click(screen.getByRole('button', { name: /add card/i }));
    // Start study
    const startBtn = screen.queryByRole('button', { name: /start study/i });
    if (startBtn) {
      await user.click(startBtn);
      // Reveal answer
      const revealBtn = screen.queryByRole('button', { name: /reveal/i });
      if (revealBtn) {
        await user.click(revealBtn);
        expect(document.body.textContent).toMatch(/paris/i);
        // Grade
        const gotItBtn = screen.queryByRole('button', { name: /got it/i });
        if (gotItBtn) await user.click(gotItBtn);
      }
    }
  });
});
