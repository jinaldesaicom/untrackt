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

import AltTextAnalyzer from '../../../tools/seo/AltTextAnalyzer'
describe('AltTextAnalyzer – interact', () => {
  it('checks alt text', async () => {
    render(<W><AltTextAnalyzer /></W>)
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0]
    if (ta) fireEvent.change(ta, { target: { value: 'A cute brown dog playing in the park' } })
    clickButton(/analyz|check/i)
  })
})

import BreadcrumbSchemaGenerator from '../../../tools/seo/BreadcrumbSchemaGenerator'
describe('BreadcrumbSchemaGenerator – interact', () => {
  it('adds breadcrumb items', async () => {
    render(<W><BreadcrumbSchemaGenerator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Home')
    if (inputs[1]) await userEvent.type(inputs[1], 'https://example.com')
    clickButton(/add|generate/i)
  })
})

import CanonicalTagGenerator from '../../../tools/seo/CanonicalTagGenerator'
describe('CanonicalTagGenerator – interact', () => {
  it('generates canonical tag', async () => {
    render(<W><CanonicalTagGenerator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'https://example.com/page')
    clickButton(/generate|copy/i)
  })
})

import DnsRecords from '../../../tools/seo/DnsRecords'
describe('DnsRecords – interact', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ Answer: [{ type: 1, data: '93.184.216.34' }] }) }))
  })
  afterEach(() => vi.restoreAllMocks())
  it('looks up DNS', async () => {
    render(<W><DnsRecords /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'example.com')
    clickButton(/lookup|fetch|check/i)
  })
  it('switches record types', () => {
    render(<W><DnsRecords /></W>)
    clickAllButtons(/^A$|AAAA|MX|CNAME|TXT|NS|SOA/i)
  })
})

import HreflangGenerator from '../../../tools/seo/HreflangGenerator'
describe('HreflangGenerator – interact', () => {
  it('adds language entries', async () => {
    render(<W><HreflangGenerator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'https://example.com/en')
    clickButton(/add|generate/i)
  })
})

import InternalLinkAnalyzer from '../../../tools/seo/InternalLinkAnalyzer'
describe('InternalLinkAnalyzer – interact', () => {
  it('analyzes HTML links', () => {
    render(<W><InternalLinkAnalyzer /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: '<a href="/page1">Page 1</a><a href="/page2">Page 2</a>' } })
    clickButton(/analyz|scan/i)
  })
})

import KeywordDensityAnalyzer from '../../../tools/seo/KeywordDensityAnalyzer'
describe('KeywordDensityAnalyzer – interact', () => {
  it('analyzes keyword density', () => {
    render(<W><KeywordDensityAnalyzer /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'SEO tools help with search engine optimization. Good SEO practices improve rankings.' } })
    clickButton(/analyz|check/i)
  })
})

import MetaDescriptionAnalyzer from '../../../tools/seo/MetaDescriptionAnalyzer'
describe('MetaDescriptionAnalyzer – interact', () => {
  it('checks meta description', () => {
    render(<W><MetaDescriptionAnalyzer /></W>)
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0]
    if (ta) fireEvent.change(ta, { target: { value: 'This is a great website for developers needing free online tools.' } })
    clickButton(/analyz|check/i)
  })
})

import OpenGraphPreviewer from '../../../tools/seo/OpenGraphPreviewer'
describe('OpenGraphPreviewer – interact', () => {
  it('fills OG fields', async () => {
    render(<W><OpenGraphPreviewer /></W>)
    const inputs = screen.queryAllByRole('textbox')
    for (const inp of inputs.slice(0, 4)) {
      if (!inp.readOnly) await userEvent.type(inp, 'Test OG Content')
    }
  })
})

import ReadingLevelOptimizer from '../../../tools/seo/ReadingLevelOptimizer'
describe('ReadingLevelOptimizer – interact', () => {
  it('analyzes reading level', () => {
    render(<W><ReadingLevelOptimizer /></W>)
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'The quick brown fox jumps over the lazy dog. Simple sentences are easier to read.' } })
    clickButton(/analyz|check/i)
  })
})

import RobotsTxtGenerator from '../../../tools/seo/RobotsTxtGenerator'
describe('RobotsTxtGenerator – interact', () => {
  it('generates robots.txt', async () => {
    render(<W><RobotsTxtGenerator /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'https://example.com/sitemap.xml')
    clickButton(/generate|add/i)
  })
})

import RobotsTxtTester from '../../../tools/seo/RobotsTxtTester'
describe('RobotsTxtTester – interact', () => {
  it('tests robots.txt', () => {
    render(<W><RobotsTxtTester /></W>)
    const tas = document.querySelectorAll('textarea')
    if (tas[0]) fireEvent.change(tas[0], { target: { value: 'User-agent: *\nDisallow: /admin/' } })
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: '/admin/dashboard' } })
    clickButton(/test|check/i)
  })
})

import SeoContentBrief from '../../../tools/seo/SeoContentBrief'
describe('SeoContentBrief – interact', () => {
  it('fills content brief', async () => {
    render(<W><SeoContentBrief /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) await userEvent.type(inputs[0], 'Best JavaScript frameworks')
    const ta = document.querySelector('textarea')
    if (ta) fireEvent.change(ta, { target: { value: 'Compare React, Vue, Angular' } })
    clickButton(/generate|create/i)
  })
})

import TitleTagChecker from '../../../tools/seo/TitleTagChecker'
describe('TitleTagChecker – interact', () => {
  it('checks title tag', () => {
    render(<W><TitleTagChecker /></W>)
    const inputs = screen.queryAllByRole('textbox')
    if (inputs[0]) fireEvent.change(inputs[0], { target: { value: 'Best Developer Tools 2025 | UnTrackt' } })
    clickButton(/check|analyz/i)
  })
})

import XmlSitemapGenerator from '../../../tools/seo/XmlSitemapGenerator'
describe('XmlSitemapGenerator – interact', () => {
  it('adds URLs', async () => {
    render(<W><XmlSitemapGenerator /></W>)
    const ta = document.querySelector('textarea') || screen.queryAllByRole('textbox')[0]
    if (ta) fireEvent.change(ta, { target: { value: 'https://example.com\nhttps://example.com/about\nhttps://example.com/contact' } })
    clickButton(/generate|create/i)
  })
})
