import { useMemo, useState } from 'react'
import { ToolLayout, Panel, StatCard, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function formatDate(value) {
  return value ? value.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—'
}

function startOfDay(date) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

export default function PregnancyDueDateCalculator() {
  const [method, setMethod] = useState('lmp')
  const [inputs, setInputs] = useState({
    lmpDate: '2026-02-20',
    cycleLength: '28',
    conceptionDate: '2026-03-06',
    transferDate: '2026-03-10',
    embryoAge: '5',
  })

  const { dueDate, gestationStart, estimatedConception } = useMemo(() => {
    if (method === 'conception') {
      const conceptionDate = new Date(inputs.conceptionDate)
      return {
        dueDate: addDays(conceptionDate, 266),
        gestationStart: addDays(conceptionDate, -14),
        estimatedConception: conceptionDate,
      }
    }

    if (method === 'ivf') {
      const transferDate = new Date(inputs.transferDate)
      const embryoAge = Number(inputs.embryoAge)
      const conceptionDate = addDays(transferDate, -embryoAge)
      return {
        dueDate: addDays(conceptionDate, 266),
        gestationStart: addDays(conceptionDate, -14),
        estimatedConception: conceptionDate,
      }
    }

    const lmpDate = new Date(inputs.lmpDate)
    const cycleLengthAdjustment = Number(inputs.cycleLength) - 28
    return {
      dueDate: addDays(lmpDate, 280 + cycleLengthAdjustment),
      gestationStart: lmpDate,
      estimatedConception: addDays(lmpDate, Number(inputs.cycleLength) - 14),
    }
  }, [inputs, method])

  const today = startOfDay(new Date())
  const gestationDays = Math.max(0, Math.floor((today - startOfDay(gestationStart)) / 86400000))
  const gestationWeeks = Math.floor(gestationDays / 7)
  const gestationRemainderDays = gestationDays % 7
  const trimesterRanges = [
    { label: '1st trimester', startWeek: 1, endWeek: 12 },
    { label: '2nd trimester', startWeek: 13, endWeek: 26 },
    { label: '3rd trimester', startWeek: 27, endWeek: 40 },
  ]
  const milestones = [
    { label: 'First heartbeat detectable', week: 6 },
    { label: 'NT scan window opens', week: 11 },
    { label: 'Anatomy scan', week: 20 },
    { label: 'Viability milestone', week: 24 },
    { label: 'Full term', week: 39 },
  ]
  const upcomingWeeks = Array.from({ length: 4 }, (_, index) => {
    const weekNumber = gestationWeeks + index + 1
    return { weekNumber, start: addDays(gestationStart, weekNumber * 7) }
  })

  return (
    <ToolLayout
      title="Pregnancy Due Date Calculator"
      description="Estimate due date, gestational age, trimester windows, and milestone dates from LMP, conception, or IVF transfer timing."
      path="/tools/pregnancy-due-date-calculator"
      disclaimerType="health"
    >
      <div className="rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 px-5 py-4 text-amber-900 dark:text-amber-200 text-sm font-medium">
        Due dates are estimates. Only 4% of babies are born on their exact due date. Always confirm with your healthcare provider.
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="space-y-4">
            <div>
              <FieldLabel>Calculation method</FieldLabel>
              <SegmentedToggle options={[{ label: 'LMP', value: 'lmp' }, { label: 'Conception', value: 'conception' }, { label: 'IVF', value: 'ivf' }]} value={method} onChange={setMethod} />
            </div>

            {method === 'lmp' && (
              <>
                <div>
                  <FieldLabel>First day of last period</FieldLabel>
                  <input className="input-field" type="date" value={inputs.lmpDate} onChange={(event) => setInputs((current) => ({ ...current, lmpDate: event.target.value }))} />
                </div>
                <div>
                  <FieldLabel>Average cycle length</FieldLabel>
                  <input className="input-field" type="number" min="20" max="45" value={inputs.cycleLength} onChange={(event) => setInputs((current) => ({ ...current, cycleLength: event.target.value }))} />
                </div>
              </>
            )}

            {method === 'conception' && (
              <div>
                <FieldLabel>Estimated conception date</FieldLabel>
                <input className="input-field" type="date" value={inputs.conceptionDate} onChange={(event) => setInputs((current) => ({ ...current, conceptionDate: event.target.value }))} />
              </div>
            )}

            {method === 'ivf' && (
              <>
                <div>
                  <FieldLabel>Transfer date</FieldLabel>
                  <input className="input-field" type="date" value={inputs.transferDate} onChange={(event) => setInputs((current) => ({ ...current, transferDate: event.target.value }))} />
                </div>
                <div>
                  <FieldLabel>Embryo age at transfer</FieldLabel>
                  <SegmentedToggle options={[{ label: '3-day', value: '3' }, { label: '5-day', value: '5' }]} value={inputs.embryoAge} onChange={(embryoAge) => setInputs((current) => ({ ...current, embryoAge }))} />
                </div>
              </>
            )}
          </div>
        </Panel>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Estimated due date" value={formatDate(dueDate)} helper="Based on selected method" tone="indigo" />
            <StatCard label="Gestational age" value={`${gestationWeeks} weeks ${gestationRemainderDays} days`} helper="As of today" tone="green" />
            <StatCard label="Estimated conception" value={formatDate(estimatedConception)} helper="Derived where possible" tone="blue" />
          </div>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Trimester breakdown</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {trimesterRanges.map((trimester) => (
                <StatCard
                  key={trimester.label}
                  label={trimester.label}
                  value={`${formatDate(addDays(gestationStart, (trimester.startWeek - 1) * 7))}`}
                  helper={`to ${formatDate(addDays(gestationStart, trimester.endWeek * 7 - 1))}`}
                  tone="gray"
                />
              ))}
            </div>
          </Panel>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Key milestone dates</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {milestones.map((milestone) => (
                <div key={milestone.label} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{milestone.label}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Week {milestone.week} · {formatDate(addDays(gestationStart, milestone.week * 7))}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Next four weeks</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {upcomingWeeks.map((week) => (
                <div key={week.weekNumber} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Week {week.weekNumber}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Begins {formatDate(week.start)}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}