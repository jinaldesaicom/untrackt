import { useState, useCallback } from 'react'
import { Copy, Check, RefreshCw, Plus, Trash2 } from 'lucide-react'

export default function MatrixCalculator() {
  const [rowsA, setRowsA] = useState(2)
  const [colsA, setColsA] = useState(2)
  const [rowsB, setRowsB] = useState(2)
  const [colsB, setColsB] = useState(2)
  const [matA, setMatA] = useState(() => Array.from({ length: 2 }, () => Array(2).fill(0)))
  const [matB, setMatB] = useState(() => Array.from({ length: 2 }, () => Array(2).fill(0)))
  const [result, setResult] = useState(null)
  const [steps, setSteps] = useState([])
  const [operation, setOperation] = useState('add')
  const [copied, setCopied] = useState(false)

  const resizeMatrix = (mat, r, c) => {
    const m = []
    for (let i = 0; i < r; i++) {
      m[i] = []
      for (let j = 0; j < c; j++) {
        m[i][j] = (mat[i] && mat[i][j] !== undefined) ? mat[i][j] : 0
      }
    }
    return m
  }

  const updateDimA = (r, c) => {
    setRowsA(r); setColsA(c)
    setMatA(resizeMatrix(matA, r, c))
  }
  const updateDimB = (r, c) => {
    setRowsB(r); setColsB(c)
    setMatB(resizeMatrix(matB, r, c))
  }

  const setCell = (which, i, j, val) => {
    const num = val === '' || val === '-' ? val : parseFloat(val)
    if (which === 'A') {
      const copy = matA.map(row => [...row])
      copy[i][j] = isNaN(num) ? 0 : num
      setMatA(copy)
    } else {
      const copy = matB.map(row => [...row])
      copy[i][j] = isNaN(num) ? 0 : num
      setMatB(copy)
    }
  }

  const matToNum = (mat) => mat.map(row => row.map(v => typeof v === 'string' ? (parseFloat(v) || 0) : v))

  const addMatrices = (a, b) => a.map((row, i) => row.map((v, j) => v + b[i][j]))
  const subMatrices = (a, b) => a.map((row, i) => row.map((v, j) => v - b[i][j]))

  const mulMatrices = (a, b) => {
    const r = a.length, c = b[0].length, n = a[0].length
    const res = Array.from({ length: r }, () => Array(c).fill(0))
    for (let i = 0; i < r; i++)
      for (let j = 0; j < c; j++)
        for (let k = 0; k < n; k++)
          res[i][j] += a[i][k] * b[k][j]
    return res
  }

  const transpose = (m) => m[0].map((_, j) => m.map(row => row[j]))

  const determinant = (m) => {
    const n = m.length
    if (n === 1) return m[0][0]
    if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0]
    let det = 0
    for (let j = 0; j < n; j++) {
      const sub = m.slice(1).map(row => [...row.slice(0, j), ...row.slice(j + 1)])
      det += (j % 2 === 0 ? 1 : -1) * m[0][j] * determinant(sub)
    }
    return det
  }

  const cofactorMatrix = (m) => {
    const n = m.length
    return m.map((row, i) => row.map((_, j) => {
      const sub = m.filter((_, ri) => ri !== i).map(r => r.filter((_, ci) => ci !== j))
      return ((i + j) % 2 === 0 ? 1 : -1) * determinant(sub)
    }))
  }

  const inverse = (m) => {
    const det = determinant(m)
    if (Math.abs(det) < 1e-12) return null
    const cof = cofactorMatrix(m)
    const adj = transpose(cof)
    return adj.map(row => row.map(v => v / det))
  }

  const formatNum = (n) => {
    if (Number.isInteger(n)) return String(n)
    return n.toFixed(4).replace(/\.?0+$/, '')
  }

  const formatMatrix = (m) => m.map(row => row.map(formatNum).join('\t')).join('\n')

  const calculate = useCallback(() => {
    const a = matToNum(matA)
    const b = matToNum(matB)
    const s = []
    let res = null

    try {
      switch (operation) {
        case 'add':
          if (rowsA !== rowsB || colsA !== colsB) { s.push('Error: Matrices must have same dimensions for addition.'); break }
          s.push(`A + B: Add corresponding elements.`)
          a.forEach((row, i) => s.push(`Row ${i + 1}: [${row.map((v, j) => `${formatNum(v)} + ${formatNum(b[i][j])} = ${formatNum(v + b[i][j])}`).join(', ')}]`))
          res = addMatrices(a, b)
          break
        case 'subtract':
          if (rowsA !== rowsB || colsA !== colsB) { s.push('Error: Matrices must have same dimensions for subtraction.'); break }
          s.push(`A − B: Subtract corresponding elements.`)
          a.forEach((row, i) => s.push(`Row ${i + 1}: [${row.map((v, j) => `${formatNum(v)} − ${formatNum(b[i][j])} = ${formatNum(v - b[i][j])}`).join(', ')}]`))
          res = subMatrices(a, b)
          break
        case 'multiply':
          if (colsA !== rowsB) { s.push('Error: Columns of A must equal rows of B for multiplication.'); break }
          s.push(`A × B: (${rowsA}×${colsA}) × (${rowsB}×${colsB}) → (${rowsA}×${colsB})`)
          res = mulMatrices(a, b)
          res.forEach((row, i) => {
            row.forEach((v, j) => {
              const terms = a[i].map((ak, k) => `${formatNum(ak)}×${formatNum(b[k][j])}`).join(' + ')
              s.push(`C[${i + 1}][${j + 1}] = ${terms} = ${formatNum(v)}`)
            })
          })
          break
        case 'determinant': {
          if (rowsA !== colsA) { s.push('Error: Matrix must be square for determinant.'); break }
          const det = determinant(a)
          s.push(`det(A) using cofactor expansion along first row:`)
          if (rowsA === 2) s.push(`= ${formatNum(a[0][0])}×${formatNum(a[1][1])} − ${formatNum(a[0][1])}×${formatNum(a[1][0])}`)
          else a[0].forEach((v, j) => {
            const sign = j % 2 === 0 ? '+' : '−'
            const sub = a.slice(1).map(row => [...row.slice(0, j), ...row.slice(j + 1)])
            s.push(`${sign} ${formatNum(v)} × M[1][${j + 1}] (det of minor = ${formatNum(determinant(sub))})`)
          })
          s.push(`Determinant = ${formatNum(det)}`)
          res = [[det]]
          break
        }
        case 'inverse': {
          if (rowsA !== colsA) { s.push('Error: Matrix must be square for inverse.'); break }
          const det = determinant(a)
          s.push(`Step 1: det(A) = ${formatNum(det)}`)
          if (Math.abs(det) < 1e-12) { s.push('Matrix is singular (det = 0), no inverse exists.'); break }
          s.push('Step 2: Find cofactor matrix')
          s.push('Step 3: Transpose cofactor matrix to get adjugate')
          s.push(`Step 4: Multiply adjugate by 1/det = ${formatNum(1 / det)}`)
          res = inverse(a)
          break
        }
        case 'transpose':
          s.push('Transpose: Swap rows and columns.')
          res = transpose(a)
          s.push(`Original: ${rowsA}×${colsA} → Transposed: ${colsA}×${rowsA}`)
          break
      }
    } catch (e) {
      s.push('Calculation error: ' + e.message)
    }
    setSteps(s)
    setResult(res)
  }, [matA, matB, rowsA, colsA, rowsB, colsB, operation])

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(formatMatrix(result))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const reset = () => {
    setMatA(Array.from({ length: 2 }, () => Array(2).fill(0)))
    setMatB(Array.from({ length: 2 }, () => Array(2).fill(0)))
    setRowsA(2); setColsA(2); setRowsB(2); setColsB(2)
    setResult(null); setSteps([])
  }

  const needsB = ['add', 'subtract', 'multiply'].includes(operation)

  const renderMatrixInput = (which, mat, rows, cols, updateDim) => (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">Matrix {which}</span>
        <select value={rows} onChange={e => updateDim(+e.target.value, cols)} className="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
          {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <span className="text-gray-500 dark:text-gray-400">×</span>
        <select value={cols} onChange={e => updateDim(rows, +e.target.value)} className="border rounded px-2 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
          {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="inline-block border-l-2 border-r-2 border-gray-400 dark:border-gray-500 px-2 py-1 rounded">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-1 mb-1">
            {Array.from({ length: cols }).map((_, j) => (
              <input key={j} type="number" value={mat[i]?.[j] ?? 0}
                onChange={e => setCell(which, i, j, e.target.value)}
                className="w-16 text-center border rounded px-1 py-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {['add', 'subtract', 'multiply', 'determinant', 'inverse', 'transpose'].map(op => (
          <button key={op} onClick={() => { setOperation(op); setResult(null); setSteps([]) }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${operation === op ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            {op === 'add' ? 'A + B' : op === 'subtract' ? 'A − B' : op === 'multiply' ? 'A × B' : op.charAt(0).toUpperCase() + op.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {renderMatrixInput('A', matA, rowsA, colsA, updateDimA)}
        {needsB && renderMatrixInput('B', matB, rowsB, colsB, updateDimB)}
      </div>

      <div className="flex gap-3">
        <button onClick={calculate} className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium">Calculate</button>
        <button onClick={reset} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-1">
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {steps.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Step-by-Step</h3>
          {steps.map((s, i) => <p key={i} className="text-sm text-blue-700 dark:text-blue-400 font-mono">{s}</p>)}
        </div>
      )}

      {result && (
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Result</h3>
            <button onClick={handleCopy} className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 transition">
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="inline-block border-l-2 border-r-2 border-gray-400 dark:border-gray-500 px-3 py-2 rounded font-mono">
            {result.map((row, i) => (
              <div key={i} className="flex gap-4">
                {row.map((v, j) => <span key={j} className="w-20 text-center text-gray-800 dark:text-gray-200">{formatNum(v)}</span>)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
