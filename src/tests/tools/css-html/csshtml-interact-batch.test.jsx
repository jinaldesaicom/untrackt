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

import ButtonGenerator from '../../../tools/css-html/ButtonGenerator'
describe('ButtonGenerator – interact', () => {
  it('changes button style options', () => {
    render(<W><ButtonGenerator /></W>)
    fillInputs([16, 8, 4])
    const colorInput = document.querySelector('input[type="color"]')
    if (colorInput) fireEvent.change(colorInput, { target: { value: '#3b82f6' } })
    clickButton(/copy|generate/i)
  })
})

import CssAnimationGenerator from '../../../tools/css-html/CssAnimationGenerator'
describe('CssAnimationGenerator – interact', () => {
  it('selects animation type', () => {
    render(<W><CssAnimationGenerator /></W>)
    clickAllButtons(/fade|slide|bounce|rotate|scale|pulse/i)
    fillInputs([1, 0.5])
    clickButton(/copy|generate/i)
  })
})

import CssBorderRadiusGenerator from '../../../tools/css-html/CssBorderRadiusGenerator'
describe('CssBorderRadiusGenerator – interact', () => {
  it('adjusts border radius', () => {
    render(<W><CssBorderRadiusGenerator /></W>)
    fillInputs([10, 20, 30, 40])
    const sliders = document.querySelectorAll('input[type="range"]')
    Array.from(sliders).forEach(s => fireEvent.change(s, { target: { value: '25' } }))
    clickButton(/copy/i)
  })
})

import CssBoxShadowGenerator from '../../../tools/css-html/CssBoxShadowGenerator'
describe('CssBoxShadowGenerator – interact', () => {
  it('adjusts shadow values', () => {
    render(<W><CssBoxShadowGenerator /></W>)
    fillInputs([5, 5, 10, 0])
    const colorInput = document.querySelector('input[type="color"]')
    if (colorInput) fireEvent.change(colorInput, { target: { value: '#000000' } })
    clickButton(/copy/i)
  })
})

import CssClipPathMaker from '../../../tools/css-html/CssClipPathMaker'
describe('CssClipPathMaker – interact', () => {
  it('selects shape presets', () => {
    render(<W><CssClipPathMaker /></W>)
    clickAllButtons(/circle|triangle|polygon|star|hexagon|custom/i)
    clickButton(/copy/i)
  })
})

import CssFilterGenerator from '../../../tools/css-html/CssFilterGenerator'
describe('CssFilterGenerator – interact', () => {
  it('adjusts filter values', () => {
    render(<W><CssFilterGenerator /></W>)
    const sliders = document.querySelectorAll('input[type="range"]')
    Array.from(sliders).forEach(s => fireEvent.change(s, { target: { value: '75' } }))
    clickButton(/copy|reset/i)
  })
})

import CssFlexboxPlayground from '../../../tools/css-html/CssFlexboxPlayground'
describe('CssFlexboxPlayground – interact', () => {
  it('changes flex properties', () => {
    render(<W><CssFlexboxPlayground /></W>)
    clickAllButtons(/row|column|wrap|nowrap|center|flex-start|flex-end|space-between/i)
    clickButton(/add.*item|\+/i)
    clickButton(/copy/i)
  })
})

import CssUnitsConverter from '../../../tools/css-html/CssUnitsConverter'
describe('CssUnitsConverter – interact', () => {
  it('converts CSS units', () => {
    render(<W><CssUnitsConverter /></W>)
    fillInputs([16])
    const selects = screen.queryAllByRole('combobox')
    if (selects[0]) fireEvent.change(selects[0], { target: { value: 'px' } })
    if (selects[1]) fireEvent.change(selects[1], { target: { value: 'rem' } })
    clickButton(/convert/i)
  })
})

import CssVariableExtractor from '../../../tools/css-html/CssVariableExtractor'
describe('CssVariableExtractor – interact', () => {
  it('extracts variables from CSS', () => {
    render(<W><CssVariableExtractor /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: ':root { --primary: #3b82f6; --secondary: #10b981; }' } })
    clickButton(/extract|analyz/i)
  })
})

import GlassmorphismGenerator from '../../../tools/css-html/GlassmorphismGenerator'
describe('GlassmorphismGenerator – interact', () => {
  it('adjusts glass effect', () => {
    render(<W><GlassmorphismGenerator /></W>)
    const sliders = document.querySelectorAll('input[type="range"]')
    Array.from(sliders).forEach(s => fireEvent.change(s, { target: { value: '50' } }))
    clickButton(/copy/i)
  })
})

import HtmlFormatterBeautifier from '../../../tools/css-html/HtmlFormatterBeautifier'
describe('HtmlFormatterBeautifier – interact', () => {
  it('formats HTML', () => {
    render(<W><HtmlFormatterBeautifier /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: '<div><p>Hello</p><span>World</span></div>' } })
    clickButton(/format|beautif/i)
  })
})

import NeumorphismGenerator from '../../../tools/css-html/NeumorphismGenerator'
describe('NeumorphismGenerator – interact', () => {
  it('adjusts neumorphism', () => {
    render(<W><NeumorphismGenerator /></W>)
    const sliders = document.querySelectorAll('input[type="range"]')
    Array.from(sliders).forEach(s => fireEvent.change(s, { target: { value: '30' } }))
    const colorInput = document.querySelector('input[type="color"]')
    if (colorInput) fireEvent.change(colorInput, { target: { value: '#e0e0e0' } })
    clickButton(/copy/i)
  })
})
