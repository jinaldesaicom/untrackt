import { useMemo, useState } from 'react'

function optimizeSvg(svg, pretty) {
  let output = svg
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<g\b[^>]*>\s*<\/g>/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*(=)\s*/g, '$1')
    .replace(/\s+>/g, '>')
    .replace(/\s+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, ' xmlns="http://www.w3.org/2000/svg"')
    .replace(/\s+fill="none"/g, '')
    .replace(/\s+stroke="none"/g, '')
    .replace(/\s+id="[^"]*"/g, '')
    .trim()

  output = output.replace(/<script[\s\S]*?<\/script>/gi, '')

  if (pretty) {
    output = output.replace(/></g, '>\n<')
  } else {
    output = output.replace(/\n/g, '')
  }

  return output
}

function bytes(str) {
  return new Blob([str]).size
}

export default function SvgOptimizer() {
  const [input, setInput] = useState('<svg viewBox="0 0 24 24"><path d="M12 2l9 20H3z"/></svg>')
  const [pretty, setPretty] = useState(false)
  const [optimized, setOptimized] = useState('')

  const output = useMemo(() => optimized || optimizeSvg(input, pretty), [input, pretty, optimized])
  const canPreview = /<svg[\s\S]*<\/svg>/i.test(output)

  const originalSize = bytes(input)
  const optimizedSize = bytes(output)
  const reduction = originalSize > 0 ? (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1) : '0.0'

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="textarea-field min-h-[180px]" placeholder="Paste raw SVG" />

      <label className="inline-flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" checked={pretty} onChange={(e) => setPretty(e.target.checked)} />
        Pretty print output
      </label>

      <button className="btn-primary" onClick={() => setOptimized(optimizeSvg(input, pretty))}>Optimize</button>

      <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
        Original: {originalSize} bytes | Optimized: {optimizedSize} bytes | Reduction: {reduction}%
      </div>

      <textarea readOnly value={output} className="textarea-field min-h-[180px] bg-gray-50 font-mono" />
      <button className="btn-secondary" onClick={() => navigator.clipboard.writeText(output)}>Copy output</button>

      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <h3 className="font-semibold mb-2">Preview</h3>
        {canPreview ? (
          <div className="border border-gray-100 rounded-lg p-4" dangerouslySetInnerHTML={{ __html: output }} />
        ) : (
          <p className="text-sm text-red-600">Output is not a valid SVG block.</p>
        )}
      </div>
    </div>
  )
}
