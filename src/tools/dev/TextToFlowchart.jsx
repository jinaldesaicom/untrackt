import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { Download, RotateCcw, Copy, Check, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react'

const SAMPLE = `Start
  Check condition
    Yes path
      Process A
      Process B
        Sub-step
    No path
      Process C
  End`

const THEMES = {
  indigo: { node: '#eef2ff', border: '#6366f1', text: '#312e81', edge: '#a5b4fc', head: '#6366f1' },
  emerald: { node: '#ecfdf5', border: '#10b981', text: '#064e3b', edge: '#6ee7b7', head: '#10b981' },
  amber: { node: '#fffbeb', border: '#f59e0b', text: '#78350f', edge: '#fcd34d', head: '#f59e0b' },
  rose: { node: '#fff1f2', border: '#f43f5e', text: '#881337', edge: '#fda4af', head: '#f43f5e' },
  slate: { node: '#f8fafc', border: '#64748b', text: '#1e293b', edge: '#94a3b8', head: '#64748b' },
}

const SHAPES = { rectangle: 'rectangle', rounded: 'rounded', pill: 'pill' }

const NODE_W = 180
const NODE_H = 44
const H_GAP = 40
const V_GAP = 60

function parseText(text) {
  const lines = text.split('\n')
  const nodes = []
  const edges = []
  const stack = []

  for (const raw of lines) {
    if (!raw.trim()) continue
    const indent = raw.search(/\S/)
    const label = raw.trim()
    const id = nodes.length
    const depth = indent === 0 ? 0 : Math.floor(indent / 2)

    nodes.push({ id, label, depth })

    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop()
    }

    if (stack.length > 0) {
      edges.push({ from: stack[stack.length - 1].id, to: id })
    }

    stack.push({ id, depth })
  }

  return { nodes, edges }
}

function layoutTree(nodes, edges) {
  if (nodes.length === 0) return { positions: {}, width: 0, height: 0 }

  const children = {}
  const hasParent = new Set()
  for (const e of edges) {
    if (!children[e.from]) children[e.from] = []
    children[e.from].push(e.to)
    hasParent.add(e.to)
  }

  const roots = nodes.filter((n) => !hasParent.has(n.id)).map((n) => n.id)
  if (roots.length === 0 && nodes.length > 0) roots.push(0)

  const subtreeWidth = {}

  function calcWidth(id) {
    const kids = children[id] || []
    if (kids.length === 0) {
      subtreeWidth[id] = NODE_W
      return NODE_W
    }
    let total = 0
    for (const kid of kids) {
      total += calcWidth(kid)
    }
    total += (kids.length - 1) * H_GAP
    subtreeWidth[id] = Math.max(NODE_W, total)
    return subtreeWidth[id]
  }

  let totalRootWidth = 0
  for (const r of roots) {
    totalRootWidth += calcWidth(r)
  }
  totalRootWidth += (roots.length - 1) * H_GAP

  const positions = {}
  let maxY = 0

  function place(id, x, y) {
    const kids = children[id] || []
    positions[id] = { x, y }
    maxY = Math.max(maxY, y)

    if (kids.length === 0) return

    let totalKidsWidth = 0
    for (const kid of kids) totalKidsWidth += subtreeWidth[kid]
    totalKidsWidth += (kids.length - 1) * H_GAP

    let startX = x + NODE_W / 2 - totalKidsWidth / 2
    for (const kid of kids) {
      const kidW = subtreeWidth[kid]
      place(kid, startX + kidW / 2 - NODE_W / 2, y + NODE_H + V_GAP)
      startX += kidW + H_GAP
    }
  }

  let startX = 0
  for (const r of roots) {
    const w = subtreeWidth[r]
    place(r, startX + w / 2 - NODE_W / 2, 0)
    startX += w + H_GAP
  }

  let minX = Infinity
  for (const p of Object.values(positions)) {
    minX = Math.min(minX, p.x)
  }
  const PAD = 30
  for (const p of Object.values(positions)) {
    p.x -= minX - PAD
  }

  const maxX = Math.max(...Object.values(positions).map((p) => p.x)) + NODE_W + PAD
  const height = maxY + NODE_H + PAD * 2

  return { positions, width: maxX, height }
}

function drawNodePath(x, y, w, h, shape) {
  const r = shape === 'pill' ? h / 2 : shape === 'rounded' ? 10 : 4
  return `M${x + r},${y} h${w - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${h - 2 * r} a${r},${r} 0 0 1 -${r},${r} h-${w - 2 * r} a${r},${r} 0 0 1 -${r},-${r} v-${h - 2 * r} a${r},${r} 0 0 1 ${r},-${r} Z`
}

function truncateLabel(label, maxChars = 22) {
  return label.length > maxChars ? label.slice(0, maxChars - 1) + '…' : label
}

export default function TextToFlowchart() {
  const [text, setText] = useState(SAMPLE)
  const [theme, setTheme] = useState('indigo')
  const [shape, setShape] = useState('rounded')
  const [zoom, setZoom] = useState(1)
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [containerSize, setContainerSize] = useState({ w: 600, h: 400 })
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const fsContainerRef = useRef(null)
  const colors = THEMES[theme]

  const { nodes, edges } = useMemo(() => parseText(text), [text])
  const { positions, width, height } = useMemo(() => layoutTree(nodes, edges), [nodes, edges])

  // Track container dimensions for auto-fit
  useEffect(() => {
    const el = isFullscreen ? fsContainerRef.current : containerRef.current
    if (!el) return
    const update = () => {
      const { width: w, height: h } = el.getBoundingClientRect()
      if (w > 0 && h > 0) setContainerSize({ w, h })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [isFullscreen])

  const fitZoom = useMemo(() => {
    if (!width || !height) return 1
    const pad = 16
    return Math.min((containerSize.w - pad) / width, (containerSize.h - pad) / height, 1.5)
  }, [width, height, containerSize])

  // Auto-fit when chart or container changes
  useEffect(() => { setZoom(fitZoom) }, [fitZoom])

  // Escape key closes fullscreen
  useEffect(() => {
    if (!isFullscreen) return
    const onKey = (e) => { if (e.key === 'Escape') setIsFullscreen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isFullscreen])

  const handleZoomIn = () => setZoom((z) => Math.min(3, z + 0.15))
  const handleZoomOut = () => setZoom((z) => Math.max(0.1, z - 0.15))
  const handleZoomFit = () => setZoom(fitZoom)

  const handleDownloadSVG = useCallback(() => {
    if (!svgRef.current) return
    const svgEl = svgRef.current
    const clone = svgEl.cloneNode(true)
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.setAttribute('width', width)
    clone.setAttribute('height', height)
    const blob = new Blob([clone.outerHTML], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'flowchart.svg'
    a.click()
    URL.revokeObjectURL(url)
  }, [width, height])

  const handleDownloadPNG = useCallback(() => {
    if (!svgRef.current) return
    const svgEl = svgRef.current
    const clone = svgEl.cloneNode(true)
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.setAttribute('width', width)
    clone.setAttribute('height', height)
    const svgData = new XMLSerializer().serializeToString(clone)
    const img = new Image()
    const scale = 2
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width * scale
      canvas.height = height * scale
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/png')
      a.download = 'flowchart.png'
      a.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }, [width, height])

  const handleCopySVG = useCallback(() => {
    if (!svgRef.current) return
    const clone = svgRef.current.cloneNode(true)
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.setAttribute('width', width)
    clone.setAttribute('height', height)
    navigator.clipboard.writeText(clone.outerHTML).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [width, height])

  const handleReset = () => {
    setText(SAMPLE)
    setZoom(1)
  }

  const edgePaths = edges
    .filter((e) => positions[e.from] && positions[e.to])
    .map((e, i) => {
      const f = positions[e.from]
      const t = positions[e.to]
      const x1 = f.x + NODE_W / 2
      const y1 = f.y + NODE_H
      const x2 = t.x + NODE_W / 2
      const y2 = t.y
      const midY = (y1 + y2) / 2
      return (
        <g key={`e-${i}`}>
          <path
            d={`M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`}
            fill="none"
            stroke={colors.edge}
            strokeWidth="2"
          />
          <polygon
            points={`${x2 - 4},${y2 - 6} ${x2 + 4},${y2 - 6} ${x2},${y2}`}
            fill={colors.head}
          />
        </g>
      )
    })

  return (
    <div className="space-y-4">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Theme */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Theme</span>
          {Object.entries(THEMES).map(([key, c]) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`w-5 h-5 rounded-full border-2 transition-transform ${theme === key ? 'scale-125 border-gray-900 dark:border-white' : 'border-transparent'}`}
              style={{ backgroundColor: c.border }}
              aria-label={`${key} theme`}
            />
          ))}
        </div>

        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />

        {/* Shape */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Shape</span>
          {Object.keys(SHAPES).map((s) => (
            <button
              key={s}
              onClick={() => setShape(s)}
              className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${shape === s ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />

        {/* Zoom */}
        <div className="flex items-center gap-1">
          <button onClick={handleZoomOut} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Zoom out"><ZoomOut className="w-4 h-4" /></button>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-10 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={handleZoomIn} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Zoom in"><ZoomIn className="w-4 h-4" /></button>
          <button onClick={handleZoomFit} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Fit to view"><Maximize2 className="w-3.5 h-3.5" /></button>
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <button onClick={handleReset} className="btn-secondary text-xs flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" />Reset</button>
        <button onClick={handleCopySVG} className="btn-secondary text-xs flex items-center gap-1">
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy SVG'}
        </button>
        <button onClick={handleDownloadSVG} className="btn-secondary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" />SVG</button>
        <button onClick={handleDownloadPNG} className="btn-primary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" />PNG</button>
      </div>

      {/* Main split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" style={{ minHeight: 480 }}>
        {/* Editor */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Text Input</h3>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">{nodes.length} nodes · {edges.length} connections</span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea-field flex-1 font-mono text-sm leading-relaxed resize-none"
            style={{ minHeight: 400, tabSize: 2 }}
            placeholder={`Type your flowchart...\n\nEach line becomes a node.\nIndent (2 spaces) to connect child nodes.\n\nExample:\nStart\n  Step 1\n    Detail A\n    Detail B\n  Step 2\n  End`}
            spellCheck={false}
          />
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
            Each line = a node. Indent with 2 spaces to create connections. Deeper indent = deeper nesting.
          </p>
        </div>

        {/* Canvas */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Flowchart Preview</h3>
            <button onClick={() => setIsFullscreen(true)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400" aria-label="Open fullscreen" title="Fullscreen"><Maximize2 className="w-4 h-4" /></button>
          </div>
          <div
            ref={containerRef}
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-auto"
            style={{ minHeight: 400 }}
          >
            {nodes.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-gray-400 dark:text-gray-500">
                Type text on the left to generate a flowchart
              </div>
            ) : (
              <div style={{ display: 'inline-block', minWidth: '100%', textAlign: 'center' }}>
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${width} ${height}`}
                  width={width * zoom}
                  height={height * zoom}
                  style={{ display: 'inline-block' }}
                >
                  <rect width={width} height={height} fill="white" />

                  {/* Edges */}
                  {edgePaths}

                  {/* Nodes */}
                  {nodes.map((node) => {
                    const pos = positions[node.id]
                    if (!pos) return null
                    const isRoot = node.depth === 0
                    return (
                      <g key={node.id}>
                        <path
                          d={drawNodePath(pos.x, pos.y, NODE_W, NODE_H, shape)}
                          fill={isRoot ? colors.border : colors.node}
                          stroke={colors.border}
                          strokeWidth={isRoot ? 0 : 1.5}
                        />
                        <text
                          x={pos.x + NODE_W / 2}
                          y={pos.y + NODE_H / 2}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={isRoot ? '#ffffff' : colors.text}
                          fontSize="13"
                          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                          fontWeight={isRoot ? '600' : '500'}
                        >
                          {truncateLabel(node.label)}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-auto">Flowchart Preview</span>
            <button onClick={handleZoomOut} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Zoom out"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Zoom in"><ZoomIn className="w-4 h-4" /></button>
            <button onClick={handleZoomFit} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Fit to view"><Maximize2 className="w-3.5 h-3.5" /></button>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
            <button onClick={handleDownloadSVG} className="btn-secondary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" />SVG</button>
            <button onClick={handleDownloadPNG} className="btn-primary text-xs flex items-center gap-1"><Download className="w-3.5 h-3.5" />PNG</button>
            <div className="w-px h-5 bg-gray-200 dark:bg-gray-700" />
            <button onClick={() => setIsFullscreen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500" aria-label="Exit fullscreen"><Minimize2 className="w-5 h-5" /></button>
          </div>
          <div ref={fsContainerRef} className="flex-1 overflow-auto p-4">
            {nodes.length > 0 && (
              <svg viewBox={`0 0 ${width} ${height}`} width={width * zoom} height={height * zoom} style={{ display: 'block', margin: '0 auto' }}>
                <rect width={width} height={height} fill="white" />
                {edgePaths}
                {nodes.map((node) => {
                  const pos = positions[node.id]
                  if (!pos) return null
                  const isRoot = node.depth === 0
                  return (
                    <g key={node.id}>
                      <path d={drawNodePath(pos.x, pos.y, NODE_W, NODE_H, shape)} fill={isRoot ? colors.border : colors.node} stroke={colors.border} strokeWidth={isRoot ? 0 : 1.5} />
                      <text x={pos.x + NODE_W / 2} y={pos.y + NODE_H / 2} textAnchor="middle" dominantBaseline="central" fill={isRoot ? '#ffffff' : colors.text} fontSize="13" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontWeight={isRoot ? '600' : '500'}>{truncateLabel(node.label)}</text>
                    </g>
                  )
                })}
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Syntax help */}
      <details className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <summary className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none">Syntax Guide</summary>
        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed">
          <p><strong>Basic rules:</strong> Each line becomes a node. Use 2-space indentation to create parent → child connections.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-[11px] leading-5 whitespace-pre">{`Start\n  Check input\n    Valid\n      Process\n    Invalid\n      Show error\n  Done`}</div>
            <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-[11px] leading-5 space-y-1">
              <p>• <strong>Root nodes</strong> (no indent) get filled background</p>
              <p>• <strong>Child nodes</strong> (indented) get outlined style</p>
              <p>• <strong>Sibling nodes</strong> (same indent under a parent) render side by side</p>
              <p>• <strong>Deeper nesting</strong> creates more levels in the tree</p>
              <p>• <strong>Empty lines</strong> are skipped</p>
            </div>
          </div>
        </div>
      </details>
    </div>
  )
}
