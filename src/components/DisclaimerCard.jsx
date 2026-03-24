import { AlertTriangle } from 'lucide-react'

export default function DisclaimerCard({ type = 'general' }) {
  const disclaimerText = {
    finance: 'For educational and estimation purposes only. This is not financial advice. Consult a qualified financial advisor.',
    legal: 'This tool analyzes text structure only. It does NOT provide legal advice. Have all documents reviewed by a qualified legal professional.',
    health: 'This tool is for informational purposes only. It is not a substitute for professional medical advice. Consult a healthcare provider.',
    general: 'For estimation purposes only. Consult a professional for accurate or binding decisions.',
    freelance: 'Estimates only. Consult a professional for binding contracts or legal/tax advice.',
  }

  const text = disclaimerText[type] || disclaimerText.general

  return (
    <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-900 mb-6">
      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
      <span>{text}</span>
    </div>
  )
}
