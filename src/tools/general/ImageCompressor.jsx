import { useCallback, useRef, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { ToolLayout, Panel, FieldLabel } from '../../components/ToolLayout.jsx'

const OUTPUT_FORMATS = [
  { value: 'image/jpeg', label: 'JPEG', ext: 'jpg' },
  { value: 'image/png', label: 'PNG', ext: 'png' },
  { value: 'image/webp', label: 'WebP', ext: 'webp' },
]

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

async function compressImage(file, { format, quality, maxWidth, maxHeight }) {
  const options = {
    maxSizeMB: 100,
    initialQuality: quality / 100,
    useWebWorker: true,
    fileType: format,
    preserveExif: false,
  }
  if (maxWidth) options.maxWidthOrHeight = Math.max(maxWidth, maxHeight || 0)
  if (maxHeight && !maxWidth) options.maxWidthOrHeight = maxHeight

  const compressed = await imageCompression(file, options)
  const url = URL.createObjectURL(compressed)
  const img = await loadImage(url)

  return {
    blob: compressed,
    url,
    width: img.width,
    height: img.height,
    size: compressed.size,
  }
}

export default function ImageCompressor() {
  const [files, setFiles] = useState([])
  const [format, setFormat] = useState('image/jpeg')
  const [quality, setQuality] = useState(80)
  const [maxWidth, setMaxWidth] = useState('')
  const [maxHeight, setMaxHeight] = useState('')
  const [results, setResults] = useState([])
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFiles = useCallback((incoming) => {
    const valid = Array.from(incoming).filter((f) => f.type.startsWith('image/'))
    if (valid.length === 0) {
      setError('Please select valid image files.')
      return
    }
    if (valid.length > 20) {
      setError('Maximum 20 images at a time.')
      return
    }
    setError('')
    setFiles(valid)
    setResults([])

    readFileAsDataUrl(valid[0]).then((dataUrl) => loadImage(dataUrl)).then((img) => {
      setMaxWidth(String(img.width))
      setMaxHeight(String(img.height))
    }).catch(() => {})
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleCompress = async () => {
    if (files.length === 0) return
    setProcessing(true)
    setError('')
    const output = []

    for (const file of files) {
      try {
        const result = await compressImage(file, {
          format,
          quality,
          maxWidth: maxWidth ? Number(maxWidth) : 0,
          maxHeight: maxHeight ? Number(maxHeight) : 0,
        })
        output.push({
          name: file.name,
          originalSize: file.size,
          ...result,
        })
      } catch {
        output.push({
          name: file.name,
          originalSize: file.size,
          error: true,
        })
      }
    }

    setResults(output)
    setProcessing(false)
  }

  const downloadOne = (result) => {
    const ext = OUTPUT_FORMATS.find((f) => f.value === format)?.ext || 'jpg'
    const baseName = result.name.replace(/\.[^.]+$/, '')
    const link = document.createElement('a')
    link.href = result.url
    link.download = `${baseName}-compressed.${ext}`
    link.click()
  }

  const downloadAll = () => {
    results.filter((r) => !r.error).forEach((r) => downloadOne(r))
  }

  const totalOriginal = results.reduce((a, r) => a + r.originalSize, 0)
  const totalCompressed = results.filter((r) => !r.error).reduce((a, r) => a + r.size, 0)
  const totalSaved = totalOriginal - totalCompressed

  return (
    <ToolLayout
      title="Image Compressor"
      description="Compress and convert images to JPEG, PNG, or WebP entirely in your browser. Your files never leave your device."
      path="/tools/image-compressor"
    >

      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        {/* Upload */}
        <Panel>
          <div
            className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-8 text-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Drag & drop images here, or click to choose files
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">JPEG, PNG, WebP, GIF, SVG — up to 20 images</p>
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {files.length} image{files.length > 1 ? 's' : ''} selected
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5 max-h-32 overflow-y-auto">
                {files.map((f, i) => (
                  <li key={i}>{f.name} — {formatSize(f.size)}</li>
                ))}
              </ul>
            </div>
          )}

          {error && <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">{error}</p>}
        </Panel>

        {/* Settings */}
        <Panel>
          <div className="space-y-5">
            <div>
              <FieldLabel>Output Format</FieldLabel>
              <div className="flex flex-wrap gap-2 mt-1">
                {OUTPUT_FORMATS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFormat(f.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      format === f.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <FieldLabel>Quality — {quality}%</FieldLabel>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full mt-1 accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                <span>Smaller file</span>
                <span>Higher quality</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel>Max Width (px)</FieldLabel>
                <input
                  type="number"
                  min="0"
                  value={maxWidth}
                  onChange={(e) => setMaxWidth(e.target.value)}
                  className="input-field mt-1"
                  placeholder="No limit"
                />
              </div>
              <div>
                <FieldLabel>Max Height (px)</FieldLabel>
                <input
                  type="number"
                  min="0"
                  value={maxHeight}
                  onChange={(e) => setMaxHeight(e.target.value)}
                  className="input-field mt-1"
                  placeholder="No limit"
                />
              </div>
            </div>

            <button
              className="btn-primary w-full"
              disabled={files.length === 0 || processing}
              onClick={handleCompress}
            >
              {processing ? 'Compressing…' : `Compress ${files.length || ''} Image${files.length !== 1 ? 's' : ''}`}
            </button>
          </div>
        </Panel>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Results</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total saved: {formatSize(totalSaved)} ({totalOriginal > 0 ? Math.round((totalSaved / totalOriginal) * 100) : 0}% reduction)
              </p>
            </div>
            {results.filter((r) => !r.error).length > 1 && (
              <button className="btn-secondary" onClick={downloadAll}>Download all</button>
            )}
          </div>

          <div className="space-y-3">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {!r.error && (
                    <img
                      src={r.url}
                      alt=""
                      className="w-14 h-14 rounded-lg object-cover border border-gray-200 dark:border-gray-700 flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{r.name}</p>
                    {r.error ? (
                      <p className="text-xs text-rose-500">Failed to compress</p>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatSize(r.originalSize)} → {formatSize(r.size)}{' '}
                        <span className={r.size < r.originalSize ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
                          ({r.size < r.originalSize ? '−' : '+'}{Math.abs(Math.round((1 - r.size / r.originalSize) * 100))}%)
                        </span>
                        {' · '}{r.width}×{r.height}
                      </p>
                    )}
                  </div>
                </div>
                {!r.error && (
                  <button className="btn-secondary flex-shrink-0" onClick={() => downloadOne(r)}>
                    Download
                  </button>
                )}
              </div>
            ))}
          </div>
        </Panel>
      )}
    </ToolLayout>
  )
}
