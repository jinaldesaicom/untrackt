import { useMemo, useState } from 'react'
import { getItem, setItem, removeItem } from '../../utils/storage.js'

const STORAGE_KEY = 'untrackt:essayOutline'

function blankBody() {
  return { topic: '', points: ['', ''], transition: '' }
}

export default function EssayOutlineBuilder() {
  const [data, setData] = useState(() => getItem(STORAGE_KEY, {
    intro: { hook: '', background: '', thesis: '' },
    body: [blankBody()],
    conclusion: { restate: '', summary: '', closing: '' },
  }))

  const updateAndSave = (next) => {
    setData(next)
    setItem(STORAGE_KEY, next)
  }

  const preview = useMemo(() => {
    const lines = []
    lines.push('I. Introduction')
    lines.push(`  A. Hook: ${data.intro.hook}`)
    lines.push(`  B. Background: ${data.intro.background}`)
    lines.push(`  C. Thesis: ${data.intro.thesis}`)
    lines.push('II. Body')
    data.body.forEach((p, idx) => {
      lines.push(`  ${idx + 1}. Topic sentence: ${p.topic}`)
      p.points.forEach((point, i) => lines.push(`     ${String.fromCharCode(97 + i)}. ${point}`))
      lines.push(`     Transition: ${p.transition}`)
    })
    lines.push('III. Conclusion')
    lines.push(`  A. Restate thesis: ${data.conclusion.restate}`)
    lines.push(`  B. Summary points: ${data.conclusion.summary}`)
    lines.push(`  C. Closing thought: ${data.conclusion.closing}`)
    return lines.join('\n')
  }, [data])

  const move = (from, to) => {
    if (to < 0 || to >= data.body.length) return
    const next = [...data.body]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    updateAndSave({ ...data, body: next })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-4">
        <section className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
          <h3 className="font-semibold">Introduction</h3>
          <input className="input-field" placeholder="Hook" value={data.intro.hook} onChange={(e) => updateAndSave({ ...data, intro: { ...data.intro, hook: e.target.value } })} />
          <textarea className="textarea-field min-h-[70px]" placeholder="Background" value={data.intro.background} onChange={(e) => updateAndSave({ ...data, intro: { ...data.intro, background: e.target.value } })} />
          <input className="input-field border-indigo-300" placeholder="Thesis statement" value={data.intro.thesis} onChange={(e) => updateAndSave({ ...data, intro: { ...data.intro, thesis: e.target.value } })} />
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Body Paragraphs</h3>
            <button className="btn-secondary" onClick={() => data.body.length < 5 && updateAndSave({ ...data, body: [...data.body, blankBody()] })}>Add paragraph</button>
          </div>

          {data.body.map((p, idx) => (
            <div
              key={idx}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('idx', String(idx))}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const from = Number(e.dataTransfer.getData('idx'))
                move(from, idx)
              }}
              className="rounded-lg border border-gray-200 p-3 bg-gray-50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">Paragraph {idx + 1}</p>
                <div className="flex gap-2">
                  <button className="text-xs text-indigo-600" onClick={() => move(idx, idx - 1)}>Up</button>
                  <button className="text-xs text-indigo-600" onClick={() => move(idx, idx + 1)}>Down</button>
                </div>
              </div>
              <input className="input-field" placeholder="Topic sentence" value={p.topic} onChange={(e) => updateAndSave({ ...data, body: data.body.map((b, i) => i === idx ? { ...b, topic: e.target.value } : b) })} />
              {p.points.map((point, i2) => (
                <input key={i2} className="input-field" placeholder={`Supporting point ${i2 + 1}`} value={point} onChange={(e) => updateAndSave({ ...data, body: data.body.map((b, i) => i === idx ? { ...b, points: b.points.map((pp, pi) => pi === i2 ? e.target.value : pp) } : b) })} />
              ))}
              <input className="input-field" placeholder="Transition" value={p.transition} onChange={(e) => updateAndSave({ ...data, body: data.body.map((b, i) => i === idx ? { ...b, transition: e.target.value } : b) })} />
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
          <h3 className="font-semibold">Conclusion</h3>
          <input className="input-field" placeholder="Restate thesis" value={data.conclusion.restate} onChange={(e) => updateAndSave({ ...data, conclusion: { ...data.conclusion, restate: e.target.value } })} />
          <textarea className="textarea-field min-h-[70px]" placeholder="Summary points" value={data.conclusion.summary} onChange={(e) => updateAndSave({ ...data, conclusion: { ...data.conclusion, summary: e.target.value } })} />
          <input className="input-field" placeholder="Closing thought" value={data.conclusion.closing} onChange={(e) => updateAndSave({ ...data, conclusion: { ...data.conclusion, closing: e.target.value } })} />
        </section>

        <div className="flex gap-2">
          <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(preview)}>Export as plain text</button>
          <button className="btn-secondary" onClick={() => { if (window.confirm('Clear all outline fields?')) { const blank = { intro: { hook: '', background: '', thesis: '' }, body: [blankBody()], conclusion: { restate: '', summary: '', closing: '' } }; setData(blank); removeItem(STORAGE_KEY) } }}>Clear all</button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="font-semibold mb-2">Live Outline Preview</h3>
        <pre className="whitespace-pre-wrap text-sm font-mono">{preview}</pre>
      </div>
    </div>
  )
}
