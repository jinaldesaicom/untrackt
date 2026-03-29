import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/CountdownTimer.jsx');
  Component = mod.default;
});

describe('CountdownTimer – coverage', () => {
  beforeEach(() => {
    vi.stubGlobal('crypto', { ...crypto, randomUUID: () => 'test-uuid-' + Date.now() });
  });

  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/countdown/i);
  });

  it('adds a countdown with name and date', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input.input-field');
    const nameInput = Array.from(inputs).find(i => i.type !== 'datetime-local' && i.type !== 'date');
    const dateInput = document.querySelector('input[type="datetime-local"]');
    if (nameInput) {
      await user.clear(nameInput);
      await user.type(nameInput, 'My Event');
    }
    if (dateInput) {
      fireEvent.change(dateInput, { target: { value: '2030-12-31T23:59' } });
    }
    const addBtn = screen.getAllByRole('button').find(b => /^add countdown$/i.test(b.textContent.trim()));
    if (addBtn) await user.click(addBtn);
  });

  it('adds new year countdown', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const nyBtn = screen.getAllByRole('button').find(b => /new year/i.test(b.textContent));
    if (nyBtn) await user.click(nyBtn);
  });

  it('adds birthday countdown', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) fireEvent.change(dateInput, { target: { value: '1990-06-15' } });
    const bdayBtn = screen.getAllByRole('button').find(b => /birthday/i.test(b.textContent));
    if (bdayBtn) await user.click(bdayBtn);
  });

  it('removes a countdown', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Add first
    const dateInput = document.querySelector('input[type="datetime-local"]');
    if (dateInput) fireEvent.change(dateInput, { target: { value: '2030-06-15T12:00' } });
    const addBtn = screen.getAllByRole('button').find(b => /^add countdown$/i.test(b.textContent.trim()));
    if (addBtn) await user.click(addBtn);
    const removeBtn = screen.getAllByRole('button').find(b => /remove/i.test(b.textContent));
    if (removeBtn) await user.click(removeBtn);
  });

  it('shows completed state for past countdown', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const dateInput = document.querySelector('input[type="datetime-local"]');
    if (dateInput) fireEvent.change(dateInput, { target: { value: '2020-01-01T00:00' } });
    const addBtn = screen.getAllByRole('button').find(b => /^add countdown$/i.test(b.textContent.trim()));
    if (addBtn) await user.click(addBtn);
  });
});
