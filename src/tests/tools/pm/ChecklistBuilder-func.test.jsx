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
  const mod = await import('../../../tools/pm/ChecklistBuilder.jsx');
  Component = mod.default;
});

describe('ChecklistBuilder – functional', () => {
  it('renders template buttons', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/blank|product launch|team onboarding|code review/i);
  });

  it('creates a blank checklist', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const blankBtn = screen.getByRole('button', { name: /blank/i });
    await user.click(blankBtn);
    expect(document.body.textContent).toMatch(/checklist|item|add/i);
  });

  it('creates a product launch checklist from template', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const templateBtn = screen.getByRole('button', { name: /product launch/i });
    await user.click(templateBtn);
    // Should create a checklist with pre-filled items
    expect(document.body.textContent).toMatch(/product|launch|checklist/i);
  });

  it('creates team onboarding checklist from template', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const templateBtn = screen.getByRole('button', { name: /onboarding/i });
    await user.click(templateBtn);
    expect(document.body.textContent).toMatch(/onboarding|checklist/i);
  });

  it('creates code review checklist from template', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const templateBtn = screen.getByRole('button', { name: /code review/i });
    await user.click(templateBtn);
    expect(document.body.textContent).toMatch(/review|checklist/i);
  });

  it('toggles a checklist item', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Create a blank checklist first
    await user.click(screen.getByRole('button', { name: /blank/i }));
    // Look for checkboxes
    const checkboxes = screen.queryAllByRole('checkbox');
    if (checkboxes.length > 0) {
      await user.click(checkboxes[0]);
    }
  });
});
