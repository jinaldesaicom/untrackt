import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

const MODES = [
  { key: 'work', label: 'Work', duration: 25 * 60, color: 'text-rose-600', bg: 'bg-rose-50', ring: '#e11d48' },
  { key: 'short', label: 'Short Break', duration: 5 * 60, color: 'text-blue-600', bg: 'bg-blue-50', ring: '#2563eb' },
  { key: 'long', label: 'Long Break', duration: 15 * 60, color: 'text-green-600', bg: 'bg-green-50', ring: '#16a34a' },
]

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.8)
  } catch {}
}

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function PomodoroTimer() {
  const [modeIdx, setModeIdx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(MODES[0].duration)
  const [running, setRunning] = useState(false)
  const [pomodoros, setPomodoros] = useState(0)
  const intervalRef = useRef(null)
  const timeRef = useRef(MODES[0].duration)
  const mode = MODES[modeIdx]

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0')
    const s = String(secs % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  const tick = useCallback(() => {
    if (timeRef.current <= 0) return
    timeRef.current -= 1
    setTimeLeft(timeRef.current)
    if (timeRef.current === 0) {
      clearInterval(intervalRef.current)
      setRunning(false)
      playBeep()
      setPomodoros((p) => p + 1)
    }
  }, [])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, tick])

  useEffect(() => {
    const label = running ? `${formatTime(timeLeft)} — ${mode.label}` : 'UnTrackt • Pomodoro'
    document.title = label
    return () => { document.title = 'UnTrackt — Free Private Browser Tools' }
  }, [timeLeft, running, mode.label])

  const switchMode = (idx) => {
    clearInterval(intervalRef.current)
    setRunning(false)
    setModeIdx(idx)
    timeRef.current = MODES[idx].duration
    setTimeLeft(MODES[idx].duration)
  }

  const reset = () => {
    clearInterval(intervalRef.current)
    setRunning(false)
    timeRef.current = mode.duration
    setTimeLeft(mode.duration)
  }

  const progress = timeLeft / mode.duration
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Mode selector */}
      <div className="flex rounded-xl border border-gray-200 overflow-hidden">
        {MODES.map((m, i) => (
          <button
            key={m.key}
            onClick={() => switchMode(i)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              modeIdx === i ? `${m.bg} ${m.color} font-semibold` : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Circular timer */}
      <div className="relative flex items-center justify-center">
        <svg width="160" height="160" className="-rotate-90">
          <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="80" cy="80" r={RADIUS}
            fill="none"
            stroke={mode.ring}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold font-mono ${mode.color}`}>{formatTime(timeLeft)}</span>
          <span className="text-xs text-gray-400 mt-1">{mode.label}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={reset} className="btn-secondary p-2 rounded-full">
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={() => setRunning((r) => !r)}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm transition-colors ${
            running ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? 'Pause' : 'Start'}
        </button>
      </div>

      {/* Session counter */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Pomodoros completed:</span>
        <div className="flex gap-1">
          {Array.from({ length: Math.max(pomodoros, 4) }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i < pomodoros ? 'bg-rose-500' : 'bg-gray-200'}`}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-700">{pomodoros}</span>
      </div>
    </div>
  )
}
