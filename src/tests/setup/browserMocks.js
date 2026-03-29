
// matchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// IntersectionObserver mock
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback) { this._callback = callback }
  observe() {}
  unobserve() {}
  disconnect() {}
}

// ResizeObserver mock
global.ResizeObserver = class ResizeObserver {
  constructor(callback) { this._callback = callback }
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Notification API mock
global.Notification = {
  permission: 'default',
  requestPermission: vi.fn().mockResolvedValue('granted'),
}

// scrollTo mock
window.scrollTo = vi.fn()

// Web Audio API mock
global.AudioContext = vi.fn(() => ({
  createOscillator: vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: { value: 0 },
    type: 'sine',
  })),
  createGain: vi.fn(() => ({
    connect: vi.fn(),
    gain: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
  })),
  destination: {},
  currentTime: 0,
}))

// URL.createObjectURL / revokeObjectURL mock
if (typeof URL.createObjectURL === 'undefined') {
  URL.createObjectURL = vi.fn(() => 'blob:mock-url')
}
if (typeof URL.revokeObjectURL === 'undefined') {
  URL.revokeObjectURL = vi.fn()
}

// Canvas getContext mock
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  drawImage: vi.fn(),
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  fillText: vi.fn(),
  measureText: vi.fn(() => ({ width: 0 })),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  closePath: vi.fn(),
  scale: vi.fn(),
  translate: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  font: '',
  textAlign: '',
  textBaseline: '',
  canvas: { toDataURL: vi.fn(() => 'data:image/png;base64,mock'), toBlob: vi.fn(cb => cb(new Blob())) },
}))

// HTMLCanvasElement.toDataURL
HTMLCanvasElement.prototype.toDataURL = vi.fn(() => 'data:image/png;base64,mock')
HTMLCanvasElement.prototype.toBlob = vi.fn(function(cb) { cb(new Blob()) })

// navigator.clipboard mock
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
    readText: vi.fn().mockResolvedValue(''),
  },
  configurable: true,
  writable: true,
})

// XMLSerializer mock
if (typeof XMLSerializer === 'undefined') {
  global.XMLSerializer = vi.fn(() => ({
    serializeToString: vi.fn(() => '<svg></svg>'),
  }))
}

// Window dialog mocks (jsdom doesn't implement these)
window.alert = vi.fn()
window.confirm = vi.fn(() => true)
window.print = vi.fn()
window.prompt = vi.fn(() => '')

// window.open mock
window.open = vi.fn(() => ({ focus: vi.fn(), close: vi.fn() }))
