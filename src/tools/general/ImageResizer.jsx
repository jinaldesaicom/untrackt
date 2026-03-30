import { useCallback, useRef, useState } from 'react'
import { Upload, Download, Lock, Unlock, RotateCcw, X } from 'lucide-react'
import { Panel, FieldLabel } from '../../components/ToolLayout.jsx'

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const OUTPUT_FORMATS = [
  { value: 'image/png', label: 'PNG', ext: 'png' },
  { value: 'image/jpeg', label: 'JPEG', ext: 'jpg' },
  { value: 'image/webp', label: 'WebP', ext: 'webp' },
]

const PRESETS = [
  { label: 'Custom', width: null, height: null },
  { label: '640 × 480', width: 640, height: 480 },
  { label: '800 × 600', width: 800, height: 600 },
  { label: '1024 × 768', width: 1024, height: 768 },
  { label: '1280 × 720 (HD)', width: 1280, height: 720 },
  { label: '1920 × 1080 (Full HD)', width: 1920, height: 1080 },
  { label: '2560 × 1440 (QHD)', width: 2560, height: 1440 },
  { label: '256 × 256 (Icon)', width: 256, height: 256 },
  { label: '512 × 512', width: 512, height: 512 },
]

export default function ImageResizer() {
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [originalWidth, setOriginalWidth] = useState(0)
  const [originalHeight, setOriginalHeight] = useState(0)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [lockAspect, setLockAspect] = useState(true)
  const [format, setFormat] = useState('image/png')
  const [quality, setQuality] = useState(90)
  const [result, setResult] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const aspectRatio = originalWidth && originalHeight ? originalWidth / originalHeight : 1

  const handleFile = useCallback(async (f) => {
    if (!f || !f.type.startsWith('image/')) return
    const url = await readFileAsDataUrl(f)
    const img = await loadImage(url)
    setFile(f)
    setPreview(url)
    setOriginalWidth(img.naturalWidth)
    setOriginalHeight(img.naturalHeight)
    setWidth(img.naturalWidth)
    setHeight(img.naturalHeight)
    setResult(null)
  }, [])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer?.files?.[0]
    if (f) handleFile(f)
  }, [handleFile])

  const onWidthChange = useCallback((val) => {
    const w = val === '' ? '' : Math.max(1, parseInt(val, 10) || 1)
    setWidth(w)
    if (lockAspect && w !== '' && aspectRatio) {
      setHeight(Math.round(w / aspectRatio))
    }
  }, [lockAspect, aspectRatio])

  const onHeightChange = useCallback((val) => {
    const h = val === '' ? '' : Math.max(1, parseInt(val, 10) || 1)
    setHeight(h)
    if (lockAspect && h !== '' && aspectRatio) {
      setWidth(Math.round(h * aspectRatio))
    }
  }, [lockAspect, aspectRatio])

  const applyPreset = useCallback((preset) => {
    if (!preset.width) {
      setWidth(originalWidth)
      setHeight(originalHeight)
      return
    }
    if (lockAspect) {
      const scaleW = preset.width / originalWidth
      const scaleH = preset.height / originalHeight
      const scale = Math.min(scaleW, scaleH)
      setWidth(Math.round(originalWidth * scale))
      setHeight(Math.round(originalHeight * scale))
    } else {
      setWidth(preset.width)
      setHeight(preset.height)
    }
  }, [lockAspect, originalWidth, originalHeight])

  const resize = useCallback(async () => {
    if (!preview || !width || !height) return
    setProcessing(true)
    try {
      const img = await loadImage(preview)
      const canvas = document.createElement('canvas')
      canvas.width = Number(width)
      canvas.height = Number(height)
      const ctx = canvas.getContext('2d')
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const blob = await new Promise((resolve) => {
        const q = format === 'image/png' ? undefined : quality / 100
        canvas.toBlob(resolve, format, q)
      })
      const url = URL.createObjectURL(blob)
      setResult({ url, blob, width: canvas.width, height: canvas.height })
    } finally {
      setProcessing(false)
    }
  }, [preview, width, height, format, quality])

  const download = useCallback(() => {
    if (!result) return
    const ext = OUTPUT_FORMATS.find((f) => f.value === format)?.ext || 'png'
    const name = file?.name?.replace(/\.[^.]+$/, '') || 'resized'
    const a = document.createElement('a')
    a.href = result.url
    a.download = `${name}-${result.width}x${result.height}.${ext}`
    a.click()
  }, [result, format, file])

  const reset = useCallback(() => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setWidth('')
    setHeight('')
    setOriginalWidth(0)
    setOriginalHeight(0)
    if (fileRef.current) fileRef.current.value = ''
  }, [])

  const scalePercent = originalWidth ? Math.round((Number(width) / originalWidth) * 100) : 100

  return (
    <div className="space-y-5">
      {/* Upload area */}
      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileRef.current?.click() }}
          className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors ${
            dragOver
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30'
              : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 bg-gray-50 dark:bg-gray-800'
          }`}
        >
          <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Drop an image here or click to upload</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">PNG, JPEG, WebP, GIF, BMP, SVG</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>
      ) : (
        <>
          {/* File info bar */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{file.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {originalWidth} × {originalHeight}px &middot; {formatSize(file.size)}
              </p>
            </div>
            <button onClick={reset} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400" title="Remove" aria-label="Remove image">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Controls */}
          <Panel>
            <div className="space-y-4">
              {/* Preset selector */}
              <div>
                <FieldLabel>Size Preset</FieldLabel>
                <select
                  onChange={(e) => applyPreset(PRESETS[Number(e.target.value)])}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {PRESETS.map((p, i) => (
                    <option key={p.label} value={i}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* Width / Height with lock */}
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <FieldLabel>Width (px)</FieldLabel>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={width}
                    onChange={(e) => onWidthChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <button
                  onClick={() => setLockAspect((v) => !v)}
                  className={`p-2.5 rounded-lg border transition-colors mb-[1px] ${
                    lockAspect
                      ? 'border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                  }`}
                  title={lockAspect ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                  aria-label={lockAspect ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
                  aria-pressed={lockAspect}
                >
                  {lockAspect ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </button>
                <div className="flex-1">
                  <FieldLabel>Height (px)</FieldLabel>
                  <input
                    type="number"
                    min={1}
                    max={10000}
                    value={height}
                    onChange={(e) => onHeightChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Scale info */}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Scale: {scalePercent}% of original &middot; {width} × {height} px
              </p>

              {/* Output format */}
              <div>
                <FieldLabel>Output Format</FieldLabel>
                <div className="flex gap-2">
                  {OUTPUT_FORMATS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFormat(f.value)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${
                        format === f.value
                          ? 'border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality slider – only for lossy formats */}
              {format !== 'image/png' && (
                <div>
                  <FieldLabel helper={`${quality}%`}>Quality</FieldLabel>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    <span>10%</span><span>100%</span>
                  </div>
                </div>
              )}

              {/* Resize button */}
              <button
                onClick={resize}
                disabled={processing || !width || !height}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
              >
                {processing ? 'Resizing…' : 'Resize Image'}
              </button>
            </div>
          </Panel>

          {/* Result */}
          {result && (
            <Panel>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Resized Image</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {result.width} × {result.height}px &middot; {formatSize(result.blob.size)}
                  </span>
                </div>
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-[url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22><rect width=%228%22 height=%228%22 fill=%22%23f0f0f0%22/><rect x=%228%22 y=%228%22 width=%228%22 height=%228%22 fill=%22%23f0f0f0%22/></svg>')] dark:bg-[url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22><rect width=%228%22 height=%228%22 fill=%22%23374151%22/><rect x=%228%22 y=%228%22 width=%228%22 height=%228%22 fill=%22%23374151%22/></svg>')]">
                  <img
                    src={result.url}
                    alt="Resized preview"
                    className="max-w-full max-h-80 mx-auto block"
                  />
                </div>
                <button
                  onClick={download}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </Panel>
          )}
        </>
      )}
    </div>
  )
}
