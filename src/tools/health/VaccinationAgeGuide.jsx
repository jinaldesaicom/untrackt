import { useMemo, useState } from 'react'
import { VACCINATION_SCHEDULES } from '../../data/healthData.js'
import { ToolLayout, Panel, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

export default function VaccinationAgeGuide() {
  const [country, setCountry] = useState('US')
  const [query, setQuery] = useState('')

  const milestones = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase()
    return VACCINATION_SCHEDULES[country].filter((milestone) => {
      if (!lowerQuery) return true
      return milestone.vaccines.some((vaccine) =>
        vaccine.name.toLowerCase().includes(lowerQuery) || vaccine.disease.toLowerCase().includes(lowerQuery)
      )
    })
  }, [country, query])

  return (
    <ToolLayout
      title="Vaccination Age Guide"
      description="Browse a country-specific childhood vaccination reference schedule with milestones, doses, diseases covered, and quick search."
      path="/tools/vaccination-age-guide"
      disclaimerType="health"
    >
      <div className="rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 px-5 py-4 text-amber-900 dark:text-amber-200 text-sm font-medium">
        This is a general reference guide. Vaccination schedules can change. Always consult official guidelines and your healthcare provider for current recommendations.
      </div>

      <Panel>
        <div className="grid gap-4 lg:grid-cols-[auto,1fr] lg:items-end">
          <div>
            <FieldLabel>Country</FieldLabel>
            <SegmentedToggle options={Object.keys(VACCINATION_SCHEDULES).map((value) => ({ label: value, value }))} value={country} onChange={setCountry} className="flex-wrap" />
          </div>
          <div>
            <FieldLabel>Filter by vaccine or disease</FieldLabel>
            <input className="input-field" placeholder="Search schedule" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
        </div>
      </Panel>

      <Panel>
        <p className="text-sm text-gray-600 dark:text-gray-300">Schedule correct as of 2024/2025. Always verify with official sources such as CDC, NHS, Australian Immunisation Handbook, provincial Canadian programs, or IAP recommendations.</p>
      </Panel>

      <div className="space-y-5">
        {milestones.map((milestone, index) => (
          <div key={`${country}-${milestone.age}`} className="grid gap-4 md:grid-cols-[120px,1fr]">
            <div className="relative">
              <div className="sticky top-24 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {milestone.age}
              </div>
            </div>
            <Panel className="relative">
              {index < milestones.length - 1 && <div className="absolute left-6 top-full h-6 w-px bg-gray-200 dark:bg-gray-700" />}
              <div className="flex flex-wrap gap-2 mb-4">
                {milestone.vaccines.map((vaccine) => (
                  <span key={vaccine.name} className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                    {vaccine.name}
                  </span>
                ))}
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {milestone.vaccines.map((vaccine) => (
                  <div key={`${milestone.age}-${vaccine.name}`} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{vaccine.name}</p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Protects against {vaccine.disease}</p>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Doses at visit: {vaccine.doses} · Type: {vaccine.type}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        ))}
      </div>
    </ToolLayout>
  )
}