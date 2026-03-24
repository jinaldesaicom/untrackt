import { useEffect, useMemo, useState } from 'react'
import { ToolLayout, Panel, StatCard, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

function randomInt(min, max) {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return min + (array[0] % (max - min + 1))
}

function rollDice(notation) {
  const match = notation.trim().match(/^(\d+)d(\d+)$/i)
  if (!match) return []
  const count = Number(match[1])
  const sides = Number(match[2])
  return Array.from({ length: count }, () => randomInt(1, sides))
}

export default function RandomNumberGenerator() {
  const [mode, setMode] = useState('single')
  const [single, setSingle] = useState({ min: '1', max: '100', result: null, auto: false })
  const [multiple, setMultiple] = useState({ min: '1', max: '100', count: '6', result: [] })
  const [listMode, setListMode] = useState({ items: 'alpha\nbeta\ngamma\ndelta', count: '1', removePicked: false, result: [] })
  const [diceNotation, setDiceNotation] = useState('3d6')
  const [diceResults, setDiceResults] = useState([])
  const [diceHistory, setDiceHistory] = useState([])
  const [coinCount, setCoinCount] = useState('1')
  const [coinResults, setCoinResults] = useState([])

  useEffect(() => {
    if (!single.auto) return undefined
    const intervalId = window.setInterval(() => {
      setSingle((current) => ({ ...current, result: randomInt(Number(current.min), Number(current.max)) }))
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [single.auto])

  const coinSummary = useMemo(() => {
    const heads = coinResults.filter((item) => item === 'Heads').length
    const tails = coinResults.length - heads
    return { heads, tails }
  }, [coinResults])

  return (
    <ToolLayout
      title="Random Number Generator"
      description="Generate secure random numbers, unique picks, dice rolls, and coin flips using the Web Crypto API only."
      path="/tools/random-number-generator"
    >
      <Panel>
        <SegmentedToggle options={[{ label: 'Single', value: 'single' }, { label: 'Multiple', value: 'multiple' }, { label: 'From list', value: 'list' }, { label: 'Dice', value: 'dice' }, { label: 'Coin', value: 'coin' }]} value={mode} onChange={setMode} className="flex-wrap" />
      </Panel>

      {mode === 'single' && (
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <Panel>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Minimum</FieldLabel>
                <input className="input-field" value={single.min} onChange={(event) => setSingle((current) => ({ ...current, min: event.target.value }))} />
              </div>
              <div>
                <FieldLabel>Maximum</FieldLabel>
                <input className="input-field" value={single.max} onChange={(event) => setSingle((current) => ({ ...current, max: event.target.value }))} />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="btn-primary" onClick={() => setSingle((current) => ({ ...current, result: randomInt(Number(current.min), Number(current.max)) }))}>Generate</button>
              <button type="button" className={`btn-secondary ${single.auto ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setSingle((current) => ({ ...current, auto: !current.auto }))}>Auto-regenerate</button>
            </div>
          </Panel>
          <Panel>
            <StatCard label="Result" value={single.result ?? '—'} helper="Generated with crypto.getRandomValues()" tone="indigo" />
          </Panel>
        </div>
      )}

      {mode === 'multiple' && (
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <Panel>
            <div className="grid gap-4 sm:grid-cols-3">
              <div><FieldLabel>Minimum</FieldLabel><input className="input-field" value={multiple.min} onChange={(event) => setMultiple((current) => ({ ...current, min: event.target.value }))} /></div>
              <div><FieldLabel>Maximum</FieldLabel><input className="input-field" value={multiple.max} onChange={(event) => setMultiple((current) => ({ ...current, max: event.target.value }))} /></div>
              <div><FieldLabel>Count</FieldLabel><input className="input-field" value={multiple.count} onChange={(event) => setMultiple((current) => ({ ...current, count: event.target.value }))} /></div>
            </div>
            <div className="mt-4 flex gap-2">
              <button type="button" className="btn-primary" onClick={() => {
                const pool = Array.from({ length: Number(multiple.max) - Number(multiple.min) + 1 }, (_, index) => Number(multiple.min) + index)
                const picks = []
                while (pool.length > 0 && picks.length < Number(multiple.count)) {
                  const index = randomInt(0, pool.length - 1)
                  picks.push(pool.splice(index, 1)[0])
                }
                setMultiple((current) => ({ ...current, result: picks }))
              }}>Generate unique numbers</button>
              <button type="button" className="btn-secondary" onClick={() => setMultiple((current) => ({ ...current, result: [...current.result].sort(() => randomInt(0, 1000) - 500) }))}>Shuffle</button>
            </div>
          </Panel>
          <Panel>
            <StatCard label="Results" value={multiple.result.join(', ') || '—'} helper="Unique picks" tone="blue" />
          </Panel>
        </div>
      )}

      {mode === 'list' && (
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <Panel>
            <div className="space-y-4">
              <div><FieldLabel>One item per line</FieldLabel><textarea className="textarea-field min-h-[180px]" value={listMode.items} onChange={(event) => setListMode((current) => ({ ...current, items: event.target.value }))} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><FieldLabel>Pick count</FieldLabel><input className="input-field" value={listMode.count} onChange={(event) => setListMode((current) => ({ ...current, count: event.target.value }))} /></div>
                <div className="flex items-end"><button type="button" className={`btn-secondary ${listMode.removePicked ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setListMode((current) => ({ ...current, removePicked: !current.removePicked }))}>Remove picked items</button></div>
              </div>
              <button type="button" className="btn-primary" onClick={() => {
                const items = listMode.items.split(/\r?\n/).map((item) => item.trim()).filter(Boolean)
                const available = [...items]
                const picked = []
                while (available.length > 0 && picked.length < Number(listMode.count)) {
                  const index = randomInt(0, available.length - 1)
                  picked.push(available.splice(index, 1)[0])
                }
                setListMode((current) => ({ ...current, items: current.removePicked ? available.join('\n') : current.items, result: picked }))
              }}>Pick random item(s)</button>
            </div>
          </Panel>
          <Panel>
            <StatCard label="Picked items" value={listMode.result.join(', ') || '—'} helper="Secure random selection" tone="green" />
          </Panel>
        </div>
      )}

      {mode === 'dice' && (
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <Panel>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'].map((preset) => <button key={preset} type="button" className="btn-secondary" onClick={() => setDiceNotation(`1${preset}`)}>{preset}</button>)}
              </div>
              <div>
                <FieldLabel>Dice notation</FieldLabel>
                <input className="input-field" value={diceNotation} onChange={(event) => setDiceNotation(event.target.value)} placeholder="3d6" />
              </div>
              <button type="button" className="btn-primary" onClick={() => {
                const nextResults = rollDice(diceNotation)
                setDiceResults(nextResults)
                setDiceHistory((current) => [{ notation: diceNotation, total: nextResults.reduce((sum, value) => sum + value, 0) }, ...current].slice(0, 10))
              }}>Roll dice</button>
            </div>
          </Panel>
          <Panel>
            <StatCard label="Rolls" value={diceResults.join(', ') || '—'} helper={`Sum: ${diceResults.reduce((sum, value) => sum + value, 0) || 0}`} tone="amber" />
            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              {diceHistory.map((entry, index) => <p key={`${entry.notation}-${index}`}>{entry.notation}: {entry.total}</p>)}
            </div>
          </Panel>
        </div>
      )}

      {mode === 'coin' && (
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <Panel>
            <div className="space-y-4">
              <div><FieldLabel>Flip count</FieldLabel><input className="input-field" value={coinCount} onChange={(event) => setCoinCount(event.target.value)} /></div>
              <button type="button" className="btn-primary" onClick={() => setCoinResults(Array.from({ length: Math.min(100, Number(coinCount)) }, () => randomInt(0, 1) === 0 ? 'Heads' : 'Tails'))}>Flip coin(s)</button>
            </div>
          </Panel>
          <Panel>
            <StatCard label="Heads" value={coinSummary.heads} helper={`Tails: ${coinSummary.tails}`} tone="indigo" />
            <div className="mt-4 flex flex-wrap gap-2">
              {coinResults.map((result, index) => <span key={`${result}-${index}`} className="inline-flex px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200">{result}</span>)}
            </div>
          </Panel>
        </div>
      )}
    </ToolLayout>
  )
}