// Tests for markdownRenderer.js
import { renderMarkdown } from '../../utils/markdownRenderer.js'

describe('renderMarkdown', () => {
  it('renders headings', () => {
    expect(renderMarkdown('# Title')).toContain('<h2')
    expect(renderMarkdown('## Subtitle')).toContain('<h3')
    expect(renderMarkdown('### Section')).toContain('<h4')
  })

  it('renders bold text', () => {
    const result = renderMarkdown('This is **bold** text')
    expect(result).toContain('<strong')
    expect(result).toContain('bold')
  })

  it('escapes HTML to prevent XSS', () => {
    const result = renderMarkdown('<script>alert("xss")</script>')
    expect(result).not.toContain('<script>')
    expect(result).toContain('&lt;script&gt;')
  })

  it('renders unordered list items', () => {
    const result = renderMarkdown('- Item one\n- Item two')
    expect(result).toContain('<li')
    expect(result).toContain('<ul')
    expect(result).toContain('Item one')
    expect(result).toContain('Item two')
  })

  it('renders numbered list items', () => {
    const result = renderMarkdown('1. First\n2. Second')
    expect(result).toContain('<li')
    expect(result).toContain('<ol')
  })

  it('renders unchecked checkboxes', () => {
    const result = renderMarkdown('- [ ] Todo item')
    expect(result).toContain('Todo item')
    expect(result).toContain('<li')
  })

  it('renders checked checkboxes', () => {
    const result = renderMarkdown('- [x] Done item')
    expect(result).toContain('Done item')
    expect(result).toContain('✓')
  })

  it('renders tables', () => {
    const md = '| Name | Value |\n| --- | --- |\n| A | 1 |\n| B | 2 |'
    const result = renderMarkdown(md)
    expect(result).toContain('<table')
    expect(result).toContain('<th')
    expect(result).toContain('<td')
    expect(result).toContain('Name')
    expect(result).toContain('Value')
  })

  it('converts line breaks', () => {
    const result = renderMarkdown('Line one\nLine two')
    expect(result).toContain('<br/>')
  })

  it('handles empty input', () => {
    expect(renderMarkdown('')).toBe('')
  })

  it('handles ampersands', () => {
    const result = renderMarkdown('A & B')
    expect(result).toContain('&amp;')
  })
})
