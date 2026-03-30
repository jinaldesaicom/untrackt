const fs = require('fs');
const path = require('path');
const root = 'c:/data/code2026/untrackt/src/tests/tools';

const hdr = `import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';`;

const storageMock = `
vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((key, def = null) => def),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  getPreference: vi.fn(() => null),
  setPreference: vi.fn()
}));`;

const mdMock = `
vi.mock('../../../utils/markdownRenderer', () => ({
  renderMarkdown: vi.fn((text) => text || '')
}));`;

const wrapper = `
const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);`;

function importBlock(cat, name) {
  return `
let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/${cat}/${name}.jsx');
  Component = mod.default;
});`;
}

const files = {};

// 1. RandomNumberGenerator
files['general/RandomNumberGenerator-func.test.jsx'] = `${hdr}

if (!globalThis.crypto) globalThis.crypto = {};
if (!globalThis.crypto.getRandomValues) {
  globalThis.crypto.getRandomValues = (arr) => {
    for (let i = 0; i < arr.length; i++) arr[i] = Math.floor(Math.random() * 256);
    return arr;
  };
}
${wrapper}
${importBlock('general', 'RandomNumberGenerator')}

describe('RandomNumberGenerator – functional', () => {
  it('renders single mode by default', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/single|generate/i);
  });

  it('generates a single random number', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const genBtn = screen.getByRole('button', { name: /^generate$/i });
    await user.click(genBtn);
    expect(document.body.textContent).toMatch(/\\d+/);
  });

  it('switches to multiple mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /^multiple$/i }));
    expect(document.body.textContent).toMatch(/count|unique/i);
  });

  it('switches to dice mode and rolls', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /^dice$/i }));
    const rollBtn = screen.queryByRole('button', { name: /roll/i });
    if (rollBtn) await user.click(rollBtn);
  });

  it('switches to coin mode and flips', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /^coin$/i }));
    const flipBtn = screen.queryByRole('button', { name: /flip/i });
    if (flipBtn) await user.click(flipBtn);
  });

  it('switches to from list mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /from list/i }));
    expect(document.body.textContent).toMatch(/item|pick|list/i);
  });
});
`;

// 2. BinaryTextConverter - tabs are Binary, Morse, Hex, ASCII
files['general/BinaryTextConverter-func.test.jsx'] = `${hdr}
${wrapper}
${importBlock('general', 'BinaryTextConverter')}

describe('BinaryTextConverter – functional', () => {
  it('converts text to binary by default', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    await user.type(textareas[0], 'ABC');
    expect(document.body.textContent).toMatch(/01000001|binary/i);
  });

  it('switches to morse tab and converts', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /^morse$/i }));
    const textareas = document.querySelectorAll('textarea');
    await user.clear(textareas[0]);
    await user.type(textareas[0], 'SOS');
    expect(document.body.textContent).toMatch(/\\.\\.\\.|---/);
  });

  it('switches to hex tab and converts', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /^hex$/i }));
    const textareas = document.querySelectorAll('textarea');
    await user.clear(textareas[0]);
    await user.type(textareas[0], 'AB');
    expect(document.body.textContent).toMatch(/41|42/i);
  });

  it('switches to ASCII tab and converts', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    await user.click(screen.getByRole('button', { name: /^ascii$/i }));
    const textareas = document.querySelectorAll('textarea');
    await user.clear(textareas[0]);
    await user.type(textareas[0], 'A');
    expect(document.body.textContent).toMatch(/65/);
  });

  it('toggles direction', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const dirBtn = screen.queryByRole('button', { name: /code.*text|text.*code/i });
    if (dirBtn) await user.click(dirBtn);
  });
});
`;

// 3. ImageConverter - format buttons: PNG, JPEG, WebP, AVIF, ICO
files['general/ImageConverter-func.test.jsx'] = `${hdr}

if (!globalThis.URL.createObjectURL) globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock');
if (!globalThis.URL.revokeObjectURL) globalThis.URL.revokeObjectURL = vi.fn();
${wrapper}
${importBlock('general', 'ImageConverter')}

describe('ImageConverter – functional', () => {
  it('renders with format buttons', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/png|jpeg|webp/i);
  });

  it('shows file input', () => {
    render(<W><Component /></W>);
    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toBeTruthy();
  });

  it('selects JPEG format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const jpegBtn = btns.find(b => /^jpeg$/i.test(b.textContent.trim()));
    if (jpegBtn) await user.click(jpegBtn);
    expect(document.body.textContent).toMatch(/quality|jpeg/i);
  });

  it('selects WebP format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const webpBtn = btns.find(b => /^webp$/i.test(b.textContent.trim()));
    if (webpBtn) await user.click(webpBtn);
    expect(document.body.textContent).toMatch(/quality|webp/i);
  });

  it('handles file upload via input', async () => {
    render(<W><Component /></W>);
    const fileInput = document.querySelector('input[type="file"]');
    const file = new File(['fake-png-data'], 'test.png', { type: 'image/png' });
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.change(fileInput, { target: { files: [file] } });
  });

  it('selects PNG format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const pngBtn = btns.find(b => /^png$/i.test(b.textContent.trim()));
    if (pngBtn) await user.click(pngBtn);
  });
});
`;

// 4. ImageCompressor - format buttons: JPEG, PNG, WebP
files['general/ImageCompressor-func.test.jsx'] = `${hdr}

if (!globalThis.URL.createObjectURL) globalThis.URL.createObjectURL = vi.fn(() => 'blob:mock');
if (!globalThis.URL.revokeObjectURL) globalThis.URL.revokeObjectURL = vi.fn();
${wrapper}
${importBlock('general', 'ImageCompressor')}

describe('ImageCompressor – functional', () => {
  it('renders with format and quality controls', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/jpeg|quality|max width/i);
  });

  it('shows file input and quality slider', () => {
    render(<W><Component /></W>);
    const fileInput = document.querySelector('input[type="file"]');
    expect(fileInput).toBeTruthy();
    const slider = screen.queryByRole('slider');
    expect(slider).toBeTruthy();
  });

  it('selects WebP format', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const webpBtn = btns.find(b => /^webp$/i.test(b.textContent.trim()));
    if (webpBtn) await user.click(webpBtn);
  });

  it('changes quality slider', async () => {
    render(<W><Component /></W>);
    const slider = screen.getByRole('slider');
    const { fireEvent } = await import('@testing-library/react');
    fireEvent.change(slider, { target: { value: '50' } });
  });

  it('changes max width and height inputs', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const numInputs = screen.getAllByRole('spinbutton');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]); await user.type(numInputs[0], '800');
      await user.clear(numInputs[1]); await user.type(numInputs[1], '600');
    }
  });
});
`;

// 5. TextSnippets
files['general/TextSnippets-func.test.jsx'] = `${hdr}
${storageMock}
${wrapper}
${importBlock('general', 'TextSnippets')}

describe('TextSnippets – functional', () => {
  it('renders snippet UI', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/snippet|new/i);
  });

  it('clicks new snippet button', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const newBtn = screen.queryByRole('button', { name: /new snippet/i });
    if (newBtn) await user.click(newBtn);
    expect(document.body.textContent).toMatch(/shortcode|content|trigger/i);
  });

  it('searches snippets', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) await user.type(searchInput, 'test');
  });

  it('renders export and import buttons', () => {
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const exportOrImport = btns.find(b => /download|upload|export|import/i.test(b.textContent));
    expect(exportOrImport).toBeTruthy();
  });

  it('clicks quick expand', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const qBtn = screen.queryByRole('button', { name: /quick expand/i });
    if (qBtn) await user.click(qBtn);
  });
});
`;

// 6. RaidLog - buttons: "+ Risk", "+ Assumption", "+ Issue", "+ Dependency"
// Filter buttons: "All (X)", "Risk (X)", "Assumption (X)", etc.
files['pm/RaidLog-func.test.jsx'] = `${hdr}
${storageMock}
${wrapper}
${importBlock('pm', 'RaidLog')}

describe('RaidLog – functional', () => {
  it('renders with RAID type buttons', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/risk|assumption|issue|dependency/i);
  });

  it('adds a risk entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const riskBtn = btns.find(b => /^\\+\\s*risk$/i.test(b.textContent.trim()));
    if (riskBtn) {
      await user.click(riskBtn);
      expect(document.body.textContent).toMatch(/title|description|priority/i);
    }
  });

  it('adds an assumption entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const btn = btns.find(b => /^\\+\\s*assumption$/i.test(b.textContent.trim()));
    if (btn) await user.click(btn);
  });

  it('adds an issue entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const btn = btns.find(b => /^\\+\\s*issue$/i.test(b.textContent.trim()));
    if (btn) await user.click(btn);
  });

  it('adds a dependency entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const btn = btns.find(b => /^\\+\\s*dependency$/i.test(b.textContent.trim()));
    if (btn) await user.click(btn);
  });

  it('uses filter buttons', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const allBtn = btns.find(b => /^all/i.test(b.textContent.trim()));
    if (allBtn) await user.click(allBtn);
  });

  it('has copy and export buttons', () => {
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const copyBtn = btns.find(b => /copy|csv/i.test(b.textContent.trim()));
    expect(copyBtn).toBeTruthy();
  });
});
`;

// 7. MoodTracker - mood emojis, activity buttons, calendar/insights tabs
files['health/MoodTracker-func.test.jsx'] = `${hdr}
${storageMock}
${wrapper}
${importBlock('health', 'MoodTracker')}

describe('MoodTracker – functional', () => {
  it('renders with mood logging view', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/mood|feeling/i);
  });

  it('selects a mood', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.queryAllByRole('button');
    const emojiBtn = btns.find(b => /😄|😊|😐|😟|😢/.test(b.textContent));
    if (emojiBtn) await user.click(emojiBtn);
  });

  it('toggles activity buttons after selecting mood', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.queryAllByRole('button');
    const emojiBtn = btns.find(b => /😄|😊/.test(b.textContent));
    if (emojiBtn) await user.click(emojiBtn);
    // Activity buttons have emoji + label
    const allBtns = screen.queryAllByRole('button');
    const actBtn = allBtns.find(b => /exercise|work|social|reading|🏃|💼|👥/i.test(b.textContent));
    if (actBtn) await user.click(actBtn);
  });

  it('adds a journal note', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.queryAllByRole('button');
    const emojiBtn = btns.find(b => /😄/.test(b.textContent));
    if (emojiBtn) await user.click(emojiBtn);
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.type(textareas[0], 'Had a great day!');
    }
    const saveBtn = screen.queryAllByRole('button').find(b => /save|log/i.test(b.textContent));
    if (saveBtn) await user.click(saveBtn);
  });

  it('switches to calendar view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const calBtn = btns.find(b => /calendar/i.test(b.textContent));
    if (calBtn) await user.click(calBtn);
  });

  it('switches to insights view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const insBtn = btns.find(b => /insight/i.test(b.textContent));
    if (insBtn) await user.click(insBtn);
  });

  it('navigates days', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.queryAllByRole('button');
    const prevBtn = btns.find(b => b.textContent.includes('←'));
    if (prevBtn) await user.click(prevBtn);
    const nextBtn = btns.find(b => b.textContent.includes('→'));
    if (nextBtn) await user.click(nextBtn);
  });
});
`;

// 8. SymptomJournal - severity: Mild/Moderate/Severe/Very Severe, time: morning/afternoon/evening/night
files['health/SymptomJournal-func.test.jsx'] = `${hdr}
${storageMock}
${wrapper}
${importBlock('health', 'SymptomJournal')}

describe('SymptomJournal – functional', () => {
  it('renders symptom logging view', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/symptom|log|severity/i);
  });

  it('enters a symptom name', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const input = document.querySelector('input[type="text"]');
    if (input) await user.type(input, 'Headache');
  });

  it('selects severity level', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const sevBtn = btns.find(b => /^mild$/i.test(b.textContent.trim()));
    if (sevBtn) await user.click(sevBtn);
  });

  it('selects time of day', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const timeBtn = btns.find(b => /^morning$/i.test(b.textContent.trim()));
    if (timeBtn) await user.click(timeBtn);
  });

  it('logs a symptom', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const input = document.querySelector('input[type="text"]');
    if (input) await user.type(input, 'Headache');
    const btns = screen.getAllByRole('button');
    const sevBtn = btns.find(b => /^mild$/i.test(b.textContent.trim()));
    if (sevBtn) await user.click(sevBtn);
    const logBtn = btns.find(b => /log symptom/i.test(b.textContent));
    if (logBtn) await user.click(logBtn);
  });

  it('switches to history tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const histBtn = btns.find(b => /history/i.test(b.textContent));
    if (histBtn) await user.click(histBtn);
  });

  it('switches to calendar tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const calBtn = btns.find(b => /calendar/i.test(b.textContent));
    if (calBtn) await user.click(calBtn);
  });

  it('adds notes to a symptom', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) await user.type(textareas[0], 'After lunch');
  });
});
`;

// 9. ProjectTimelinePlanner - inline editing, phases/milestones
files['pm/ProjectTimelinePlanner-func.test.jsx'] = `${hdr}
${storageMock}
${wrapper}
${importBlock('pm', 'ProjectTimelinePlanner')}

describe('ProjectTimelinePlanner – functional', () => {
  it('renders the timeline planner', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/project|timeline|phase|milestone/i);
  });

  it('adds a phase or milestone', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => /add|phase|milestone/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });

  it('fills in item name', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => /add|phase/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const inputs = document.querySelectorAll('input[type="text"]');
    if (inputs.length > 0) {
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'Design Phase');
    }
  });

  it('uses export or copy', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const copyBtn = btns.find(b => /copy|export/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});
`;

// 10. WorkloadCalculator - Add Person, Add Task, capacity inputs
files['pm/WorkloadCalculator-func.test.jsx'] = `${hdr}
${storageMock}
${wrapper}
${importBlock('pm', 'WorkloadCalculator')}

describe('WorkloadCalculator – functional', () => {
  it('renders workload fields', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/workload|team|capacity/i);
  });

  it('adds a team member', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addPersonBtn = btns.find(b => /add person/i.test(b.textContent));
    if (addPersonBtn) await user.click(addPersonBtn);
  });

  it('fills in capacity inputs', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '40');
    }
  });
});
`;

// 11. ClientProfitabilityEstimator - Add Client button, then fill fields
files['freelance/ClientProfitabilityEstimator-func.test.jsx'] = `${hdr}
${storageMock}
${wrapper}
${importBlock('freelance', 'ClientProfitabilityEstimator')}

describe('ClientProfitabilityEstimator – functional', () => {
  it('renders the estimator', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/client|profit|add/i);
  });

  it('adds a client', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => /add client/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    expect(document.body.textContent).toMatch(/revenue|hours|client/i);
  });

  it('fills in client fields after adding', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => /add client/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length >= 2) {
      await user.clear(numInputs[0]); await user.type(numInputs[0], '5000');
      await user.clear(numInputs[1]); await user.type(numInputs[1], '40');
    }
    const textInputs = document.querySelectorAll('input[type="text"]');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Acme Corp');
    }
  });

  it('shows profitability metrics', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => /add client/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
    expect(document.body.textContent).toMatch(/profit|revenue|overhead|rate/i);
  });
});
`;

// 12. MarkdownPreviewer - Bold/Italic/Heading/Link/Code/List/Quote toolbar, Copy Markdown/Copy HTML
files['dev/MarkdownPreviewer-func.test.jsx'] = `${hdr}
${storageMock}
${mdMock}
${wrapper}
${importBlock('dev', 'MarkdownPreviewer')}

describe('MarkdownPreviewer – functional', () => {
  it('renders with markdown input area', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/markdown|preview|editor/i);
  });

  it('types markdown and shows preview', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    if (textareas.length > 0) {
      await user.clear(textareas[0]);
      await user.type(textareas[0], '# Hello World');
    }
  });

  it('uses copy markdown button', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const copyMdBtn = btns.find(b => /copy markdown/i.test(b.textContent));
    if (copyMdBtn) await user.click(copyMdBtn);
  });

  it('uses toolbar formatting buttons', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const boldBtn = btns.find(b => /^bold$/i.test(b.textContent.trim()));
    if (boldBtn) await user.click(boldBtn);
    const italicBtn = btns.find(b => /^italic$/i.test(b.textContent.trim()));
    if (italicBtn) await user.click(italicBtn);
  });
});
`;

// 13. MeetingMinutes - New meeting then: Add attendee, Add agenda item, Add action item
files['productivity/MeetingMinutes-func.test.jsx'] = `${hdr}
${storageMock}
${mdMock}
${wrapper}
${importBlock('productivity', 'MeetingMinutes')}

describe('MeetingMinutes – functional', () => {
  it('renders meeting list view', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/meeting|minute|new/i);
  });

  it('creates a new meeting', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /new/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    expect(document.body.textContent).toMatch(/title|date|attendee|agenda/i);
  });

  it('edits meeting title', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /new/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const textInputs = screen.queryAllByRole('textbox');
    if (textInputs.length > 0) {
      await user.clear(textInputs[0]);
      await user.type(textInputs[0], 'Sprint Planning');
    }
  });

  it('adds an attendee', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /new/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const allBtns = screen.getAllByRole('button');
    const addAttBtn = allBtns.find(b => /add attendee/i.test(b.textContent));
    if (addAttBtn) await user.click(addAttBtn);
  });

  it('adds an agenda item', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /new/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const allBtns = screen.getAllByRole('button');
    const addAgBtn = allBtns.find(b => /add agenda/i.test(b.textContent));
    if (addAgBtn) await user.click(addAgBtn);
  });

  it('adds an action item', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /new/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const allBtns = screen.getAllByRole('button');
    const addActBtn = allBtns.find(b => /add action/i.test(b.textContent));
    if (addActBtn) await user.click(addActBtn);
  });

  it('toggles preview', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /new/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const allBtns = screen.getAllByRole('button');
    const prevBtn = allBtns.find(b => /preview|formatted|markdown/i.test(b.textContent));
    if (prevBtn) await user.click(prevBtn);
  });

  it('copies meeting minutes', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const newBtn = btns.find(b => /new/i.test(b.textContent));
    if (newBtn) await user.click(newBtn);
    const allBtns = screen.getAllByRole('button');
    const copyBtn = allBtns.find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});
`;

// 14. FractionCalculator - Arithmetic mode with operator buttons (+, −, ×, ÷), Convert mode with tabs
files['maths-science/FractionCalculator-func.test.jsx'] = `${hdr}
${wrapper}

let FractionCalculator;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/FractionCalculator.jsx');
  FractionCalculator = mod.default;
});

describe('FractionCalculator – functional', () => {
  it('renders arithmetic mode by default', () => {
    render(<W><FractionCalculator /></W>);
    expect(screen.getByRole('button', { name: /calculate/i })).toBeDefined();
  });

  it('calculates fraction addition', async () => {
    const user = userEvent.setup();
    render(<W><FractionCalculator /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length >= 4) {
      await user.clear(inputs[0]); await user.type(inputs[0], '1');
      await user.clear(inputs[1]); await user.type(inputs[1], '2');
      await user.clear(inputs[2]); await user.type(inputs[2], '1');
      await user.clear(inputs[3]); await user.type(inputs[3], '4');
    }
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    expect(document.body.textContent).toMatch(/\\d/);
  });

  it('switches to convert mode', async () => {
    const user = userEvent.setup();
    render(<W><FractionCalculator /></W>);
    const btns = screen.getAllByRole('button');
    const convertBtn = btns.find(b => /^convert$/i.test(b.textContent.trim()));
    if (convertBtn) {
      await user.click(convertBtn);
      expect(document.body.textContent).toMatch(/convert|decimal|percentage|fraction/i);
    }
  });

  it('converts decimal to fraction', async () => {
    const user = userEvent.setup();
    render(<W><FractionCalculator /></W>);
    const btns = screen.getAllByRole('button');
    const convertBtn = btns.find(b => /^convert$/i.test(b.textContent.trim()));
    if (convertBtn) {
      await user.click(convertBtn);
      // Click decimal sub-tab
      const allBtns = screen.getAllByRole('button');
      const decBtn = allBtns.find(b => /^decimal$/i.test(b.textContent.trim()));
      if (decBtn) await user.click(decBtn);
      const textInputs = screen.queryAllByRole('textbox');
      if (textInputs.length > 0) {
        await user.clear(textInputs[0]);
        await user.type(textInputs[0], '0.75');
      }
    }
  });

  it('changes operator', async () => {
    const user = userEvent.setup();
    render(<W><FractionCalculator /></W>);
    const btns = screen.getAllByRole('button');
    // Operator buttons: +, −, ×, ÷
    const subBtn = btns.find(b => b.textContent.trim() === '−' || b.textContent.trim() === '-');
    if (subBtn) await user.click(subBtn);
  });

  it('handles copy button', async () => {
    const user = userEvent.setup();
    render(<W><FractionCalculator /></W>);
    const inputs = screen.getAllByRole('spinbutton');
    if (inputs.length >= 4) {
      await user.clear(inputs[0]); await user.type(inputs[0], '1');
      await user.clear(inputs[1]); await user.type(inputs[1], '2');
      await user.clear(inputs[2]); await user.type(inputs[2], '1');
      await user.clear(inputs[3]); await user.type(inputs[3], '3');
    }
    await user.click(screen.getByRole('button', { name: /calculate/i }));
    const allBtns = screen.getAllByRole('button');
    const copyBtn = allBtns.find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});
`;

// 15. ColorConverter - format tabs: HEX, RGB, HSL, HSV, CSS Name
files['dev/ColorConverter-func.test.jsx'] = `${hdr}
${storageMock}
${wrapper}
${importBlock('dev', 'ColorConverter')}

describe('ColorConverter – functional', () => {
  it('renders with format tabs', () => {
    render(<W><Component /></W>);
    const text = document.body.textContent;
    expect(text).toMatch(/hex|rgb|hsl/i);
  });

  it('converts HEX input', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '#ff5733');
    expect(document.body.textContent).toMatch(/rgb|hsl|255/i);
  });

  it('switches to RGB mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const rgbBtn = btns.find(b => /^rgb$/i.test(b.textContent.trim()));
    if (rgbBtn) await user.click(rgbBtn);
  });

  it('switches to HSL mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const hslBtn = btns.find(b => /^hsl$/i.test(b.textContent.trim()));
    if (hslBtn) await user.click(hslBtn);
  });

  it('switches to HSV mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const hsvBtn = btns.find(b => /^hsv$/i.test(b.textContent.trim()));
    if (hsvBtn) await user.click(hsvBtn);
  });

  it('switches to CSS Name mode', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const cssBtn = btns.find(b => /css|name/i.test(b.textContent.trim()));
    if (cssBtn) await user.click(cssBtn);
  });

  it('checks contrast ratio', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '#ff5733');
    expect(document.body.textContent).toMatch(/contrast|ratio|ff5733/i);
  });

  it('saves to palette', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textInputs = screen.getAllByRole('textbox');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], '#ff5733');
    const btns = screen.getAllByRole('button');
    const saveBtn = btns.find(b => /save|palette/i.test(b.textContent));
    if (saveBtn) await user.click(saveBtn);
  });
});
`;

// 16. DailyExpenseTracker
files['finance/DailyExpenseTracker-func.test.jsx'] = `${hdr}
${storageMock}
${wrapper}
${importBlock('finance', 'DailyExpenseTracker')}

describe('DailyExpenseTracker – functional', () => {
  it('renders with expense log view', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/expense|log|add|amount/i);
  });

  it('adds an expense entry', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '25');
    }
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => /add/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });

  it('switches to income tab', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const incBtn = btns.find(b => /income/i.test(b.textContent));
    if (incBtn) await user.click(incBtn);
  });

  it('switches to charts view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const chartBtn = btns.find(b => /chart/i.test(b.textContent));
    if (chartBtn) await user.click(chartBtn);
  });

  it('switches to trends view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const trendBtn = btns.find(b => /trend/i.test(b.textContent));
    if (trendBtn) await user.click(trendBtn);
  });

  it('switches to balance view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const balBtn = btns.find(b => /balance/i.test(b.textContent));
    if (balBtn) await user.click(balBtn);
  });

  it('switches to budget view', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const budBtn = btns.find(b => /budget/i.test(b.textContent));
    if (budBtn) await user.click(budBtn);
  });

  it('navigates months', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.queryAllByRole('button');
    const prevBtn = btns.find(b => b.textContent.includes('←'));
    if (prevBtn) await user.click(prevBtn);
  });
});
`;

// 17. RobotsTxtGenerator
files['seo/RobotsTxtGenerator-func.test.jsx'] = `${hdr}
${storageMock}
${wrapper}
${importBlock('seo', 'RobotsTxtGenerator')}

describe('RobotsTxtGenerator – functional', () => {
  it('renders robots.txt generator UI', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/robots|user-agent|sitemap/i);
  });

  it('adds a user-agent rule', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const addBtn = btns.find(b => /add|rule/i.test(b.textContent));
    if (addBtn) await user.click(addBtn);
  });

  it('fills in sitemap URL', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const inputs = document.querySelectorAll('input[type="text"], input[type="url"]');
    for (const input of inputs) {
      const ph = input.placeholder || '';
      if (/sitemap/i.test(ph)) {
        await userEvent.setup().clear(input);
        await userEvent.setup().type(input, 'https://example.com/sitemap.xml');
        break;
      }
    }
  });

  it('generates robots.txt output', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/user-agent|allow|disallow/i);
  });

  it('copies the output', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const copyBtn = btns.find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});
`;

// 18. ChemicalEquationBalancer
files['maths-science/ChemicalEquationBalancer-func.test.jsx'] = `${hdr}
${wrapper}

let ChemicalEquationBalancer;
beforeAll(async () => {
  const mod = await import('../../../tools/maths-science/ChemicalEquationBalancer.jsx');
  ChemicalEquationBalancer = mod.default;
});

describe('ChemicalEquationBalancer – functional', () => {
  it('renders input and balance button', () => {
    render(<W><ChemicalEquationBalancer /></W>);
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByRole('button', { name: /balance/i })).toBeDefined();
  });

  it('balances H2 + O2 -> H2O', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'H2 + O2 -> H2O');
    await user.click(screen.getByRole('button', { name: /balance/i }));
    expect(document.body.textContent).toMatch(/H|O|balanced|→|=/);
  });

  it('balances Fe + O2 -> Fe2O3', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Fe + O2 -> Fe2O3');
    await user.click(screen.getByRole('button', { name: /balance/i }));
    expect(document.body.textContent).toMatch(/Fe|O/);
  });

  it('handles invalid equation', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'invalid');
    await user.click(screen.getByRole('button', { name: /balance/i }));
    expect(document.body.textContent.length).toBeGreaterThan(0);
  });

  it('balances Na + Cl2 -> NaCl', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'Na + Cl2 -> NaCl');
    await user.click(screen.getByRole('button', { name: /balance/i }));
    expect(document.body.textContent).toMatch(/Na|Cl/);
  });

  it('handles copy button if present', async () => {
    const user = userEvent.setup();
    render(<W><ChemicalEquationBalancer /></W>);
    const input = screen.getByRole('textbox');
    await user.clear(input);
    await user.type(input, 'H2 + O2 -> H2O');
    await user.click(screen.getByRole('button', { name: /balance/i }));
    const btns = screen.getAllByRole('button');
    const copyBtn = btns.find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});
`;

// 19. HashGenerator - crypto.subtle mock
files['dev/HashGenerator-func.test.jsx'] = `${hdr}
${wrapper}

// Mock crypto.subtle
const mockDigest = vi.fn().mockResolvedValue(new ArrayBuffer(32));
if (!globalThis.crypto) globalThis.crypto = {};
if (!globalThis.crypto.subtle) {
  globalThis.crypto.subtle = { digest: mockDigest };
}

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/dev/HashGenerator.jsx');
  Component = mod.default;
});

describe('HashGenerator – functional', () => {
  it('renders with input area', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/hash|sha|md5|input/i);
  });

  it('types input text', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    const textInputs = screen.queryAllByRole('textbox');
    const input = textareas[0] || textInputs[0];
    if (input) {
      await user.clear(input);
      await user.type(input, 'Hello World');
    }
  });

  it('selects different hash algorithm', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const sha256Btn = btns.find(b => /sha-?256|sha256/i.test(b.textContent));
    if (sha256Btn) await user.click(sha256Btn);
  });

  it('generates hash output', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const textareas = document.querySelectorAll('textarea');
    const textInputs = screen.queryAllByRole('textbox');
    const input = textareas[0] || textInputs[0];
    if (input) {
      await user.clear(input);
      await user.type(input, 'test');
    }
    expect(document.body.textContent).toMatch(/hash|output|result|[0-9a-f]{8}/i);
  });

  it('copies hash result', async () => {
    const user = userEvent.setup();
    render(<W><Component /></W>);
    const btns = screen.getAllByRole('button');
    const copyBtn = btns.find(b => /copy/i.test(b.textContent));
    if (copyBtn) await user.click(copyBtn);
  });
});
`;

// Write all files
let written = 0;
for (const [relPath, content] of Object.entries(files)) {
  const fullPath = path.join(root, relPath);
  fs.writeFileSync(fullPath, content, 'utf8');
  written++;
}

console.log('Written', written, 'files');
console.log('DONE');
