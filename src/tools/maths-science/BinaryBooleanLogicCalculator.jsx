import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function BinaryBooleanLogicCalculator() {
  const [tab, setTab] = useState('converter')
  const [decInput, setDecInput] = useState('')
  const [binInput, setBinInput] = useState('')
  const [hexInput, setHexInput] = useState('')
  const [octInput, setOctInput] = useState('')
  const [boolVars, setBoolVars] = useState('2')
  const [boolExpr, setBoolExpr] = useState('')
  const [truthTable, setTruthTable] = useState(null)
  const [gateA, setGateA] = useState('0')
  const [gateB, setGateB] = useState('0')
  const [bitwiseA, setBitwiseA] = useState('')
  const [bitwiseB, setBitwiseB] = useState('')
  const [bitwiseOp, setBitwiseOp] = useState('AND')
  const [bitwiseResult, setBitwiseResult] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleDecChange = (v) => {
    setDecInput(v)
    const n = parseInt(v, 10)
    if (!isNaN(n) && n >= 0) { setBinInput(n.toString(2)); setHexInput(n.toString(16).toUpperCase()); setOctInput(n.toString(8)) }
    else { setBinInput(''); setHexInput(''); setOctInput('') }
  }
  const handleBinChange = (v) => {
    setBinInput(v)
    if (/^[01]+$/.test(v)) { const n = parseInt(v, 2); setDecInput(n.toString()); setHexInput(n.toString(16).toUpperCase()); setOctInput(n.toString(8)) }
    else { setDecInput(''); setHexInput(''); setOctInput('') }
  }
  const handleHexChange = (v) => {
    setHexInput(v)
    if (/^[0-9a-fA-F]+$/.test(v)) { const n = parseInt(v, 16); setDecInput(n.toString()); setBinInput(n.toString(2)); setOctInput(n.toString(8)) }
    else { setDecInput(''); setBinInput(''); setOctInput('') }
  }
  const handleOctChange = (v) => {
    setOctInput(v)
    if (/^[0-7]+$/.test(v)) { const n = parseInt(v, 8); setDecInput(n.toString()); setBinInput(n.toString(2)); setHexInput(n.toString(16).toUpperCase()) }
    else { setDecInput(''); setBinInput(''); setHexInput('') }
  }

  const generateTruthTable = () => {
    const nv = parseInt(boolVars) || 2
    if (nv < 1 || nv > 5) return
    const varNames = Array.from({ length: nv }, (_, i) => String.fromCharCode(65 + i))
    const rows = Math.pow(2, nv)
    const table = []

    for (let r = 0; r < rows; r++) {
      const vals = {}
      varNames.forEach((v, i) => { vals[v] = (r >> (nv - 1 - i)) & 1 })
      let result = null
      if (boolExpr.trim()) {
        try {
          let expr = boolExpr.toUpperCase()
            .replace(/\bAND\b/g, '&&').replace(/\bOR\b/g, '||').replace(/\bNOT\b/g, '!')
            .replace(/\bXOR\b/g, '^').replace(/\bNAND\b/g, 'NAND_').replace(/\bNOR\b/g, 'NOR_')
            .replace(/·/g, '&&').replace(/\+/g, '||').replace(/⊕/g, '^')
          varNames.forEach(v => { expr = expr.replace(new RegExp(`\\b${v}\\b`, 'g'), vals[v]) })
          if (expr.includes('NAND_') || expr.includes('NOR_')) {
            expr = expr.replace(/(\d)\s*NAND_\s*(\d)/g, '(($1&&$2)?0:1)')
            expr = expr.replace(/(\d)\s*NOR_\s*(\d)/g, '(($1||$2)?0:1)')
          }
          const ev = new Function(`"use strict"; return (${expr}) ? 1 : 0`)
          result = ev()
        } catch { result = '?' }
      }
      table.push({ vals, result })
    }
    setTruthTable({ varNames, table })
  }

  const gates = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    NOT: (a) => a ? 0 : 1,
    NAND: (a, b) => (a & b) ? 0 : 1,
    NOR: (a, b) => (a | b) ? 0 : 1,
    XOR: (a, b) => a ^ b,
    XNOR: (a, b) => (a ^ b) ? 0 : 1,
  }

  const calcBitwise = () => {
    const a = parseInt(bitwiseA, 10)
    const b = parseInt(bitwiseB, 10)
    if (isNaN(a) || isNaN(b)) { setBitwiseResult('Enter valid integers'); return }
    const ops = {
      AND: a & b, OR: a | b, XOR: a ^ b, NOT_A: ~a, NOT_B: ~b,
      'Left Shift A': a << 1, 'Right Shift A': a >> 1,
    }
    let text = `A = ${a} (${(a >>> 0).toString(2)})\nB = ${b} (${(b >>> 0).toString(2)})\n\n`
    Object.entries(ops).forEach(([op, val]) => {
      text += `${op}: ${val} (${(val >>> 0).toString(2)})\n`
    })
    setBitwiseResult(text)
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {[['converter', 'Number Converter'], ['truth', 'Truth Table'], ['gates', 'Logic Gates'], ['bitwise', 'Bitwise Ops']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${tab === k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'converter' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Base Converter</h3>
          {[['Decimal', decInput, handleDecChange, '42'], ['Binary', binInput, handleBinChange, '101010'], ['Hexadecimal', hexInput, handleHexChange, '2A'], ['Octal', octInput, handleOctChange, '52']].map(([label, val, fn, ph]) => (
            <div key={label}>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
              <input value={val} onChange={e => fn(e.target.value)} placeholder={ph}
                className="w-full border rounded-lg px-3 py-2 font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          ))}
          {decInput && !isNaN(parseInt(decInput)) && (
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3 text-sm">
              <p className="font-medium text-purple-700 dark:text-purple-400">8-bit binary: {parseInt(decInput, 10) >= 0 && parseInt(decInput, 10) <= 255 ? parseInt(decInput, 10).toString(2).padStart(8, '0') : 'N/A (0-255)'}</p>
              <p className="text-purple-600 dark:text-purple-300 mt-1">16-bit binary: {parseInt(decInput, 10) >= 0 && parseInt(decInput, 10) <= 65535 ? parseInt(decInput, 10).toString(2).padStart(16, '0') : 'N/A (0-65535)'}</p>
            </div>
          )}
        </div>
      )}

      {tab === 'truth' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Truth Table Generator</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Use A, B, C... for variables. Operators: AND, OR, NOT, XOR, NAND, NOR. Symbols: · + ⊕ !</p>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Variables (1-5)</label>
              <select value={boolVars} onChange={e => setBoolVars(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Expression</label>
              <input value={boolExpr} onChange={e => setBoolExpr(e.target.value)} placeholder="A AND B"
                className="w-full border rounded-lg px-3 py-2 font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={generateTruthTable} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Generate</button>
          {truthTable && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    {truthTable.varNames.map(v => <th key={v} className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">{v}</th>)}
                    {boolExpr && <th className="px-4 py-2 border border-gray-200 dark:border-gray-600 text-purple-700 dark:text-purple-400">Result</th>}
                  </tr>
                </thead>
                <tbody>
                  {truthTable.table.map((row, i) => (
                    <tr key={i}>
                      {truthTable.varNames.map(v => (
                        <td key={v} className={`px-4 py-1.5 border border-gray-200 dark:border-gray-600 text-center font-mono ${row.vals[v] ? 'text-green-600 dark:text-green-400 font-bold' : 'text-gray-400'}`}>
                          {row.vals[v]}
                        </td>
                      ))}
                      {boolExpr && (
                        <td className={`px-4 py-1.5 border border-gray-200 dark:border-gray-600 text-center font-mono font-bold ${row.result === 1 ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : row.result === 0 ? 'text-red-500' : 'text-gray-400'}`}>
                          {row.result}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'gates' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Logic Gate Reference</h3>
          <div className="flex gap-4 items-center mb-4">
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              A: <select value={gateA} onChange={e => setGateA(e.target.value)} className="border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                <option value="0">0</option><option value="1">1</option>
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              B: <select value={gateB} onChange={e => setGateB(e.target.value)} className="border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                <option value="0">0</option><option value="1">1</option>
              </select>
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(gates).map(([name, fn]) => {
              const a = parseInt(gateA), b = parseInt(gateB)
              const result = name === 'NOT' ? fn(a) : fn(a, b)
              return (
                <div key={name} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div>
                    <span className="font-mono font-bold text-gray-800 dark:text-gray-200">{name}</span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {name === 'NOT' ? `NOT(${a})` : `${a} ${name} ${b}`}
                    </span>
                  </div>
                  <span className={`font-mono text-lg font-bold ${result ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>{result}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gate Symbols</h4>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              {[['AND', '∧'], ['OR', '∨'], ['NOT', '¬'], ['XOR', '⊕'], ['NAND', '⊼'], ['NOR', '⊽'], ['XNOR', '⊙'], ['IMPLY', '→']].map(([n, s]) => (
                <div key={n} className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                  <span className="text-xl font-mono text-purple-600 dark:text-purple-400">{s}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{n}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'bitwise' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Bitwise Operations</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Integer A</label>
              <input type="number" value={bitwiseA} onChange={e => setBitwiseA(e.target.value)} placeholder="42"
                className="w-full border rounded-lg px-3 py-2 font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Integer B</label>
              <input type="number" value={bitwiseB} onChange={e => setBitwiseB(e.target.value)} placeholder="27"
                className="w-full border rounded-lg px-3 py-2 font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            </div>
          </div>
          <button onClick={calcBitwise} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
          {bitwiseResult && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <pre className="font-mono text-sm text-green-700 dark:text-green-400 whitespace-pre-wrap">{bitwiseResult}</pre>
                <button onClick={() => handleCopy(bitwiseResult)} className="ml-2 p-1 rounded hover:bg-green-100 dark:hover:bg-green-800/30 transition">
                  {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-gray-400" />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
