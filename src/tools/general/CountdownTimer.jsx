import { useEffect, useMemo, useState } from 'react'
import useStoredPreference from '../../hooks/useStoredPreference.js'
import { ToolLayout, Panel, FieldLabel } from '../../components/ToolLayout.jsx'

function partsUntil(targetDate, now) {
  const diff = Math.max(0, new Date(targetDate) - now)
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { diff, days, hours, minutes, seconds }
}

function buildNewYearCountdown() {
  const nextYear = new Date().getFullYear() + 1
  return { id: crypto.randomUUID(), name: `New Year ${nextYear}`, target: `${nextYear}-01-01T00:00` }
}

function buildBirthdayCountdown(birthDate) {
  const birth = new Date(birthDate)
  const now = new Date()
  const nextBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate(), 0, 0, 0)
  if (nextBirthday < now) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
  return { id: crypto.randomUUID(), name: 'Next birthday', target: nextBirthday.toISOString().slice(0, 16) }
}

export default function CountdownTimer() {
  const [countdowns, setCountdowns] = useStoredPreference('general:countdowns', [])
  const [draft, setDraft] = useState({ name: '', target: '' })
  const [birthDate, setBirthDate] = useState('')
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(intervalId)
  }, [])

  const activeCountdowns = useMemo(() => countdowns.slice(0, 5), [countdowns])

  const addCountdown = (countdown) => {
    if (!countdown.target || activeCountdowns.length >= 5) return
    setCountdowns((current) => [...current, countdown].slice(0, 5))
    setDraft({ name: '', target: '' })
  }

  return (
    <ToolLayout
      title="Countdown Timer"
      description="Track up to five live countdowns, save them locally, and use quick presets for New Year or your next birthday."
      path="/tools/countdown-timer"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="space-y-4">
            <div>
              <FieldLabel>Event name</FieldLabel>
              <input className="input-field" value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} placeholder="Optional event name" />
            </div>
            <div>
              <FieldLabel>Target date and time</FieldLabel>
              <input className="input-field" type="datetime-local" value={draft.target} onChange={(event) => setDraft((current) => ({ ...current, target: event.target.value }))} />
            </div>
            <button type="button" className="btn-primary" onClick={() => addCountdown({ id: crypto.randomUUID(), name: draft.name || 'Countdown', target: draft.target })} disabled={activeCountdowns.length >= 5}>Add countdown</button>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
              <button type="button" className="btn-secondary" onClick={() => addCountdown(buildNewYearCountdown())}>Add New Year countdown</button>
              <div>
                <FieldLabel helper="For next birthday preset">Birth date</FieldLabel>
                <input className="input-field" type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
              </div>
              <button type="button" className="btn-secondary" onClick={() => birthDate && addCountdown(buildBirthdayCountdown(birthDate))}>Add birthday countdown</button>
            </div>
          </div>
        </Panel>

        <div className="space-y-4">
          {activeCountdowns.length === 0 && <Panel><p className="text-sm text-gray-500 dark:text-gray-400">Add up to five countdowns. They are stored locally on this device.</p></Panel>}
          {activeCountdowns.map((countdown) => {
            const parts = partsUntil(countdown.target, now)
            const isComplete = parts.diff === 0

            return (
              <Panel key={countdown.id} className={`relative ${isComplete ? 'confetti-burst' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{countdown.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Target: {new Date(countdown.target).toLocaleString()}</p>
                  </div>
                  <button type="button" className="btn-secondary" onClick={() => setCountdowns((current) => current.filter((item) => item.id !== countdown.id))}>Remove</button>
                </div>

                <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    ['Days', parts.days], ['Hours', parts.hours], ['Minutes', parts.minutes], ['Seconds', parts.seconds],
                  ].map(([label, value]) => (
                    <div key={label} className="flip-tile">
                      <div className="flip-value text-3xl font-bold text-gray-900 dark:text-gray-100">{String(value).padStart(2, '0')}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{label}</div>
                    </div>
                  ))}
                </div>

                {isComplete && <p className="mt-4 text-lg font-semibold text-green-600 dark:text-green-400">Completed!</p>}
              </Panel>
            )
          })}
        </div>
      </div>
    </ToolLayout>
  )
}