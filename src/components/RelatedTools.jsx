import { Link } from 'react-router-dom'
import tools, { categories, categoryColorMap } from '../data/tools.js'
import { getIcon } from '../icons.js'

const TOOL_CHAINS = {
  'bmr-calculator': ['tdee-calculator', 'macro-calculator', 'calorie-burn-estimator'],
  'tdee-calculator': ['macro-calculator', 'bmr-calculator', 'ideal-weight-calculator'],
  'macro-calculator': ['tdee-calculator', 'calorie-burn-estimator', 'bmr-calculator'],
  'body-fat-calculator': ['ideal-weight-calculator', 'bmr-calculator', 'tdee-calculator'],
  'ideal-weight-calculator': ['body-fat-calculator', 'bmr-calculator', 'tdee-calculator'],
  'compound-interest-calculator': ['sip-calculator', 'rule-of-72-calculator', 'retirement-calculator'],
  'loan-calculator': ['mortgage-calculator', 'credit-card-payoff-calculator', 'break-even-calculator'],
  'mortgage-calculator': ['loan-calculator', 'compound-interest-calculator', 'savings-goal-calculator'],
  'fire-number-calculator': ['retirement-calculator', 'compound-interest-calculator', 'savings-goal-calculator'],
  'retirement-calculator': ['fire-number-calculator', 'compound-interest-calculator', 'inflation-calculator'],
  'hourly-rate-calculator': ['invoice-generator', 'tax-bracket-estimator', 'meeting-cost-calculator'],
  'invoice-generator': ['hourly-rate-calculator', 'late-payment-fee-calculator', 'discount-markup-calculator'],
  'tax-bracket-estimator': ['hourly-rate-calculator', 'roi-calculator', 'break-even-calculator'],
  'json-formatter': ['json-to-csv-converter', 'jwt-decoder', 'base64-tool'],
  'regex-tester': ['text-diff-checker', 'case-converter', 'url-encoder-decoder'],
  'gpa-calculator': ['percentage-calculator', 'word-counter', 'readability-scorer'],
  'word-counter': ['readability-scorer', 'case-converter', 'text-to-slug'],
  'password-generator': ['hash-generator', 'uuid-generator', 'base64-tool'],
  'blood-pressure-classifier': ['heart-rate-zone-calculator', 'bmr-calculator', 'water-intake-calculator'],
  'net-worth-snapshot': ['savings-goal-calculator', 'retirement-calculator', 'emergency-fund-calculator'],
  'currency-converter': ['inflation-calculator', 'compound-interest-calculator', 'discount-markup-calculator'],
}

export default function RelatedTools({ currentToolId, category }) {
  const categoryId = category || 'general'
  const categoryInfo = categories.find((item) => item.id === categoryId)

  // Use curated tool chains if available, otherwise fall back to same-category tools
  const chainedIds = TOOL_CHAINS[currentToolId]
  let related
  if (chainedIds) {
    related = chainedIds.map((id) => tools.find((t) => t.id === id)).filter(Boolean).slice(0, 4)
  } else {
    related = tools.filter((tool) => tool.category === categoryId && tool.id !== currentToolId).slice(0, 4)
  }

  if (!related.length) return null

  return (
    <section aria-label={`Related tools`} className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {chainedIds ? 'Try next' : `Other ${categoryInfo?.name || categoryId} tools`}
        </h2>
        <Link
          to={`/category/${categoryId}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          See all →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((tool) => {
          const Icon = getIcon(tool.icon)
          const colors = categoryColorMap[tool.category]
          return (
            <Link
              key={tool.id}
              to={tool.path}
              className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-center gap-2">
                <div className={`rounded-lg p-1.5 ${colors.bg} ${colors.darkBg}`}>
                  <Icon className={`h-4 w-4 ${colors.icon}`} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{tool.name}</h3>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{tool.description}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
