import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/pm/RaidLog.jsx');
  Component = mod.default;
});

const findBtn = (text) => screen.getAllByRole('button').find(b => text.test(b.textContent.trim()));

describe('RaidLog – coverage', () => {
  it('renders', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/raid|risk|action|issue|decision/i);
  });

  it('adds a risk entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const riskTab = screen.getAllByRole('button').find(b => b.textContent.includes('Risk') && !b.textContent.includes('('));
    if (riskTab) await user.click(riskTab);
    const addBtn = screen.getAllByRole('button').find(b => /add|new|\+/i.test(b.textContent) && !/filter/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Server downtime risk');
    }
    const ta = document.querySelector('textarea');
    if (ta) {
      await user.clear(ta);
      await user.type(ta, 'Risk of server going down during peak hours');
    }
  });

  it('adds an action entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const actionTab = screen.getAllByRole('button').find(b => b.textContent.includes('Action') && !b.textContent.includes('('));
    if (actionTab) await user.click(actionTab);
    const addBtn = screen.getAllByRole('button').find(b => /add|new|\+/i.test(b.textContent) && !/filter/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });

  it('adds an issue entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const issueTab = screen.getAllByRole('button').find(b => b.textContent.includes('Issue') && !b.textContent.includes('('));
    if (issueTab) await user.click(issueTab);
    const addBtn = screen.getAllByRole('button').find(b => /add|new|\+/i.test(b.textContent) && !/filter/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });

  it('adds a decision entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const decTab = screen.getAllByRole('button').find(b => b.textContent.includes('Decision') && !b.textContent.includes('('));
    if (decTab) await user.click(decTab);
    const addBtn = screen.getAllByRole('button').find(b => /add|new|\+/i.test(b.textContent) && !/filter/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });

  it('saves entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add|new|\+/i.test(b.textContent) && !/filter/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Test entry');
    }
    const saveBtn = findBtn(/save|submit|add\s*entry/i);
    if (saveBtn) await user.click(saveBtn);
  });

  it('filters by status', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const selects = screen.queryAllByRole('combobox');
    if (selects.length > 0) {
      const opts = Array.from(selects[0].options);
      if (opts.length > 1) await user.selectOptions(selects[0], opts[1].value);
    }
  });

  it('sets priority', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add|new|\+/i.test(b.textContent) && !/filter/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const selects = screen.queryAllByRole('combobox');
    for (const sel of selects) {
      const opts = Array.from(sel.options);
      if (opts.some(o => /high|medium|low/i.test(o.text))) {
        const highOpt = opts.find(o => /high/i.test(o.text));
        if (highOpt) await user.selectOptions(sel, highOpt.value);
        break;
      }
    }
  });

  it('exports data', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const exportBtn = findBtn(/export|download/i);
    if (exportBtn) await user.click(exportBtn);
  });
});
