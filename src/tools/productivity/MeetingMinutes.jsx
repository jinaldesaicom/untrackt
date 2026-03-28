import { useState, useEffect, useCallback, useMemo } from 'react'
import { Plus, Trash2, Copy, Check, Download, ChevronDown, ChevronRight, X, Eye, Code } from 'lucide-react'
import { getItem, setItem } from '../../utils/storage'
import { renderMarkdown } from '../../utils/markdownRenderer'

const STORAGE_KEY = 'untrackt_meeting_minutes'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', cls: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
  { value: 'in-progress', label: 'In Progress', cls: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
  { value: 'done', label: 'Done', cls: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
]

function makeMeeting() {
  return {
    id: Date.now(),
    title: '',
    date: '',
    time: '',
    location: '',
    attendees: [{ id: 1, name: '', role: '', present: true }],
    agendaItems: [{ id: 1, topic: '', discussion: '', decision: '' }],
    actionItems: [{ id: 1, task: '', owner: '', deadline: '', status: 'pending' }],
    generalNotes: '',
    nextMeetingDate: '',
    createdAt: new Date().toISOString(),
  }
}

export default function MeetingMinutes() {
  const [meetings, setMeetings] = useState(() => getItem(STORAGE_KEY, []))
  const [activeId, setActiveId] = useState(null)
  const [expandedSections, setExpandedSections] = useState({ attendees: true, agenda: true, actions: true, notes: true })

  const [previewMode, setPreviewMode] = useState('formatted')

  useEffect(() => { setItem(STORAGE_KEY, meetings) }, [meetings])

  const meeting = useMemo(() => meetings.find(m => m.id === activeId) || null, [meetings, activeId])

  const updateMeeting = useCallback((updates) => {
    setMeetings(prev => prev.map(m => m.id === activeId ? { ...m, ...updates } : m))
  }, [activeId])

  const createMeeting = useCallback(() => {
    const m = makeMeeting()
    setMeetings(prev => [m, ...prev])
    setActiveId(m.id)
  }, [])

  const deleteMeeting = useCallback((id) => {
    if (!window.confirm('Delete these meeting minutes?')) return
    setMeetings(prev => prev.filter(m => m.id !== id))
    if (activeId === id) setActiveId(null)
  }, [activeId])

  const duplicateMeeting = useCallback((id) => {
    const src = meetings.find(m => m.id === id)
    if (!src) return
    const dup = { ...JSON.parse(JSON.stringify(src)), id: Date.now(), title: `${src.title} (copy)`, createdAt: new Date().toISOString() }
    setMeetings(prev => [dup, ...prev])
    setActiveId(dup.id)
  }, [meetings])

  const toggleSection = (key) => setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))

  // ── Attendee helpers ──
  const addAttendee = () => updateMeeting({ attendees: [...meeting.attendees, { id: Date.now(), name: '', role: '', present: true }] })
  const updateAttendee = (id, key, val) => updateMeeting({ attendees: meeting.attendees.map(a => a.id === id ? { ...a, [key]: val } : a) })
  const removeAttendee = (id) => updateMeeting({ attendees: meeting.attendees.filter(a => a.id !== id) })

  // ── Agenda helpers ──
  const addAgendaItem = () => updateMeeting({ agendaItems: [...meeting.agendaItems, { id: Date.now(), topic: '', discussion: '', decision: '' }] })
  const updateAgendaItem = (id, key, val) => updateMeeting({ agendaItems: meeting.agendaItems.map(a => a.id === id ? { ...a, [key]: val } : a) })
  const removeAgendaItem = (id) => updateMeeting({ agendaItems: meeting.agendaItems.filter(a => a.id !== id) })

  // ── Action item helpers ──
  const addActionItem = () => updateMeeting({ actionItems: [...meeting.actionItems, { id: Date.now(), task: '', owner: '', deadline: '', status: 'pending' }] })
  const updateActionItem = (id, key, val) => updateMeeting({ actionItems: meeting.actionItems.map(a => a.id === id ? { ...a, [key]: val } : a) })
  const removeActionItem = (id) => updateMeeting({ actionItems: meeting.actionItems.filter(a => a.id !== id) })

  // ── Markdown export ──
  const markdownOutput = useMemo(() => {
    if (!meeting) return ''
    const m = meeting
    const dateStr = m.date ? new Date(m.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : ''
    const lines = [
      `# Minutes of Meeting: ${m.title || 'Untitled'}`,
      '',
      `**Date:** ${dateStr}${m.time ? ` at ${m.time}` : ''}`,
      m.location ? `**Location:** ${m.location}` : '',
      '',
      '## Attendees',
      ...m.attendees.filter(a => a.name.trim()).map(a => `- ${a.present ? '✅' : '❌'} ${a.name}${a.role ? ` (${a.role})` : ''}`),
      '',
      '## Agenda & Discussion',
      ...m.agendaItems.filter(a => a.topic.trim()).flatMap((a, i) => [
        `### ${i + 1}. ${a.topic}`,
        a.discussion ? `**Discussion:** ${a.discussion}` : '',
        a.decision ? `**Decision:** ${a.decision}` : '',
        '',
      ]),
      '## Action Items',
      '| # | Task | Owner | Deadline | Status |',
      '|---|------|-------|----------|--------|',
      ...m.actionItems.filter(a => a.task.trim()).map((a, i) => {
        const dl = a.deadline ? new Date(a.deadline + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'
        return `| ${i + 1} | ${a.task} | ${a.owner || '—'} | ${dl} | ${STATUS_OPTIONS.find(s => s.value === a.status)?.label || a.status} |`
      }),
      '',
      m.generalNotes?.trim() ? `## Additional Notes\n${m.generalNotes}` : '',
      m.nextMeetingDate ? `\n**Next Meeting:** ${new Date(m.nextMeetingDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}` : '',
    ]
    return lines.filter(l => l !== false && l !== '').join('\n')
  }, [meeting])

  const exportAsText = useCallback(() => {
    if (!markdownOutput) return
    const blob = new Blob([markdownOutput], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mom-${meeting?.title?.replace(/\s+/g, '-').toLowerCase() || 'meeting'}-${meeting?.date || 'undated'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }, [markdownOutput, meeting])

  // ── Section header component ──
  function SectionHeader({ label, sectionKey, count }) {
    const open = expandedSections[sectionKey]
    return (
      <button onClick={() => toggleSection(sectionKey)} className="flex items-center gap-2 w-full text-left group">
        {open ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{label}</h3>
        {count > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">{count}</span>}
      </button>
    )
  }

  // ── Action item status summary ──
  const actionSummary = useMemo(() => {
    if (!meeting) return { total: 0, pending: 0, inProgress: 0, done: 0 }
    const items = meeting.actionItems.filter(a => a.task.trim())
    return {
      total: items.length,
      pending: items.filter(a => a.status === 'pending').length,
      inProgress: items.filter(a => a.status === 'in-progress').length,
      done: items.filter(a => a.status === 'done').length,
    }
  }, [meeting])

  // ── Meeting list (no active meeting) ──
  if (!meeting) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">{meetings.length} meeting{meetings.length !== 1 ? 's' : ''} recorded</p>
          <button onClick={createMeeting} className="btn-primary text-sm flex items-center gap-1.5"><Plus className="w-4 h-4" /> New Minutes</button>
        </div>

        {!meetings.length && (
          <div className="text-center py-16 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <p className="text-3xl mb-3">📋</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">No meeting minutes yet.</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Click "New Minutes" to record your first meeting.</p>
          </div>
        )}

        <div className="space-y-2">
          {meetings.map(m => {
            const dateStr = m.date ? new Date(m.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No date'
            const actionCount = m.actionItems?.filter(a => a.task.trim()).length || 0
            const doneCount = m.actionItems?.filter(a => a.status === 'done').length || 0
            return (
              <div key={m.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <button onClick={() => setActiveId(m.id)} className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{m.title || 'Untitled Meeting'}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{dateStr}{m.time ? ` at ${m.time}` : ''}</span>
                      <span>{m.attendees?.filter(a => a.name.trim()).length || 0} attendees</span>
                      {actionCount > 0 && <span>{doneCount}/{actionCount} actions done</span>}
                    </div>
                  </button>
                  <div className="flex items-center gap-1">
                    <button onClick={() => duplicateMeeting(m.id)} className="text-xs text-gray-400 hover:text-indigo-500 px-2 py-1" title="Duplicate">Dup</button>
                    <button onClick={() => deleteMeeting(m.id)} className="text-gray-300 hover:text-red-500 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ── Active meeting editor ──
  return (
    <div className="space-y-5">
      {/* Back + title bar */}
      <div className="flex items-center gap-3">
        <button onClick={() => setActiveId(null)} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline shrink-0">&larr; All Minutes</button>
        <div className="flex-1" />
        <button onClick={exportAsText} className="btn-secondary text-xs flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Export</button>
        <CopyBtn text={markdownOutput} />
      </div>

      {/* Meeting info */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <input type="text" value={meeting.title} onChange={e => updateMeeting({ title: e.target.value })} className="input-field text-base font-semibold" placeholder="Meeting title" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-0.5 block">Date</label>
            <input type="date" value={meeting.date} onChange={e => updateMeeting({ date: e.target.value })} className="input-field text-sm" />
          </div>
          <div>
            <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-0.5 block">Time</label>
            <input type="time" value={meeting.time} onChange={e => updateMeeting({ time: e.target.value })} className="input-field text-sm" />
          </div>
          <div>
            <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-0.5 block">Location</label>
            <input type="text" value={meeting.location} onChange={e => updateMeeting({ location: e.target.value })} className="input-field text-sm" placeholder="Room / link" />
          </div>
          <div>
            <label className="text-[11px] text-gray-500 dark:text-gray-400 mb-0.5 block">Next Meeting</label>
            <input type="date" value={meeting.nextMeetingDate} onChange={e => updateMeeting({ nextMeetingDate: e.target.value })} className="input-field text-sm" />
          </div>
        </div>
      </div>

      {/* Attendees */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <SectionHeader label="Attendees" sectionKey="attendees" count={meeting.attendees.filter(a => a.name.trim()).length} />
        {expandedSections.attendees && (
          <div className="space-y-2 pt-1">
            {meeting.attendees.map((att) => (
              <div key={att.id} className="flex items-center gap-2">
                <button
                  onClick={() => updateAttendee(att.id, 'present', !att.present)}
                  className={`shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-colors ${att.present ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}
                  title={att.present ? 'Present — click to mark absent' : 'Absent — click to mark present'}
                >
                  {att.present ? '✓' : '✗'}
                </button>
                <input type="text" value={att.name} onChange={e => updateAttendee(att.id, 'name', e.target.value)} className="input-field text-sm flex-1" placeholder="Name" />
                <input type="text" value={att.role} onChange={e => updateAttendee(att.id, 'role', e.target.value)} className="input-field text-xs w-28" placeholder="Role (optional)" />
                {meeting.attendees.length > 1 && (
                  <button onClick={() => removeAttendee(att.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                )}
              </div>
            ))}
            <button onClick={addAttendee} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add attendee</button>
          </div>
        )}
      </div>

      {/* Agenda & Discussion */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <SectionHeader label="Agenda & Discussion" sectionKey="agenda" count={meeting.agendaItems.filter(a => a.topic.trim()).length} />
        {expandedSections.agenda && (
          <div className="space-y-3 pt-1">
            {meeting.agendaItems.map((item, idx) => (
              <div key={item.id} className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium w-5">{idx + 1}.</span>
                  <input type="text" value={item.topic} onChange={e => updateAgendaItem(item.id, 'topic', e.target.value)} className="input-field text-sm flex-1 font-medium" placeholder="Agenda topic" />
                  {meeting.agendaItems.length > 1 && (
                    <button onClick={() => removeAgendaItem(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                </div>
                <textarea value={item.discussion} onChange={e => updateAgendaItem(item.id, 'discussion', e.target.value)} className="textarea-field text-xs min-h-[50px]" placeholder="Discussion summary…" />
                <div className="flex items-start gap-2">
                  <span className="text-[10px] text-gray-400 mt-1.5 shrink-0 uppercase tracking-wide font-semibold">Decision:</span>
                  <textarea value={item.decision} onChange={e => updateAgendaItem(item.id, 'decision', e.target.value)} className="textarea-field text-xs min-h-[32px] flex-1" placeholder="Decision made (if any)…" />
                </div>
              </div>
            ))}
            <button onClick={addAgendaItem} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add agenda item</button>
          </div>
        )}
      </div>

      {/* Action Items */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <SectionHeader label="Action Items" sectionKey="actions" count={actionSummary.total} />
          {actionSummary.total > 0 && (
            <div className="flex items-center gap-2 text-[10px]">
              <span className="px-1.5 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">{actionSummary.pending} pending</span>
              <span className="px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">{actionSummary.inProgress} in progress</span>
              <span className="px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">{actionSummary.done} done</span>
            </div>
          )}
        </div>
        {expandedSections.actions && (
          <div className="space-y-2 pt-1">
            {meeting.actionItems.map((item, idx) => (
              <div key={item.id} className="flex items-start gap-2 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-3">
                <span className="text-xs text-gray-400 mt-2 w-5">{idx + 1}.</span>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="text" value={item.task} onChange={e => updateActionItem(item.id, 'task', e.target.value)} className="input-field text-sm flex-1" placeholder="Action item" />
                    {meeting.actionItems.length > 1 && (
                      <button onClick={() => removeActionItem(item.id)} className="text-gray-300 hover:text-red-500 shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <input type="text" value={item.owner} onChange={e => updateActionItem(item.id, 'owner', e.target.value)} className="input-field text-xs w-32" placeholder="Owner" />
                    <input type="date" value={item.deadline} onChange={e => updateActionItem(item.id, 'deadline', e.target.value)} className="input-field text-xs w-36" />
                    <select value={item.status} onChange={e => updateActionItem(item.id, 'status', e.target.value)} className="input-field text-xs w-28">
                      {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${STATUS_OPTIONS.find(s => s.value === item.status)?.cls}`}>
                      {STATUS_OPTIONS.find(s => s.value === item.status)?.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addActionItem} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Add action item</button>
          </div>
        )}
      </div>

      {/* General Notes */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-3">
        <SectionHeader label="Additional Notes" sectionKey="notes" count={0} />
        {expandedSections.notes && (
          <textarea
            value={meeting.generalNotes}
            onChange={e => updateMeeting({ generalNotes: e.target.value })}
            className="textarea-field text-sm min-h-[80px]"
            placeholder="Any other notes, follow-ups, or observations…"
          />
        )}
      </div>

      {/* Markdown preview */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Preview</h3>
            <div className="flex gap-0.5 p-0.5 rounded-lg bg-gray-100 dark:bg-gray-800">
              <button onClick={() => setPreviewMode('formatted')} className={`p-1 rounded-md transition-colors ${previewMode === 'formatted' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`} title="Formatted"><Eye className="w-3.5 h-3.5" /></button>
              <button onClick={() => setPreviewMode('raw')} className={`p-1 rounded-md transition-colors ${previewMode === 'raw' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`} title="Raw Markdown"><Code className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <CopyBtn text={markdownOutput} />
        </div>
        {previewMode === 'raw' ? (
          <pre className="textarea-field min-h-[80px] whitespace-pre-wrap text-xs bg-gray-50 dark:bg-gray-800 max-h-[250px] overflow-y-auto">{markdownOutput}</pre>
        ) : (
          <div className="min-h-[80px] max-h-[400px] overflow-y-auto p-3 rounded-lg bg-gray-50 dark:bg-gray-800" dangerouslySetInnerHTML={{ __html: renderMarkdown(markdownOutput) }} />
        )}
      </div>

      <p className="text-center text-[11px] text-gray-400 dark:text-gray-500">All meeting minutes are stored locally in your browser. Nothing is sent to any server.</p>
    </div>
  )
}
