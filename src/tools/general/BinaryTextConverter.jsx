import { useMemo, useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { ToolLayout, Panel, SegmentedToggle, FieldLabel } from '../../components/ToolLayout.jsx'

const MORSE = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', '/': '-..-.', '-': '-....-', '(': '-.--.', ')': '-.--.-', ' ': '/',
}
const MORSE_REVERSE = Object.fromEntries(Object.entries(MORSE).map(([key, value]) => [value, key]))

function textToBinary(text, bitMode, withSpaces) {
  const width = bitMode === '7' ? 7 : 8
  const bytes = Array.from(text).map((character) => character.charCodeAt(0).toString(2).padStart(width, '0'))
  return withSpaces ? bytes.join(' ') : bytes.join('')
}

function binaryToText(binary, bitMode) {
  const width = bitMode === '7' ? 7 : 8
  const clean = binary.replace(/\s+/g, '')
  const bytes = clean.match(new RegExp(`.{1,${width}}`, 'g')) || []
  return bytes.map((byte) => String.fromCharCode(Number.parseInt(byte, 2))).join('')
}

export default function BinaryTextConverter() {
  const [tab, setTab] = useState('binary')
  const [direction, setDirection] = useState('encode')
  const [input, setInput] = useState('Hello world')
  const [bitMode, setBitMode] = useState('8')
  const [withSpaces, setWithSpaces] = useState(true)
  const [hexCase, setHexCase] = useState('lower')
  const [asciiFormat, setAsciiFormat] = useState('decimal')
  const [morseSpeed, setMorseSpeed] = useState(18)

  const output = useMemo(() => {
    if (tab === 'binary') return direction === 'encode' ? textToBinary(input, bitMode, withSpaces) : binaryToText(input, bitMode)
    if (tab === 'morse') return direction === 'encode'
      ? input.toUpperCase().split('').map((character) => MORSE[character] || '').join(' ')
      : input.trim().split(' ').map((code) => MORSE_REVERSE[code] || '').join('')
    if (tab === 'hex') return direction === 'encode'
      ? Array.from(input).map((character) => character.charCodeAt(0).toString(16).padStart(2, '0'))[hexCase === 'upper' ? 'map' : 'map']((value) => hexCase === 'upper' ? value.toUpperCase() : value).join(' ')
      : input.trim().split(/\s+/).map((value) => String.fromCharCode(Number.parseInt(value, 16))).join('')
    return direction === 'encode'
      ? Array.from(input).map((character) => asciiFormat === 'decimal' ? character.charCodeAt(0) : character.charCodeAt(0).toString(16).toUpperCase()).join(' ')
      : input.trim().split(/\s+/).map((value) => String.fromCharCode(Number.parseInt(value, asciiFormat === 'decimal' ? 10 : 16))).join('')
  }, [tab, direction, input, bitMode, withSpaces, hexCase, asciiFormat])

  const playMorse = async () => {
    const audio = new AudioContext()
    const unit = 1200 / morseSpeed
    const sequence = direction === 'encode' ? output : input
    let currentTime = audio.currentTime

    for (const symbol of sequence) {
      if (symbol === '.') {
        const oscillator = audio.createOscillator()
        const gain = audio.createGain()
        oscillator.connect(gain)
        gain.connect(audio.destination)
        oscillator.start(currentTime)
        oscillator.stop(currentTime + unit / 1000)
        currentTime += unit / 1000 * 2
      } else if (symbol === '-') {
        const oscillator = audio.createOscillator()
        const gain = audio.createGain()
        oscillator.connect(gain)
        gain.connect(audio.destination)
        oscillator.start(currentTime)
        oscillator.stop(currentTime + (unit * 3) / 1000)
        currentTime += (unit * 4) / 1000
      } else {
        currentTime += (unit * 2) / 1000
      }
    }
  }

  return (
    <ToolLayout
      title="Binary Text Converter"
      description="Convert between text, binary, Morse code, hex, and ASCII codes with copy tools and Morse playback."
      path="/tools/binary-text-converter"
    >
      <Panel>
        <SegmentedToggle options={[{ label: 'Binary', value: 'binary' }, { label: 'Morse', value: 'morse' }, { label: 'Hex', value: 'hex' }, { label: 'ASCII', value: 'ascii' }]} value={tab} onChange={setTab} className="flex-wrap" />
      </Panel>

      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <Panel>
          <div className="space-y-4">
            <SegmentedToggle options={[{ label: 'Text → code', value: 'encode' }, { label: 'Code → text', value: 'decode' }]} value={direction} onChange={setDirection} />
            {tab === 'binary' && (
              <div className="flex flex-wrap gap-2">
                <SegmentedToggle options={[{ label: '8-bit', value: '8' }, { label: '7-bit', value: '7' }]} value={bitMode} onChange={setBitMode} />
                <button type="button" className={`btn-secondary ${withSpaces ? '!bg-indigo-600 !text-white' : ''}`} onClick={() => setWithSpaces((current) => !current)}>Space between bytes</button>
              </div>
            )}
            {tab === 'hex' && <SegmentedToggle options={[{ label: 'Lowercase', value: 'lower' }, { label: 'Uppercase', value: 'upper' }]} value={hexCase} onChange={setHexCase} />}
            {tab === 'ascii' && <SegmentedToggle options={[{ label: 'Decimal', value: 'decimal' }, { label: 'Hex', value: 'hex' }]} value={asciiFormat} onChange={setAsciiFormat} />}
            {tab === 'morse' && (
              <div>
                <FieldLabel helper={`${morseSpeed} WPM`}>Playback speed</FieldLabel>
                <input className="w-full accent-indigo-600" type="range" min="5" max="30" value={morseSpeed} onChange={(event) => setMorseSpeed(Number(event.target.value))} />
              </div>
            )}
            <textarea className="textarea-field min-h-[220px]" value={input} onChange={(event) => setInput(event.target.value)} />
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-gray-900 dark:text-gray-100">Output</p>
            <div className="flex gap-2">
              <CopyButton text={output} label="Copy" />
              {tab === 'morse' && <button type="button" className="btn-secondary" onClick={playMorse}>Play Morse</button>}
            </div>
          </div>
          <textarea className="textarea-field min-h-[320px] mt-4" readOnly value={output} />
        </Panel>
      </div>
    </ToolLayout>
  )
}