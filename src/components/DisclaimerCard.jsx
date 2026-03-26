import { AlertTriangle } from 'lucide-react'

export default function DisclaimerCard({ type = 'general' }) {
  const disclaimerText = {
    finance: 'For educational and estimation purposes only. This is not financial advice. Consult a qualified financial advisor.',
    legal: 'This tool analyzes text structure only. It does NOT provide legal advice. Have all documents reviewed by a qualified legal professional.',
    health: 'This is an estimation tool only. Not medical advice. Consult a qualified healthcare professional for medical guidance.',
    general: 'For estimation purposes only. Consult a professional for accurate or binding decisions.',
    freelance: 'Estimates only. Consult a professional for binding contracts or legal/tax advice.',
  }

  const text = disclaimerText[type] || disclaimerText.general

  return (
    <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 text-sm text-amber-900 dark:text-amber-300 mb-6">
      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
      <span>{text}</span>
    </div>
  )
}
