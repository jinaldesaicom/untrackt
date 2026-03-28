import { useCallback, useRef, useState } from 'react'
import { ToolLayout, Panel, FieldLabel } from '../../components/ToolLayout.jsx'

const OUTPUT_FORMATS = [
  { value: 'image/png', label: 'PNG', ext: 'png' },
  { value: 'image/jpeg', label: 'JPEG', ext: 'jpg' },
  { value: 'image/webp', label: 'WebP', ext: 'webp' },
  { value: 'image/avif', label: 'AVIF', ext: 'avif' },
  { value: 'image/x-icon', label: 'ICO', ext: 'ico' },
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

function drawToCanvas(img, width, height, fillWhite) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (fillWhite) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
  }
  ctx.drawImage(img, 0, 0, width, height)
  return canvas
}

function canvasToBlob(canvas, mimeType, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error(`Format not supported by this browser: ${mimeType}`))),
      mimeType,
      quality
    )
  })
}

function buildIco(canvas) {
  const sizes = [64, 48, 32, 16].filter((s) => s <= Math.max(canvas.width, canvas.height))
  if (sizes.length === 0) sizes.push(16)

  const images = sizes.map((size) => {
    const c = document.createElement('canvas')
    c.width = size
    c.height = size
    c.getContext('2d').drawImage(canvas, 0, 0, size, size)
    const imageData = c.getContext('2d').getImageData(0, 0, size, size)
    const bmpInfoSize = 40
    const pixelDataSize = size * size * 4
    const maskSize = Math.ceil(size / 32) * 4 * size

    const buf = new ArrayBuffer(bmpInfoSize + pixelDataSize + maskSize)
    const view = new DataView(buf)

    view.setUint32(0, bmpInfoSize, true)
    view.setInt32(4, size, true)
    view.setInt32(8, size * 2, true)
    view.setUint16(12, 1, true)
    view.setUint16(14, 32, true)
    view.setUint32(16, 0, true)
    view.setUint32(20, pixelDataSize + maskSize, true)

    const data = imageData.data
    for (let y = size - 1; y >= 0; y--) {
      for (let x = 0; x < size; x++) {
        const src = (y * size + x) * 4
        const dst = bmpInfoSize + ((size - 1 - y) * size + x) * 4
        view.setUint8(dst, data[src + 2])
        view.setUint8(dst + 1, data[src + 1])
        view.setUint8(dst + 2, data[src])
        view.setUint8(dst + 3, data[src + 3])
      }
    }

    return { size, data: new Uint8Array(buf) }
  })

  const headerSize = 6
  const dirSize = 16 * images.length
  let offset = headerSize + dirSize
  const totalSize = offset + images.reduce((a, i) => a + i.data.length, 0)
  const ico = new ArrayBuffer(totalSize)
  const icoView = new DataView(ico)

  icoView.setUint16(0, 0, true)
  icoView.setUint16(2, 1, true)
  icoView.setUint16(4, images.length, true)

  images.forEach((img, i) => {
    const dirOffset = headerSize + i * 16
    icoView.setUint8(dirOffset, img.size >= 256 ? 0 : img.size)
    icoView.setUint8(dirOffset + 1, img.size >= 256 ? 0 : img.size)
    icoView.setUint8(dirOffset + 2, 0)
    icoView.setUint8(dirOffset + 3, 0)
    icoView.setUint16(dirOffset + 4, 1, true)
    icoView.setUint16(dirOffset + 6, 32, true)
    icoView.setUint32(dirOffset + 8, img.data.length, true)
    icoView.setUint32(dirOffset + 12, offset, true)
    new Uint8Array(ico, offset, img.data.length).set(img.data)
    offset += img.data.length
  })

  return new Blob([ico], { type: 'image/x-icon' })
}

async function convertImage(file, { format, quality }) {
  const dataUrl = await readFileAsDataUrl(file)
  const img = await loadImage(dataUrl)
  const { width, height } = img

  if (format === 'image/x-icon') {
    const canvas = drawToCanvas(img, width, height, false)
    const blob = buildIco(canvas)
    return { blob, url: URL.createObjectURL(blob), width, height, size: blob.size }
  }

  const fillWhite = format === 'image/jpeg'
  const canvas = drawToCanvas(img, width, height, fillWhite)
  const blob = await canvasToBlob(canvas, format, quality / 100)
  const url = URL.createObjectURL(blob)

  return { blob, url, width, height, size: blob.size }
}

export default function ImageConverter() {
  const [files, setFiles] = useState([])
  const [format, setFormat] = useState('image/png')
  const [quality, setQuality] = useState(92)
  const [results, setResults] = useState([])
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')
  const [unsupported, setUnsupported] = useState([])
  const fileInputRef = useRef(null)

  const needsQuality = ['image/jpeg', 'image/webp', 'image/avif'].includes(format)

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
    setUnsupported([])
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const handleConvert = async () => {
    if (files.length === 0) return
    setProcessing(true)
    setError('')
    const output = []
    const notSupported = []

    for (const file of files) {
      try {
        const result = await convertImage(file, { format, quality })
        output.push({ name: file.name, originalSize: file.size, ...result })
      } catch (err) {
        if (err.message.includes('not supported')) {
          notSupported.push(file.name)
        }
        output.push({ name: file.name, originalSize: file.size, error: true })
      }
    }

    setResults(output)
    setUnsupported(notSupported)
    setProcessing(false)
  }

  const downloadOne = (result) => {
    const ext = OUTPUT_FORMATS.find((f) => f.value === format)?.ext || 'png'
    const baseName = result.name.replace(/\.[^.]+$/, '')
    const link = document.createElement('a')
    link.href = result.url
    link.download = `${baseName}.${ext}`
    link.click()
  }

  const downloadAll = () => {
    results.filter((r) => !r.error).forEach((r) => downloadOne(r))
  }

  const successful = results.filter((r) => !r.error)
  const inputExt = files.length > 0 ? files[0].name.split('.').pop().toUpperCase() : ''
  const outputLabel = OUTPUT_FORMATS.find((f) => f.value === format)?.label || ''

  return (
    <ToolLayout
      title="Image Converter"
      description="Convert images between PNG, JPEG, WebP, AVIF, and ICO formats entirely in your browser."
      path="/tools/image-converter"
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
            <p className="text-xs text-gray-400 dark:text-gray-500">
              PNG, JPEG, WebP, AVIF — up to 20 images
            </p>
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
              <FieldLabel>Convert to</FieldLabel>
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

            {needsQuality && (
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
            )}

            {format === 'image/x-icon' && (
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 rounded-lg px-3 py-2">
                ICO files include 16×16, 32×32, 48×48, and 64×64 sizes for favicon use.
              </p>
            )}

            {format === 'image/avif' && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AVIF encoding requires browser support (Chrome 94+, Firefox 113+). Not supported in Safari.
              </p>
            )}

            {files.length > 0 && inputExt && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {inputExt} → {outputLabel}
              </p>
            )}

            <button
              className="btn-primary w-full"
              disabled={files.length === 0 || processing}
              onClick={handleConvert}
            >
              {processing ? 'Converting…' : `Convert ${files.length || ''} Image${files.length !== 1 ? 's' : ''}`}
            </button>
          </div>
        </Panel>
      </div>

      {/* Unsupported warning */}
      {unsupported.length > 0 && (
        <div className="rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
          Your browser doesn't support encoding to <strong>{outputLabel}</strong>. Try a different format or browser.
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Results — {successful.length} of {results.length} converted
            </h3>
            {successful.length > 1 && (
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
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{r.name.replace(/\.[^.]+$/, '')}.{OUTPUT_FORMATS.find((f) => f.value === format)?.ext || 'png'}</p>
                    {r.error ? (
                      <p className="text-xs text-rose-500">Failed to convert</p>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatSize(r.originalSize)} → {formatSize(r.size)}
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
