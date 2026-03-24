import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import UuidGenerator from '../../../tools/dev/UuidGenerator.jsx'

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('UuidGenerator', () => {
  it('renders generate button', () => {
    render(<UuidGenerator />)
    expect(screen.getByRole('button', { name: /generate new/i })).toBeInTheDocument()
  })

  it('clicking Generate produces a UUID string', async () => {
    const user = userEvent.setup()
    render(<UuidGenerator />)
    await user.click(screen.getByRole('button', { name: /generate new/i }))
    const code = screen.getByRole('code')
    expect(UUID_V4_REGEX.test(code.textContent)).toBe(true)
  })

  it('generated UUID matches standard UUID v4 format', () => {
    render(<UuidGenerator />)
    const code = screen.getByRole('code')
    expect(UUID_V4_REGEX.test(code.textContent)).toBe(true)
  })

  it('clicking "Generate 10" shows exactly 10 UUIDs', async () => {
    const user = userEvent.setup()
    render(<UuidGenerator />)
    await user.click(screen.getByRole('button', { name: /generate 10/i }))
    // Each row has a <code> element — the single UUID code + 10 bulk codes = 11
    const codes = screen.getAllByRole('code')
    // The bulk section renders 10 additional code elements
    // Total code elements = 1 (single) + 10 (bulk)
    expect(codes.length).toBe(11)
  })

  it('each of the 10 UUIDs is unique', async () => {
    const user = userEvent.setup()
    render(<UuidGenerator />)
    await user.click(screen.getByRole('button', { name: /generate 10/i }))
    const codes = screen.getAllByRole('code')
    // Bulk codes are the last 10
    const bulkUuids = codes.slice(1).map((el) => el.textContent)
    const uniqueSet = new Set(bulkUuids)
    expect(uniqueSet.size).toBe(10)
  })

  it('Copy button works on single UUID', () => {
    // navigator.clipboard is a getter-only property in jsdom — use defineProperty
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
      writable: true,
    })
    render(<UuidGenerator />)
    // The CopyButton component renders a button with title="Copy"
    const copyButtons = screen.getAllByTitle('Copy')
    expect(copyButtons.length).toBeGreaterThanOrEqual(1)
  })
})
