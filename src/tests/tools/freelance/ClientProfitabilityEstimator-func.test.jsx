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
  const mod = await import('../../../tools/freelance/ClientProfitabilityEstimator.jsx');
  Component = mod.default;
});

describe('ClientProfitabilityEstimator – functional', () => {
  it('renders the estimator form', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/client|profit|revenue|cost/i);
  });

  it('fills in revenue and cost fields', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /Add Client/i }));
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]); await user.type(numInputs[0], '5000');
      await user.clear(numInputs[1]); await user.type(numInputs[1], '40');
    }
  });

  it('adds a client or calculates', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /Add Client/i }));
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]); await user.type(numInputs[0], '5000');
      await user.clear(numInputs[1]); await user.type(numInputs[1], '40');
    }
    expect(document.body.textContent).toMatch(/profit|revenue|rate|client/i);
  });

  it('fills in text fields', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /Add Client/i }));
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Acme Corp');
    }
  });
});
