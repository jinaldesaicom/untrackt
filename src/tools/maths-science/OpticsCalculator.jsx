import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function OpticsCalculator() {
  const [tab, setTab] = useState('snell')
  const [copied, setCopied] = useState(false)

  const [n1, setN1] = useState('1')
  const [n2, setN2] = useState('1.5')
  const [angle1, setAngle1] = useState('')
  const [snellResult, setSnellResult] = useState(null)

  const [lensF, setLensF] = useState('')
  const [lensDo, setLensDo] = useState('')
  const [lensResult, setLensResult] = useState(null)

  const [mirrorF, setMirrorF] = useState('')
  const [mirrorDo, setMirrorDo] = useState('')
  const [mirrorResult, setMirrorResult] = useState(null)

  const [critN1, setCritN1] = useState('1.5')
  const [critN2, setCritN2] = useState('1')
  const [critResult, setCritResult] = useState(null)

  const calcSnell = () => {
    const ni = parseFloat(n1), nr = parseFloat(n2), theta1 = parseFloat(angle1)
    if (isNaN(ni) || isNaN(nr) || isNaN(theta1)) { setSnellResult('Enter all values'); return }
    const rad1 = theta1 * Math.PI / 180
    const sinTheta2 = (ni * Math.sin(rad1)) / nr

    let text = `Snell's Law: n₁sin(θ₁) = n₂sin(θ₂)\n\n`
    text += `n₁ = ${ni}, n₂ = ${nr}, θ₁ = ${theta1}°\n`
    text += `sin(θ₂) = n₁sin(θ₁)/n₂ = ${ni}×sin(${theta1}°)/${nr}\n`
    text += `         = ${ni}×${Math.sin(rad1).toFixed(6)}/${nr}\n`
    text += `         = ${sinTheta2.toFixed(6)}\n\n`

    if (Math.abs(sinTheta2) > 1) {
      text += `Total internal reflection! (sin(θ₂) > 1)\n`
      const critAngle = Math.asin(nr / ni) * 180 / Math.PI
      text += `Critical angle: ${critAngle.toFixed(4)}°`
    } else {
      const theta2 = Math.asin(sinTheta2) * 180 / Math.PI
      text += `θ₂ = ${theta2.toFixed(4)}°\n\n`
      text += `Refracted ray bends ${theta2 < theta1 ? 'toward' : 'away from'} normal\n`
      text += `Speed ratio: v₁/v₂ = n₂/n₁ = ${(nr / ni).toFixed(4)}`
    }
    setSnellResult(text)
  }

  const calcLens = () => {
    const f = parseFloat(lensF), dObj = parseFloat(lensDo)
    if (isNaN(f) || isNaN(dObj)) { setLensResult('Enter focal length and object distance'); return }

    const dImg = 1 / (1 / f - 1 / dObj)
    const mag = -dImg / dObj

    let text = `Thin Lens Equation: 1/f = 1/do + 1/di\n\n`
    text += `f = ${f} cm (${f > 0 ? 'converging' : 'diverging'})\n`
    text += `do = ${dObj} cm\n\n`
    text += `1/di = 1/f − 1/do = 1/${f} − 1/${dObj}\n`
    text += `di = ${dImg.toFixed(4)} cm\n\n`
    text += `Magnification: m = −di/do = ${mag.toFixed(4)}\n\n`
    text += `Image properties:\n`
    text += `  ${dImg > 0 ? 'Real' : 'Virtual'}\n`
    text += `  ${Math.abs(mag) > 1 ? 'Enlarged' : Math.abs(mag) < 1 ? 'Reduced' : 'Same size'}\n`
    text += `  ${mag > 0 ? 'Upright' : 'Inverted'}\n`
    text += `  |m| = ${Math.abs(mag).toFixed(4)}× (${(Math.abs(mag) * 100).toFixed(1)}% of object)`
    setLensResult(text)
  }

  const calcMirror = () => {
    const f = parseFloat(mirrorF), dObj = parseFloat(mirrorDo)
    if (isNaN(f) || isNaN(dObj)) { setMirrorResult('Enter focal length and object distance'); return }

    const dImg = 1 / (1 / f - 1 / dObj)
    const mag = -dImg / dObj
    const R = 2 * f

    let text = `Mirror Equation: 1/f = 1/do + 1/di\n\n`
    text += `f = ${f} cm (${f > 0 ? 'concave' : 'convex'})\n`
    text += `R = 2f = ${R} cm\n`
    text += `do = ${dObj} cm\n\n`
    text += `di = ${dImg.toFixed(4)} cm\n`
    text += `Magnification: m = ${mag.toFixed(4)}\n\n`
    text += `Image: ${dImg > 0 ? 'Real (in front)' : 'Virtual (behind)'}, `
    text += `${mag > 0 ? 'Upright' : 'Inverted'}, `
    text += `${Math.abs(mag) > 1 ? 'Enlarged' : 'Reduced'}`
    setMirrorResult(text)
  }

  const calcCritical = () => {
    const ni = parseFloat(critN1), nr = parseFloat(critN2)
    if (isNaN(ni) || isNaN(nr)) { setCritResult('Enter both indices'); return }
    if (ni <= nr) { setCritResult('n₁ must be greater than n₂ for total internal reflection'); return }

    const critAngle = Math.asin(nr / ni) * 180 / Math.PI
    let text = `Critical Angle: θc = sin⁻¹(n₂/n₁)\n\n`
    text += `n₁ = ${ni}, n₂ = ${nr}\n`
    text += `θc = sin⁻¹(${nr}/${ni}) = sin⁻¹(${(nr / ni).toFixed(6)})\n`
    text += `θc = ${critAngle.toFixed(4)}°\n\n`
    text += `For θ > ${critAngle.toFixed(2)}°: Total internal reflection\n`
    text += `For θ < ${critAngle.toFixed(2)}°: Refraction occurs\n\n`

    const commonMedia = [
      ['Air → Glass', 1, 1.5], ['Air → Water', 1, 1.33], ['Air → Diamond', 1, 2.42],
      ['Water → Air', 1.33, 1], ['Glass → Air', 1.5, 1], ['Diamond → Air', 2.42, 1],
    ]
    text += 'Common critical angles:\n'
    commonMedia.forEach(([name, a, b]) => {
      if (a > b) text += `  ${name}: ${(Math.asin(b / a) * 180 / Math.PI).toFixed(2)}°\n`
    })
    setCritResult(text)
  }

  const handleCopy = (text) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }

  const ResultBlock = ({ result }) => result ? (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{result}</pre>
        <button onClick={() => handleCopy(result)} className="ml-2 p-1 rounded hover:bg-green-100 dark:hover:bg-green-800/30">
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-gray-400" />}
        </button>
      </div>
    </div>
  ) : null

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['snell', "Snell's Law"], ['lens', 'Lens Equation'], ['mirror', 'Mirror Equation'], ['critical', 'Critical Angle']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'snell' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">n₁ (medium 1)</label>
              <input type="number" step="0.01" value={n1} onChange={e => setN1(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">n₂ (medium 2)</label>
              <input type="number" step="0.01" value={n2} onChange={e => setN2(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">θ₁ (°)</label>
              <input type="number" value={angle1} onChange={e => setAngle1(e.target.value)} placeholder="30"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Common: Air=1.00, Water=1.33, Glass=1.50, Diamond=2.42</div>
          <button onClick={calcSnell} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={snellResult} />
        </div>
      )}

      {tab === 'lens' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Positive f = converging, negative f = diverging</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Focal length (cm)</label>
              <input type="number" value={lensF} onChange={e => setLensF(e.target.value)} placeholder="20"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Object distance (cm)</label>
              <input type="number" value={lensDo} onChange={e => setLensDo(e.target.value)} placeholder="30"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcLens} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={lensResult} />
        </div>
      )}

      {tab === 'mirror' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Positive f = concave, negative f = convex</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Focal length (cm)</label>
              <input type="number" value={mirrorF} onChange={e => setMirrorF(e.target.value)} placeholder="15"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Object distance (cm)</label>
              <input type="number" value={mirrorDo} onChange={e => setMirrorDo(e.target.value)} placeholder="25"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcMirror} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={mirrorResult} />
        </div>
      )}

      {tab === 'critical' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">n₁ (denser medium)</label>
              <input type="number" step="0.01" value={critN1} onChange={e => setCritN1(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">n₂ (less dense)</label>
              <input type="number" step="0.01" value={critN2} onChange={e => setCritN2(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcCritical} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={critResult} />
        </div>
      )}
    </div>
  )
}
