import { useState, useMemo } from 'react'

export default function MicroscopyCalculator() {
  const [mode, setMode] = useState('magnification')
  const [inputs, setInputs] = useState({})
  const set = (k, v) => setInputs(p => ({ ...p, [k]: v }))

  const modes = [
    { k: 'magnification', l: 'Total Magnification' },
    { k: 'fov', l: 'Field of View' },
    { k: 'actualSize', l: 'Actual Size' },
    { k: 'scaleBar', l: 'Scale Bar' },
    { k: 'resolution', l: 'Resolution Limit' },
  ]

  const results = useMemo(() => {
    const g = (k) => parseFloat(inputs[k])
    switch (mode) {
      case 'magnification': {
        const eyepiece = g('eyepiece') || 10
        const objective = g('objective')
        if (isNaN(objective)) return null
        const total = eyepiece * objective
        const commonObj = [4, 10, 40, 100]
        return {
          rows: [
            { l: 'Eyepiece', v: `${eyepiece}×` },
            { l: 'Objective', v: `${objective}×` },
            { l: 'Total Magnification', v: `${total}×`, highlight: true },
          ],
          table: commonObj.map(o => ({ obj: `${o}×`, total: `${eyepiece * o}×`, label: o === 4 ? 'Scanning' : o === 10 ? 'Low' : o === 40 ? 'High' : 'Oil' })),
          formula: 'Total Magnification = Eyepiece × Objective',
        }
      }
      case 'fov': {
        const fovLow = g('fovLow'), magLow = g('magLow'), magHigh = g('magHigh')
        if ([fovLow, magLow, magHigh].some(isNaN) || magHigh === 0) return null
        const fovHigh = (fovLow * magLow) / magHigh
        return {
          rows: [
            { l: 'Known FOV', v: `${fovLow} mm at ${magLow}×` },
            { l: 'New magnification', v: `${magHigh}×` },
            { l: 'Calculated FOV', v: `${fovHigh.toFixed(4)} mm`, highlight: true },
            { l: 'In μm', v: `${(fovHigh * 1000).toFixed(2)} μm` },
          ],
          formula: 'FOV₁ × Mag₁ = FOV₂ × Mag₂',
        }
      }
      case 'actualSize': {
        const imageSize = g('imageSize'), mag = g('magAS')
        if ([imageSize, mag].some(isNaN) || mag === 0) return null
        const actual = imageSize / mag
        return {
          rows: [
            { l: 'Image size', v: `${imageSize} mm` },
            { l: 'Magnification', v: `${mag}×` },
            { l: 'Actual size', v: `${actual.toFixed(4)} mm`, highlight: true },
            { l: 'In μm', v: `${(actual * 1000).toFixed(2)} μm` },
            { l: 'In nm', v: `${(actual * 1e6).toFixed(0)} nm` },
          ],
          formula: 'Actual Size = Image Size / Magnification',
        }
      }
      case 'scaleBar': {
        const barLength = g('barLength'), barValue = g('barValue'), specimenLength = g('specimenLength')
        if ([barLength, barValue, specimenLength].some(isNaN) || barLength === 0) return null
        const actualSpecimen = (specimenLength * barValue) / barLength
        const magCalc = specimenLength / actualSpecimen
        return {
          rows: [
            { l: 'Scale bar (image)', v: `${barLength} mm` },
            { l: 'Scale bar (actual)', v: `${barValue} μm` },
            { l: 'Specimen in image', v: `${specimenLength} mm` },
            { l: 'Actual specimen size', v: `${actualSpecimen.toFixed(4)} μm`, highlight: true },
          ],
          formula: 'Actual = (Specimen length × Scale value) / Scale bar length',
        }
      }
      case 'resolution': {
        const wavelength = g('wavelength'), na = g('na')
        if ([wavelength, na].some(isNaN) || na === 0) return null
        const resolution = (0.61 * wavelength) / na
        return {
          rows: [
            { l: 'Wavelength', v: `${wavelength} nm` },
            { l: 'Numerical Aperture', v: na.toFixed(3) },
            { l: 'Resolution limit', v: `${resolution.toFixed(2)} nm`, highlight: true },
            { l: 'In μm', v: `${(resolution / 1000).toFixed(4)} μm` },
          ],
          table: [
            { type: 'Light microscope', wavelength: '400-700 nm', na: '~1.4', res: '~200 nm' },
            { type: 'Fluorescence', wavelength: '300-700 nm', na: '~1.4', res: '~200 nm' },
            { type: 'TEM', wavelength: '0.005 nm', na: '~0.01', res: '~0.3 nm' },
            { type: 'SEM', wavelength: '0.005 nm', na: '~0.02', res: '~1 nm' },
          ],
          formula: 'Resolution = 0.61 × λ / NA (Rayleigh criterion)',
        }
      }
      default: return null
    }
  }, [mode, inputs])

  const field = (key, label, placeholder) => (
    <div key={key}>
      <label className="text-xs text-gray-500 dark:text-gray-400">{label}</label>
      <input type="number" value={inputs[key] || ''} onChange={e => set(key, e.target.value)} step="any" placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
    </div>
  )

  const renderInputs = () => {
    switch (mode) {
      case 'magnification': return <div className="grid grid-cols-2 gap-3">{field('eyepiece', 'Eyepiece (default 10×)', '10')}{field('objective', 'Objective lens power', '40')}</div>
      case 'fov': return <div className="grid grid-cols-3 gap-3">{field('fovLow', 'Known FOV (mm)', '4.5')}{field('magLow', 'At magnification', '40')}{field('magHigh', 'New magnification', '400')}</div>
      case 'actualSize': return <div className="grid grid-cols-2 gap-3">{field('imageSize', 'Image size (mm)', '50')}{field('magAS', 'Magnification', '400')}</div>
      case 'scaleBar': return <div className="grid grid-cols-3 gap-3">{field('barLength', 'Scale bar in image (mm)', '20')}{field('barValue', 'Scale bar value (μm)', '10')}{field('specimenLength', 'Specimen in image (mm)', '45')}</div>
      case 'resolution': return <div className="grid grid-cols-2 gap-3">{field('wavelength', 'Wavelength (nm)', '550')}{field('na', 'Numerical Aperture', '1.4')}</div>
      default: return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Microscopy Calculator</h3>
        <div className="flex flex-wrap gap-2">
          {modes.map(m => (
            <button key={m.k} onClick={() => { setMode(m.k); setInputs({}) }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${mode === m.k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
              {m.l}
            </button>
          ))}
        </div>
        {renderInputs()}
      </div>

      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Results</h4>
          <div className="space-y-2">
            {results.rows.map((r, i) => (
              <div key={i} className={`flex justify-between items-center px-3 py-2 rounded-lg ${r.highlight ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-purple-50 dark:bg-purple-900/20'}`}>
                <span className="text-sm text-gray-600 dark:text-gray-400">{r.l}</span>
                <span className={`font-mono text-sm ${r.highlight ? 'font-bold text-purple-700 dark:text-purple-300' : 'font-bold text-gray-900 dark:text-gray-100'}`}>{r.v}</span>
              </div>
            ))}
          </div>
          {results.formula && (
            <div className="text-xs bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-gray-500 dark:text-gray-400 font-mono">{results.formula}</div>
          )}

          {results.table && mode === 'magnification' && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 mb-2">Common Objective Lenses</h4>
              <div className="grid grid-cols-4 gap-2">
                {results.table.map(t => (
                  <div key={t.obj} className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-center text-sm">
                    <div className="text-xs text-gray-500">{t.label}</div>
                    <div className="font-mono font-bold text-gray-900 dark:text-gray-100">{t.obj}</div>
                    <div className="text-xs text-purple-600 dark:text-purple-400">= {t.total}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.table && mode === 'resolution' && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 mb-2">Microscope Comparison</h4>
              <table className="w-full text-sm">
                <thead><tr className="border-b dark:border-gray-700">
                  <th className="text-left py-1 text-gray-600 dark:text-gray-400">Type</th>
                  <th className="text-left py-1 text-gray-600 dark:text-gray-400">λ</th>
                  <th className="text-left py-1 text-gray-600 dark:text-gray-400">NA</th>
                  <th className="text-left py-1 text-gray-600 dark:text-gray-400">Resolution</th>
                </tr></thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  {results.table.map(t => (
                    <tr key={t.type} className="border-b dark:border-gray-700">
                      <td className="py-1">{t.type}</td>
                      <td className="py-1 font-mono">{t.wavelength}</td>
                      <td className="py-1 font-mono">{t.na}</td>
                      <td className="py-1 font-mono">{t.res}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
