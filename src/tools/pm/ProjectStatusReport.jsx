import { useState, useEffect } from 'react'
import { Copy, Download } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'

const STORAGE_KEY = 'untrackt_status_report'

const RAG = {
  green: { label: 'Green', emoji: '🟢', bg: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700', text: 'text-green-700 dark:text-green-300' },
  amber: { label: 'Amber', emoji: '🟡', bg: 'bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700', text: 'text-amber-700 dark:text-amber-300' },
  red: { label: 'Red', emoji: '🔴', bg: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700', text: 'text-red-700 dark:text-red-300' },
}

const SECTIONS = ['Overall', 'Scope', 'Schedule', 'Budget', 'Risk']

function emptyReport() {
  const statuses = {}
  SECTIONS.forEach(s => { statuses[s] = 'green' })
  return {
    id: Date.now(),
    projectName: '',
    reportDate: new Date().toISOString().slice(0, 10),
    statuses,
    keyUpdates: '',
    risks: '',
    nextSteps: '',
  }
}

export default function ProjectStatusReport() {
  const [report, setReport] = useState(() => getItem(STORAGE_KEY, emptyReport()))

  useEffect(() => { setItem(STORAGE_KEY, report) }, [report])

  const updateField = (key, val) => setReport(prev => ({ ...prev, [key]: val }))
  const updateStatus = (section, rag) => setReport(prev => ({
    ...prev, statuses: { ...prev.statuses, [section]: rag },
  }))

  const reset = () => setReport(emptyReport())

  const generateSummary = () => {
    let text = `PROJECT STATUS REPORT\n`
    text += `Project: ${report.projectName || 'N/A'}\n`
    text += `Date: ${report.reportDate}\n\n`
    text += `--- RAG STATUS ---\n`
    SECTIONS.forEach(s => { text += `${s}: ${RAG[report.statuses[s]].emoji} ${RAG[report.statuses[s]].label}\n` })
    text += `\n--- KEY UPDATES ---\n${report.keyUpdates || 'None'}\n`
    text += `\n--- RISKS & ISSUES ---\n${report.risks || 'None'}\n`
    text += `\n--- NEXT STEPS ---\n${report.nextSteps || 'None'}\n`
    return text
  }

  const copyReport = () => navigator.clipboard.writeText(generateSummary())

  const exportReport = () => {
    const blob = new Blob([generateSummary()], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'status-report.txt'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Project Name</label>
          <input value={report.projectName} onChange={(e) => updateField('projectName', e.target.value)} placeholder="My Project" className="mt-1 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-indigo-400" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Report Date</label>
          <input type="date" value={report.reportDate} onChange={(e) => updateField('reportDate', e.target.value)} className="mt-1 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-indigo-400" />
        </div>
      </div>

      {/* RAG statuses */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">RAG Status</h3>
        {SECTIONS.map(s => (
          <div key={s} className="flex items-center gap-3">
            <span className="text-sm text-gray-700 dark:text-gray-300 w-20">{s}</span>
            <div className="flex items-center gap-1.5">
              {Object.entries(RAG).map(([key, r]) => (
                <button key={key} onClick={() => updateStatus(s, key)} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-base transition-transform ${report.statuses[s] === key ? `${r.bg} scale-110 ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-900 ring-${key === 'green' ? 'green' : key === 'amber' ? 'amber' : 'red'}-400` : 'border-gray-200 dark:border-gray-700 hover:scale-105'}`}>
                  {r.emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Text sections */}
      {[
        { key: 'keyUpdates', label: 'Key Updates', placeholder: 'What happened this period?' },
        { key: 'risks', label: 'Risks & Issues', placeholder: 'Active risks and issues...' },
        { key: 'nextSteps', label: 'Next Steps', placeholder: 'Planned actions for next period...' },
      ].map(s => (
        <div key={s.key}>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">{s.label}</label>
          <textarea value={report[s.key]} onChange={(e) => updateField(s.key, e.target.value)} placeholder={s.placeholder} rows={3} className="mt-1 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 outline-none resize-none focus:border-indigo-400" />
        </div>
      ))}

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button onClick={copyReport} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Copy className="w-3.5 h-3.5" /> Copy
        </button>
        <button onClick={exportReport} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
        <button onClick={reset} className="text-xs text-red-400 hover:text-red-600 ml-auto">Reset</button>
      </div>
    </div>
  )
}
