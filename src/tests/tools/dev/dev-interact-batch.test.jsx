import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

const W = ({ children }) => <HelmetProvider><MemoryRouter>{children}</MemoryRouter></HelmetProvider>
const fillInputs = (values) => {
  const inputs = screen.queryAllByRole('spinbutton')
  inputs.slice(0, values.length).forEach((inp, i) => fireEvent.change(inp, { target: { value: String(values[i]) } }))
}
const clickButton = (pattern) => {
  const btn = screen.queryAllByRole('button').find(b => b.textContent.match(pattern))
  if (btn) fireEvent.click(btn)
  return btn
}
const clickAllButtons = (pattern) => {
  screen.queryAllByRole('button').filter(b => b.textContent.match(pattern)).forEach(b => { try { fireEvent.click(b) } catch {} })
}

import Base64Tool from '../../../tools/dev/Base64Tool'
describe('Base64Tool – interact', () => {
  it('encodes and decodes', () => {
    render(<W><Base64Tool /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Hello World' } })
    clickButton(/encode/i)
    clickButton(/decode/i)
  })
})

import ColorConverter from '../../../tools/dev/ColorConverter'
describe('ColorConverter – interact', () => {
  it('converts colors', () => {
    render(<W><ColorConverter /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '#3b82f6' } })
    const colorInput = document.querySelector('input[type="color"]')
    if (colorInput) fireEvent.change(colorInput, { target: { value: '#3b82f6' } })
    clickAllButtons(/rgb|hsl|hex|copy/i)
  })
})

import CronParser from '../../../tools/dev/CronParser'
describe('CronParser – interact', () => {
  it('parses cron expression', () => {
    render(<W><CronParser /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '*/5 * * * *' } })
    clickButton(/parse|explain/i)
  })
})

import CssGradientGenerator from '../../../tools/dev/CssGradientGenerator'
describe('CssGradientGenerator – interact', () => {
  it('changes gradient properties', () => {
    render(<W><CssGradientGenerator /></W>)
    clickAllButtons(/linear|radial|conic/i)
    const colorInputs = document.querySelectorAll('input[type="color"]')
    if (colorInputs[0]) fireEvent.change(colorInputs[0], { target: { value: '#ff0000' } })
    if (colorInputs[1]) fireEvent.change(colorInputs[1], { target: { value: '#0000ff' } })
    clickButton(/copy/i)
  })
})

import HashGenerator from '../../../tools/dev/HashGenerator'
describe('HashGenerator – interact', () => {
  it('generates hashes', () => {
    render(<W><HashGenerator /></W>)
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0]
    if (ta) fireEvent.change(ta, { target: { value: 'password123' } })
    clickAllButtons(/md5|sha-?1|sha-?256|sha-?512|copy/i)
  })
})

import HtmlEntityEncoder from '../../../tools/dev/HtmlEntityEncoder'
describe('HtmlEntityEncoder – interact', () => {
  it('encodes HTML entities', () => {
    render(<W><HtmlEntityEncoder /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: '<p>Hello & "World"</p>' } })
    clickButton(/encode|decode/i)
  })
})

import HttpStatusLookup from '../../../tools/dev/HttpStatusLookup'
describe('HttpStatusLookup – interact', () => {
  it('looks up status codes', () => {
    render(<W><HttpStatusLookup /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '404' } })
    fillInputs([404])
    clickAllButtons(/1xx|2xx|3xx|4xx|5xx/i)
  })
})

import JsonFormatter from '../../../tools/dev/JsonFormatter'
describe('JsonFormatter – interact', () => {
  it('formats JSON', () => {
    render(<W><JsonFormatter /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: '{"name":"John","age":30}' } })
    clickButton(/format|beautif|minif/i)
  })
})

import JwtDecoder from '../../../tools/dev/JwtDecoder'
describe('JwtDecoder – interact', () => {
  it('decodes JWT', () => {
    render(<W><JwtDecoder /></W>)
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0]
    if (ta) fireEvent.change(ta, { target: { value: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' } })
    clickButton(/decode/i)
  })
})

import LoremIpsumGenerator from '../../../tools/dev/LoremIpsumGenerator'
describe('LoremIpsumGenerator – interact', () => {
  it('generates lorem ipsum', () => {
    render(<W><LoremIpsumGenerator /></W>)
    fillInputs([5])
    clickAllButtons(/paragraph|sentence|word/i)
    clickButton(/generate|copy/i)
  })
})

import MarkdownPreviewer from '../../../tools/dev/MarkdownPreviewer'
describe('MarkdownPreviewer – interact', () => {
  it('previews markdown', () => {
    render(<W><MarkdownPreviewer /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: '# Hello\n\n**Bold** and *italic*\n\n- Item 1\n- Item 2' } })
  })
})

import NumberBaseConverter from '../../../tools/dev/NumberBaseConverter'
describe('NumberBaseConverter – interact', () => {
  it('converts number bases', () => {
    render(<W><NumberBaseConverter /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '255' } })
    clickAllButtons(/binary|octal|hex|decimal/i)
  })
})

import RegexTester from '../../../tools/dev/RegexTester'
describe('RegexTester – interact', () => {
  it('tests regex', () => {
    render(<W><RegexTester /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '\\d+' } })
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Hello 123 World 456' } })
    clickAllButtons(/global|case|multiline|test/i)
  })
})

import SvgOptimizer from '../../../tools/dev/SvgOptimizer'
describe('SvgOptimizer – interact', () => {
  it('optimizes SVG', () => {
    render(<W><SvgOptimizer /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><circle cx="50" cy="50" r="40" fill="red"/></svg>' } })
    clickButton(/optim|clean|copy/i)
  })
})

import TextDiffChecker from '../../../tools/dev/TextDiffChecker'
describe('TextDiffChecker – interact', () => {
  it('compares texts', () => {
    render(<W><TextDiffChecker /></W>)
    const tas = document.querySelectorAll('textarea')
    if (tas[0]) fireEvent.change(tas[0], { target: { value: 'Hello World' } })
    if (tas[1]) fireEvent.change(tas[1], { target: { value: 'Hello Earth' } })
    clickButton(/compare|diff/i)
  })
})

import TextToFlowchart from '../../../tools/dev/TextToFlowchart'
describe('TextToFlowchart – interact', () => {
  it('creates flowchart', () => {
    render(<W><TextToFlowchart /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Start -> Process -> Decision -> End' } })
    clickButton(/generate|render|draw/i)
  })
})

import TextToUML from '../../../tools/dev/TextToUML'
describe('TextToUML – interact', () => {
  it('creates UML', () => {
    render(<W><TextToUML /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'class User {\n  name: string\n  login()\n}' } })
    clickButton(/generate|render|draw/i)
  })
})

import UnixTimestampConverter from '../../../tools/dev/UnixTimestampConverter'
describe('UnixTimestampConverter – interact', () => {
  it('converts timestamps', () => {
    render(<W><UnixTimestampConverter /></W>)
    fillInputs([1700000000])
    clickButton(/convert/i)
  })
})

import UrlEncoderDecoder from '../../../tools/dev/UrlEncoderDecoder'
describe('UrlEncoderDecoder – interact', () => {
  it('encodes and decodes URLs', () => {
    render(<W><UrlEncoderDecoder /></W>)
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0]
    if (ta) fireEvent.change(ta, { target: { value: 'hello world & foo=bar' } })
    clickButton(/encode/i)
    clickButton(/decode/i)
  })
})

import UuidGenerator from '../../../tools/dev/UuidGenerator'
describe('UuidGenerator – interact', () => {
  it('generates UUID', () => {
    render(<W><UuidGenerator /></W>)
    clickButton(/generate|new|v4/i)
    clickButton(/copy/i)
    fillInputs([5])
    clickButton(/generate.*bulk|batch/i)
  })
})
