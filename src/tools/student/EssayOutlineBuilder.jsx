import { useMemo, useState } from 'react'
import { Eye, Code } from 'lucide-react'
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

  const [previewMode, setPreviewMode] = useState('formatted')

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

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">Live Outline Preview</h3>
          <div className="flex gap-0.5 p-0.5 rounded-lg bg-gray-100 dark:bg-gray-800">
            <button onClick={() => setPreviewMode('formatted')} className={`p-1 rounded-md transition-colors ${previewMode === 'formatted' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`} title="Formatted"><Eye className="w-3.5 h-3.5" /></button>
            <button onClick={() => setPreviewMode('raw')} className={`p-1 rounded-md transition-colors ${previewMode === 'raw' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`} title="Plain Text"><Code className="w-3.5 h-3.5" /></button>
          </div>
        </div>
        {previewMode === 'raw' ? (
          <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700 dark:text-gray-300">{preview}</pre>
        ) : (
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <h4 className="text-base font-bold text-gray-900 dark:text-white">I. Introduction</h4>
            <div className="ml-4 space-y-1">
              {data.intro.hook && <p><span className="font-semibold text-gray-800 dark:text-gray-200">A. Hook:</span> {data.intro.hook}</p>}
              {data.intro.background && <p><span className="font-semibold text-gray-800 dark:text-gray-200">B. Background:</span> {data.intro.background}</p>}
              {data.intro.thesis && <p className="border-l-2 border-indigo-400 pl-2"><span className="font-semibold text-indigo-700 dark:text-indigo-400">C. Thesis:</span> {data.intro.thesis}</p>}
            </div>
            <h4 className="text-base font-bold text-gray-900 dark:text-white mt-3">II. Body</h4>
            {data.body.map((p, idx) => (
              <div key={idx} className="ml-4 mb-2">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{idx + 1}. {p.topic || <span className="italic text-gray-400">Topic sentence</span>}</p>
                <div className="ml-4 space-y-0.5">
                  {p.points.map((pt, i) => pt && <p key={i} className="text-gray-600 dark:text-gray-400">{String.fromCharCode(97 + i)}. {pt}</p>)}
                  {p.transition && <p className="text-xs italic text-gray-500 dark:text-gray-400 mt-1">↳ {p.transition}</p>}
                </div>
              </div>
            ))}
            <h4 className="text-base font-bold text-gray-900 dark:text-white mt-3">III. Conclusion</h4>
            <div className="ml-4 space-y-1">
              {data.conclusion.restate && <p><span className="font-semibold text-gray-800 dark:text-gray-200">A. Restate thesis:</span> {data.conclusion.restate}</p>}
              {data.conclusion.summary && <p><span className="font-semibold text-gray-800 dark:text-gray-200">B. Summary:</span> {data.conclusion.summary}</p>}
              {data.conclusion.closing && <p><span className="font-semibold text-gray-800 dark:text-gray-200">C. Closing:</span> {data.conclusion.closing}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
