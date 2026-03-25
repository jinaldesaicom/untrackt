import { useMemo, useState } from 'react'
import { getItem, setItem } from '../../utils/storage.js'

const STORAGE_KEY = 'untrackt:citationList'

const sourceFields = {
  book: ['authors', 'title', 'year', 'publisher', 'edition', 'doiUrl'],
  journal: ['authors', 'title', 'journal', 'volume', 'issue', 'pages', 'year', 'doi'],
  website: ['author', 'title', 'site', 'url', 'accessDate', 'publishDate'],
  youtube: ['creator', 'videoTitle', 'channel', 'uploadDate', 'url'],
  podcast: ['host', 'episodeTitle', 'podcastTitle', 'publishDate', 'url'],
  news: ['author', 'title', 'publication', 'publishDate', 'url'],
}

const styles = ['APA 7th', 'MLA 9th', 'Chicago 17th']

function formatCitation(style, sourceType, data) {
  const y = data.year || data.publishDate || 'n.d.'
  if (style === 'APA 7th') {
    if (sourceType === 'book') return `${data.authors || 'Author'}. (${y}). ${data.title || 'Title'}. ${data.publisher || 'Publisher'}. ${data.doiUrl || ''}`.trim()
    if (sourceType === 'journal') return `${data.authors || 'Author'}. (${y}). ${data.title || 'Title'}. ${data.journal || 'Journal'}, ${data.volume || ''}(${data.issue || ''}), ${data.pages || ''}. ${data.doi || ''}`.trim()
    if (sourceType === 'website') return `${data.author || 'Author'}. (${data.publishDate || 'n.d.'}). ${data.title || 'Title'}. ${data.site || 'Site'}. ${data.url || ''}`.trim()
    if (sourceType === 'youtube') return `${data.creator || 'Creator'}. (${data.uploadDate || 'n.d.'}). ${data.videoTitle || 'Video title'} [Video]. ${data.channel || 'YouTube'}. ${data.url || ''}`.trim()
    if (sourceType === 'podcast') return `${data.host || 'Host'}. (${data.publishDate || 'n.d.'}). ${data.episodeTitle || 'Episode title'} [Audio podcast episode]. In ${data.podcastTitle || 'Podcast title'}. ${data.url || ''}`.trim()
    return `${data.author || 'Author'}. (${data.publishDate || 'n.d.'}). ${data.title || 'Title'}. ${data.publication || 'Publication'}. ${data.url || ''}`.trim()
  }

  if (style === 'MLA 9th') {
    if (sourceType === 'book') return `${data.authors || 'Author'}. ${data.title || 'Title'}. ${data.edition ? `${data.edition} ed., ` : ''}${data.publisher || 'Publisher'}, ${y}. ${data.doiUrl || ''}`.trim()
    if (sourceType === 'journal') return `${data.authors || 'Author'}. "${data.title || 'Title'}." ${data.journal || 'Journal'}, vol. ${data.volume || 'n/a'}, no. ${data.issue || 'n/a'}, ${y}, pp. ${data.pages || 'n/a'}. ${data.doi || ''}`.trim()
    if (sourceType === 'website') return `${data.author || 'Author'}. "${data.title || 'Title'}." ${data.site || 'Site'}, ${data.publishDate || 'n.d.'}, ${data.url || ''}. Accessed ${data.accessDate || 'n.d.'}.`.trim()
    if (sourceType === 'youtube') return `${data.creator || 'Creator'}. "${data.videoTitle || 'Video title'}." YouTube, uploaded by ${data.channel || 'Channel'}, ${data.uploadDate || 'n.d.'}, ${data.url || ''}.`.trim()
    if (sourceType === 'podcast') return `${data.host || 'Host'}. "${data.episodeTitle || 'Episode title'}." ${data.podcastTitle || 'Podcast title'}, ${data.publishDate || 'n.d.'}, ${data.url || ''}.`.trim()
    return `${data.author || 'Author'}. "${data.title || 'Title'}." ${data.publication || 'Publication'}, ${data.publishDate || 'n.d.'}, ${data.url || ''}.`.trim()
  }

  if (sourceType === 'book') return `${data.authors || 'Author'}. ${data.title || 'Title'}. ${data.edition ? `${data.edition} ed. ` : ''}${data.publisher || 'Publisher'}, ${y}. ${data.doiUrl || ''}`.trim()
  if (sourceType === 'journal') return `${data.authors || 'Author'}. "${data.title || 'Title'}." ${data.journal || 'Journal'} ${data.volume || ''}, no. ${data.issue || ''} (${y}): ${data.pages || ''}. ${data.doi || ''}`.trim()
  if (sourceType === 'website') return `${data.author || 'Author'}. "${data.title || 'Title'}." ${data.site || 'Site'}. ${data.publishDate || 'n.d.'}. ${data.url || ''}. Accessed ${data.accessDate || 'n.d.'}.`.trim()
  if (sourceType === 'youtube') return `${data.creator || 'Creator'}. "${data.videoTitle || 'Video title'}." YouTube video, ${data.uploadDate || 'n.d.'}. ${data.url || ''}.`.trim()
  if (sourceType === 'podcast') return `${data.host || 'Host'}. "${data.episodeTitle || 'Episode title'}." ${data.podcastTitle || 'Podcast title'}, ${data.publishDate || 'n.d.'}, ${data.url || ''}.`.trim()
  return `${data.author || 'Author'}. "${data.title || 'Title'}." ${data.publication || 'Publication'}, ${data.publishDate || 'n.d.'}, ${data.url || ''}.`.trim()
}

export default function CitationGenerator() {
  const [style, setStyle] = useState(styles[0])
  const [sourceType, setSourceType] = useState('book')
  const [form, setForm] = useState({})
  const [generated, setGenerated] = useState('')
  const [list, setList] = useState(() => getItem(STORAGE_KEY, []))

  const fields = useMemo(() => sourceFields[sourceType], [sourceType])

  const generate = () => {
    setGenerated(formatCitation(style, sourceType, form))
  }

  const addToList = () => {
    if (!generated.trim()) return
    const next = [generated, ...list].slice(0, 20)
    setList(next)
    setItem(STORAGE_KEY, next)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {styles.map((s) => (
          <button key={s} onClick={() => setStyle(s)} className={style === s ? 'btn-primary' : 'btn-secondary'}>{s}</button>
        ))}
      </div>

      <select value={sourceType} onChange={(e) => setSourceType(e.target.value)} className="input-field">
        <option value="book">Book</option>
        <option value="journal">Journal Article</option>
        <option value="website">Website</option>
        <option value="youtube">YouTube Video</option>
        <option value="podcast">Podcast</option>
        <option value="news">News Article</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {fields.map((field) => (
          <input
            key={field}
            value={form[field] || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
            className="input-field"
            placeholder={field}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <button className="btn-primary" onClick={generate}>Generate</button>
        <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(generated)}>Copy citation</button>
        <button className="btn-secondary" onClick={addToList}>Add to list</button>
      </div>

      <textarea readOnly value={generated} className="textarea-field min-h-[100px] bg-gray-50" />

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Reference List</h3>
          <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(list.join('\n'))}>Export list as text</button>
        </div>
        <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-700">
          {list.map((item, idx) => <li key={idx}>{item}</li>)}
        </ol>
      </div>
    </div>
  )
}
