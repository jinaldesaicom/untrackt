import { useState, useMemo } from 'react'

const codonTable = {
  'UUU':'Phe','UUC':'Phe','UUA':'Leu','UUG':'Leu',
  'CUU':'Leu','CUC':'Leu','CUA':'Leu','CUG':'Leu',
  'AUU':'Ile','AUC':'Ile','AUA':'Ile','AUG':'Met',
  'GUU':'Val','GUC':'Val','GUA':'Val','GUG':'Val',
  'UCU':'Ser','UCC':'Ser','UCA':'Ser','UCG':'Ser',
  'CCU':'Pro','CCC':'Pro','CCA':'Pro','CCG':'Pro',
  'ACU':'Thr','ACC':'Thr','ACA':'Thr','ACG':'Thr',
  'GCU':'Ala','GCC':'Ala','GCA':'Ala','GCG':'Ala',
  'UAU':'Tyr','UAC':'Tyr','UAA':'Stop','UAG':'Stop',
  'UGU':'Cys','UGC':'Cys','UGA':'Stop','UGG':'Trp',
  'CAU':'His','CAC':'His','CAA':'Gln','CAG':'Gln',
  'CGU':'Arg','CGC':'Arg','CGA':'Arg','CGG':'Arg',
  'AAU':'Asn','AAC':'Asn','AAA':'Lys','AAG':'Lys',
  'AGU':'Ser','AGC':'Ser','AGA':'Arg','AGG':'Arg',
  'GAU':'Asp','GAC':'Asp','GAA':'Glu','GAG':'Glu',
  'GGU':'Gly','GGC':'Gly','GGA':'Gly','GGG':'Gly',
}

const complement = { A: 'T', T: 'A', G: 'C', C: 'G' }
const rnaComplement = { A: 'U', T: 'A', G: 'C', C: 'G' }

export default function DnaRnaTools() {
  const [mode, setMode] = useState('transcribe')
  const [seq, setSeq] = useState('ATGCGATCGATCG')

  const clean = useMemo(() => seq.toUpperCase().replace(/[^ATGCU]/g, ''), [seq])

  const transcription = useMemo(() => {
    if (!clean) return null
    const isRna = clean.includes('U')
    const dna = isRna ? clean.replace(/U/g, 'T') : clean
    const compStrand = dna.split('').map(b => complement[b] || '').join('')
    const mRNA = dna.split('').map(b => rnaComplement[b] || '').join('')
    return { dna, compStrand, mRNA }
  }, [clean])

  const translation = useMemo(() => {
    if (!clean) return null
    let rna = clean.includes('U') ? clean : clean.split('').map(b => rnaComplement[b] || '').join('')
    const startIdx = rna.indexOf('AUG')
    if (startIdx === -1) return { protein: '', codons: [], error: 'No start codon (AUG) found' }
    rna = rna.slice(startIdx)
    const codons = []
    const protein = []
    for (let i = 0; i + 2 < rna.length; i += 3) {
      const codon = rna.slice(i, i + 3)
      if (codon.length < 3) break
      const aa = codonTable[codon] || '?'
      codons.push({ codon, aa })
      if (aa === 'Stop') break
      protein.push(aa)
    }
    return { protein: protein.join('-'), codons, error: null }
  }, [clean])

  const stats = useMemo(() => {
    if (!clean) return null
    const dna = clean.replace(/U/g, 'T')
    const counts = { A: 0, T: 0, G: 0, C: 0 }
    for (const b of dna) if (counts[b] !== undefined) counts[b]++
    const total = Object.values(counts).reduce((a, b) => a + b, 0)
    const gc = total > 0 ? ((counts.G + counts.C) / total * 100) : 0
    const at = total > 0 ? ((counts.A + counts.T) / total * 100) : 0
    const mw = total * 330 // avg daltons per nucleotide
    return { counts, total, gc, at, mw }
  }, [clean])

  const modes = [
    { k: 'transcribe', l: 'Transcription' },
    { k: 'translate', l: 'Translation' },
    { k: 'stats', l: 'Sequence Stats' },
    { k: 'codonTable', l: 'Codon Table' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap gap-2">
        {modes.map(m => (
          <button key={m.k} onClick={() => setMode(m.k)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m.k ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
            {m.l}
          </button>
        ))}
      </div>

      {mode !== 'codonTable' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">DNA or RNA Sequence</label>
          <textarea value={seq} onChange={e => setSeq(e.target.value)} rows={3} placeholder="ATGCGATCGATCG..."
            className="w-full border rounded-lg px-3 py-2 text-sm font-mono dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
          <div className="flex gap-2 mt-2">
            {['ATGAAAGCTTGA', 'ATGCGATCGATCG', 'ATGTTTGGGCCCTGA'].map((ex, i) => (
              <button key={i} onClick={() => setSeq(ex)} className="px-2 py-1 text-xs rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                Example {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === 'transcribe' && transcription && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Transcription Results</h3>
          {[
            { l: "5' → 3' DNA (Template)", v: transcription.dna, c: 'text-blue-700 dark:text-blue-400' },
            { l: "3' → 5' DNA (Complement)", v: transcription.compStrand, c: 'text-green-700 dark:text-green-400' },
            { l: "5' → 3' mRNA", v: transcription.mRNA, c: 'text-red-700 dark:text-red-400' },
          ].map(r => (
            <div key={r.l} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{r.l}</div>
              <div className={`font-mono text-sm break-all ${r.c}`}>{r.v}</div>
            </div>
          ))}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            DNA → mRNA: A→U, T→A, G→C, C→G
          </div>
        </div>
      )}

      {mode === 'translate' && translation && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Translation Results</h3>
          {translation.error ? (
            <div className="text-red-600 dark:text-red-400 text-sm">{translation.error}</div>
          ) : (
            <>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Protein Sequence</div>
                <div className="font-mono text-sm text-purple-700 dark:text-purple-400 break-all">{translation.protein}</div>
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Codon Breakdown</div>
              <div className="flex flex-wrap gap-1">
                {translation.codons.map((c, i) => (
                  <div key={i} className={`px-2 py-1 rounded text-xs font-mono text-center ${c.aa === 'Stop' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' : c.aa === 'Met' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-purple-50 dark:bg-purple-900/20 text-gray-700 dark:text-gray-300'}`}>
                    <div>{c.codon}</div>
                    <div className="font-bold">{c.aa}</div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {translation.codons.length} codons | {translation.codons.filter(c => c.aa !== 'Stop').length} amino acids
              </div>
            </>
          )}
        </div>
      )}

      {mode === 'stats' && stats && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sequence Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(stats.counts).map(([base, count]) => {
              const colors = { A: 'text-green-600', T: 'text-red-600', G: 'text-yellow-600', C: 'text-blue-600' }
              return (
                <div key={base} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center">
                  <div className={`text-2xl font-bold font-mono ${colors[base]}`}>{base}</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{count}</div>
                  <div className="text-xs text-gray-500">{stats.total > 0 ? (count / stats.total * 100).toFixed(1) : 0}%</div>
                </div>
              )
            })}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { l: 'Total Length', v: `${stats.total} bp` },
              { l: 'GC Content', v: `${stats.gc.toFixed(1)}%` },
              { l: 'AT Content', v: `${stats.at.toFixed(1)}%` },
              { l: 'Est. MW', v: `${(stats.mw / 1000).toFixed(1)} kDa` },
            ].map(r => (
              <div key={r.l} className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.l}</div>
                <div className="font-mono font-bold text-gray-900 dark:text-gray-100">{r.v}</div>
              </div>
            ))}
          </div>
          <div className="h-4 rounded-full overflow-hidden flex">
            <div className="bg-green-500" style={{ width: `${stats.total > 0 ? stats.counts.A / stats.total * 100 : 0}%` }} title={`A: ${stats.counts.A}`}></div>
            <div className="bg-red-500" style={{ width: `${stats.total > 0 ? stats.counts.T / stats.total * 100 : 0}%` }} title={`T: ${stats.counts.T}`}></div>
            <div className="bg-yellow-500" style={{ width: `${stats.total > 0 ? stats.counts.G / stats.total * 100 : 0}%` }} title={`G: ${stats.counts.G}`}></div>
            <div className="bg-blue-500" style={{ width: `${stats.total > 0 ? stats.counts.C / stats.total * 100 : 0}%` }} title={`C: ${stats.counts.C}`}></div>
          </div>
        </div>
      )}

      {mode === 'codonTable' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">RNA Codon Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-1 text-gray-600 dark:text-gray-400">1st</th>
                  {['U', 'C', 'A', 'G'].map(b => <th key={b} className="text-center py-1 text-gray-600 dark:text-gray-400" colSpan={4}>{b}</th>)}
                  <th className="text-left py-1 text-gray-600 dark:text-gray-400">3rd</th>
                </tr>
              </thead>
              <tbody>
                {['U', 'C', 'A', 'G'].map(first => (
                  ['U', 'C', 'A', 'G'].map((third, ti) => (
                    <tr key={first + third} className="border-b dark:border-gray-700">
                      {ti === 0 && <td rowSpan={4} className="font-mono font-bold text-purple-700 dark:text-purple-400 pr-2 text-center">{first}</td>}
                      {['U', 'C', 'A', 'G'].map(second => {
                        const codon = first + second + third
                        const aa = codonTable[codon]
                        const bgColor = aa === 'Stop' ? 'bg-red-50 dark:bg-red-900/20' : aa === 'Met' ? 'bg-green-50 dark:bg-green-900/20' : ''
                        return (
                          <td key={codon} className={`px-1 py-0.5 font-mono text-center ${bgColor}`}>
                            <span className="text-gray-500">{codon}</span>{' '}
                            <span className="font-bold text-gray-900 dark:text-gray-100">{aa}</span>
                          </td>
                        )
                      })}
                      <td className="font-mono text-gray-500 pl-2 text-center">{third}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="bg-green-50 dark:bg-green-900/20 px-1 rounded">AUG = Met (Start)</span>{' '}
            <span className="bg-red-50 dark:bg-red-900/20 px-1 rounded">UAA, UAG, UGA = Stop</span>
          </div>
        </div>
      )}
    </div>
  )
}
