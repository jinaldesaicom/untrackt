import { useMemo, useState } from 'react'
import { ALCOHOL_PRESETS } from '../../data/healthData.js'
import { ToolLayout, Panel, StatCard, FieldLabel } from '../../components/ToolLayout.jsx'

function formatDateTime(value) {
  return value.toLocaleString(undefined, { hour: 'numeric', minute: '2-digit', weekday: 'short', month: 'short', day: 'numeric' })
}

export default function AlcoholUnitCalculator() {
  const [drinks, setDrinks] = useState([{ type: 'Pint of beer', volume: 568, abv: 4 }])

  const totals = useMemo(() => {
    const units = drinks.reduce((sum, drink) => sum + (Number(drink.abv) * Number(drink.volume)) / 1000, 0)
    const gramsAlcohol = drinks.reduce((sum, drink) => sum + Number(drink.volume) * (Number(drink.abv) / 100) * 0.789, 0)
    const calories = gramsAlcohol * 7
    const processingHours = units
    return { units, gramsAlcohol, calories, processingHours }
  }, [drinks])

  const soberBy = new Date(Date.now() + totals.processingHours * 60 * 60 * 1000)
  const limitPercentage = Math.min(100, (totals.units / 14) * 100)
  const tone = totals.units <= 14 ? 'green' : totals.units <= 21 ? 'amber' : 'rose'

  return (
    <ToolLayout
      title="Alcohol Unit Calculator"
      description="Add multiple drinks, calculate alcohol units, grams of pure alcohol, calories, and rough processing time."
      path="/tools/alcohol-unit-calculator"
      disclaimerType="health"
    >
      <div className="rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 px-5 py-4 text-amber-900 dark:text-amber-200 text-sm font-medium">
        Alcohol processing rates vary by individual. Never drink and drive. This calculator does not determine fitness to drive or operate machinery.
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
        <Panel>
          <div className="flex flex-wrap gap-2">
            {ALCOHOL_PRESETS.map((preset) => (
              <button key={preset.label} type="button" className="btn-secondary" onClick={() => setDrinks((current) => [...current, { ...preset }])}>
                Add {preset.label}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-4">
            {drinks.map((drink, index) => (
              <div key={`${drink.type}-${index}`} className="grid gap-3 md:grid-cols-[1.3fr,1fr,1fr,auto] items-end rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                <div>
                  <FieldLabel>Drink type</FieldLabel>
                  <input className="input-field" value={drink.type} onChange={(event) => setDrinks((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, type: event.target.value } : item))} />
                </div>
                <div>
                  <FieldLabel>Volume (ml)</FieldLabel>
                  <input className="input-field" type="number" min="0" value={drink.volume} onChange={(event) => setDrinks((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, volume: event.target.value } : item))} />
                </div>
                <div>
                  <FieldLabel>ABV (%)</FieldLabel>
                  <input className="input-field" type="number" min="0" step="0.1" value={drink.abv} onChange={(event) => setDrinks((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, abv: event.target.value } : item))} />
                </div>
                <button type="button" className="btn-secondary" onClick={() => setDrinks((current) => current.filter((_, itemIndex) => itemIndex !== index))} disabled={drinks.length === 1}>Remove</button>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Total units" value={totals.units.toFixed(1)} helper="ABV × volume / 1000" tone={tone} />
            <StatCard label="Pure alcohol" value={`${Math.round(totals.gramsAlcohol)} g`} helper="Approximate" tone="blue" />
            <StatCard label="Alcohol calories" value={`${Math.round(totals.calories)} kcal`} helper="7 kcal per gram" tone="amber" />
            <StatCard label="Sober by" value={formatDateTime(soberBy)} helper="Around 1 unit per hour" tone="indigo" />
          </div>

          <Panel>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Guidelines</h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Chief Medical Officers recommend no more than 14 units per week.</p>
            <div className="mt-4 h-4 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <div className={`${tone === 'green' ? 'bg-green-500' : tone === 'amber' ? 'bg-amber-500' : 'bg-rose-500'} h-full`} style={{ width: `${limitPercentage}%` }} />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{totals.units.toFixed(1)} of 14 recommended weekly units</p>
          </Panel>
        </div>
      </div>
    </ToolLayout>
  )
}