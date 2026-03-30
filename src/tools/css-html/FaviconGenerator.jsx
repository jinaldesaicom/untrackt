import { useState, useRef } from 'react'
import { Upload, Download, Image, X } from 'lucide-react'

const SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
]

export default function FaviconGenerator() {
  const [source, setSource] = useState(null)
  const [previews, setPreviews] = useState([])
  const [htmlTags, setHtmlTags] = useState('')
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setSource(url)
    generatePreviews(url)
  }

  const generatePreviews = (url) => {
    const img = new window.Image()
    img.onload = () => {
      const results = SIZES.map(s => {
        const canvas = document.createElement('canvas')
        canvas.width = s.size
        canvas.height = s.size
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, s.size, s.size)
        return { ...s, dataUrl: canvas.toDataURL('image/png') }
      })
      setPreviews(results)
      setHtmlTags(`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`)
    }
    img.src = url
  }

  const downloadSingle = (preview) => {
    const link = document.createElement('a')
    link.download = preview.name
    link.href = preview.dataUrl
    link.click()
  }

  const downloadAll = async () => {
    // Download each file individually since ZIP requires a library
    for (const p of previews) {
      const link = document.createElement('a')
      link.download = p.name
      link.href = p.dataUrl
      link.click()
      await new Promise(r => setTimeout(r, 200))
    }
  }

  const clear = () => {
    setSource(null)
    setPreviews([])
    setHtmlTags('')
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="space-y-5">
      {/* Upload */}
      {!source ? (
        <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-10 cursor-pointer hover:border-teal-400 dark:hover:border-teal-600 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Upload SVG or PNG image</span>
          <span className="text-xs text-gray-400 mt-1">Recommended: square, at least 512×512</span>
          <input ref={fileRef} type="file" accept="image/svg+xml,image/png,image/jpeg" onChange={handleFile} className="hidden" />
        </label>
      ) : (
        <div className="space-y-4">
          {/* Source preview */}
          <div className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <img src={source} alt="Source" className="w-16 h-16 rounded-lg object-contain bg-gray-100 dark:bg-gray-800" />
            <div className="flex-1">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Source Image</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">All sizes will be generated from this image.</p>
            </div>
            <button onClick={clear} className="text-gray-400 hover:text-red-500 p-1"><X className="w-4 h-4" /></button>
          </div>

          {/* Generated sizes */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Generated Sizes</span>
              <button onClick={downloadAll} className="btn-primary flex items-center gap-1.5 text-xs"><Download className="w-3.5 h-3.5" /> Download All</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {previews.map(p => (
                <div key={p.name} className="flex flex-col items-center rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-3">
                  <div className="flex items-center justify-center w-16 h-16 mb-2">
                    <img src={p.dataUrl} alt={p.name} style={{ width: Math.min(p.size, 64), height: Math.min(p.size, 64) }} className="object-contain" />
                  </div>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">{p.name}</span>
                  <span className="text-[10px] text-gray-400">{p.size}×{p.size}</span>
                  <button onClick={() => downloadSingle(p)} className="text-[10px] text-teal-600 dark:text-teal-400 hover:underline mt-1">Download</button>
                </div>
              ))}
            </div>
          </div>

          {/* HTML tags */}
          {htmlTags && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-900 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">HTML Link Tags</span>
                <button onClick={() => navigator.clipboard.writeText(htmlTags)} className="text-xs text-teal-400 hover:text-teal-300">Copy</button>
              </div>
              <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">{htmlTags}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
