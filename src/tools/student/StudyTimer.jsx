import { useEffect, useMemo, useRef, useState } from 'react'
import { getItem, setItem } from '../../utils/storage.js'

const SETTINGS_KEY = 'untrackt:studyTimerSettings'
const LOG_KEY = 'untrackt:studyTimerLog'

const PRESETS = {
  pomodoro: { work: 25, short: 5, long: 15 },
  '52-17': { work: 52, short: 17, long: 17 },
}

const RADIUS = 60
const C = 2 * Math.PI * RADIUS

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0')
  const s = String(sec % 60).padStart(2, '0')
  return `${m}:${s}`
}

function beep() {
  try {
    const Ctor = window.AudioContext || window.webkitAudioContext
    if (!Ctor) return
    const ctx = new Ctor()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    gain.gain.value = 0.2
    osc.start()
    osc.stop(ctx.currentTime + 0.7)
  } catch {
    // ignore
  }
}

function createNoise(type) {
  const Ctor = window.AudioContext || window.webkitAudioContext
  if (!Ctor) return null
  const ctx = new Ctor()
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
  const data = buffer.getChannelData(0)

  let last = 0
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1
    if (type === 'brown') {
      last = (last + 0.02 * white) / 1.02
      data[i] = last * 3.5
    } else {
      data[i] = white
    }
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true
  const gain = ctx.createGain()
  gain.gain.value = 0.08
  source.connect(gain)
  gain.connect(ctx.destination)
  source.start(0)

  return { ctx, source }
}

function asPositiveInt(value, fallback) {
  const num = Number(value)
  if (!Number.isFinite(num)) return fallback
  return Math.max(1, Math.round(num))
}

export default function StudyTimer() {
  const saved = getItem(SETTINGS_KEY, { mode: 'pomodoro', customWork: 30, customBreak: 10, dailyGoal: 8, noise: 'silence' })
  const [mode, setMode] = useState(saved.mode)
  const [customWork, setCustomWork] = useState(saved.customWork)
  const [customBreak, setCustomBreak] = useState(saved.customBreak)
  const [dailyGoal, setDailyGoal] = useState(saved.dailyGoal)
  const [noise, setNoise] = useState(saved.noise)
  const [phase, setPhase] = useState('focus')
  const [running, setRunning] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60)
  const [sessions, setSessions] = useState(() => getItem(LOG_KEY, []))

  const noiseRef = useRef(null)

  const durations = useMemo(() => {
    if (mode === 'custom') {
      const work = asPositiveInt(customWork, 25)
      const short = asPositiveInt(customBreak, 5)
      return { work, short, long: short }
    }
    return PRESETS[mode]
  }, [mode, customWork, customBreak])

  const targetSeconds = phase === 'focus' ? durations.work * 60 : durations.short * 60

  useEffect(() => {
    setItem(SETTINGS_KEY, { mode, customWork, customBreak, dailyGoal, noise })
  }, [mode, customWork, customBreak, dailyGoal, noise])

  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          const doneAt = new Date().toISOString()
          if (phase === 'focus') {
            const nextLog = [{ phase, doneAt }, ...sessions].slice(0, 100)
            setSessions(nextLog)
            setItem(LOG_KEY, nextLog)
          }
          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification('UnTrackt Study Timer', { body: `${phase === 'focus' ? 'Focus' : 'Break'} complete.` })
          } else {
            beep()
          }
          setPhase((p) => (p === 'focus' ? 'break' : 'focus'))
          return phase === 'focus' ? durations.short * 60 : durations.work * 60
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running, phase, durations, sessions])

  useEffect(() => {
    document.title = `${formatTime(secondsLeft)} - ${phase === 'focus' ? 'Focus' : 'Break'} | UnTrackt`
    return () => {
      document.title = 'UnTrackt - Free Private Browser Tools'
    }
  }, [secondsLeft, phase])

  useEffect(() => {
    if (noiseRef.current) {
      noiseRef.current.source.stop()
      noiseRef.current.ctx.close()
      noiseRef.current = null
    }
    if (noise !== 'silence') {
      noiseRef.current = createNoise(noise)
    }
    return () => {
      if (noiseRef.current) {
        noiseRef.current.source.stop()
        noiseRef.current.ctx.close()
      }
    }
  }, [noise])

  const progress = Math.max(0, Math.min(1, secondsLeft / targetSeconds))
  const dashOffset = C * (1 - progress)
  const todaySessions = sessions.filter((s) => new Date(s.doneAt).toDateString() === new Date().toDateString() && s.phase === 'focus').length

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button className={mode === 'pomodoro' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('pomodoro')}>Pomodoro</button>
        <button className={mode === '52-17' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('52-17')}>52/17</button>
        <button className={mode === 'custom' ? 'btn-primary' : 'btn-secondary'} onClick={() => setMode('custom')}>Custom</button>
      </div>

      {mode === 'custom' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input type="number" className="input-field" value={customWork} onChange={(e) => setCustomWork(Number(e.target.value))} placeholder="Work minutes" />
          <input type="number" className="input-field" value={customBreak} onChange={(e) => setCustomBreak(Number(e.target.value))} placeholder="Break minutes" />
        </div>
      ) : null}

      <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col items-center gap-3">
        <svg width="160" height="160" className="-rotate-90">
          <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="#4f46e5" strokeWidth="8" strokeDasharray={C} strokeDashoffset={dashOffset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        <p className="text-3xl font-bold font-mono -mt-28">{formatTime(secondsLeft)}</p>
        <p className="text-sm text-gray-500">{phase === 'focus' ? 'Focus' : 'Break'}</p>
        <div className="flex gap-2 mt-2">
          <button className="btn-primary" onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Start'}</button>
          <button className="btn-secondary" onClick={() => setSecondsLeft(targetSeconds)}>Reset</button>
          <button className="btn-secondary" onClick={async () => {
            if ('Notification' in window && Notification.permission === 'default') {
              await Notification.requestPermission()
            }
          }}>Enable notifications</button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
        <h3 className="font-semibold">Daily Goal</h3>
        <input type="number" className="input-field" value={dailyGoal} onChange={(e) => setDailyGoal(Number(e.target.value))} />
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, (todaySessions / Math.max(1, dailyGoal)) * 100)}%` }} /></div>
        <p className="text-sm text-gray-600">{todaySessions} of {dailyGoal} sessions completed today</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
        <h3 className="font-semibold">Ambient Sound</h3>
        <div className="flex gap-2">
          {['silence', 'white', 'brown'].map((n) => (
            <button key={n} className={noise === n ? 'btn-primary' : 'btn-secondary'} onClick={() => setNoise(n)}>{n}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="font-semibold mb-2">Today's session log</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          {sessions
            .filter((s) => new Date(s.doneAt).toDateString() === new Date().toDateString())
            .slice(0, 15)
            .map((s, idx) => <li key={idx}>{new Date(s.doneAt).toLocaleTimeString()} - {s.phase}</li>)}
        </ul>
      </div>
    </div>
  )
}
