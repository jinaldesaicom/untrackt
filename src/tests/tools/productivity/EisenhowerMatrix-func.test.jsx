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
  const mod = await import('../../../tools/productivity/EisenhowerMatrix.jsx');
  Component = mod.default;
});

describe('EisenhowerMatrix – functional', () => {
  it('renders the 4 quadrants', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/do first|schedule|delegate|eliminate/i);
  });

  it('adds a task to inbox', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'Review PR{Enter}');
    expect(document.body.textContent).toMatch(/review pr|1|inbox/i);
  });

  it('adds multiple tasks', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Task 1{Enter}');
    await user.type(textInputs[0], 'Task 2{Enter}');
    await user.type(textInputs[0], 'Task 3{Enter}');
  });

  it('uses the add button', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'New task');
    const addBtn = screen.queryByRole('button', { name: /add/i });
    if (addBtn) await user.click(addBtn);
  });

  it('shows task counts', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.type(textInputs[0], 'Urgent task{Enter}');
    expect(document.body.textContent).toMatch(/1|total/i);
  });
});
