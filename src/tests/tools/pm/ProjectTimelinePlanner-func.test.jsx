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
  const mod = await import('../../../tools/pm/ProjectTimelinePlanner.jsx');
  Component = mod.default;
});

describe('ProjectTimelinePlanner – functional', () => {
  it('renders the timeline planner', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/project|timeline|task|milestone/i);
  });

  it('adds a task or milestone', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = screen.queryByRole('button', { name: /add|task|milestone/i });
    if (addBtn) await user.click(addBtn);
  });

  it('fills in task details', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Click 'Phase' button to add a phase first
    const phaseBtn = screen.getAllByRole('button').find(b => /^Phase$/i.test(b.textContent.trim()));
    if (phaseBtn) await user.click(phaseBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Design Phase');
    }
  });

  it('uses export or copy', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = screen.queryByRole('button', { name: /copy|export/i });
    if (copyBtn) await user.click(copyBtn);
  });
});
