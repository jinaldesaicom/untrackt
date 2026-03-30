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
  const mod = await import('../../../tools/health/MoodTracker.jsx');
  Component = mod.default;
});

describe('MoodTracker – functional', () => {
  it('renders with mood logging view', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/mood|log|how.*feeling/i);
  });

  it('selects a mood', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // 5 mood emoji buttons
    const moodBtns = screen.queryAllByRole('button');
    const emojiBtn = moodBtns.find(b => /😄|😊|😐|😟|😢/.test(b.textContent));
    if (emojiBtn) await user.click(emojiBtn);
  });

  it('toggles activity buttons', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Select a mood first
    const moodBtns = screen.queryAllByRole('button');
    const emojiBtn = moodBtns.find(b => /😄|😊/.test(b.textContent));
    if (emojiBtn) await user.click(emojiBtn);
    // Then look for activity buttons
    const allBtns = screen.getAllByRole('button');
    const activityBtn = allBtns.find(b => /^🏃\s*Exercise$/i.test(b.textContent.trim()) || /^Exercise$/i.test(b.textContent.replace(/[^\w\s]/g, '').trim()));
    if (activityBtn) await user.click(activityBtn);
  });

  it('adds a journal note', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Select a mood first
    const moodBtns = screen.queryAllByRole('button');
    const emojiBtn = moodBtns.find(b => /😄/.test(b.textContent));
    if (emojiBtn) await user.click(emojiBtn);
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Had a great day!');
    }
    const saveBtn = screen.queryByRole('button', { name: /save/i });
    if (saveBtn) await user.click(saveBtn);
  });

  it('switches to calendar view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const calBtn = screen.getByRole('button', { name: /calendar/i });
    await user.click(calBtn);
    expect(document.body.textContent).toMatch(/sun|mon|tue|calendar/i);
  });

  it('switches to insights view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const insightsBtn = screen.getByRole('button', { name: /insight/i });
    await user.click(insightsBtn);
    expect(document.body.textContent).toMatch(/insight|average|streak|total/i);
  });

  it('navigates days', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const prevBtn = screen.queryAllByRole('button').find(b => b.textContent.includes('←') || b.getAttribute('aria-label')?.match(/prev/i));
    if (prevBtn) await user.click(prevBtn);
    const nextBtn = screen.queryAllByRole('button').find(b => b.textContent.includes('→') || b.getAttribute('aria-label')?.match(/next/i));
    if (nextBtn) await user.click(nextBtn);
  });
});
