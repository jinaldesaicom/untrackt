import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let ProjectStatusReport, ProjectTimelinePlanner, ResourceAllocationPlanner, RiskAssessmentMatrix;
let ScopeChangeLog, TaskBreakdownWBS, TimeBlockingPlanner, WorkloadCalculator;
beforeAll(async () => {
  const [m1, m2, m3, m4, m5, m6, m7, m8] = await Promise.all([
    import('../../../tools/pm/ProjectStatusReport.jsx'),
    import('../../../tools/pm/ProjectTimelinePlanner.jsx'),
    import('../../../tools/pm/ResourceAllocationPlanner.jsx'),
    import('../../../tools/pm/RiskAssessmentMatrix.jsx'),
    import('../../../tools/pm/ScopeChangeLog.jsx'),
    import('../../../tools/pm/TaskBreakdownWBS.jsx'),
    import('../../../tools/pm/TimeBlockingPlanner.jsx'),
    import('../../../tools/pm/WorkloadCalculator.jsx'),
  ]);
  ProjectStatusReport = m1.default;
  ProjectTimelinePlanner = m2.default;
  ResourceAllocationPlanner = m3.default;
  RiskAssessmentMatrix = m4.default;
  ScopeChangeLog = m5.default;
  TaskBreakdownWBS = m6.default;
  TimeBlockingPlanner = m7.default;
  WorkloadCalculator = m8.default;
}, 30000);

describe('ProjectStatusReport – cov', () => {
  it('renders', () => {
    render(<W><ProjectStatusReport /></W>);
    expect(document.body.textContent).toMatch(/status|report|project/i);
  });

  it('fills in report fields', async () => {
    const user = userEvent.setup();
    render(<W><ProjectStatusReport /></W>);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Sprint 5 Report');
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) await user.type(textareas[0], 'All tasks on track');
  });

  it('changes status indicators', async () => {
    render(<W><ProjectStatusReport /></W>);
    const selects = document.querySelectorAll('select');
    for (const sel of Array.from(selects).slice(0, 3)) {
      fireEvent.change(sel, { target: { value: sel.options[Math.min(1, sel.options.length - 1)]?.value || '' } });
    }
  });

  it('copies or exports report', async () => {
    const user = userEvent.setup();
    render(<W><ProjectStatusReport /></W>);
    const copyBtn = screen.getAllByRole('button').find(b => /copy|export/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});

describe('ProjectTimelinePlanner – cov', () => {
  it('renders', () => {
    render(<W><ProjectTimelinePlanner /></W>);
    expect(document.body.textContent).toMatch(/timeline|planner|phase/i);
  });

  it('adds a phase', async () => {
    const user = userEvent.setup();
    render(<W><ProjectTimelinePlanner /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Planning Phase');
  });

  it('sets dates for a phase', async () => {
    const user = userEvent.setup();
    render(<W><ProjectTimelinePlanner /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length >= 2) {
      fireEvent.change(dateInputs[0], { target: { value: '2024-01-01' } });
      fireEvent.change(dateInputs[1], { target: { value: '2024-03-01' } });
    }
  });

  it('removes a phase', async () => {
    const user = userEvent.setup();
    render(<W><ProjectTimelinePlanner /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});

describe('ResourceAllocationPlanner – cov', () => {
  it('renders', () => {
    render(<W><ResourceAllocationPlanner /></W>);
    expect(document.body.textContent).toMatch(/resource|allocat/i);
  });

  it('adds a resource', async () => {
    const user = userEvent.setup();
    render(<W><ResourceAllocationPlanner /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Developer A');
  });

  it('changes allocation percentage', async () => {
    const user = userEvent.setup();
    render(<W><ResourceAllocationPlanner /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const numInputs = document.querySelectorAll('input[type="number"]');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '80');
    }
    const sliders = document.querySelectorAll('input[type="range"]');
    if (sliders.length > 0) fireEvent.change(sliders[0], { target: { value: '80' } });
  });

  it('removes a resource', async () => {
    const user = userEvent.setup();
    render(<W><ResourceAllocationPlanner /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});

describe('RiskAssessmentMatrix – cov', () => {
  it('renders', () => {
    render(<W><RiskAssessmentMatrix /></W>);
    expect(document.body.textContent).toMatch(/risk|assess|matrix/i);
  });

  it('adds a risk', async () => {
    const user = userEvent.setup();
    render(<W><RiskAssessmentMatrix /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Scope creep');
  });

  it('sets probability and impact', async () => {
    const user = userEvent.setup();
    render(<W><RiskAssessmentMatrix /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const selects = document.querySelectorAll('select');
    for (const sel of Array.from(selects).slice(0, 2)) {
      fireEvent.change(sel, { target: { value: sel.options[Math.min(2, sel.options.length - 1)]?.value || '' } });
    }
    const sliders = document.querySelectorAll('input[type="range"]');
    for (const slider of Array.from(sliders).slice(0, 2)) {
      fireEvent.change(slider, { target: { value: '4' } });
    }
  });

  it('removes a risk', async () => {
    const user = userEvent.setup();
    render(<W><RiskAssessmentMatrix /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});

describe('ScopeChangeLog – cov', () => {
  it('renders', () => {
    render(<W><ScopeChangeLog /></W>);
    expect(document.body.textContent).toMatch(/scope|change/i);
  });

  it('adds a scope change', async () => {
    const user = userEvent.setup();
    render(<W><ScopeChangeLog /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'New feature request');
  });

  it('changes scope change status', async () => {
    const user = userEvent.setup();
    render(<W><ScopeChangeLog /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const selects = document.querySelectorAll('select');
    if (selects.length > 0) fireEvent.change(selects[0], { target: { value: selects[0].options[1]?.value || '' } });
  });
});

describe('TaskBreakdownWBS – cov', () => {
  it('renders', () => {
    render(<W><TaskBreakdownWBS /></W>);
    expect(document.body.textContent).toMatch(/task|breakdown|wbs/i);
  });

  it('adds a work package', async () => {
    const user = userEvent.setup();
    render(<W><TaskBreakdownWBS /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Design Module');
  });

  it('adds subtask under work package', async () => {
    const user = userEvent.setup();
    render(<W><TaskBreakdownWBS /></W>);
    const addBtns = screen.getAllByRole('button').filter(b => /add/i.test(b.textContent));
    if (addBtns.length > 0) await user.click(addBtns[0]);
    if (addBtns.length > 1) await user.click(addBtns[addBtns.length - 1]);
  });

  it('removes a task', async () => {
    const user = userEvent.setup();
    render(<W><TaskBreakdownWBS /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});

describe('TimeBlockingPlanner – cov', () => {
  it('renders', () => {
    render(<W><TimeBlockingPlanner /></W>);
    expect(document.body.textContent).toMatch(/day view|week view|monday/i);
  });

  it('adds a time block', async () => {
    const user = userEvent.setup();
    render(<W><TimeBlockingPlanner /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Deep work');
  });

  it('sets time block duration', async () => {
    const user = userEvent.setup();
    render(<W><TimeBlockingPlanner /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const timeInputs = document.querySelectorAll('input[type="time"]');
    if (timeInputs.length >= 2) {
      fireEvent.change(timeInputs[0], { target: { value: '09:00' } });
      fireEvent.change(timeInputs[1], { target: { value: '11:00' } });
    }
    const numInputs = document.querySelectorAll('input[type="number"]');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '120');
    }
  });

  it('removes a time block', async () => {
    const user = userEvent.setup();
    render(<W><TimeBlockingPlanner /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});

describe('WorkloadCalculator – cov', () => {
  it('renders', () => {
    render(<W><WorkloadCalculator /></W>);
    expect(document.body.textContent).toMatch(/workload|calculat/i);
  });

  it('adds team members', async () => {
    const user = userEvent.setup();
    render(<W><WorkloadCalculator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = screen.queryAllByRole('textbox');
    if (inputs.length > 0) await user.type(inputs[0], 'Dev A');
  });

  it('sets hours per week', async () => {
    const user = userEvent.setup();
    render(<W><WorkloadCalculator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const numInputs = document.querySelectorAll('input[type="number"]');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '40');
    }
  });

  it('removes a member', async () => {
    const user = userEvent.setup();
    render(<W><WorkloadCalculator /></W>);
    const addBtn = screen.getAllByRole('button').find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const delBtns = screen.getAllByRole('button').filter(b => b.querySelector('svg') && !b.textContent.trim());
    if (delBtns.length > 0) await user.click(delBtns[delBtns.length - 1]);
  });
});
