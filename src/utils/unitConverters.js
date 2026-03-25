export function lbsToKg(value) {
  return Number(value) * 0.45359237
}

export function kgToLbs(value) {
  return Number(value) * 2.2046226218
}

export function inchesToCm(value) {
  return Number(value) * 2.54
}

export function cmToInches(value) {
  return Number(value) / 2.54
}

export function feetInchesToCm(feet, inches) {
  return (Number(feet) * 12 + Number(inches)) * 2.54
}

export function cmToFeetInches(value) {
  const totalInches = cmToInches(value)
  const feet = Math.floor(totalInches / 12)
  const inches = totalInches - feet * 12
  return { feet, inches }
}

export function roundTo(value, digits = 1) {
  const factor = 10 ** digits
  return Math.round((Number(value) + Number.EPSILON) * factor) / factor
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}