import { useState, useEffect } from 'react'
import { AlignLeft, Copy, Trash2, Plus } from 'lucide-react'
import SEOHead from '../../components/SEOHead.jsx'
import PrintButton from '../../components/PrintButton.jsx'
import CopyButton from '../../components/CopyButton.jsx'
import * as storage from '../../utils/storage.js'

const PROPOSAL_KEY = 'proposal:autosave'
const DEFAULT_TERMS = 'Payment due upon completion. All work is non-refundable unless agreed otherwise.'

export default function ProposalBuilder() {
  const [sections, setSections] = useState([
    { id: 1, title: 'Executive Summary', content: '', order: 1, hint: 'Provide a brief overview of who you are and what you\'re proposing.' },
    { id: 2, title: 'Problem Statement', content: '', order: 2, hint: 'Describe the client\'s challenges or pain points.' },
    { id: 3, title: 'Proposed Solution', content: '', order: 3, hint: 'Explain your approach and solution to address their problem.' },
    { id: 4, title: 'Scope of Work', content: '', order: 4, hint: 'List all deliverables and activities included.' },
    { id: 5, title: 'Timeline', content: '', order: 5, hint: 'Outline the project timeline and key milestones.' },
    { id: 6, title: 'Investment / Pricing', content: '', order: 6, hint: 'Detail the pricing structure and payment terms.' },
    { id: 7, title: 'About You / Your Team', content: '', order: 7, hint: 'Share your qualifications, experience, and team.' },
    { id: 8, title: 'Terms & Conditions', content: DEFAULT_TERMS, order: 8, hint: 'Include your standard terms.' },
    { id: 9, title: 'Call to Action / Next Steps', content: '', order: 9, hint: 'Tell them how to proceed and accept your proposal.' },
  ])

  const [expanded, setExpanded] = useState(new Set(['1']))
  const [showWordTargets, setShowWordTargets] = useState(false)

  // Auto-save every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      storage.setItem(PROPOSAL_KEY, sections)
    }, 3000)
    return () => clearInterval(timer)
  }, [sections])

  // Load on mount
  useEffect(() => {
    const saved = storage.getItem(PROPOSAL_KEY)
    if (saved && Array.isArray(saved)) {
      setSections(saved)
    }
  }, [])

  const updateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expanded)
    if (newExpanded.has(String(id))) {
      newExpanded.delete(String(id))
    } else {
      newExpanded.add(String(id))
    }
    setExpanded(newExpanded)
  }

  const totalWords = sections.reduce((sum, s) => sum + (s.content.trim().split(/\s+/).length || 0), 0)

  const wordCount = (text) => text.trim() ? text.trim().split(/\s+/).length : 0

  const clear = () => {
    if (confirm('Clear all proposal content?')) {
      setSections(sections.map(s => ({ ...s, content: s.id === 8 ? DEFAULT_TERMS : '' })))
      storage.removeItem(PROPOSAL_KEY)
    }
  }

  return (
    <>
      <SEOHead
        title="Proposal Builder | UnTrackt"
        description="Build professional proposals with auto-save. Structured sections with writing tips, live word count, and print to PDF."
        path="/tools/proposal-builder"
        toolName="Proposal Builder"
      />


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-6 space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Words</p>
              <p className="text-3xl font-bold text-gray-900">{totalWords}</p>
            </div>

            <div className="pt-4 border-t border-gray-200 space-y-2">
              <PrintButton label="Print / Save as PDF" className="w-full justify-center" />
              <button onClick={() => setShowWordTargets(!showWordTargets)} className="btn-secondary w-full text-sm">
                {showWordTargets ? 'Hide' : 'Show'} Targets
              </button>
              <button onClick={clear} className="btn-secondary w-full text-sm bg-red-50 text-red-600 hover:bg-red-100">
                Clear All
              </button>
            </div>

            {showWordTargets && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 space-y-1">
                <p className="font-semibold mb-2">Suggested Word Counts:</p>
                {[
                  ('Executive Summary', 75),
                  ('Problem Statement', 150),
                  ('Solution', 200),
                  ('Investment', 100),
                  ('About Us', 150),
                ].map(([name, target]) => (
                  <p key={name}><span className="font-medium">{name}:</span> ~{target} words</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div id="proposal-preview" className="lg:col-span-2 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleExpanded(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-lg text-gray-900 text-left">{section.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-gray-100 rounded">{wordCount(section.content)} words</span>
                  <span className={`transition-transform ${expanded.has(String(section.id)) ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </button>

              {expanded.has(String(section.id)) && (
                <div className="px-6 py-4 border-t border-gray-200 space-y-3">
                  {section.hint && (
                    <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded italic">
                      💡 {section.hint}
                    </div>
                  )}
                  <textarea
                    value={section.content}
                    onChange={e => updateSection(section.id, 'content', e.target.value)}
                    className="input-field w-full textarea resize-none"
                    rows="8"
                    placeholder={`Write your ${section.title.toLowerCase()}...`}
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{wordCount(section.content)} words</span>
                    <CopyButton text={section.content} label="Copy section" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Auto-save indicator */}
          <div className="text-xs text-gray-500 text-center py-4">
            ✓ Auto-saving to browser storage
          </div>
        </div>
      </div>

      {/* Print view styles */}
      <style>{`
        @media print {
          .no-print, .btn-secondary, [class*="btn-"], .lg\\:col-span-1, button {
            display: none !important;
          }
          #proposal-preview {
            grid-column: 1 / -1;
          }
          .space-y-4 > div {
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>
    </>
  )
}
