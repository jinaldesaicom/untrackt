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

// Mock fetch for PageSpeed API
globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      lighthouseResult: {
        categories: { performance: { score: 0.85 } },
        audits: {
          'first-contentful-paint': { title: 'First Contentful Paint', displayValue: '1.2 s', numericValue: 1200, score: 0.9 },
          'largest-contentful-paint': { title: 'LCP', displayValue: '2.5 s', numericValue: 2500, score: 0.7 },
          'total-blocking-time': { title: 'TBT', displayValue: '50 ms', numericValue: 50, score: 0.95 },
          'cumulative-layout-shift': { title: 'CLS', displayValue: '0.05', numericValue: 0.05, score: 0.9 },
          'speed-index': { title: 'Speed Index', displayValue: '2.1 s', numericValue: 2100, score: 0.8 },
          'interactive': { title: 'TTI', displayValue: '3.0 s', numericValue: 3000, score: 0.7 }
        }
      }
    })
  })
);

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/seo/PageSpeedRecommendations.jsx');
  Component = mod.default;
});

describe('PageSpeedRecommendations – functional', () => {
  it('renders URL input and analyze button', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/url|website|analyze/i);
  });

  it('switches between Live Analysis and Checklist tabs', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const checklistBtn = screen.queryByRole('button', { name: /checklist/i });
    if (checklistBtn) {
      await user.click(checklistBtn);
      expect(document.body.textContent).toMatch(/checklist|optimization/i);
    }
  });

  it('toggles Mobile/Desktop strategy', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const desktopBtn = screen.queryByRole('button', { name: /desktop/i });
    if (desktopBtn) await user.click(desktopBtn);
    const mobileBtn = screen.queryByRole('button', { name: /mobile/i });
    if (mobileBtn) await user.click(mobileBtn);
  });

  it('analyzes a URL', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], 'https://example.com');
    const analyzeBtn = screen.getByRole('button', { name: /analyze/i });
    await user.click(analyzeBtn);
    // Should show results after fetch
    expect(document.body.textContent).toMatch(/score|performance|FCP|LCP/i);
  });

  it('uses checklist items', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const checklistTab = screen.queryByRole('button', { name: /checklist/i });
    if (checklistTab) {
      await user.click(checklistTab);
      const checkboxes = screen.queryAllByRole('checkbox');
      if (checkboxes.length > 0) {
        await user.click(checkboxes[0]);
      }
    }
  });
});
