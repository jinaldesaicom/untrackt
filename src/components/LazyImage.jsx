import { useState } from 'react'

export default function LazyImage({ src, alt, width, height, className = '', ...rest }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-400 ${className}`}
        style={{ width, height }}
      >
        Image unavailable
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-100'}`} />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        {...rest}
      />
    </div>
  )
}
