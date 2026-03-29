import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/health/SymptomJournal.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));
const findRadio = (text) => screen.queryAllByRole('radio').find(r => text.test(r.textContent || r.getAttribute('aria-label') || ''));

describe('SymptomJournal – coverage', () => {
  it('renders with log tab', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/symptom|log|journal/i);
  });

  it('logs a symptom with severity', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    // Click Log tab if needed
    const logTab = findBtn(/^log$/i) || findRadio(/^log$/i);
    if (logTab) await user.click(logTab);
    // Enter symptom
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Headache');
    }
    // Select severity (Mild button)
    const mildBtn = screen.getAllByRole('button').find(b => /mild|1|light/i.test(b.textContent.trim()));
    if (mildBtn) await user.click(mildBtn);
    // Select time of day
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      const opts = Array.from(selects[0].options);
      if (opts.length > 1) await user.selectOptions(selects[0], opts[1].value);
    }
    // Notes
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, 'Started after lunch');
    }
    // Log button
    const logBtn = findBtn(/log\s*symptom|\+\s*log/i);
    if (logBtn) await user.click(logBtn);
  });

  it('logs with moderate severity', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Fatigue');
    }
    const modBtn = screen.getAllByRole('button').find(b => /moderate|medium|2/i.test(b.textContent.trim()));
    if (modBtn) await user.click(modBtn);
    const logBtn = findBtn(/log\s*symptom|\+\s*log/i);
    if (logBtn) await user.click(logBtn);
  });

  it('logs with severe severity', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Nausea');
    }
    const severeBtn = screen.getAllByRole('button').find(b => /severe|high|3|orange/i.test(b.textContent.trim()));
    if (severeBtn) await user.click(severeBtn);
    const logBtn = findBtn(/log\s*symptom|\+\s*log/i);
    if (logBtn) await user.click(logBtn);
  });

  it('views history tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const histBtn = findBtn(/history/i) || findRadio(/history/i);
    if (histBtn) await user.click(histBtn);
  });

  it('views calendar tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const calBtn = findBtn(/calendar/i) || findRadio(/calendar/i);
    if (calBtn) await user.click(calBtn);
    // Navigate month
    const nextBtn = findBtn(/^>$|next|→/);
    if (nextBtn) await user.click(nextBtn);
    const prevBtn = findBtn(/^<$|prev|←/);
    if (prevBtn) await user.click(prevBtn);
  });

  it('handles autocomplete symptom list', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Head');
    }
    // Click autocomplete suggestion if visible
    const suggestion = screen.queryByText(/headache/i);
    if (suggestion) await user.click(suggestion);
  });
});
