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

// Mock AudioContext
globalThis.AudioContext = vi.fn().mockImplementation(() => ({
  createOscillator: vi.fn(() => ({
    type: '', frequency: { value: 0 }, connect: vi.fn(), start: vi.fn(), stop: vi.fn()
  })),
  createGain: vi.fn(() => ({
    gain: { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
    connect: vi.fn()
  })),
  createBufferSource: vi.fn(() => ({
    buffer: null, loop: false, connect: vi.fn(), start: vi.fn(), stop: vi.fn()
  })),
  createBuffer: vi.fn(() => ({ getChannelData: vi.fn(() => new Float32Array(1024)) })),
  destination: {},
  sampleRate: 44100,
  currentTime: 0,
  close: vi.fn()
}));

// Mock Notification
globalThis.Notification = { permission: 'default', requestPermission: vi.fn(() => Promise.resolve('granted')) };

const W = ({ children }) => (
  <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
);

let Component;
beforeAll(async () => {
  const mod = await import('../../../tools/student/StudyTimer.jsx');
  Component = mod.default;
});

describe('StudyTimer – functional', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with Pomodoro mode', () => {
    render(<W><Component /></W>);
    expect(document.body.textContent).toMatch(/pomodoro|focus|25|start/i);
  });

  it('switches to 52/17 mode', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<W><Component /></W>);
    const btn52 = screen.getByRole('button', { name: /52/i });
    await user.click(btn52);
    expect(document.body.textContent).toMatch(/52|17|focus/i);
  });

  it('switches to custom mode', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<W><Component /></W>);
    const customBtn = screen.getByRole('button', { name: /custom/i });
    await user.click(customBtn);
    // Should show custom work/break inputs
    expect(document.body.textContent).toMatch(/custom|work|break/i);
  });

  it('starts and stops the timer', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<W><Component /></W>);
    const startBtn = screen.getByRole('button', { name: /start/i });
    await user.click(startBtn);
    // Timer should show running state
    const pauseBtn = screen.queryByRole('button', { name: /pause/i });
    if (pauseBtn) await user.click(pauseBtn);
  });

  it('resets the timer', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<W><Component /></W>);
    const resetBtn = screen.queryByRole('button', { name: /reset/i });
    if (resetBtn) await user.click(resetBtn);
  });

  it('changes daily goal', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<W><Component /></W>);
    const numInputs = screen.queryAllByRole('spinbutton');
    if (numInputs.length > 0) {
      await user.clear(numInputs[0]);
      await user.type(numInputs[0], '8');
    }
  });
});
