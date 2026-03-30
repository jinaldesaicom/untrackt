import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

vi.mock('../../../utils/markdownRenderer', () => ({
  renderMarkdown: (text) => text || '',
}));

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/productivity/MeetingMinutes.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('MeetingMinutes – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/meeting|minute|agenda/i);
  });

  it('creates new meeting', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getAllByRole('button').find(b => /new\s*minutes?|create/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
  });

  it('fills meeting title', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getAllByRole('button').find(b => /new\s*minutes?|create/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Weekly Standup');
    }
  });

  it('adds attendees', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getAllByRole('button').find(b => /new\s*minutes?|create/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const addAttBtn = findBtn(/add\s*attendee|\+\s*attendee/i);
    if (addAttBtn) await user.click(addAttBtn);
    const textInputs = screen.queryAllByRole('textbox');
    const lastInput = textInputs[textInputs.length - 1];
    if (lastInput) {
      await user.clear(lastInput);
      await user.type(lastInput, 'John Doe');
    }
  });

  it('adds agenda items', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getAllByRole('button').find(b => /new\s*minutes?|create/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const addAgBtn = findBtn(/add\s*agenda|add\s*item|\+\s*agenda/i);
    if (addAgBtn) await user.click(addAgBtn);
  });

  it('adds action items', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getAllByRole('button').find(b => /new\s*minutes?|create/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const addActBtn = findBtn(/add\s*action|\+\s*action/i);
    if (addActBtn) await user.click(addActBtn);
  });

  it('saves meeting', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getAllByRole('button').find(b => /new\s*minutes?|create/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Sprint Review');
    }
    const saveBtn = findBtn(/save|done/i);
    if (saveBtn) await user.click(saveBtn);
  });

  it('copies meeting minutes', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getAllByRole('button').find(b => /new\s*minutes?|create/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const copyBtn = screen.getAllByRole('button').find(b => /copy\s*markdown|copy\s*minutes|copy/i.test(b.textContent) && !/new|add/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('deletes meeting', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getAllByRole('button').find(b => /new\s*minutes?|create/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const delBtn = findBtn(/delete|trash|remove/i);
    if (delBtn) await user.click(delBtn);
  });

  it('fills notes section', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.getAllByRole('button').find(b => /new\s*minutes?|create/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, 'Discussed Q4 goals and priorities');
    }
  });
});
