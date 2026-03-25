import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel } from '../../components/ToolLayout.jsx'
import { ProductivityNotice, useStoredState, downloadTextFile } from './shared.jsx'

const STORAGE_KEY = 'untrackt:productivity:weekly-review'

function getWeekKey(date = new Date()) {
  const day = new Date(date)
  day.setHours(0, 0, 0, 0)
  const diff = day.getDate() - day.getDay() + (day.getDay() === 0 ? -6 : 1)
  day.setDate(diff)
  return day.toISOString().slice(0, 10)
}

function emptyReview() {
  return {
    accomplished: '',
    notDone: '',
    wentWell: '',
    improve: '',
    energy: 3,
    learnings: [''],
    priorities: ['', '', ''],
    projects: [''],
    followUps: [''],
    deadlines: [{ id: crypto.randomUUID(), date: '', text: '' }],
    personalGoals: '',
    metrics: [{ id: crypto.randomUUID(), name: '', value: '', trend: 'same' }],
    gratitude: ['', '', ''],
  }
}

export default function WeeklyReviewTemplate() {
  const initialWeek = getWeekKey()
  const [store, setStore] = useStoredState(STORAGE_KEY, { activeWeek: initialWeek, reviews: { [initialWeek]: emptyReview() } })
  const [openSection, setOpenSection] = useState('review')
  const review = store.reviews[store.activeWeek] || emptyReview()

  const updateReview = (updater) => setStore((current) => {
    const nextReviews = { ...current.reviews, [current.activeWeek]: updater(current.reviews[current.activeWeek] || emptyReview()) }
    const pruned = Object.entries(nextReviews).sort((left, right) => right[0].localeCompare(left[0])).slice(0, 12)
    return { ...current, reviews: Object.fromEntries(pruned) }
  })

  const exportText = useMemo(() => [
    `Weekly review for ${store.activeWeek}`,
    '',
    'Last week', review.accomplished, review.notDone, review.wentWell, review.improve,
    '',
    'Next week priorities', ...review.priorities,
    '',
    'Metrics', ...review.metrics.map((metric) => `${metric.name}: ${metric.value} (${metric.trend})`),
    '',
    'Gratitude', ...review.gratitude,
  ].join('\n'), [review, store.activeWeek])

  return (
    <div className="space-y-6">
      <ProductivityNotice storageKey={STORAGE_KEY} onClear={() => setStore({ activeWeek: initialWeek, reviews: { [initialWeek]: emptyReview() } })} />

      <Panel>
        <div className="grid gap-3 lg:grid-cols-[220px,1fr,auto,auto]">
          <input className="input-field" type="date" value={store.activeWeek} onChange={(event) => setStore((current) => ({ ...current, activeWeek: event.target.value, reviews: current.reviews[event.target.value] ? current.reviews : { ...current.reviews, [event.target.value]: emptyReview() } }))} />
          <select className="input-field" value={store.activeWeek} onChange={(event) => setStore((current) => ({ ...current, activeWeek: event.target.value }))}>{Object.keys(store.reviews).sort().reverse().map((key) => <option key={key} value={key}>{key}</option>)}</select>
          <CopyButton text={exportText} label="Copy review" />
          <button type="button" className="btn-secondary" onClick={() => downloadTextFile(`weekly-review-${store.activeWeek}.txt`, exportText)}>Download .txt</button>
        </div>
      </Panel>

      {[
        ['review', '1. Last Week — Review'],
        ['plan', '2. Next Week — Planning'],
        ['metrics', '3. Metrics check-in'],
        ['gratitude', '4. Gratitude'],
      ].map(([id, title]) => (
        <Panel key={id}>
          <button type="button" className="flex w-full items-center justify-between text-left" onClick={() => setOpenSection((current) => current === id ? '' : id)}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{openSection === id ? 'Hide' : 'Show'}</span>
          </button>
          {openSection === id ? (
            <div className="mt-4 space-y-4">
              {id === 'review' ? (
                <>
                  <textarea className="textarea-field min-h-[100px]" value={review.accomplished} onChange={(event) => updateReview((current) => ({ ...current, accomplished: event.target.value }))} placeholder="What did I accomplish?" />
                  <textarea className="textarea-field min-h-[100px]" value={review.notDone} onChange={(event) => updateReview((current) => ({ ...current, notDone: event.target.value }))} placeholder="What did not get done?" />
                  <textarea className="textarea-field min-h-[100px]" value={review.wentWell} onChange={(event) => updateReview((current) => ({ ...current, wentWell: event.target.value }))} placeholder="What went well?" />
                  <textarea className="textarea-field min-h-[100px]" value={review.improve} onChange={(event) => updateReview((current) => ({ ...current, improve: event.target.value }))} placeholder="What could be improved?" />
                  <label className="block text-sm text-gray-600 dark:text-gray-300">Energy / mood: {review.energy} / 5<input className="mt-2 w-full" type="range" min="1" max="5" value={review.energy} onChange={(event) => updateReview((current) => ({ ...current, energy: Number(event.target.value) }))} /></label>
                  {review.learnings.map((entry, index) => <input key={index} className="input-field" value={entry} onChange={(event) => updateReview((current) => ({ ...current, learnings: current.learnings.map((item, itemIndex) => itemIndex === index ? event.target.value : item) }))} placeholder="Key learning" />)}
                </>
              ) : null}

              {id === 'plan' ? (
                <>
                  {review.priorities.map((entry, index) => <input key={index} className="input-field" value={entry} onChange={(event) => updateReview((current) => ({ ...current, priorities: current.priorities.map((item, itemIndex) => itemIndex === index ? event.target.value : item) }))} placeholder={`Top priority ${index + 1}`} />)}
                  <textarea className="textarea-field min-h-[100px]" value={review.personalGoals} onChange={(event) => updateReview((current) => ({ ...current, personalGoals: event.target.value }))} placeholder="Personal goals for the week" />
                  {review.projects.map((entry, index) => <input key={index} className="input-field" value={entry} onChange={(event) => updateReview((current) => ({ ...current, projects: current.projects.map((item, itemIndex) => itemIndex === index ? event.target.value : item) }))} placeholder="Project to advance" />)}
                  {review.followUps.map((entry, index) => <input key={index} className="input-field" value={entry} onChange={(event) => updateReview((current) => ({ ...current, followUps: current.followUps.map((item, itemIndex) => itemIndex === index ? event.target.value : item) }))} placeholder="Person to follow up with" />)}
                  {review.deadlines.map((deadline) => <div key={deadline.id} className="grid gap-3 md:grid-cols-[180px,1fr]"><input className="input-field" type="date" value={deadline.date} onChange={(event) => updateReview((current) => ({ ...current, deadlines: current.deadlines.map((item) => item.id === deadline.id ? { ...item, date: event.target.value } : item) }))} /><input className="input-field" value={deadline.text} onChange={(event) => updateReview((current) => ({ ...current, deadlines: current.deadlines.map((item) => item.id === deadline.id ? { ...item, text: event.target.value } : item) }))} placeholder="Appointment or deadline" /></div>)}
                </>
              ) : null}

              {id === 'metrics' ? (
                <>
                  {review.metrics.map((metric) => <div key={metric.id} className="grid gap-3 md:grid-cols-[1fr,160px,120px]"><input className="input-field" value={metric.name} onChange={(event) => updateReview((current) => ({ ...current, metrics: current.metrics.map((item) => item.id === metric.id ? { ...item, name: event.target.value } : item) }))} placeholder="Metric name" /><input className="input-field" value={metric.value} onChange={(event) => updateReview((current) => ({ ...current, metrics: current.metrics.map((item) => item.id === metric.id ? { ...item, value: event.target.value } : item) }))} placeholder="Value" /><select className="input-field" value={metric.trend} onChange={(event) => updateReview((current) => ({ ...current, metrics: current.metrics.map((item) => item.id === metric.id ? { ...item, trend: event.target.value } : item) }))}><option>up</option><option>same</option><option>down</option></select></div>)}
                </>
              ) : null}

              {id === 'gratitude' ? (
                review.gratitude.map((entry, index) => <input key={index} className="input-field" value={entry} onChange={(event) => updateReview((current) => ({ ...current, gratitude: current.gratitude.map((item, itemIndex) => itemIndex === index ? event.target.value : item) }))} placeholder={`Gratitude item ${index + 1}`} />)
              ) : null}
            </div>
          ) : null}
        </Panel>
      ))}
    </div>
  )
}
