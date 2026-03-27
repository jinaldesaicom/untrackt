import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as storage from '../../__mocks__/storage.js'

vi.mock('../../../utils/storage.js', () => storage)

import StudyTimer from '../../../tools/student/StudyTimer.jsx'

describe('StudyTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
    Object.defineProperty(window, 'Notification', {
      value: {
        permission: 'default',
        requestPermission: vi.fn().mockResolvedValue('granted'),
      },
      configurable: true,
    })
    window.AudioContext = vi.fn(() => ({
      createOscillator: () => ({ connect: vi.fn(), frequency: { value: 0 }, start: vi.fn(), stop: vi.fn() }),
      createGain: () => ({ connect: vi.fn(), gain: { value: 0 } }),
      createBuffer: () => ({ getChannelData: () => new Float32Array(4) }),
      createBufferSource: () => ({ connect: vi.fn(), start: vi.fn(), stop: vi.fn(), loop: false }),
      destination: {},
      sampleRate: 4,
      close: vi.fn(),
      currentTime: 0,
    }))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders pomodoro defaults and timer controls', () => {
    render(<StudyTimer />)

    expect(screen.getByRole('button', { name: /pomodoro/i })).toBeInTheDocument()
    expect(screen.getByText('25:00')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument()
    expect(screen.getByText(/daily goal/i)).toBeInTheDocument()
    expect(screen.getByText(/ambient sound/i)).toBeInTheDocument()
    expect(screen.getByText(/today's session log/i)).toBeInTheDocument()
  })

  it('starts, pauses, resets, supports 52/17 and custom mode, and updates the document title', async () => {
    render(<StudyTimer />)

    fireEvent.click(screen.getByRole('button', { name: /start/i }))
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByText('24:59')).toBeInTheDocument()
    expect(document.title).toMatch(/24:59/i)

    fireEvent.click(screen.getByRole('button', { name: /pause/i }))
    fireEvent.click(screen.getByRole('button', { name: /reset/i }))
    expect(screen.getByText('25:00')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /52\/17/i }))
    expect(screen.getByRole('button', { name: /52\/17/i })).toHaveClass('btn-primary')

    fireEvent.click(screen.getByRole('button', { name: /custom/i }))
    expect(screen.getByPlaceholderText(/work minutes/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/break minutes/i)).toBeInTheDocument()
  })
})
