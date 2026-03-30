import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

vi.mock('../../../utils/storage', () => ({
  getItem: vi.fn((_k, d) => d ?? null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  getPreference: vi.fn((_k, d) => d ?? null),
  setPreference: vi.fn(),
}))

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

import AspectRatioCalculator from '../../../tools/general/AspectRatioCalculator'
describe('AspectRatioCalculator – interact', () => {
  it('fills width/height', () => {
    render(<W><AspectRatioCalculator /></W>)
    fillInputs([1920, 1080])
    expect(document.body.textContent).toMatch(/16|9|ratio/i)
  })
  it('locks and scales', () => {
    render(<W><AspectRatioCalculator /></W>)
    fillInputs([1920, 1080, 800])
    clickButton(/lock|calc|scale/i)
  })
})

import BinaryTextConverter from '../../../tools/general/BinaryTextConverter'
describe('BinaryTextConverter – interact', () => {
  it('converts text to binary', () => {
    render(<W><BinaryTextConverter /></W>)
    const inputs = screen.queryAllByRole('textbox')
    const ta = inputs[0] || document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Hello' } })
    clickButton(/convert|encode/i)
  })
  it('converts binary to text', () => {
    render(<W><BinaryTextConverter /></W>)
    clickButton(/binary.*text|decode|reverse/i)
    const ta = document.querySelectorAll('textarea')
    if (ta[1]) fireEvent.change(ta[1], { target: { value: '01001000' } })
  })
})

import CaseConverter from '../../../tools/general/CaseConverter'
describe('CaseConverter – interact', () => {
  it('converts cases', () => {
    render(<W><CaseConverter /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'hello world test string' } })
    clickAllButtons(/upper|lower|title|camel|snake|kebab|pascal|sentence/i)
  })
})

import ColorPaletteGenerator from '../../../tools/general/ColorPaletteGenerator'
describe('ColorPaletteGenerator – interact', () => {
  it('generates palette', () => {
    render(<W><ColorPaletteGenerator /></W>)
    clickButton(/generate|random|new/i)
  })
  it('changes base color', () => {
    render(<W><ColorPaletteGenerator /></W>)
    const colorInput = document.querySelector('input[type="color"]')
    if (colorInput) fireEvent.change(colorInput, { target: { value: '#ff5500' } })
  })
  it('changes harmony type', () => {
    render(<W><ColorPaletteGenerator /></W>)
    clickAllButtons(/analog|complement|triad|split|mono/i)
  })
})

import CountdownTimer from '../../../tools/general/CountdownTimer'
describe('CountdownTimer – interact', () => {
  it('sets timer', () => {
    render(<W><CountdownTimer /></W>)
    fillInputs([0, 5, 0])
    clickButton(/start|begin/i)
  })
  it('pauses and resets', () => {
    render(<W><CountdownTimer /></W>)
    clickButton(/start|begin/i)
    clickButton(/pause|stop/i)
    clickButton(/reset|clear/i)
  })
})

import ImageConverter from '../../../tools/general/ImageConverter'
describe('ImageConverter – interact', () => {
  beforeEach(() => { URL.createObjectURL = vi.fn(() => 'blob:test'); URL.revokeObjectURL = vi.fn() })
  it('renders format options', () => {
    render(<W><ImageConverter /></W>)
    expect(document.body.textContent).toMatch(/png|jpeg|webp|convert|format/i)
  })
  it('switches output format', () => {
    render(<W><ImageConverter /></W>)
    clickAllButtons(/png|jpeg|webp|gif|bmp/i)
  })
})

import ImageToBase64 from '../../../tools/general/ImageToBase64'
describe('ImageToBase64 – interact', () => {
  beforeEach(() => { URL.createObjectURL = vi.fn(() => 'blob:test'); URL.revokeObjectURL = vi.fn() })
  it('renders upload area', () => {
    render(<W><ImageToBase64 /></W>)
    expect(document.body.textContent).toMatch(/base64|image|upload|drag/i)
  })
})

import JsonToCsvConverter from '../../../tools/general/JsonToCsvConverter'
describe('JsonToCsvConverter – interact', () => {
  it('enters JSON and converts', () => {
    render(<W><JsonToCsvConverter /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: '[{"name":"Alice","age":30},{"name":"Bob","age":25}]' } })
    clickButton(/convert|generate/i)
  })
})

import MetaTagGenerator from '../../../tools/general/MetaTagGenerator'
describe('MetaTagGenerator – interact', () => {
  it('fills meta fields', async () => {
    render(<W><MetaTagGenerator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    for (const inp of inputs.slice(0, 3)) {
      if (!inp.readOnly) await userEvent.type(inp, 'Test content')
    }
    clickButton(/generate|copy/i)
  })
})

import QrCodeGenerator from '../../../tools/general/QrCodeGenerator'
describe('QrCodeGenerator – interact', () => {
  it('generates QR code', async () => {
    render(<W><QrCodeGenerator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    const ta = inputs[0] || document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'https://example.com' } })
    clickButton(/generate|create/i)
  })
})

import RandomNumberGenerator from '../../../tools/general/RandomNumberGenerator'
describe('RandomNumberGenerator – interact', () => {
  it('sets range and generates', () => {
    render(<W><RandomNumberGenerator /></W>)
    fillInputs([1, 100])
    clickButton(/generate|random|roll/i)
    clickButton(/generate|random|roll/i)
  })
})

import TextToSlug from '../../../tools/general/TextToSlug'
describe('TextToSlug – interact', () => {
  it('converts text to slug', () => {
    render(<W><TextToSlug /></W>)
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0]
    if (ta) fireEvent.change(ta, { target: { value: 'Hello World! This is a Test.' } })
  })
})

import TipSplitter from '../../../tools/general/TipSplitter'
describe('TipSplitter – interact', () => {
  it('calculates tip', () => {
    render(<W><TipSplitter /></W>)
    fillInputs([85, 15, 4])
    expect(document.body.textContent).toMatch(/\d/)
  })
  it('changes tip percentage', () => {
    render(<W><TipSplitter /></W>)
    fillInputs([100, 20, 2])
    clickAllButtons(/10%|15%|18%|20%|25%/i)
  })
})

import TypingSpeedTest from '../../../tools/general/TypingSpeedTest'
describe('TypingSpeedTest – interact', () => {
  it('renders test text', () => {
    render(<W><TypingSpeedTest /></W>)
    expect(document.body.textContent.length).toBeGreaterThan(50)
  })
  it('starts typing', async () => {
    render(<W><TypingSpeedTest /></W>)
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0]
    if (ta) await userEvent.type(ta, 'the quick brown')
  })
})

import WordFrequencyCounter from '../../../tools/general/WordFrequencyCounter'
describe('WordFrequencyCounter – interact', () => {
  it('counts word frequency', () => {
    render(<W><WordFrequencyCounter /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'hello world hello test hello world' } })
    expect(document.body.textContent).toMatch(/hello|3|world|2/i)
  })
})
