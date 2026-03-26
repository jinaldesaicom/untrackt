export const unitConversions = {
  length: {
    base: 'm',
    units: {
      m: { name: 'Meter', toBase: (v) => v, fromBase: (v) => v },
      km: { name: 'Kilometer', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      cm: { name: 'Centimeter', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      mm: { name: 'Millimeter', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      mi: { name: 'Mile', toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
      yd: { name: 'Yard', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      ft: { name: 'Foot', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      in: { name: 'Inch', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    },
  },
  mass: {
    base: 'kg',
    units: {
      kg: { name: 'Kilogram', toBase: (v) => v, fromBase: (v) => v },
      g: { name: 'Gram', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      lb: { name: 'Pound', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      oz: { name: 'Ounce', toBase: (v) => v * 0.0283495231, fromBase: (v) => v / 0.0283495231 },
      t: { name: 'Metric Ton', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    },
  },
  temperature: {
    base: 'c',
    units: {
      c: { name: 'Celsius', toBase: (v) => v, fromBase: (v) => v },
      f: { name: 'Fahrenheit', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
      k: { name: 'Kelvin', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  },
  volume: {
    base: 'l',
    units: {
      l: { name: 'Liter', toBase: (v) => v, fromBase: (v) => v },
      ml: { name: 'Milliliter', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      gal: { name: 'US Gallon', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      qt: { name: 'Quart', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      cup: { name: 'Cup', toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    },
  },
  area: {
    base: 'm2',
    units: {
      m2: { name: 'Square Meter', toBase: (v) => v, fromBase: (v) => v },
      km2: { name: 'Square Kilometer', toBase: (v) => v * 1_000_000, fromBase: (v) => v / 1_000_000 },
      ha: { name: 'Hectare', toBase: (v) => v * 10_000, fromBase: (v) => v / 10_000 },
      ft2: { name: 'Square Foot', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
      ac: { name: 'Acre', toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 },
    },
  },
  speed: {
    base: 'mps',
    units: {
      mps: { name: 'Meters/Second', toBase: (v) => v, fromBase: (v) => v },
      kph: { name: 'Kilometers/Hour', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      mph: { name: 'Miles/Hour', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      knot: { name: 'Knot', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    },
  },
  time: {
    base: 's',
    units: {
      s: { name: 'Second', toBase: (v) => v, fromBase: (v) => v },
      min: { name: 'Minute', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      h: { name: 'Hour', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      day: { name: 'Day', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      week: { name: 'Week', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
    },
  },
  energy: {
    base: 'j',
    units: {
      j: { name: 'Joule', toBase: (v) => v, fromBase: (v) => v },
      kj: { name: 'Kilojoule', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      cal: { name: 'Calorie', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
      kcal: { name: 'Kilocalorie', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
      wh: { name: 'Watt-hour', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    },
  },
  pressure: {
    base: 'pa',
    units: {
      pa: { name: 'Pascal', toBase: (v) => v, fromBase: (v) => v },
      kpa: { name: 'Kilopascal', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      bar: { name: 'Bar', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      psi: { name: 'PSI', toBase: (v) => v * 6894.757, fromBase: (v) => v / 6894.757 },
      atm: { name: 'Atmosphere', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
    },
  },
  dataStorage: {
    base: 'byte',
    units: {
      byte: { name: 'Byte', toBase: (v) => v, fromBase: (v) => v },
      kb: { name: 'Kilobyte', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      mb: { name: 'Megabyte', toBase: (v) => v * 1024 ** 2, fromBase: (v) => v / 1024 ** 2 },
      gb: { name: 'Gigabyte', toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
      tb: { name: 'Terabyte', toBase: (v) => v * 1024 ** 4, fromBase: (v) => v / 1024 ** 4 },
      bit: { name: 'Bit', toBase: (v) => v / 8, fromBase: (v) => v * 8 },
    },
  },
}

export const conversionCategories = [
  { id: 'length', name: 'Length' },
  { id: 'mass', name: 'Weight/Mass' },
  { id: 'temperature', name: 'Temperature' },
  { id: 'volume', name: 'Volume' },
  { id: 'area', name: 'Area' },
  { id: 'speed', name: 'Speed' },
  { id: 'time', name: 'Time' },
  { id: 'energy', name: 'Energy' },
  { id: 'pressure', name: 'Pressure' },
  { id: 'dataStorage', name: 'Data Storage' },
]
