import { useEffect, useMemo, useState } from 'react'
import useStoredPreference from '../../hooks/useStoredPreference.js'
import { TYPING_WORDS } from '../../data/generalData.js'
import { ToolLayout, Panel, StatCard, SegmentedToggle } from '../../components/ToolLayout.jsx'

function getSample(mode) {
  if (mode === 'code') {
    return `const result = items
  .filter((item) => item.active)
  .map((item) => item.name)
  .join(', ')

function debounce(callback, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback(...args), delay)
  }
}

try {
  await navigator.clipboard.writeText(text)
} catch (error) {
  console.error(error)
}`
  }

  const words = TYPING_WORDS[mode]
  return Array.from({ length: 80 }, (_, index) => words[index % words.length]).join(' ')
}

function getRating(wpm) {
  if (wpm < 20) return 'Beginner'
  if (wpm < 40) return 'Average'
  if (wpm < 60) return 'Above average'
  if (wpm < 80) return 'Fast'
  if (wpm < 100) return 'Very fast'
  return 'Expert'
}

export default function TypingSpeedTest() {
  const [duration, setDuration] = useState(60)
  const [mode, setMode] = useState('normal')
  const [sample, setSample] = useState(() => getSample('normal'))
  const [typed, setTyped] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const [bestWpm, setBestWpm] = useStoredPreference('general:typingBestWpm', 0)

  useEffect(() => {
    if (!running) return undefined
    const intervalId = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setRunning(false)
          setFinished(true)
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [running])

  const metrics = useMemo(() => {
    const expected = sample.slice(0, typed.length)
    const correctChars = typed.split('').filter((character, index) => character === expected[index]).length
    const errors = Math.max(0, typed.length - correctChars)
    const elapsedMinutes = (duration - timeLeft) / 60 || duration / 60
    const wordsTyped = typed.trim().split(/\s+/).filter(Boolean)
    const correctWords = wordsTyped.filter((word, index) => word === sample.split(' ')[index]).length
    const wpm = elapsedMinutes > 0 ? Math.round((correctChars / 5) / elapsedMinutes) : 0
    const cpm = elapsedMinutes > 0 ? Math.round(correctChars / elapsedMinutes) : 0
    const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 100
    return { correctChars, errors, correctWords, wpm, cpm, accuracy }
  }, [typed, sample, duration, timeLeft])

  useEffect(() => {
    if (finished && metrics.wpm > bestWpm) {
      setBestWpm(metrics.wpm)
    }
  }, [finished, metrics.wpm, bestWpm, setBestWpm])

  const resetTest = (newMode = mode, newDuration = duration) => {
    setMode(newMode)
    setDuration(newDuration)
    setSample(getSample(newMode))
    setTyped('')
    setTimeLeft(newDuration)
    setRunning(false)
    setFinished(false)
  }

  const words = sample.split(' ')
  const typedWords = typed.split(' ')
  const codeLines = useMemo(() => (mode === 'code' ? sample.split('\n') : []), [mode, sample])
  const codeLineOffsets = useMemo(() => {
    if (mode !== 'code') return []
    let offset = 0
    return codeLines.map((line) => {
      const start = offset
      offset += line.length + 1
      return start
    })
  }, [mode, codeLines])

  return (
    <ToolLayout
      title="Typing Speed Test"
      description="Measure WPM, CPM, accuracy, and errors across beginner, normal, advanced, and code-focused typing tests."
      path="/tools/typing-speed-test"
    >
      <Panel>
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <SegmentedToggle options={[{ label: '30 sec', value: 30 }, { label: '1 min', value: 60 }, { label: '2 min', value: 120 }]} value={duration} onChange={(value) => resetTest(mode, value)} />
            <SegmentedToggle options={[{ label: 'Beginner', value: 'beginner' }, { label: 'Normal', value: 'normal' }, { label: 'Advanced', value: 'advanced' }, { label: 'Code', value: 'code' }]} value={mode} onChange={(value) => resetTest(value, duration)} className="flex-wrap" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Personal best: {bestWpm} WPM</p>
        </div>
      </Panel>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard label="Time left" value={`${timeLeft}s`} helper="Countdown" tone="indigo" />
          <StatCard label="WPM" value={metrics.wpm} helper="Words per minute" tone="blue" />
          <StatCard label="Accuracy" value={`${metrics.accuracy}%`} helper="Correct characters" tone="green" />
          <StatCard label="Correct words" value={metrics.correctWords} helper="Exact word matches" tone="amber" />
          <StatCard label="Errors" value={metrics.errors} helper="Mistyped characters" tone="rose" />
        </div>

        <Panel>
          {mode === 'code' ? (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                typing-practice.js
              </div>
              <div className="overflow-x-auto bg-gray-50 dark:bg-gray-900/60">
                <div className="min-w-full font-mono text-sm leading-6">
                  {codeLines.map((line, lineIndex) => (
                    <div key={lineIndex} className="flex">
                      <span className="w-12 shrink-0 px-3 text-right select-none text-gray-400 dark:text-gray-500 border-r border-gray-200 dark:border-gray-800">
                        {lineIndex + 1}
                      </span>
                      <span className="flex-1 px-3 text-left whitespace-pre">
                        {(line || ' ').split('').map((character, charIndex) => {
                          const typedCharacter = typed[codeLineOffsets[lineIndex] + charIndex]
                          const className = typedCharacter == null
                            ? 'text-gray-500 dark:text-gray-400'
                            : typedCharacter === character
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-rose-600 dark:text-rose-400'
                          return <span key={`${lineIndex}-${charIndex}`} className={className}>{character}</span>
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="leading-8 text-lg">
              {words.map((word, wordIndex) => {
                const typedWord = typedWords[wordIndex] || ''
                const isCurrent = wordIndex === Math.max(typedWords.length - 1, 0)
                return (
                  <span key={`${word}-${wordIndex}`} className={`inline-block mr-3 mb-2 px-1 rounded ${isCurrent ? 'bg-indigo-100 dark:bg-indigo-950/40' : ''}`}>
                    {word.split('').map((character, charIndex) => {
                      const typedCharacter = typedWord[charIndex]
                      const className = typedCharacter == null ? 'text-gray-500 dark:text-gray-400' : typedCharacter === character ? 'text-green-600 dark:text-green-400' : 'text-rose-600 dark:text-rose-400'
                      return <span key={`${wordIndex}-${charIndex}`} className={className}>{character}</span>
                    })}
                  </span>
                )
              })}
            </div>
          )}
        </Panel>

        <Panel>
          <textarea
            className="textarea-field min-h-[140px]"
            value={typed}
            disabled={finished}
            placeholder="Start typing here..."
            onChange={(event) => {
              if (!running && !finished) setRunning(true)
              setTyped(event.target.value)
            }}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={() => resetTest(mode, duration)}>Try again</button>
            <button type="button" className="btn-secondary" onClick={() => resetTest(mode, duration)}>New test</button>
          </div>
        </Panel>

        {finished && (
          <Panel>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <StatCard label="WPM" value={metrics.wpm} helper={getRating(metrics.wpm)} tone="indigo" />
              <StatCard label="CPM" value={metrics.cpm} helper="Characters per minute" tone="blue" />
              <StatCard label="Accuracy" value={`${metrics.accuracy}%`} helper="Overall" tone="green" />
              <StatCard label="Errors" value={metrics.errors} helper="Total mistakes" tone="rose" />
              <StatCard label="Rating" value={getRating(metrics.wpm)} helper="Performance band" tone="amber" />
            </div>
          </Panel>
        )}
      </div>
    </ToolLayout>
  )
}