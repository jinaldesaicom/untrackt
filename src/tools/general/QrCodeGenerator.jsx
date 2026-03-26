import { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download } from 'lucide-react'

const SIZES = { Small: 128, Medium: 200, Large: 280 }
const EC_LEVELS = ['L', 'M', 'Q', 'H']

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://example.com')
  const [size, setSize] = useState('Medium')
  const [ecLevel, setEcLevel] = useState('M')
  const canvasRef = useRef(null)

  const downloadPng = () => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">URL or Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com or any text..."
          className="input-field text-base"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {Object.keys(SIZES).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  size === s ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Error Correction</label>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {EC_LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setEcLevel(l)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  ecLevel === l ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {text.trim() && (
        <div className="flex flex-col items-center gap-4">
          <div
            ref={canvasRef}
            className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm inline-flex"
          >
            <QRCodeCanvas
              value={text}
              size={SIZES[size]}
              level={ecLevel}
              includeMargin
              bgColor="#ffffff"
              fgColor="#1e293b"
            />
          </div>
          <button onClick={downloadPng} className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download as PNG
          </button>
        </div>
      )}
    </div>
  )
}
