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
  const mod = await import('../../../tools/pm/WorkloadCalculator.jsx');
  Component = mod.default;
});

describe('WorkloadCalculator – functional', () => {
  it('renders workload fields', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/workload|team|hours|capacity/i);
  });

  it('adds a team member or task', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = screen.queryByRole('button', { name: /add|member|task/i });
    if (addBtn) await user.click(addBtn);
  });

  it('fills in capacity inputs', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Click 'Add Person' to add a team member first
    const addBtn = screen.getAllByRole('button').find(b => /Add Person/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '40');
    }
  });
});
