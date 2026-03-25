import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { Panel, SegmentedToggle } from '../../components/ToolLayout.jsx'
import { Field, ResultCard, SeoNote } from './shared.jsx'

const SCHEMA_TYPES = ['Article', 'Product', 'FAQ', 'LocalBusiness', 'BreadcrumbList', 'HowTo', 'Event', 'Person', 'Organization', 'WebSite', 'Review']

const DEFAULTS = {
  Article: { headline: '', authorName: '', authorUrl: '', datePublished: '', dateModified: '', imageUrl: '', publisherName: '', publisherLogoUrl: '', description: '', url: '' },
  Product: { name: '', description: '', imageUrl: '', brand: '', sku: '', price: '', currency: 'USD', availability: 'https://schema.org/InStock', rating: '', reviewCount: '' },
  FAQ: { items: [{ id: crypto.randomUUID(), question: '', answer: '' }] },
  LocalBusiness: { name: '', businessType: 'Store', address: '', city: '', state: '', zip: '', country: '', phone: '', website: '', priceRange: '$$', latitude: '', longitude: '', openingHours: [{ id: crypto.randomUUID(), day: 'Monday', open: '09:00', close: '17:00' }] },
  BreadcrumbList: { items: [{ id: crypto.randomUUID(), name: 'Home', url: 'https://untrackt.com' }] },
  HowTo: { name: '', description: '', totalTime: 'PT30M', steps: [{ id: crypto.randomUUID(), name: '', text: '', imageUrl: '' }] },
  Event: { name: '', description: '', startDate: '', endDate: '', locationName: '', address: '', organizer: '', url: '', status: 'https://schema.org/EventScheduled', attendanceMode: 'https://schema.org/OfflineEventAttendanceMode' },
  Person: { name: '', url: '', image: '', jobTitle: '', sameAs: '' },
  Organization: { name: '', url: '', logo: '', description: '', sameAs: '' },
  WebSite: { name: '', url: '', description: '', searchUrl: '' },
  Review: { itemName: '', author: '', reviewBody: '', rating: '', bestRating: '5' },
}

function buildSchema(type, values) {
  const context = { '@context': 'https://schema.org' }

  switch (type) {
    case 'Article':
      return { ...context, '@type': 'Article', headline: values.headline, author: { '@type': 'Person', name: values.authorName, url: values.authorUrl || undefined }, datePublished: values.datePublished || undefined, dateModified: values.dateModified || undefined, image: values.imageUrl || undefined, publisher: { '@type': 'Organization', name: values.publisherName, logo: values.publisherLogoUrl ? { '@type': 'ImageObject', url: values.publisherLogoUrl } : undefined }, description: values.description || undefined, mainEntityOfPage: values.url || undefined }
    case 'Product':
      return { ...context, '@type': 'Product', name: values.name, description: values.description || undefined, image: values.imageUrl || undefined, brand: values.brand ? { '@type': 'Brand', name: values.brand } : undefined, sku: values.sku || undefined, offers: values.price ? { '@type': 'Offer', price: values.price, priceCurrency: values.currency, availability: values.availability } : undefined, aggregateRating: values.rating ? { '@type': 'AggregateRating', ratingValue: values.rating, reviewCount: values.reviewCount || '1' } : undefined }
    case 'FAQ':
      return { ...context, '@type': 'FAQPage', mainEntity: values.items.filter((item) => item.question && item.answer).map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }
    case 'LocalBusiness':
      return { ...context, '@type': values.businessType || 'LocalBusiness', name: values.name, address: { '@type': 'PostalAddress', streetAddress: values.address, addressLocality: values.city, addressRegion: values.state, postalCode: values.zip, addressCountry: values.country }, telephone: values.phone || undefined, url: values.website || undefined, priceRange: values.priceRange || undefined, openingHoursSpecification: values.openingHours.map((item) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: item.day, opens: item.open, closes: item.close })), geo: values.latitude && values.longitude ? { '@type': 'GeoCoordinates', latitude: values.latitude, longitude: values.longitude } : undefined }
    case 'BreadcrumbList':
      return { ...context, '@type': 'BreadcrumbList', itemListElement: values.items.filter((item) => item.name && item.url).map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.url })) }
    case 'HowTo':
      return { ...context, '@type': 'HowTo', name: values.name, description: values.description || undefined, totalTime: values.totalTime || undefined, step: values.steps.filter((step) => step.name || step.text).map((step) => ({ '@type': 'HowToStep', name: step.name, text: step.text, image: step.imageUrl || undefined })) }
    case 'Event':
      return { ...context, '@type': 'Event', name: values.name, description: values.description || undefined, startDate: values.startDate || undefined, endDate: values.endDate || undefined, eventStatus: values.status, eventAttendanceMode: values.attendanceMode, location: { '@type': 'Place', name: values.locationName, address: values.address }, organizer: values.organizer ? { '@type': 'Organization', name: values.organizer } : undefined, url: values.url || undefined }
    case 'Person':
      return { ...context, '@type': 'Person', name: values.name, url: values.url || undefined, image: values.image || undefined, jobTitle: values.jobTitle || undefined, sameAs: values.sameAs ? values.sameAs.split(',').map((item) => item.trim()).filter(Boolean) : undefined }
    case 'Organization':
      return { ...context, '@type': 'Organization', name: values.name, url: values.url || undefined, logo: values.logo || undefined, description: values.description || undefined, sameAs: values.sameAs ? values.sameAs.split(',').map((item) => item.trim()).filter(Boolean) : undefined }
    case 'WebSite':
      return { ...context, '@type': 'WebSite', name: values.name, url: values.url || undefined, description: values.description || undefined, potentialAction: values.searchUrl ? { '@type': 'SearchAction', target: values.searchUrl, 'query-input': 'required name=search_term_string' } : undefined }
    case 'Review':
      return { ...context, '@type': 'Review', itemReviewed: values.itemName ? { '@type': 'Thing', name: values.itemName } : undefined, author: values.author ? { '@type': 'Person', name: values.author } : undefined, reviewBody: values.reviewBody || undefined, reviewRating: values.rating ? { '@type': 'Rating', ratingValue: values.rating, bestRating: values.bestRating || '5' } : undefined }
    default:
      return context
  }
}

function getRequiredWarnings(type, values) {
  const warnings = []
  if (type === 'Article' && !values.headline) warnings.push('Article headline is required.')
  if (type === 'Product' && !values.name) warnings.push('Product name is required.')
  if (type === 'FAQ' && !values.items.some((item) => item.question && item.answer)) warnings.push('Add at least one FAQ question and answer.')
  if (type === 'LocalBusiness' && !values.name) warnings.push('Business name is required.')
  if (type === 'HowTo' && !values.steps.some((step) => step.name || step.text)) warnings.push('Add at least one HowTo step.')
  if (type === 'Event' && !values.name) warnings.push('Event name is required.')
  if (type === 'BreadcrumbList' && !values.items.some((item) => item.name && item.url)) warnings.push('Add at least one breadcrumb item.')
  if (type === 'Review' && !values.itemName) warnings.push('Reviewed item name is required.')
  return warnings
}

export default function SchemaMarkupGenerator() {
  const [schemaType, setSchemaType] = useState('Article')
  const [valuesByType, setValuesByType] = useState(DEFAULTS)

  const values = valuesByType[schemaType]
  const schema = useMemo(() => buildSchema(schemaType, values), [schemaType, values])
  const output = useMemo(() => JSON.stringify(schema, null, 2), [schema])
  const warnings = useMemo(() => getRequiredWarnings(schemaType, values), [schemaType, values])

  const updateValue = (key, value) => setValuesByType((current) => ({ ...current, [schemaType]: { ...current[schemaType], [key]: value } }))
  const updateList = (key, updater) => setValuesByType((current) => ({ ...current, [schemaType]: { ...current[schemaType], [key]: updater(current[schemaType][key]) } }))

  return (
    <div className="space-y-6">
      <SeoNote />

      <Panel>
        <SegmentedToggle value={schemaType} onChange={setSchemaType} options={SCHEMA_TYPES.map((type) => ({ label: type, value: type }))} className="max-w-full overflow-x-auto" />
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Panel>
          <div className="grid gap-4 sm:grid-cols-2">
            {schemaType === 'Article' ? (
              <>
                <Field label="Headline" className="sm:col-span-2"><input className="input-field" value={values.headline} onChange={(event) => updateValue('headline', event.target.value)} /></Field>
                <Field label="Author name"><input className="input-field" value={values.authorName} onChange={(event) => updateValue('authorName', event.target.value)} /></Field>
                <Field label="Author URL"><input className="input-field" value={values.authorUrl} onChange={(event) => updateValue('authorUrl', event.target.value)} /></Field>
                <Field label="Date published"><input className="input-field" type="date" value={values.datePublished} onChange={(event) => updateValue('datePublished', event.target.value)} /></Field>
                <Field label="Date modified"><input className="input-field" type="date" value={values.dateModified} onChange={(event) => updateValue('dateModified', event.target.value)} /></Field>
                <Field label="Image URL"><input className="input-field" value={values.imageUrl} onChange={(event) => updateValue('imageUrl', event.target.value)} /></Field>
                <Field label="Publisher name"><input className="input-field" value={values.publisherName} onChange={(event) => updateValue('publisherName', event.target.value)} /></Field>
                <Field label="Publisher logo URL"><input className="input-field" value={values.publisherLogoUrl} onChange={(event) => updateValue('publisherLogoUrl', event.target.value)} /></Field>
                <Field label="Description" className="sm:col-span-2"><textarea className="textarea-field min-h-[110px]" value={values.description} onChange={(event) => updateValue('description', event.target.value)} /></Field>
                <Field label="URL" className="sm:col-span-2"><input className="input-field" value={values.url} onChange={(event) => updateValue('url', event.target.value)} /></Field>
              </>
            ) : null}

            {schemaType === 'Product' ? (
              <>
                <Field label="Name"><input className="input-field" value={values.name} onChange={(event) => updateValue('name', event.target.value)} /></Field>
                <Field label="Brand"><input className="input-field" value={values.brand} onChange={(event) => updateValue('brand', event.target.value)} /></Field>
                <Field label="SKU"><input className="input-field" value={values.sku} onChange={(event) => updateValue('sku', event.target.value)} /></Field>
                <Field label="Image URL"><input className="input-field" value={values.imageUrl} onChange={(event) => updateValue('imageUrl', event.target.value)} /></Field>
                <Field label="Price"><input className="input-field" value={values.price} onChange={(event) => updateValue('price', event.target.value)} /></Field>
                <Field label="Currency"><input className="input-field" value={values.currency} onChange={(event) => updateValue('currency', event.target.value)} /></Field>
                <Field label="Availability"><input className="input-field" value={values.availability} onChange={(event) => updateValue('availability', event.target.value)} /></Field>
                <Field label="Rating"><input className="input-field" value={values.rating} onChange={(event) => updateValue('rating', event.target.value)} /></Field>
                <Field label="Review count"><input className="input-field" value={values.reviewCount} onChange={(event) => updateValue('reviewCount', event.target.value)} /></Field>
                <Field label="Description" className="sm:col-span-2"><textarea className="textarea-field min-h-[110px]" value={values.description} onChange={(event) => updateValue('description', event.target.value)} /></Field>
              </>
            ) : null}

            {schemaType === 'FAQ' ? (
              <div className="sm:col-span-2 space-y-3">
                {values.items.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                    <Field label="Question"><input className="input-field" value={item.question} onChange={(event) => updateList('items', (current) => current.map((entry) => entry.id === item.id ? { ...entry, question: event.target.value } : entry))} /></Field>
                    <Field label="Answer" className="mt-3"><textarea className="textarea-field min-h-[110px]" value={item.answer} onChange={(event) => updateList('items', (current) => current.map((entry) => entry.id === item.id ? { ...entry, answer: event.target.value } : entry))} /></Field>
                  </div>
                ))}
                <button type="button" className="btn-secondary" onClick={() => updateList('items', (current) => current.length >= 20 ? current : [...current, { id: crypto.randomUUID(), question: '', answer: '' }])}>Add Q&A pair</button>
              </div>
            ) : null}

            {schemaType === 'LocalBusiness' ? (
              <>
                <Field label="Business name"><input className="input-field" value={values.name} onChange={(event) => updateValue('name', event.target.value)} /></Field>
                <Field label="Type"><select className="input-field" value={values.businessType} onChange={(event) => updateValue('businessType', event.target.value)}><option>Restaurant</option><option>Store</option><option>Service</option><option>LocalBusiness</option></select></Field>
                <Field label="Address" className="sm:col-span-2"><input className="input-field" value={values.address} onChange={(event) => updateValue('address', event.target.value)} /></Field>
                <Field label="City"><input className="input-field" value={values.city} onChange={(event) => updateValue('city', event.target.value)} /></Field>
                <Field label="State"><input className="input-field" value={values.state} onChange={(event) => updateValue('state', event.target.value)} /></Field>
                <Field label="Zip"><input className="input-field" value={values.zip} onChange={(event) => updateValue('zip', event.target.value)} /></Field>
                <Field label="Country"><input className="input-field" value={values.country} onChange={(event) => updateValue('country', event.target.value)} /></Field>
                <Field label="Phone"><input className="input-field" value={values.phone} onChange={(event) => updateValue('phone', event.target.value)} /></Field>
                <Field label="Website"><input className="input-field" value={values.website} onChange={(event) => updateValue('website', event.target.value)} /></Field>
                <Field label="Price range"><input className="input-field" value={values.priceRange} onChange={(event) => updateValue('priceRange', event.target.value)} /></Field>
                <Field label="Latitude"><input className="input-field" value={values.latitude} onChange={(event) => updateValue('latitude', event.target.value)} /></Field>
                <Field label="Longitude"><input className="input-field" value={values.longitude} onChange={(event) => updateValue('longitude', event.target.value)} /></Field>
              </>
            ) : null}

            {schemaType === 'BreadcrumbList' ? (
              <div className="sm:col-span-2 space-y-3">
                {values.items.map((item) => (
                  <div key={item.id} className="grid gap-3 rounded-2xl border border-gray-200 p-4 dark:border-gray-700 sm:grid-cols-[1fr,1fr,auto]">
                    <input className="input-field" value={item.name} onChange={(event) => updateList('items', (current) => current.map((entry) => entry.id === item.id ? { ...entry, name: event.target.value } : entry))} placeholder="Name" />
                    <input className="input-field" value={item.url} onChange={(event) => updateList('items', (current) => current.map((entry) => entry.id === item.id ? { ...entry, url: event.target.value } : entry))} placeholder="URL" />
                    <button type="button" className="btn-secondary" onClick={() => updateList('items', (current) => current.filter((entry) => entry.id !== item.id))}>Remove</button>
                  </div>
                ))}
                <button type="button" className="btn-secondary" onClick={() => updateList('items', (current) => [...current, { id: crypto.randomUUID(), name: '', url: '' }])}>Add breadcrumb</button>
              </div>
            ) : null}

            {schemaType === 'HowTo' ? (
              <div className="sm:col-span-2 space-y-4">
                <Field label="Name"><input className="input-field" value={values.name} onChange={(event) => updateValue('name', event.target.value)} /></Field>
                <Field label="Description"><textarea className="textarea-field min-h-[110px]" value={values.description} onChange={(event) => updateValue('description', event.target.value)} /></Field>
                <Field label="Total time"><input className="input-field" value={values.totalTime} onChange={(event) => updateValue('totalTime', event.target.value)} placeholder="PT30M" /></Field>
                {values.steps.map((step) => (
                  <div key={step.id} className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                    <Field label="Step name"><input className="input-field" value={step.name} onChange={(event) => updateList('steps', (current) => current.map((entry) => entry.id === step.id ? { ...entry, name: event.target.value } : entry))} /></Field>
                    <Field label="Step text" className="mt-3"><textarea className="textarea-field min-h-[100px]" value={step.text} onChange={(event) => updateList('steps', (current) => current.map((entry) => entry.id === step.id ? { ...entry, text: event.target.value } : entry))} /></Field>
                    <Field label="Image URL" className="mt-3"><input className="input-field" value={step.imageUrl} onChange={(event) => updateList('steps', (current) => current.map((entry) => entry.id === step.id ? { ...entry, imageUrl: event.target.value } : entry))} /></Field>
                  </div>
                ))}
                <button type="button" className="btn-secondary" onClick={() => updateList('steps', (current) => [...current, { id: crypto.randomUUID(), name: '', text: '', imageUrl: '' }])}>Add step</button>
              </div>
            ) : null}

            {schemaType === 'Event' ? (
              <>
                <Field label="Name"><input className="input-field" value={values.name} onChange={(event) => updateValue('name', event.target.value)} /></Field>
                <Field label="Organizer"><input className="input-field" value={values.organizer} onChange={(event) => updateValue('organizer', event.target.value)} /></Field>
                <Field label="Description" className="sm:col-span-2"><textarea className="textarea-field min-h-[110px]" value={values.description} onChange={(event) => updateValue('description', event.target.value)} /></Field>
                <Field label="Start date/time"><input className="input-field" type="datetime-local" value={values.startDate} onChange={(event) => updateValue('startDate', event.target.value)} /></Field>
                <Field label="End date/time"><input className="input-field" type="datetime-local" value={values.endDate} onChange={(event) => updateValue('endDate', event.target.value)} /></Field>
                <Field label="Location name"><input className="input-field" value={values.locationName} onChange={(event) => updateValue('locationName', event.target.value)} /></Field>
                <Field label="Location address"><input className="input-field" value={values.address} onChange={(event) => updateValue('address', event.target.value)} /></Field>
                <Field label="URL"><input className="input-field" value={values.url} onChange={(event) => updateValue('url', event.target.value)} /></Field>
                <Field label="Event status"><input className="input-field" value={values.status} onChange={(event) => updateValue('status', event.target.value)} /></Field>
                <Field label="Attendance mode"><input className="input-field" value={values.attendanceMode} onChange={(event) => updateValue('attendanceMode', event.target.value)} /></Field>
              </>
            ) : null}

            {['Person', 'Organization', 'WebSite', 'Review'].includes(schemaType) ? (
              <>
                {Object.entries(values).map(([key, value]) => (
                  <Field key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (character) => character.toUpperCase())} className={key === 'description' || key === 'reviewBody' ? 'sm:col-span-2' : ''}>
                    {key === 'description' || key === 'reviewBody' ? (
                      <textarea className="textarea-field min-h-[110px]" value={value} onChange={(event) => updateValue(key, event.target.value)} />
                    ) : (
                      <input className="input-field" value={value} onChange={(event) => updateValue(key, event.target.value)} />
                    )}
                  </Field>
                ))}
              </>
            ) : null}
          </div>
        </Panel>

        <div className="space-y-6">
          <ResultCard title="Generated JSON-LD" actions={<div className="flex flex-wrap gap-2"><CopyButton text={output} label="Copy JSON-LD" /><CopyButton text={`<script type="application/ld+json">\n${output}\n</script>`} label="Copy script tag" /></div>}>
            <textarea className="textarea-field min-h-[360px] font-mono text-xs" readOnly value={output} />
          </ResultCard>
          <ResultCard title="Validation and testing">
            {warnings.length > 0 ? (
              <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                {warnings.map((warning) => <li key={warning}>{warning}</li>)}
              </ul>
            ) : (
              <p className="text-sm text-green-700 dark:text-green-300">Required fields look good for this schema type.</p>
            )}
            <a className="mt-4 inline-flex text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400" href="https://search.google.com/test/rich-results" target="_blank" rel="noreferrer">Test with Google Rich Results</a>
          </ResultCard>
        </div>
      </div>
    </div>
  )
}
