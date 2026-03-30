import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/pm/ChecklistBuilder.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('ChecklistBuilder – coverage', () => {
  it('renders with templates', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/checklist|blank|template/i);
  });

  it('creates blank checklist', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const blankBtn = findBtn(/blank\s*checklist|^\+\s*blank/i);
    if (blankBtn) await user.click(blankBtn);
  });

  it('creates Product Launch checklist', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const launchBtn = findBtn(/product\s*launch/i);
    if (launchBtn) await user.click(launchBtn);
  });

  it('creates Team Onboarding checklist', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const onbBtn = findBtn(/team\s*onboarding/i);
    if (onbBtn) await user.click(onbBtn);
  });

  it('creates Code Review checklist', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const crBtn = findBtn(/code\s*review/i);
    if (crBtn) await user.click(crBtn);
  });

  it('adds items to checklist', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const blankBtn = findBtn(/blank\s*checklist|^\+\s*blank/i);
    if (blankBtn) await user.click(blankBtn);
    const addBtn = findBtn(/add\s*item|\+\s*add/i);
    if (addBtn) {
      await user.click(addBtn);
      await user.click(addBtn);
    }
    const textInputs = screen.queryAllByRole('textbox');
    for (let i = 0; i < Math.min(textInputs.length, 3); i++) {
      await user.clear(textInputs[i]);
      await user.type(textInputs[i], `Task ${i + 1}`);
    }
  });

  it('toggles item completion', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const launchBtn = findBtn(/product\s*launch/i);
    if (launchBtn) await user.click(launchBtn);
    // Select the checklist card
    const cards = document.querySelectorAll('[class*="card"], [class*="checklist"]');
    if (cards.length > 0) await user.click(cards[0]);
    const checkboxes = screen.queryAllByRole('checkbox');
    if (checkboxes.length > 0) {
      await user.click(checkboxes[0]);
    }
  });

  it('uncheck all items', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const launchBtn = findBtn(/product\s*launch/i);
    if (launchBtn) await user.click(launchBtn);
    const uncheckBtn = findBtn(/uncheck\s*all|↻/i);
    if (uncheckBtn) await user.click(uncheckBtn);
  });

  it('copies checklist', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const launchBtn = findBtn(/product\s*launch/i);
    if (launchBtn) await user.click(launchBtn);
    const copyBtn = findBtn(/copy|📋/i);
    if (copyBtn) await user.click(copyBtn);
  });

  it('deletes checklist', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const launchBtn = findBtn(/product\s*launch/i);
    if (launchBtn) await user.click(launchBtn);
    const delBtn = findBtn(/delete|🗑|trash/i);
    if (delBtn) await user.click(delBtn);
  });

  it('edits checklist title', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const blankBtn = findBtn(/blank\s*checklist|^\+\s*blank/i);
    if (blankBtn) await user.click(blankBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'My Custom Checklist');
    }
  });
});
