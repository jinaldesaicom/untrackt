import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import JsonFormatter from '../../../tools/dev/JsonFormatter.jsx'

describe('JsonFormatter', () => {
  it('renders textarea input and buttons', () => {
    render(<JsonFormatter />)
    expect(screen.getByPlaceholderText(/paste your json/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /format/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /minify/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  it('clicking Format with valid JSON shows formatted output', async () => {
    const user = userEvent.setup()  // kept for button clicks
    render(<JsonFormatter />)
    const input = screen.getByPlaceholderText(/paste your json/i)
    // Use fireEvent to avoid userEvent interpreting { and } as special keys
    fireEvent.change(input, { target: { value: '{"name":"Alice","age":30}' } })
    await user.click(screen.getByRole('button', { name: /format/i }))
    const outputs = screen.getAllByRole('textbox')
    const outputTextarea = outputs[1]
    expect(outputTextarea.value).toContain('"name": "Alice"')
    expect(outputTextarea.value).toContain('"age": 30')
  })

  it('clicking Format with invalid JSON shows error message', async () => {
    const user = userEvent.setup()
    render(<JsonFormatter />)
    const input = screen.getByPlaceholderText(/paste your json/i)
    fireEvent.change(input, { target: { value: '{invalid json}' } })
    await user.click(screen.getByRole('button', { name: /format/i }))
    expect(screen.getByText(/invalid json:/i)).toBeInTheDocument()
  })

  it('clicking Minify compresses the JSON', async () => {
    const user = userEvent.setup()
    render(<JsonFormatter />)
    const input = screen.getByPlaceholderText(/paste your json/i)
    fireEvent.change(input, { target: { value: '{"name":  "Alice",  "age":  30}' } })
    await user.click(screen.getByRole('button', { name: /minify/i }))
    const outputs = screen.getAllByRole('textbox')
    const outputTextarea = outputs[1]
    expect(outputTextarea.value).toBe('{"name":"Alice","age":30}')
  })

  it('clicking Clear empties both input and output', async () => {
    const user = userEvent.setup()
    render(<JsonFormatter />)
    const input = screen.getByPlaceholderText(/paste your json/i)
    fireEvent.change(input, { target: { value: '{"name":"Alice"}' } })
    await user.click(screen.getByRole('button', { name: /format/i }))
    await user.click(screen.getByRole('button', { name: /clear/i }))
    expect(input.value).toBe('')
    expect(screen.getAllByRole('textbox')).toHaveLength(1)
  })

  it('Copy button is present in output area after formatting', async () => {
    const user = userEvent.setup()
    render(<JsonFormatter />)
    const input = screen.getByPlaceholderText(/paste your json/i)
    fireEvent.change(input, { target: { value: '{"a":1}' } })
    await user.click(screen.getByRole('button', { name: /format/i }))
    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument()
  })
})
