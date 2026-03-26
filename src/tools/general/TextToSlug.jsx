import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { STOP_WORDS } from '../../data/generalData.js'
import { ToolLayout, Panel, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

const TRANSLITERATION = { é: 'e', è: 'e', ê: 'e', ë: 'e', á: 'a', à: 'a', â: 'a', ä: 'a', ñ: 'n', ü: 'u', ú: 'u', ù: 'u', û: 'u', ö: 'o', ó: 'o', ò: 'o', ô: 'o', ç: 'c', ß: 'ss', ý: 'y', ž: 'z', š: 's' }

function normalizeText(text, preserveNumbers, removeStopWords, separator, maxLength) {
  const transliterated = text.toLowerCase().split('').map((character) => TRANSLITERATION[character] || character).join('')
  const words = transliterated
    .replace(preserveNumbers ? /[^a-z0-9\s]/g : /[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter((word) => !removeStopWords || !STOP_WORDS.has(word))
  return words.join(separator).slice(0, maxLength).replace(new RegExp(`${separator}+$`), '')
}

export default function TextToSlug() {
  const [input, setInput] = useState('Hello World! How are you?')
  const [batchInput, setBatchInput] = useState('First title\nAnother article title')
  const [separator, setSeparator] = useState('-')
  const [removeStopWords, setRemoveStopWords] = useState(false)
  const [preserveNumbers, setPreserveNumbers] = useState(true)
  const [maxLength, setMaxLength] = useState(60)

  const slug = useMemo(() => normalizeText(input, preserveNumbers, removeStopWords, separator, maxLength), [input, preserveNumbers, removeStopWords, separator, maxLength])
  const fileSafe = slug.replaceAll('-', '_').replaceAll('.', '_')
  const hashtag = `#${slug.split(/[-_.]/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`
  const batchOutput = useMemo(() => batchInput.split(/\r?\n/).filter(Boolean).map((line) => normalizeText(line, preserveNumbers, removeStopWords, separator, maxLength)).join('\n'), [batchInput, preserveNumbers, removeStopWords, separator, maxLength])

  return (
    <ToolLayout
      title="Text to Slug"
      description="Generate SEO-friendly slugs, file-safe names, hashtags, and batch slug lists with transliteration and stop-word options."
      path="/tools/text-to-slug"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="space-y-4">
            <div><FieldLabel>Single input</FieldLabel><input className="input-field" value={input} onChange={(event) => setInput(event.target.value)} /></div>
            <div><FieldLabel>Batch mode</FieldLabel><textarea className="textarea-field min-h-[160px]" value={batchInput} onChange={(event) => setBatchInput(event.target.value)} /></div>
            <div className="flex flex-wrap gap-2">
              <SegmentedToggle options={[{ label: 'Hyphen', value: '-' }, { label: 'Underscore', value: '_' }, { label: 'Dot', value: '.' }]} value={separator} onChange={setSeparator} />
              <button type="button" className={`btn-secondary ${removeStopWords ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setRemoveStopWords((current) => !current)}>Remove stop words</button>
              <button type="button" className={`btn-secondary ${preserveNumbers ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setPreserveNumbers((current) => !current)}>Preserve numbers</button>
            </div>
            <div>
              <FieldLabel helper={`${maxLength} characters`}>Max length</FieldLabel>
              <input className="w-full accent-indigo-600" type="range" min="20" max="100" value={maxLength} onChange={(event) => setMaxLength(Number(event.target.value))} />
            </div>
          </div>
        </Panel>
        <div className="space-y-6">
          <Panel>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['URL slug', slug],
                ['File-safe name', fileSafe],
                ['Hashtag style', hashtag],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 break-all">{value}</p>
                  <div className="mt-3"><CopyButton text={value} label="Copy" /></div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel>
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-gray-900 dark:text-gray-100">Batch output</p>
              <CopyButton text={batchOutput} label="Copy all" />
            </div>
            <textarea className="textarea-field min-h-[220px] mt-4" readOnly value={batchOutput} />
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}