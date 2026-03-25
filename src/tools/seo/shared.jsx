import { FieldLabel, Panel, StatCard } from '../../components/ToolLayout.jsx'

export const SEO_GUIDANCE_NOTE = 'This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.'

export const STOP_WORDS = new Set([
  'a', 'about', 'above', 'across', 'after', 'afterwards', 'again', 'against', 'all', 'almost', 'alone', 'along', 'already', 'also', 'although', 'always',
  'am', 'among', 'amongst', 'amount', 'an', 'and', 'another', 'any', 'anyhow', 'anyone', 'anything', 'anyway', 'anywhere', 'are', 'around', 'as', 'at',
  'back', 'be', 'became', 'because', 'become', 'becomes', 'becoming', 'been', 'before', 'beforehand', 'behind', 'being', 'below', 'beside', 'besides',
  'between', 'beyond', 'both', 'but', 'by', 'can', 'cannot', 'could', 'did', 'do', 'does', 'doing', 'done', 'down', 'during', 'each', 'either', 'else',
  'elsewhere', 'enough', 'even', 'ever', 'every', 'everyone', 'everything', 'everywhere', 'except', 'few', 'for', 'former', 'formerly', 'from', 'further',
  'had', 'has', 'have', 'having', 'he', 'hence', 'her', 'here', 'hereafter', 'hereby', 'herein', 'hereupon', 'hers', 'herself', 'him', 'himself', 'his',
  'how', 'however', 'i', 'if', 'in', 'indeed', 'into', 'is', 'it', 'its', 'itself', 'just', 'keep', 'last', 'latter', 'latterly', 'least', 'less', 'made',
  'make', 'many', 'may', 'me', 'meanwhile', 'might', 'mine', 'more', 'moreover', 'most', 'mostly', 'move', 'much', 'must', 'my', 'myself', 'name', 'namely',
  'neither', 'never', 'nevertheless', 'next', 'no', 'nobody', 'none', 'noone', 'nor', 'not', 'nothing', 'now', 'nowhere', 'of', 'off', 'often', 'on',
  'once', 'one', 'only', 'onto', 'or', 'other', 'others', 'otherwise', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'part', 'per', 'perhaps', 'please',
  'put', 'quite', 'rather', 're', 'really', 'same', 'say', 'see', 'seem', 'seemed', 'seeming', 'seems', 'several', 'she', 'should', 'show', 'side', 'since',
  'so', 'some', 'somehow', 'someone', 'something', 'sometime', 'sometimes', 'somewhere', 'still', 'such', 'take', 'than', 'that', 'the', 'their', 'them',
  'themselves', 'then', 'thence', 'there', 'thereafter', 'thereby', 'therefore', 'therein', 'thereupon', 'these', 'they', 'this', 'those', 'through',
  'throughout', 'thru', 'thus', 'to', 'together', 'too', 'toward', 'towards', 'under', 'until', 'up', 'upon', 'us', 'very', 'via', 'was', 'we', 'well',
  'were', 'what', 'whatever', 'when', 'whence', 'whenever', 'where', 'whereafter', 'whereas', 'whereby', 'wherein', 'whereupon', 'wherever', 'whether',
  'which', 'while', 'whither', 'who', 'whoever', 'whole', 'whom', 'whose', 'why', 'will', 'with', 'within', 'without', 'would', 'yet', 'you', 'your',
  'yours', 'yourself', 'yourselves'
])

export function SeoNote() {
  return (
    <Panel className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
      <p className="text-sm text-amber-900 dark:text-amber-200">{SEO_GUIDANCE_NOTE}</p>
    </Panel>
  )
}

export function StatsGrid({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <StatCard key={item.label} label={item.label} value={item.value} helper={item.helper} tone={item.tone} />
      ))}
    </div>
  )
}

export function Field({ label, helper, children, className = '' }) {
  return (
    <div className={className}>
      <FieldLabel helper={helper}>{label}</FieldLabel>
      {children}
    </div>
  )
}

export function ResultCard({ title, children, actions = null, className = '' }) {
  return (
    <Panel className={className}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
        {actions}
      </div>
      <div className="mt-4">{children}</div>
    </Panel>
  )
}
