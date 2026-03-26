import { memo } from 'react'
import SEOHead from './SEOHead.jsx'
import DisclaimerCard from './DisclaimerCard.jsx'

export function ToolLayout({ title, description, path, disclaimerType, children }) {
  return (
    <>
      <SEOHead title={`${title} | UnTrackt`} description={description} path={path} toolName={title} />
      {disclaimerType ? <DisclaimerCard type={disclaimerType} /> : null}
      <div className="space-y-6">{children}</div>
    </>
  )
}

export const Panel = memo(function Panel({ children, className = '' }) {
  return <section className={`panel-card ${className}`.trim()}>{children}</section>
})

const TONE_MAP = {
  indigo: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300',
  green: 'bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300',
  blue: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300',
  amber: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
  rose: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300',
  gray: 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200',
}

export const StatCard = memo(function StatCard({ label, value, helper, tone = 'indigo', className = '' }) {
  return (
    <div className={`rounded-2xl border p-4 ${TONE_MAP[tone] || TONE_MAP.gray} ${className}`.trim()}>
      <p className="text-xs uppercase tracking-[0.16em] opacity-80">{label}</p>
      <p className="mt-2 text-2xl font-bold leading-tight">{value}</p>
      {helper ? <p className="mt-1 text-xs opacity-80">{helper}</p> : null}
    </div>
  )
})

export const SegmentedToggle = memo(function SegmentedToggle({ options, value, onChange, disabled = false, className = '' }) {
  return (
    <div className={`inline-flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden ${className}`.trim()} role="radiogroup">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          disabled={disabled || option.disabled}
          onClick={() => onChange(option.value)}
          className={`px-3 py-2 text-sm font-medium transition-colors ${value === option.value ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'} ${disabled || option.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
})

export function FieldLabel({ children, helper }) {
  return (
    <div className="flex items-center justify-between gap-3 mb-1.5">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{children}</label>
      {helper ? <span className="text-xs text-gray-500 dark:text-gray-400">{helper}</span> : null}
    </div>
  )
}