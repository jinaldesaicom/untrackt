import { useState } from 'react'
import CopyButton from '../../components/CopyButton.jsx'
import { ToolLayout, Panel } from '../../components/ToolLayout.jsx'

function toTitleCase(text) {
  return text.toLowerCase().replace(/\b\w/g, (character) => character.toUpperCase())
}

function toSentenceCase(text) {
  return text.toLowerCase().replace(/(^\s*[a-z]|[.!?]\s+[a-z])/g, (match) => match.toUpperCase())
}

function splitWords(text) {
  return text.trim().replace(/([a-z])([A-Z])/g, '$1 $2').split(/[^a-zA-Z0-9]+/).filter(Boolean)
}

const TRANSFORMS = {
  UPPERCASE: (text) => text.toUpperCase(),
  lowercase: (text) => text.toLowerCase(),
  'Title Case': toTitleCase,
  'Sentence case': toSentenceCase,
  camelCase: (text) => splitWords(text).map((word, index) => index === 0 ? word.toLowerCase() : toTitleCase(word)).join(''),
  PascalCase: (text) => splitWords(text).map(toTitleCase).join(''),
  snake_case: (text) => splitWords(text).map((word) => word.toLowerCase()).join('_'),
  'kebab-case': (text) => splitWords(text).map((word) => word.toLowerCase()).join('-'),
  SCREAMING_SNAKE_CASE: (text) => splitWords(text).map((word) => word.toUpperCase()).join('_'),
  'dot.case': (text) => splitWords(text).map((word) => word.toLowerCase()).join('.'),
  Reverse: (text) => text.split('').reverse().join(''),
  'Reverse words': (text) => text.split(/\s+/).reverse().join(' '),
  'Alternating CaSe': (text) => text.split('').map((character, index) => index % 2 === 0 ? character.toLowerCase() : character.toUpperCase()).join(''),
}

export default function CaseConverter() {
  const [text, setText] = useState('Paste or type text here to transform it.')
  const [previousText, setPreviousText] = useState('')

  const applyTransform = (transform) => {
    setPreviousText(text)
    setText(TRANSFORMS[transform](text))
  }

  return (
    <ToolLayout
      title="Case Converter"
      description="Transform text instantly into common writing and programming cases, with undo, copy, and clipboard paste support."
      path="/tools/case-converter"
    >
      <Panel>
        <textarea className="textarea-field min-h-[220px]" value={text} onChange={(event) => setText(event.target.value)} />
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.keys(TRANSFORMS).map((label) => <button key={label} type="button" className="btn-secondary" onClick={() => applyTransform(label)}>{label}</button>)}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <CopyButton text={text} label="Copy text" />
          <button type="button" className="btn-secondary" onClick={() => previousText && setText(previousText)}>Undo</button>
          <button type="button" className="btn-secondary" onClick={async () => setText(await navigator.clipboard.readText())}>Paste from clipboard</button>
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Words: {text.trim().split(/\s+/).filter(Boolean).length} · Characters: {text.length}</p>
      </Panel>
    </ToolLayout>
  )
}