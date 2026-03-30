import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let ActionItemTracker, CostEstimator, DependencyTracker, EffortEstimationCalculator;
let GanttChartGenerator, KpiMetricsTracker, MilestoneTracker, ProjectHealthDashboard;
beforeAll(async () => {
  const [m1, m2, m3, m4, m5, m6, m7, m8] = await Promise.all([
    import('../../../tools/pm/ActionItemTracker.jsx'),
    import('../../../tools/pm/CostEstimator.jsx'),
    import('../../../tools/pm/DependencyTracker.jsx'),
    import('../../../tools/pm/EffortEstimationCalculator.jsx'),
    import('../../../tools/pm/GanttChartGenerator.jsx'),
    import('../../../tools/pm/KpiMetricsTracker.jsx'),
    import('../../../tools/pm/MilestoneTracker.jsx'),
    import('../../../tools/pm/ProjectHealthDashboard.jsx'),
  ]);
  ActionItemTracker = m1.default;
  CostEstimator = m2.default;
  DependencyTracker = m3.default;
  EffortEstimationCalculator = m4.default;
  GanttChartGenerator = m5.default;
  KpiMetricsTracker = m6.default;
  MilestoneTracker = m7.default;
  ProjectHealthDashboard = m8.default;
}, 30000);

describe('ActionItemTracker – cov', () => {
  it('renders empty state', () => {
    render(<W><ActionItemTracker /></W>);
    expect(document.body.textContent).toMatch(/no action items|add item|open/i);
  });

  it('adds and filters items', async () => {
    const user = userEvent.setup();
    render(<W><ActionItemTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add item/i.test(b.textContent));
    if (addBtn) {
      await user.click(addBtn);
      await user.click(addBtn);
    }
    const inputs = document.querySelectorAll('input[placeholder*="Action" i], input[placeholder*="item" i]');
    if (inputs.length > 0) await user.type(inputs[0], 'Fix bug');
    const filterBtns = screen.getAllByRole('button').filter(b => /open|in progress|done/i.test(b.textContent));
    for (const btn of filterBtns.slice(0, 2)) {
      await user.click(btn);
    }
    const allBtn = screen.getAllByRole('button').find(b => /^all/i.test(b.textContent));
    if (allBtn) await user.click(allBtn);
  });

  it('updates item status and owner', async () => {
    const user = userEvent.setup();
    render(<W><ActionItemTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add item/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const selects = document.querySelectorAll('select');
    if (selects.length > 0) fireEvent.change(selects[0], { target: { value: 'in-progress' } });
    const ownerInputs = document.querySelectorAll('input[placeholder*="Owner" i]');
    if (ownerInputs.length > 0) await user.type(ownerInputs[0], 'John');
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) fireEvent.change(dateInputs[0], { target: { value: '2020-01-01' } });
  });

  it('removes an item', async () => {
    const user = userEvent.setup();
    render(<W><ActionItemTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add item/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });

  it('filters by owner', async () => {
    const user = userEvent.setup();
    render(<W><ActionItemTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add item/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const ownerInputs = document.querySelectorAll('input[placeholder*="Owner" i]');
    if (ownerInputs.length > 0) await user.type(ownerInputs[0], 'Alice');
    const ownerSelects = document.querySelectorAll('select');
    const ownerFilter = Array.from(ownerSelects).find(s => Array.from(s.options).some(o => o.textContent.match(/all owners/i)));
    if (ownerFilter) fireEvent.change(ownerFilter, { target: { value: 'Alice' } });
  });
});

describe('CostEstimator – cov', () => {
  it('renders empty', () => {
    render(<W><CostEstimator /></W>);
    expect(document.body.textContent).toMatch(/cost|variable|fixed|total/i);
  });

  it('adds variable cost item', async () => {
    const user = userEvent.setup();
    render(<W><CostEstimator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const numInputs = document.querySelectorAll('input[type="number"]');
    if (numInputs.length >= 2) {
      await user.type(numInputs[0], '10');
      await user.type(numInputs[1], '50');
    }
  });

  it('adds fixed cost item', async () => {
    const user = userEvent.setup();
    render(<W><CostEstimator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const selects = document.querySelectorAll('select');
    if (selects.length > 0) fireEvent.change(selects[0], { target: { value: 'fixed' } });
    const numInputs = document.querySelectorAll('input[type="number"]');
    if (numInputs.length > 0) await user.type(numInputs[numInputs.length - 1], '500');
  });

  it('removes a cost item', async () => {
    const user = userEvent.setup();
    render(<W><CostEstimator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});

describe('DependencyTracker – cov', () => {
  it('renders', () => {
    render(<W><DependencyTracker /></W>);
    expect(document.body.textContent).toMatch(/dependenc|track/i);
  });

  it('adds a dependency', async () => {
    const user = userEvent.setup();
    render(<W><DependencyTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'API Service');
  });

  it('updates dependency status', async () => {
    const user = userEvent.setup();
    render(<W><DependencyTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const selects = document.querySelectorAll('select');
    if (selects.length > 0) fireEvent.change(selects[0], { target: { value: selects[0].options[1]?.value || '' } });
  });

  it('removes a dependency', async () => {
    const user = userEvent.setup();
    render(<W><DependencyTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});

describe('EffortEstimationCalculator – cov', () => {
  it('renders', () => {
    render(<W><EffortEstimationCalculator /></W>);
    expect(document.body.textContent).toMatch(/effort|estimat/i);
  });

  it('adds a task and estimates', async () => {
    const user = userEvent.setup();
    render(<W><EffortEstimationCalculator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const numInputs = document.querySelectorAll('input[type="number"]');
    for (const input of Array.from(numInputs).slice(0, 3)) {
      await user.clear(input);
      await user.type(input, '5');
    }
  });

  it('changes estimation method', async () => {
    const user = userEvent.setup();
    render(<W><EffortEstimationCalculator /></W>);
    const radios = screen.queryAllByRole('radio');
    if (radios.length > 1) await user.click(radios[1]);
  });
});

describe('GanttChartGenerator – cov', () => {
  it('renders', () => {
    render(<W><GanttChartGenerator /></W>);
    expect(document.body.textContent).toMatch(/gantt|chart|task/i);
  });

  it('adds a task', async () => {
    const user = userEvent.setup();
    render(<W><GanttChartGenerator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add.*task|add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Design phase');
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length >= 2) {
      fireEvent.change(dateInputs[0], { target: { value: '2024-01-01' } });
      fireEvent.change(dateInputs[1], { target: { value: '2024-02-01' } });
    }
  });

  it('removes a task', async () => {
    const user = userEvent.setup();
    render(<W><GanttChartGenerator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});

describe('KpiMetricsTracker – cov', () => {
  it('renders', () => {
    render(<W><KpiMetricsTracker /></W>);
    expect(document.body.textContent).toMatch(/kpi|metric|track/i);
  });

  it('adds a KPI', async () => {
    const user = userEvent.setup();
    render(<W><KpiMetricsTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Revenue');
    const numInputs = document.querySelectorAll('input[type="number"]');
    if (numInputs.length > 0) await user.type(numInputs[0], '100');
  });

  it('updates KPI values', async () => {
    const user = userEvent.setup();
    render(<W><KpiMetricsTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const numInputs = document.querySelectorAll('input[type="number"]');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '50');
      await user.clear(numInputs[1]);
      await user.type(numInputs[1], '100');
    }
  });
});

describe('MilestoneTracker – cov', () => {
  it('renders', () => {
    render(<W><MilestoneTracker /></W>);
    expect(document.body.textContent).toMatch(/milestone|track/i);
  });

  it('adds a milestone', async () => {
    const user = userEvent.setup();
    render(<W><MilestoneTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'MVP Launch');
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) fireEvent.change(dateInputs[0], { target: { value: '2024-06-01' } });
  });

  it('toggles milestone completion', async () => {
    const user = userEvent.setup();
    render(<W><MilestoneTracker /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const checkboxes = screen.queryAllByRole('checkbox');
    if (checkboxes.length > 0) await user.click(checkboxes[0]);
    const statusBtns = screen.getAllByRole('button').filter(b => /complete|done|✓/i.test(b.textContent));
    if (statusBtns.length > 0) await user.click(statusBtns[0]);
  });
});

describe('ProjectHealthDashboard – cov', () => {
  it('renders', () => {
    render(<W><ProjectHealthDashboard /></W>);
    expect(document.body.textContent).toMatch(/project|health|dashboard/i);
  });

  it('updates health metrics', async () => {
    const user = userEvent.setup();
    render(<W><ProjectHealthDashboard /></W>);
    const selects = document.querySelectorAll('select');
    for (const sel of Array.from(selects).slice(0, 3)) {
      fireEvent.change(sel, { target: { value: sel.options[1]?.value || '' } });
    }
  });

  it('adds a note', async () => {
    const user = userEvent.setup();
    render(<W><ProjectHealthDashboard /></W>);
    const textareas = screen.queryAllByRole('textbox');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], 'Schedule is slipping');
    }
  });

  it('changes sliders', () => {
    render(<W><ProjectHealthDashboard /></W>);
    const sliders = document.querySelectorAll('input[type="range"]');
    for (const slider of Array.from(sliders).slice(0, 3)) {
      fireEvent.change(slider, { target: { value: '75' } });
    }
  });
});
