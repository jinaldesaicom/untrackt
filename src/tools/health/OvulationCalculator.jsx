import { useMemo, useState } from 'react'
import { ToolLayout, Panel, StatCard, FieldLabel } from '../../components/ToolLayout.jsx'

function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function sameDay(left, right) {
  return left.toDateString() === right.toDateString()
}

function formatDate(value) {
  return value.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function buildMiniCalendar(anchorDate, cycle) {
  const monthStart = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1)
  const gridStart = addDays(monthStart, -monthStart.getDay())

  return Array.from({ length: 35 }, (_, index) => {
    const date = addDays(gridStart, index)
    const inMonth = date.getMonth() === anchorDate.getMonth()
    const isPeriod = date >= cycle.periodStart && date <= addDays(cycle.periodStart, 4)
    const isFertile = date >= cycle.fertileStart && date <= cycle.fertileEnd
    const isOvulation = sameDay(date, cycle.ovulation)
    return { date, inMonth, isPeriod, isFertile, isOvulation }
  })
}

export default function OvulationCalculator() {
  const [inputs, setInputs] = useState({ lmpDate: '2026-02-20', cycleLength: '28', luteal: '14' })

  const cycles = useMemo(() => {
    const lmpDate = new Date(inputs.lmpDate)
    const cycleLength = Number(inputs.cycleLength)
    const luteal = Number(inputs.luteal)

    return Array.from({ length: 3 }, (_, index) => {
      const periodStart = addDays(lmpDate, cycleLength * index)
      const nextPeriod = addDays(periodStart, cycleLength)
      const ovulation = addDays(nextPeriod, -luteal)
      return {
        periodStart,
        nextPeriod,
        ovulation,
        fertileStart: addDays(ovulation, -5),
        fertileEnd: addDays(ovulation, 1),
      }
    })
  }, [inputs])

  const currentCycle = cycles[0]
  const daysUntilOvulation = Math.ceil((currentCycle.ovulation - new Date()) / 86400000)

  return (
    <ToolLayout
      title="Ovulation Calculator"
      description="Estimate ovulation, fertile windows, and the next expected period using cycle averages."
      path="/tools/ovulation-calculator"
      disclaimerType="health"
    >
      <div className="rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 px-5 py-4 text-amber-900 dark:text-amber-200 text-sm font-medium">
        Cycle predictions are estimates based on averages. Actual ovulation varies. Not suitable for use as contraception. Consult a healthcare provider.
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <Panel>
          <div className="space-y-4">
            <div>
              <FieldLabel>First day of last menstrual period</FieldLabel>
              <input className="input-field" type="date" value={inputs.lmpDate} onChange={(event) => setInputs((current) => ({ ...current, lmpDate: event.target.value }))} />
            </div>
            <div>
              <FieldLabel>Average cycle length</FieldLabel>
              <input className="input-field" type="number" min="20" max="45" value={inputs.cycleLength} onChange={(event) => setInputs((current) => ({ ...current, cycleLength: event.target.value }))} />
            </div>
            <div>
              <FieldLabel>Average luteal phase</FieldLabel>
              <input className="input-field" type="number" min="10" max="17" value={inputs.luteal} onChange={(event) => setInputs((current) => ({ ...current, luteal: event.target.value }))} />
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Ovulation date" value={formatDate(currentCycle.ovulation)} helper="Estimated" tone="green" />
            <StatCard label="Fertile window" value={formatDate(currentCycle.fertileStart)} helper={`to ${formatDate(currentCycle.fertileEnd)}`} tone="blue" />
            <StatCard label="Next expected period" value={formatDate(currentCycle.nextPeriod)} helper="Based on average cycle" tone="indigo" />
            <StatCard label="Days until ovulation" value={`${daysUntilOvulation}`} helper="Approximate" tone="amber" />
          </div>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">3-cycle view</h2>
            <div className="mt-4 grid gap-5 xl:grid-cols-3">
              {cycles.map((cycle, index) => {
                const days = buildMiniCalendar(cycle.ovulation, cycle)
                return (
                  <div key={index} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Cycle {index + 1}</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Ovulation: {formatDate(cycle.ovulation)}</p>
                    <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, dayIndex) => <span key={`${day}-${dayIndex}`} className="text-gray-400 dark:text-gray-500">{day}</span>)}
                      {days.map((day) => (
                        <div
                          key={day.date.toISOString()}
                          className={`rounded-md px-1 py-1.5 ${day.inMonth ? 'text-gray-700 dark:text-gray-200' : 'text-gray-300 dark:text-gray-700'} ${day.isPeriod ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300' : ''} ${day.isFertile ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300' : ''} ${day.isOvulation ? 'ring-2 ring-green-500 font-bold' : ''}`}
                        >
                          {day.date.getDate()}{day.isOvulation ? '*' : ''}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}