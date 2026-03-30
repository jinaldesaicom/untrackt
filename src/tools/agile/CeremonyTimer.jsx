import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react'

const PRESETS = [
  { name: 'Daily Standup', duration: 15 * 60, color: 'bg-blue-500' },
  { name: 'Sprint Planning', duration: 60 * 60, color: 'bg-indigo-500' },
  { name: 'Sprint Review', duration: 60 * 60, color: 'bg-green-500' },
  { name: 'Retrospective', duration: 45 * 60, color: 'bg-amber-500' },
  { name: 'Backlog Refinement', duration: 45 * 60, color: 'bg-purple-500' },
  { name: 'Per-Person (2 min)', duration: 2 * 60, color: 'bg-rose-500' },
]

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function CeremonyTimer() {
  const [totalSeconds, setTotalSeconds] = useState(15 * 60)
  const [remaining, setRemaining] = useState(15 * 60)
  const [running, setRunning] = useState(false)
  const [customMinutes, setCustomMinutes] = useState(15)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  const playAlert = useCallback(() => {
    if (!soundEnabled) return
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = 800
      gain.gain.value = 0.3
      osc.start()
      osc.stop(ctx.currentTime + 0.5)
    } catch {}
  }, [soundEnabled])

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            setRunning(false)
            playAlert()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, remaining, playAlert])

  const selectPreset = (preset) => {
    setRunning(false)
    setTotalSeconds(preset.duration)
    setRemaining(preset.duration)
    setCustomMinutes(preset.duration / 60)
  }

  const setCustom = () => {
    const secs = Math.max(1, Math.min(180, customMinutes)) * 60
    setRunning(false)
    setTotalSeconds(secs)
    setRemaining(secs)
  }

  const toggle = () => setRunning(prev => !prev)
  const reset = () => { setRunning(false); setRemaining(totalSeconds) }

  const elapsed = totalSeconds - remaining
  const progress = totalSeconds > 0 ? (elapsed / totalSeconds) * 100 : 0
  const isWarning = remaining > 0 && remaining <= 60
  const isFinished = remaining === 0

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map(p => (
          <button key={p.name} onClick={() => selectPreset(p)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              totalSeconds === p.duration && !running
                ? `${p.color} text-white`
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input type="number" min="1" max="180" value={customMinutes}
          onChange={e => setCustomMinutes(Math.max(1, parseInt(e.target.value) || 1))}
          className="input-field text-sm w-20" />
        <span className="text-xs text-gray-500">min</span>
        <button onClick={setCustom} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Set</button>
        <div className="flex-1" />
        <button onClick={() => setSoundEnabled(prev => !prev)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title={soundEnabled ? 'Mute' : 'Unmute'}>
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-8 text-center">
        <div className={`text-6xl sm:text-7xl font-mono font-bold tracking-wider ${
          isFinished ? 'text-red-500 animate-pulse' : isWarning ? 'text-amber-500' : 'text-gray-900 dark:text-white'
        }`}>
          {formatTime(remaining)}
        </div>

        <div className="mt-4 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${
            isFinished ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-indigo-500'
          }`} style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button onClick={toggle} disabled={isFinished}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-colors ${
              running ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-500 hover:bg-indigo-600'
            } disabled:opacity-50`}>
            {running ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>
          <button onClick={reset}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {isFinished && (
          <p className="mt-3 text-sm font-medium text-red-500">Time&apos;s up!</p>
        )}
      </div>
    </div>
  )
}
