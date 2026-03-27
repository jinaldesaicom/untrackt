import { useState, useMemo } from 'react'
import { Copy, Check, Plus, Trash2 } from 'lucide-react'

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500) }) }
  return <button onClick={copy} className="btn-secondary flex items-center gap-1.5 text-xs">{copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}</button>
}

const SCHEMA_TYPES = ['Article', 'Product', 'FAQ', 'LocalBusiness', 'BreadcrumbList', 'HowTo', 'Event', 'Person', 'Organization', 'WebSite', 'Review']

const BUSINESS_TYPES = ['Restaurant', 'Store', 'ProfessionalService', 'HealthAndBeautyBusiness', 'AutomotiveBusiness', 'FinancialService', 'LodgingBusiness', 'SportsActivityLocation']
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function buildSchema(type, data) {
  const base = { '@context': 'https://schema.org' }

  switch (type) {
    case 'Article':
      return { ...base, '@type': 'Article', headline: data.headline || '', author: { '@type': 'Person', name: data.authorName || '', url: data.authorUrl || '' }, datePublished: data.datePublished || '', dateModified: data.dateModified || '', image: data.image || '', publisher: { '@type': 'Organization', name: data.publisherName || '', logo: { '@type': 'ImageObject', url: data.publisherLogo || '' } }, description: data.description || '', url: data.url || '' }
    case 'Product':
      return { ...base, '@type': 'Product', name: data.name || '', description: data.description || '', image: data.image || '', brand: { '@type': 'Brand', name: data.brand || '' }, sku: data.sku || '', offers: { '@type': 'Offer', price: data.price || '', priceCurrency: data.currency || 'USD', availability: `https://schema.org/${data.availability || 'InStock'}` }, ...(data.ratingValue ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: data.ratingValue, reviewCount: data.reviewCount || '1' } } : {}) }
    case 'FAQ':
      return { ...base, '@type': 'FAQPage', mainEntity: (data.faqs || []).filter(f => f.q && f.a).map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }
    case 'LocalBusiness':
      return { ...base, '@type': data.businessType || 'LocalBusiness', name: data.name || '', address: { '@type': 'PostalAddress', streetAddress: data.address || '', addressLocality: data.city || '', addressRegion: data.state || '', postalCode: data.zip || '', addressCountry: data.country || '' }, telephone: data.phone || '', url: data.website || '', priceRange: data.priceRange || '', ...(data.lat && data.lng ? { geo: { '@type': 'GeoCoordinates', latitude: data.lat, longitude: data.lng } } : {}), ...(data.hours?.length ? { openingHoursSpecification: data.hours.filter(h => h.day).map(h => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.day, opens: h.opens, closes: h.closes })) } : {}) }
    case 'BreadcrumbList':
      return { ...base, '@type': 'BreadcrumbList', itemListElement: (data.items || []).filter(i => i.name).map((item, idx) => ({ '@type': 'ListItem', position: idx + 1, name: item.name, item: item.url || '' })) }
    case 'HowTo':
      return { ...base, '@type': 'HowTo', name: data.name || '', description: data.description || '', totalTime: data.totalTime || '', step: (data.steps || []).filter(s => s.text).map((s, idx) => ({ '@type': 'HowToStep', position: idx + 1, name: s.name || `Step ${idx + 1}`, text: s.text, ...(s.image ? { image: s.image } : {}) })) }
    case 'Event':
      return { ...base, '@type': 'Event', name: data.name || '', description: data.description || '', startDate: data.startDate || '', endDate: data.endDate || '', location: { '@type': 'Place', name: data.locationName || '', address: data.address || '' }, organizer: { '@type': 'Organization', name: data.organizer || '' }, url: data.url || '', eventStatus: `https://schema.org/${data.eventStatus || 'EventScheduled'}`, eventAttendanceMode: `https://schema.org/${data.attendanceMode || 'OfflineEventAttendanceMode'}` }
    case 'Person':
      return { ...base, '@type': 'Person', name: data.name || '', url: data.url || '', jobTitle: data.jobTitle || '', worksFor: data.worksFor ? { '@type': 'Organization', name: data.worksFor } : undefined, sameAs: (data.sameAs || '').split('\n').filter(Boolean) }
    case 'Organization':
      return { ...base, '@type': 'Organization', name: data.name || '', url: data.url || '', logo: data.logo || '', description: data.description || '', sameAs: (data.sameAs || '').split('\n').filter(Boolean) }
    case 'WebSite':
      return { ...base, '@type': 'WebSite', name: data.name || '', url: data.url || '', description: data.description || '', potentialAction: data.searchUrl ? { '@type': 'SearchAction', target: data.searchUrl, 'query-input': 'required name=search_term_string' } : undefined }
    case 'Review':
      return { ...base, '@type': 'Review', itemReviewed: { '@type': 'Thing', name: data.itemName || '' }, author: { '@type': 'Person', name: data.authorName || '' }, reviewRating: { '@type': 'Rating', ratingValue: data.ratingValue || '5', bestRating: '5' }, reviewBody: data.body || '' }
    default:
      return base
  }
}

export default function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState('Article')
  const [data, setData] = useState({})

  const set = (key, value) => setData(prev => ({ ...prev, [key]: value }))

  const schema = useMemo(() => buildSchema(schemaType, data), [schemaType, data])
  const jsonStr = JSON.stringify(schema, null, 2)
  const scriptTag = `<script type="application/ld+json">\n${jsonStr}\n</script>`

  const resetData = (type) => {
    setSchemaType(type)
    if (type === 'FAQ') setData({ faqs: [{ q: '', a: '' }] })
    else if (type === 'HowTo') setData({ steps: [{ name: '', text: '', image: '' }] })
    else if (type === 'LocalBusiness') setData({ hours: [{ day: '', opens: '09:00', closes: '17:00' }] })
    else if (type === 'BreadcrumbList') setData({ items: [{ name: '', url: '' }] })
    else setData({})
  }

  const renderFields = () => {
    switch (schemaType) {
      case 'Article': return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Headline" value={data.headline} onChange={v => set('headline', v)} />
          <Input label="Author name" value={data.authorName} onChange={v => set('authorName', v)} />
          <Input label="Author URL" value={data.authorUrl} onChange={v => set('authorUrl', v)} />
          <Input label="Date published" type="date" value={data.datePublished} onChange={v => set('datePublished', v)} />
          <Input label="Date modified" type="date" value={data.dateModified} onChange={v => set('dateModified', v)} />
          <Input label="Image URL" value={data.image} onChange={v => set('image', v)} />
          <Input label="Publisher name" value={data.publisherName} onChange={v => set('publisherName', v)} />
          <Input label="Publisher logo URL" value={data.publisherLogo} onChange={v => set('publisherLogo', v)} />
          <div className="sm:col-span-2"><Input label="Description" value={data.description} onChange={v => set('description', v)} /></div>
          <Input label="URL" value={data.url} onChange={v => set('url', v)} />
        </div>
      )
      case 'Product': return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Product name" value={data.name} onChange={v => set('name', v)} />
          <Input label="Brand" value={data.brand} onChange={v => set('brand', v)} />
          <Input label="SKU" value={data.sku} onChange={v => set('sku', v)} />
          <Input label="Price" type="number" value={data.price} onChange={v => set('price', v)} />
          <Input label="Currency" value={data.currency} onChange={v => set('currency', v)} placeholder="USD" />
          <Select label="Availability" value={data.availability} onChange={v => set('availability', v)} options={['InStock', 'OutOfStock', 'PreOrder', 'Discontinued']} />
          <Input label="Rating value" type="number" value={data.ratingValue} onChange={v => set('ratingValue', v)} placeholder="4.5" />
          <Input label="Review count" type="number" value={data.reviewCount} onChange={v => set('reviewCount', v)} />
          <Input label="Image URL" value={data.image} onChange={v => set('image', v)} />
          <div className="sm:col-span-2"><Input label="Description" value={data.description} onChange={v => set('description', v)} /></div>
        </div>
      )
      case 'FAQ': return (
        <div className="space-y-3">
          {(data.faqs || []).map((faq, i) => (
            <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Q&A #{i + 1}</span>
                {(data.faqs || []).length > 1 && <button onClick={() => set('faqs', data.faqs.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>}
              </div>
              <input type="text" value={faq.q} onChange={e => { const f = [...data.faqs]; f[i] = { ...f[i], q: e.target.value }; set('faqs', f) }} className="input-field" placeholder="Question" />
              <textarea value={faq.a} onChange={e => { const f = [...data.faqs]; f[i] = { ...f[i], a: e.target.value }; set('faqs', f) }} className="textarea-field min-h-[60px]" placeholder="Answer" />
            </div>
          ))}
          {(data.faqs || []).length < 20 && <button onClick={() => set('faqs', [...(data.faqs || []), { q: '', a: '' }])} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Add Q&A</button>}
        </div>
      )
      case 'LocalBusiness': return (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Business name" value={data.name} onChange={v => set('name', v)} />
            <Select label="Business type" value={data.businessType} onChange={v => set('businessType', v)} options={BUSINESS_TYPES} />
            <Input label="Street address" value={data.address} onChange={v => set('address', v)} />
            <Input label="City" value={data.city} onChange={v => set('city', v)} />
            <Input label="State" value={data.state} onChange={v => set('state', v)} />
            <Input label="Zip/Postal" value={data.zip} onChange={v => set('zip', v)} />
            <Input label="Country" value={data.country} onChange={v => set('country', v)} />
            <Input label="Phone" value={data.phone} onChange={v => set('phone', v)} />
            <Input label="Website" value={data.website} onChange={v => set('website', v)} />
            <Select label="Price range" value={data.priceRange} onChange={v => set('priceRange', v)} options={['$', '$$', '$$$', '$$$$']} />
            <Input label="Latitude" type="number" value={data.lat} onChange={v => set('lat', v)} />
            <Input label="Longitude" type="number" value={data.lng} onChange={v => set('lng', v)} />
          </div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">Opening Hours</h4>
          {(data.hours || []).map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <select value={h.day} onChange={e => { const hrs = [...data.hours]; hrs[i] = { ...hrs[i], day: e.target.value }; set('hours', hrs) }} className="input-field text-xs w-32">
                <option value="">Day</option>
                {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <input type="time" value={h.opens} onChange={e => { const hrs = [...data.hours]; hrs[i] = { ...hrs[i], opens: e.target.value }; set('hours', hrs) }} className="input-field text-xs w-28" />
              <span className="text-gray-400">—</span>
              <input type="time" value={h.closes} onChange={e => { const hrs = [...data.hours]; hrs[i] = { ...hrs[i], closes: e.target.value }; set('hours', hrs) }} className="input-field text-xs w-28" />
              <button onClick={() => set('hours', data.hours.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
          <button onClick={() => set('hours', [...(data.hours || []), { day: '', opens: '09:00', closes: '17:00' }])} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Add hours</button>
        </div>
      )
      case 'BreadcrumbList': return (
        <div className="space-y-2">
          {(data.items || []).map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-6 text-right">{i + 1}.</span>
              <input type="text" value={item.name} onChange={e => { const items = [...data.items]; items[i] = { ...items[i], name: e.target.value }; set('items', items) }} className="input-field text-xs" placeholder="Name" />
              <input type="text" value={item.url} onChange={e => { const items = [...data.items]; items[i] = { ...items[i], url: e.target.value }; set('items', items) }} className="input-field text-xs" placeholder="URL" />
              <button onClick={() => set('items', data.items.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
          <button onClick={() => set('items', [...(data.items || []), { name: '', url: '' }])} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Add item</button>
        </div>
      )
      case 'HowTo': return (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Name" value={data.name} onChange={v => set('name', v)} />
            <Input label="Total time (ISO 8601)" value={data.totalTime} onChange={v => set('totalTime', v)} placeholder="PT30M" />
            <div className="sm:col-span-2"><Input label="Description" value={data.description} onChange={v => set('description', v)} /></div>
          </div>
          {(data.steps || []).map((step, i) => (
            <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-2">
              <div className="flex items-center justify-between"><span className="text-xs text-gray-500">Step {i + 1}</span><button onClick={() => set('steps', data.steps.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button></div>
              <input type="text" value={step.name} onChange={e => { const s = [...data.steps]; s[i] = { ...s[i], name: e.target.value }; set('steps', s) }} className="input-field text-xs" placeholder="Step name" />
              <textarea value={step.text} onChange={e => { const s = [...data.steps]; s[i] = { ...s[i], text: e.target.value }; set('steps', s) }} className="textarea-field text-xs min-h-[40px]" placeholder="Step instructions" />
              <input type="text" value={step.image} onChange={e => { const s = [...data.steps]; s[i] = { ...s[i], image: e.target.value }; set('steps', s) }} className="input-field text-xs" placeholder="Image URL (optional)" />
            </div>
          ))}
          <button onClick={() => set('steps', [...(data.steps || []), { name: '', text: '', image: '' }])} className="btn-secondary text-xs flex items-center gap-1"><Plus className="w-3 h-3" /> Add step</button>
        </div>
      )
      case 'Event': return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Event name" value={data.name} onChange={v => set('name', v)} />
          <Input label="Start date/time" type="datetime-local" value={data.startDate} onChange={v => set('startDate', v)} />
          <Input label="End date/time" type="datetime-local" value={data.endDate} onChange={v => set('endDate', v)} />
          <Input label="Location name" value={data.locationName} onChange={v => set('locationName', v)} />
          <Input label="Address" value={data.address} onChange={v => set('address', v)} />
          <Input label="Organizer" value={data.organizer} onChange={v => set('organizer', v)} />
          <Input label="URL" value={data.url} onChange={v => set('url', v)} />
          <Select label="Status" value={data.eventStatus} onChange={v => set('eventStatus', v)} options={['EventScheduled', 'EventCancelled', 'EventPostponed', 'EventRescheduled']} />
          <Select label="Attendance mode" value={data.attendanceMode} onChange={v => set('attendanceMode', v)} options={['OfflineEventAttendanceMode', 'OnlineEventAttendanceMode', 'MixedEventAttendanceMode']} />
          <div className="sm:col-span-2"><Input label="Description" value={data.description} onChange={v => set('description', v)} /></div>
        </div>
      )
      case 'Person': return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Name" value={data.name} onChange={v => set('name', v)} />
          <Input label="URL" value={data.url} onChange={v => set('url', v)} />
          <Input label="Job title" value={data.jobTitle} onChange={v => set('jobTitle', v)} />
          <Input label="Works for" value={data.worksFor} onChange={v => set('worksFor', v)} />
          <div className="sm:col-span-2"><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Social profiles (one per line)</label><textarea value={data.sameAs || ''} onChange={e => set('sameAs', e.target.value)} className="textarea-field text-xs min-h-[60px]" placeholder="https://twitter.com/..." /></div>
        </div>
      )
      case 'Organization': return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Name" value={data.name} onChange={v => set('name', v)} />
          <Input label="URL" value={data.url} onChange={v => set('url', v)} />
          <Input label="Logo URL" value={data.logo} onChange={v => set('logo', v)} />
          <div className="sm:col-span-2"><Input label="Description" value={data.description} onChange={v => set('description', v)} /></div>
          <div className="sm:col-span-2"><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Social profiles (one per line)</label><textarea value={data.sameAs || ''} onChange={e => set('sameAs', e.target.value)} className="textarea-field text-xs min-h-[60px]" placeholder="https://twitter.com/..." /></div>
        </div>
      )
      case 'WebSite': return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Site name" value={data.name} onChange={v => set('name', v)} />
          <Input label="URL" value={data.url} onChange={v => set('url', v)} />
          <Input label="Search URL template" value={data.searchUrl} onChange={v => set('searchUrl', v)} placeholder="https://example.com/search?q={search_term_string}" />
          <div className="sm:col-span-2"><Input label="Description" value={data.description} onChange={v => set('description', v)} /></div>
        </div>
      )
      case 'Review': return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Reviewed item name" value={data.itemName} onChange={v => set('itemName', v)} />
          <Input label="Author name" value={data.authorName} onChange={v => set('authorName', v)} />
          <Input label="Rating (1-5)" type="number" value={data.ratingValue} onChange={v => set('ratingValue', v)} />
          <div className="sm:col-span-2"><label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Review body</label><textarea value={data.body || ''} onChange={e => set('body', e.target.value)} className="textarea-field text-xs min-h-[80px]" /></div>
        </div>
      )
      default: return null
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 px-4 py-3 text-sm text-rose-700 dark:text-rose-300">
        This tool provides guidance and estimates only. SEO results depend on many factors outside this tool.
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Schema Type</label>
        <div className="flex flex-wrap gap-2">
          {SCHEMA_TYPES.map(type => (
            <button key={type} onClick={() => resetData(type)} className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${schemaType === type ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}>
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        {renderFields()}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Generated JSON-LD</h3>
          <div className="flex gap-2">
            <CopyBtn text={jsonStr} />
            <CopyBtn text={scriptTag} />
          </div>
        </div>
        <pre className="textarea-field min-h-[150px] whitespace-pre-wrap text-xs bg-gray-50 dark:bg-gray-800 overflow-x-auto">{jsonStr}</pre>
      </div>

      <div className="flex gap-2">
        <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs">
          Test with Google Rich Results ↗
        </a>
      </div>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} className="input-field text-xs" placeholder={placeholder} />
    </div>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
      <select value={value || options[0]} onChange={e => onChange(e.target.value)} className="input-field text-xs">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
