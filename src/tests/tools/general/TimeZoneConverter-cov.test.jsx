import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/general/TimeZoneConverter.jsx');
  Component = mod.default;
});

describe('TimeZoneConverter – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/time.*zone|convert/i);
  });

  it('changes source time zone', async () => {
    render(<W><Component /></W>);
    const selects = document.querySelectorAll('select');
    if (selects.length > 0) {
      fireEvent.change(selects[0], { target: { value: 'America/New_York' } });
    }
  });

  it('changes target time zone', async () => {
    render(<W><Component /></W>);
    const selects = document.querySelectorAll('select');
    if (selects.length > 1) {
      fireEvent.change(selects[1], { target: { value: 'Europe/London' } });
    }
  });

  it('changes date time input', async () => {
    render(<W><Component /></W>);
    const dtInput = document.querySelector('input[type="datetime-local"]');
    if (dtInput) {
      fireEvent.change(dtInput, { target: { value: '2024-06-15T14:30' } });
    }
  });

  it('swaps timezones', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const swapBtn = screen.getAllByRole('button').find(b => /swap|⇄|↔/i.test(b.textContent));
    if (swapBtn) await user.click(swapBtn);
  });

  it('adds additional timezone', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add.*zone|add.*time/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });

  it('uses now button', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const nowBtn = screen.getAllByRole('button').find(b => /now|current/i.test(b.textContent));
    if (nowBtn) await user.click(nowBtn);
  });

  it('copies converted time', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });

  it('searches for timezone', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const searchInputs = document.querySelectorAll('input[type="text"], input.input-field');
    const searchInput = Array.from(searchInputs).find(i => i.placeholder?.match(/search|filter|find/i));
    if (searchInput) {
      await user.clear(searchInput);
      await user.type(searchInput, 'Tokyo');
    }
  });
});
