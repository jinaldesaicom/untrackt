import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import LazyImage from '../../components/LazyImage.jsx'

describe('LazyImage', () => {
  it('renders img element', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test image"
        width={100}
        height={100}
      />
    )
    expect(screen.getByAltText('Test image')).toBeInTheDocument()
  })

  it('has loading lazy attribute', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test"
        width={100}
        height={100}
      />
    )
    expect(screen.getByAltText('Test')).toHaveAttribute('loading', 'lazy')
  })

  it('has explicit width and height props', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test"
        width={200}
        height={300}
      />
    )
    const img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('width', '200')
    expect(img).toHaveAttribute('height', '300')
  })

  it('shows placeholder blur state while loading', () => {
    const { container } = render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test"
        width={100}
        height={100}
      />
    )
    const placeholder = container.querySelector('.bg-gray-200')
    expect(placeholder).toHaveClass('opacity-100')
  })

  it('shows error fallback when image fails to load', () => {
    render(
      <LazyImage
        src="https://example.com/broken.jpg"
        alt="Broken"
        width={100}
        height={100}
      />
    )
    const img = screen.getByAltText('Broken')
    fireEvent.error(img)
    expect(screen.getByText('Image unavailable')).toBeInTheDocument()
  })

  it('error fallback is accessible with proper styling', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test"
        width={100}
        height={100}
      />
    )
    const img = screen.getByAltText('Test')
    fireEvent.error(img)
    const fallback = screen.getByText('Image unavailable')
    expect(fallback).toHaveClass('bg-gray-100')
  })

  it('width and height attributes prevent layout shift', () => {
    const { container } = render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test"
        width={400}
        height={300}
      />
    )
    const img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('width')
    expect(img).toHaveAttribute('height')
  })

  it('handles className prop', () => {
    const { container } = render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test"
        width={100}
        height={100}
        className="custom-class"
      />
    )
    const wrapper = container.querySelector('[style*="width"]')
    expect(wrapper).toHaveClass('custom-class')
  })

  it('can trigger onLoad event', () => {
    render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test"
        width={100}
        height={100}
      />
    )
    const img = screen.getByAltText('Test')
    fireEvent.load(img)
    expect(img).toBeInTheDocument()
  })

  it('applies opacity transition to image', () => {
    const { container } = render(
      <LazyImage
        src="https://example.com/image.jpg"
        alt="Test"
        width={100}
        height={100}
      />
    )
    const img = screen.getByAltText('Test')
    expect(img.className).toContain('transition-opacity')
  })
})
