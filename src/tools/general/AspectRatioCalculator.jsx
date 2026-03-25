import { useMemo, useState } from 'react'
import { ToolLayout, Panel, StatCard, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

function gcd(left, right) {
  let a = Math.abs(left)
  let b = Math.abs(right)
  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }
  return a || 1
}

const COMMON_RATIOS = [
  ['16:9', 16, 9], ['4:3', 4, 3], ['1:1', 1, 1], ['9:16', 9, 16], ['21:9', 21, 9], ['4:5', 4, 5], ['3:2', 3, 2], ['2:3', 2, 3],
]

const PRESETS = [
  ['YouTube thumbnail', 1280, 720], ['Instagram post', 1080, 1080], ['Instagram story', 1080, 1920], ['Twitter header', 1500, 500], ['Facebook cover', 820, 312], ['LinkedIn banner', 1584, 396],
]

export default function AspectRatioCalculator() {
  const [mode, setMode] = useState('resize')
  const [resizeValues, setResizeValues] = useState({ width: '1920', height: '1080', newWidth: '800', newHeight: '' })
  const [referenceWidth, setReferenceWidth] = useState('800')
  const [ratioValues, setRatioValues] = useState({ width: '1920', height: '1080' })

  const missingDimensions = useMemo(() => {
    const width = Number(resizeValues.width)
    const height = Number(resizeValues.height)
    const newWidth = Number(resizeValues.newWidth)
    const newHeight = Number(resizeValues.newHeight)
    if (width <= 0 || height <= 0) return { width: 0, height: 0 }
    if (newWidth > 0) return { width: newWidth, height: Math.round((newWidth / width) * height) }
    if (newHeight > 0) return { width: Math.round((newHeight / height) * width), height: newHeight }
    return { width, height }
  }, [resizeValues])

  const simplifiedRatio = useMemo(() => {
    const width = Number(ratioValues.width)
    const height = Number(ratioValues.height)
    const divisor = gcd(width, height)
    return `${width / divisor}:${height / divisor}`
  }, [ratioValues])

  const previewWidth = missingDimensions.width || Number(ratioValues.width)
  const previewHeight = missingDimensions.height || Number(ratioValues.height)
  const scale = previewWidth > previewHeight ? 220 / previewWidth : 180 / previewHeight

  return (
    <ToolLayout
      title="Aspect Ratio Calculator"
      description="Resize dimensions proportionally, compare common ratios, simplify ratios, and preview layouts for common design formats."
      path="/tools/aspect-ratio-calculator"
    >
      <Panel>
        <SegmentedToggle options={[{ label: 'Resize', value: 'resize' }, { label: 'Reference', value: 'reference' }, { label: 'Find ratio', value: 'ratio' }]} value={mode} onChange={setMode} />
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          {mode === 'resize' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Original width</FieldLabel>
                <input className="input-field" value={resizeValues.width} onChange={(event) => setResizeValues((current) => ({ ...current, width: event.target.value }))} />
              </div>
              <div>
                <FieldLabel>Original height</FieldLabel>
                <input className="input-field" value={resizeValues.height} onChange={(event) => setResizeValues((current) => ({ ...current, height: event.target.value }))} />
              </div>
              <div>
                <FieldLabel>New width</FieldLabel>
                <input className="input-field" value={resizeValues.newWidth} onChange={(event) => setResizeValues((current) => ({ ...current, newWidth: event.target.value, newHeight: '' }))} />
              </div>
              <div>
                <FieldLabel>New height</FieldLabel>
                <input className="input-field" value={resizeValues.newHeight} onChange={(event) => setResizeValues((current) => ({ ...current, newHeight: event.target.value, newWidth: '' }))} />
              </div>
            </div>
          )}

          {mode === 'reference' && (
            <div className="space-y-4">
              <div>
                <FieldLabel>Reference width</FieldLabel>
                <input className="input-field" value={referenceWidth} onChange={(event) => setReferenceWidth(event.target.value)} />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {COMMON_RATIOS.map(([label, width, height]) => (
                  <StatCard key={label} label={label} value={`${referenceWidth} × ${Math.round((Number(referenceWidth) / width) * height)}`} helper="Height for this ratio" tone="gray" />
                ))}
              </div>
            </div>
          )}

          {mode === 'ratio' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Width</FieldLabel>
                <input className="input-field" value={ratioValues.width} onChange={(event) => setRatioValues((current) => ({ ...current, width: event.target.value }))} />
              </div>
              <div>
                <FieldLabel>Height</FieldLabel>
                <input className="input-field" value={ratioValues.height} onChange={(event) => setRatioValues((current) => ({ ...current, height: event.target.value }))} />
              </div>
              <div className="sm:col-span-2">
                <StatCard label="Simplified ratio" value={simplifiedRatio} helper="Using GCD" tone="indigo" />
              </div>
            </div>
          )}

          <div className="mt-6">
            <FieldLabel>Common presets</FieldLabel>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(([label, width, height]) => (
                <button key={label} type="button" className="btn-secondary" onClick={() => {
                  setResizeValues({ width: String(width), height: String(height), newWidth: '800', newHeight: '' })
                  setRatioValues({ width: String(width), height: String(height) })
                }}>{label}</button>
              ))}
            </div>
          </div>
        </Panel>

        <Panel>
          <StatCard label="Preview" value={`${previewWidth} × ${previewHeight}`} helper="Scaled to fit the preview frame" tone="blue" />
          <div className="mt-6 flex items-center justify-center rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 min-h-[260px] bg-gray-50 dark:bg-gray-950">
            <div className="rounded-xl bg-indigo-100 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-700 flex items-center justify-center text-sm font-semibold text-indigo-700 dark:text-indigo-300" style={{ width: `${previewWidth * scale}px`, height: `${previewHeight * scale}px` }}>
              {previewWidth} × {previewHeight}
            </div>
          </div>
        </Panel>
      </div>
    </ToolLayout>
  )
}