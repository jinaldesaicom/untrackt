import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function WaveSoundCalculator() {
  const [tab, setTab] = useState('wave')
  const [copied, setCopied] = useState(false)

  const [waveSpeed, setWaveSpeed] = useState('')
  const [waveFreq, setWaveFreq] = useState('')
  const [waveLen, setWaveLen] = useState('')
  const [waveResult, setWaveResult] = useState(null)

  const [dbInput, setDbInput] = useState('')
  const [dbRef, setDbRef] = useState('0.00002')
  const [dbResult, setDbResult] = useState(null)

  const [doppVs, setDoppVs] = useState('')
  const [doppVo, setDoppVo] = useState('0')
  const [doppF0, setDoppF0] = useState('')
  const [doppApproach, setDoppApproach] = useState(true)
  const [doppResult, setDoppResult] = useState(null)

  const [emFreq, setEmFreq] = useState('')
  const [emResult, setEmResult] = useState(null)

  const calcWave = () => {
    const v = parseFloat(waveSpeed), f = parseFloat(waveFreq), l = parseFloat(waveLen)
    const known = [!isNaN(v), !isNaN(f), !isNaN(l)].filter(Boolean).length
    if (known < 2) { setWaveResult('Enter at least 2 values'); return }

    let text = 'v = fλ\n\n'
    if (!isNaN(v) && !isNaN(f) && f > 0) {
      const lam = v / f
      text += `λ = v/f = ${v}/${f} = ${lam.toFixed(6)} m\n`
      text += `  = ${(lam * 100).toFixed(4)} cm\n`
    }
    if (!isNaN(v) && !isNaN(l) && l > 0) {
      const freq = v / l
      text += `f = v/λ = ${v}/${l} = ${freq.toFixed(4)} Hz\n`
      if (freq >= 1e6) text += `  = ${(freq / 1e6).toFixed(4)} MHz\n`
      else if (freq >= 1e3) text += `  = ${(freq / 1e3).toFixed(4)} kHz\n`
    }
    if (!isNaN(f) && !isNaN(l)) {
      const speed = f * l
      text += `v = fλ = ${f} × ${l} = ${speed.toFixed(4)} m/s\n`
    }
    text += `\nPeriod: T = 1/f = ${(1 / (f || v / l)).toFixed(6)} s\n`
    text += `Angular frequency: ω = 2πf = ${(2 * Math.PI * (f || v / l)).toFixed(4)} rad/s\n`
    text += `Wave number: k = 2π/λ = ${(2 * Math.PI / (l || v / f)).toFixed(4)} rad/m`
    setWaveResult(text)
  }

  const calcDecibel = () => {
    const val = parseFloat(dbInput), ref = parseFloat(dbRef) || 0.00002
    if (isNaN(val)) { setDbResult('Enter a value'); return }

    let text = ''
    if (val > 0) {
      const db = 20 * Math.log10(val / ref)
      text += `Sound pressure: ${val} Pa\nReference: ${ref} Pa\n\n`
      text += `dB = 20·log₁₀(p/p₀) = 20·log₁₀(${val}/${ref})\n   = ${db.toFixed(2)} dB SPL\n\n`
    } else {
      const pressure = ref * Math.pow(10, val / 20)
      text += `Level: ${val} dB SPL\nReference: ${ref} Pa\n\n`
      text += `p = p₀ × 10^(dB/20) = ${ref} × 10^(${val}/20)\n  = ${pressure.toExponential(4)} Pa\n\n`
    }

    const levels = [
      [0, 'Threshold of hearing'], [20, 'Whisper'], [40, 'Library'], [60, 'Normal speech'],
      [70, 'Vacuum cleaner'], [80, 'Heavy traffic'], [90, 'Lawnmower'], [100, 'Chainsaw'],
      [110, 'Rock concert'], [120, 'Thunder'], [130, 'Pain threshold'], [140, 'Jet engine'],
    ]
    text += 'Common sound levels:\n'
    levels.forEach(([db, desc]) => { text += `  ${String(db).padStart(3)} dB - ${desc}\n` })
    setDbResult(text)
  }

  const calcDoppler = () => {
    const vs = parseFloat(doppVs), vo = parseFloat(doppVo) || 0, f0 = parseFloat(doppF0)
    if (isNaN(vs) || isNaN(f0)) { setDoppResult('Enter source speed and frequency'); return }
    const vSound = 343

    let text = `Source speed: ${vs} m/s\nObserver speed: ${vo} m/s\nSource frequency: ${f0} Hz\nSpeed of sound: ${vSound} m/s\n\n`

    if (doppApproach) {
      const fObs = f0 * (vSound + vo) / (vSound - vs)
      text += `Approaching:\nf' = f₀(v + v_o)/(v - v_s)\n`
      text += `   = ${f0} × (${vSound} + ${vo})/(${vSound} - ${vs})\n`
      text += `   = ${fObs.toFixed(4)} Hz\n`
      text += `Shift: ${(fObs - f0).toFixed(4)} Hz (${((fObs / f0 - 1) * 100).toFixed(2)}% higher)`
    } else {
      const fObs = f0 * (vSound - vo) / (vSound + vs)
      text += `Receding:\nf' = f₀(v - v_o)/(v + v_s)\n`
      text += `   = ${f0} × (${vSound} - ${vo})/(${vSound} + ${vs})\n`
      text += `   = ${fObs.toFixed(4)} Hz\n`
      text += `Shift: ${(f0 - fObs).toFixed(4)} Hz (${((1 - fObs / f0) * 100).toFixed(2)}% lower)`
    }
    setDoppResult(text)
  }

  const calcEM = () => {
    const f = parseFloat(emFreq)
    if (isNaN(f) || f <= 0) { setEmResult('Enter a valid frequency'); return }
    const c = 3e8
    const lam = c / f
    const E = 6.626e-34 * f

    let text = `Frequency: ${f.toExponential(4)} Hz\n`
    text += `Wavelength: λ = c/f = ${lam.toExponential(4)} m`
    if (lam >= 1e-3) text += ` = ${(lam * 100).toFixed(4)} cm`
    else if (lam >= 1e-9) text += ` = ${(lam * 1e9).toFixed(4)} nm`
    text += `\nPhoton energy: E = hf = ${E.toExponential(4)} J = ${(E / 1.602e-19).toFixed(4)} eV\n\n`

    const spectrum = [
      [3e3, 3e5, 'ELF/VLF Radio'], [3e5, 3e6, 'LF Radio (AM)'], [3e6, 3e7, 'HF Radio'],
      [3e7, 3e8, 'VHF (FM/TV)'], [3e8, 3e9, 'UHF (TV/Cell)'], [3e9, 3e11, 'Microwave'],
      [3e11, 4.3e14, 'Infrared'], [4.3e14, 7.5e14, 'Visible Light'], [7.5e14, 3e16, 'Ultraviolet'],
      [3e16, 3e19, 'X-rays'], [3e19, Infinity, 'Gamma rays'],
    ]
    const band = spectrum.find(([lo, hi]) => f >= lo && f < hi)
    text += `EM spectrum: ${band ? band[2] : 'Below radio'}\n`

    if (f >= 4.3e14 && f <= 7.5e14) {
      const nm = lam * 1e9
      let color = 'unknown'
      if (nm >= 620) color = 'Red'
      else if (nm >= 590) color = 'Orange'
      else if (nm >= 570) color = 'Yellow'
      else if (nm >= 495) color = 'Green'
      else if (nm >= 450) color = 'Blue'
      else color = 'Violet'
      text += `Visible color: ${color} (~${nm.toFixed(0)} nm)`
    }
    setEmResult(text)
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
        {[['wave', 'Wave Equation'], ['decibel', 'Decibels'], ['doppler', 'Doppler Effect'], ['em', 'EM Spectrum']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'wave' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">v = fλ</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter any 2 values to find the third.</p>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Speed (m/s)</label>
              <input type="number" value={waveSpeed} onChange={e => setWaveSpeed(e.target.value)} placeholder="343"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Frequency (Hz)</label>
              <input type="number" value={waveFreq} onChange={e => setWaveFreq(e.target.value)} placeholder="440"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Wavelength (m)</label>
              <input type="number" value={waveLen} onChange={e => setWaveLen(e.target.value)} placeholder="0.78"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcWave} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={waveResult} />
        </div>
      )}

      {tab === 'decibel' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Enter positive value for pressure→dB, or negative/zero for dB→pressure</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Value (Pa or dB)</label>
              <input type="number" value={dbInput} onChange={e => setDbInput(e.target.value)} placeholder="60"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Reference pressure (Pa)</label>
              <input type="number" value={dbRef} onChange={e => setDbRef(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcDecibel} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={dbResult} />
        </div>
      )}

      {tab === 'doppler' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <div className="flex gap-2 mb-2">
            <button onClick={() => setDoppApproach(true)}
              className={`px-2 py-1 rounded text-xs font-medium transition ${doppApproach ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
              Approaching
            </button>
            <button onClick={() => setDoppApproach(false)}
              className={`px-2 py-1 rounded text-xs font-medium transition ${!doppApproach ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
              Receding
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Source speed (m/s)</label>
              <input type="number" value={doppVs} onChange={e => setDoppVs(e.target.value)} placeholder="30"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Observer speed (m/s)</label>
              <input type="number" value={doppVo} onChange={e => setDoppVo(e.target.value)} placeholder="0"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Source frequency (Hz)</label>
              <input type="number" value={doppF0} onChange={e => setDoppF0(e.target.value)} placeholder="440"
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcDoppler} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={doppResult} />
        </div>
      )}

      {tab === 'em' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">EM Spectrum Calculator</h3>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Frequency (Hz)</label>
            <input type="number" value={emFreq} onChange={e => setEmFreq(e.target.value)} placeholder="5e14"
              className="w-full border rounded-lg px-3 py-2 font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          </div>
          <button onClick={calcEM} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          <ResultBlock result={emResult} />
        </div>
      )}
    </div>
  )
}
