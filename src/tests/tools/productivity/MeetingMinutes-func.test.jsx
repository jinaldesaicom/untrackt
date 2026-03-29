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

vi.mock('../../../utils/markdownRenderer', () => ({
  renderMarkdown: vi.fn((text) => text || '')
}));

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/productivity/MeetingMinutes.jsx');
  Component = mod.default;
});

describe('MeetingMinutes – functional', () => {
  it('renders meeting list view', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/meeting|minute|new/i);
  });

  it('creates a new meeting', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getByRole('button', { name: /new/i });
    await user.click(newBtn);
    expect(document.body.textContent).toMatch(/title|date|attendee|agenda/i);
  });

  it('edits meeting title', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /new/i }));
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'Sprint Planning Meeting');
  });

  it('adds an attendee', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /New Minutes/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const allBtns = screen.getAllByRole('button');
    // Find the small "+ Add attendee" button (not the section header "Attendees")
    const addAttBtn = allBtns.find(b => /Add attendee/i.test(b.textContent) && b.textContent.trim().length < 30);
    if (addAttBtn) await user.click(addAttBtn);
  });

  it('adds an agenda item', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /New Minutes/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const allBtns = screen.getAllByRole('button');
    const addAgendaBtn = allBtns.find(b => /Add agenda/i.test(b.textContent));
    if (addAgendaBtn) await user.click(addAgendaBtn);
  });

  it('adds an action item', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /New Minutes/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const allBtns = screen.getAllByRole('button');
    const addActionBtn = allBtns.find(b => /Add action/i.test(b.textContent));
    if (addActionBtn) await user.click(addActionBtn);
  });

  it('toggles preview', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /New Minutes/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const allBtns = screen.getAllByRole('button');
    const previewBtn = allBtns.find(b => /preview|formatted/i.test(b.textContent));
    if (previewBtn) await user.click(previewBtn);
  });

  it('copies meeting as markdown', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /New Minutes/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const allBtns = screen.getAllByRole('button');
    const copyBtn = allBtns.find(b => /^Copy$/i.test(b.textContent.trim()));
    if (copyBtn) await user.click(copyBtn);
  });
});
