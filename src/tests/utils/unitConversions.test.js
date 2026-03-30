// Tests for data/unitConversions.js – exercises all conversion functions
import { unitConversions, conversionCategories } from '../../data/unitConversions.js'

describe('unitConversions', () => {
  it('has all expected categories', () => {
    const cats = Object.keys(unitConversions)
    expect(cats).toContain('length')
    expect(cats).toContain('mass')
    expect(cats).toContain('temperature')
    expect(cats).toContain('volume')
    expect(cats).toContain('area')
    expect(cats).toContain('speed')
    expect(cats).toContain('time')
    expect(cats).toContain('energy')
    expect(cats).toContain('pressure')
    expect(cats).toContain('dataStorage')
  })

  it('conversionCategories matches keys', () => {
    const ids = conversionCategories.map(c => c.id)
    Object.keys(unitConversions).forEach(key => {
      expect(ids).toContain(key)
    })
  })

  describe('length conversions', () => {
    const { units } = unitConversions.length
    it('meter is identity', () => {
      expect(units.m.toBase(5)).toBe(5)
      expect(units.m.fromBase(5)).toBe(5)
    })
    it('km to base', () => {
      expect(units.km.toBase(1)).toBe(1000)
      expect(units.km.fromBase(1000)).toBe(1)
    })
    it('cm to base', () => {
      expect(units.cm.toBase(100)).toBe(1)
    })
    it('mm to base', () => {
      expect(units.mm.toBase(1000)).toBe(1)
    })
    it('mi to base', () => {
      expect(units.mi.toBase(1)).toBeCloseTo(1609.34)
    })
    it('yd to base', () => {
      expect(units.yd.toBase(1)).toBeCloseTo(0.9144)
    })
    it('ft to base', () => {
      expect(units.ft.toBase(1)).toBeCloseTo(0.3048)
    })
    it('in to base', () => {
      expect(units.in.toBase(1)).toBeCloseTo(0.0254)
    })
  })

  describe('mass conversions', () => {
    const { units } = unitConversions.mass
    it('kg identity', () => { expect(units.kg.toBase(1)).toBe(1) })
    it('g to base', () => { expect(units.g.toBase(1000)).toBe(1) })
    it('lb to base', () => { expect(units.lb.toBase(1)).toBeCloseTo(0.4536, 3) })
    it('oz to base', () => { expect(units.oz.toBase(1)).toBeCloseTo(0.02835, 3) })
    it('t to base', () => { expect(units.t.toBase(1)).toBe(1000) })
  })

  describe('temperature conversions', () => {
    const { units } = unitConversions.temperature
    it('celsius identity', () => { expect(units.c.toBase(100)).toBe(100) })
    it('fahrenheit to celsius', () => {
      expect(units.f.toBase(32)).toBeCloseTo(0)
      expect(units.f.toBase(212)).toBeCloseTo(100)
    })
    it('celsius to fahrenheit', () => {
      expect(units.f.fromBase(0)).toBeCloseTo(32)
      expect(units.f.fromBase(100)).toBeCloseTo(212)
    })
    it('kelvin to celsius', () => {
      expect(units.k.toBase(273.15)).toBeCloseTo(0)
    })
    it('celsius to kelvin', () => {
      expect(units.k.fromBase(0)).toBeCloseTo(273.15)
    })
  })

  describe('volume conversions', () => {
    const { units } = unitConversions.volume
    it('liter identity', () => { expect(units.l.toBase(1)).toBe(1) })
    it('ml to l', () => { expect(units.ml.toBase(1000)).toBe(1) })
    it('gal to l', () => { expect(units.gal.toBase(1)).toBeCloseTo(3.78541) })
    it('qt to l', () => { expect(units.qt.toBase(1)).toBeCloseTo(0.946353) })
    it('cup to l', () => { expect(units.cup.toBase(1)).toBeCloseTo(0.236588) })
  })

  describe('area conversions', () => {
    const { units } = unitConversions.area
    it('m2 identity', () => { expect(units.m2.toBase(1)).toBe(1) })
    it('km2 to base', () => { expect(units.km2.toBase(1)).toBe(1_000_000) })
    it('ha to base', () => { expect(units.ha.toBase(1)).toBe(10_000) })
    it('ft2 to base', () => { expect(units.ft2.toBase(1)).toBeCloseTo(0.092903) })
    it('ac to base', () => { expect(units.ac.toBase(1)).toBeCloseTo(4046.856, 1) })
  })

  describe('speed conversions', () => {
    const { units } = unitConversions.speed
    it('mps identity', () => { expect(units.mps.toBase(1)).toBe(1) })
    it('kph to base', () => { expect(units.kph.toBase(3.6)).toBeCloseTo(1) })
    it('mph to base', () => { expect(units.mph.toBase(1)).toBeCloseTo(0.44704) })
    it('knot to base', () => { expect(units.knot.toBase(1)).toBeCloseTo(0.514444) })
  })

  describe('time conversions', () => {
    const { units } = unitConversions.time
    it('second identity', () => { expect(units.s.toBase(1)).toBe(1) })
    it('min to base', () => { expect(units.min.toBase(1)).toBe(60) })
    it('h to base', () => { expect(units.h.toBase(1)).toBe(3600) })
    it('day to base', () => { expect(units.day.toBase(1)).toBe(86400) })
    it('week to base', () => { expect(units.week.toBase(1)).toBe(604800) })
  })

  describe('energy conversions', () => {
    const { units } = unitConversions.energy
    it('joule identity', () => { expect(units.j.toBase(1)).toBe(1) })
    it('kj to base', () => { expect(units.kj.toBase(1)).toBe(1000) })
    it('cal to base', () => { expect(units.cal.toBase(1)).toBeCloseTo(4.184) })
    it('kcal to base', () => { expect(units.kcal.toBase(1)).toBe(4184) })
    it('wh to base', () => { expect(units.wh.toBase(1)).toBe(3600) })
  })

  describe('pressure conversions', () => {
    const { units } = unitConversions.pressure
    it('pa identity', () => { expect(units.pa.toBase(1)).toBe(1) })
    it('kpa to base', () => { expect(units.kpa.toBase(1)).toBe(1000) })
    it('bar to base', () => { expect(units.bar.toBase(1)).toBe(100000) })
    it('psi to base', () => { expect(units.psi.toBase(1)).toBeCloseTo(6894.757) })
    it('atm to base', () => { expect(units.atm.toBase(1)).toBe(101325) })
  })

  describe('dataStorage conversions', () => {
    const { units } = unitConversions.dataStorage
    it('byte identity', () => { expect(units.byte.toBase(1)).toBe(1) })
    it('kb to base', () => { expect(units.kb.toBase(1)).toBe(1024) })
    it('mb to base', () => { expect(units.mb.toBase(1)).toBe(1048576) })
    it('gb to base', () => { expect(units.gb.toBase(1)).toBe(1073741824) })
    it('tb to base', () => { expect(units.tb.toBase(1)).toBe(1099511627776) })
    it('bit to byte', () => { expect(units.bit.toBase(8)).toBe(1) })
    it('byte to bit', () => { expect(units.bit.fromBase(1)).toBe(8) })
  })

  describe('round-trip conversions', () => {
    const categories = Object.keys(unitConversions)
    categories.forEach(cat => {
      const { units } = unitConversions[cat]
      Object.entries(units).forEach(([key, unit]) => {
        it(`${cat}/${key} round-trips through base`, () => {
          const value = 42
          const base = unit.toBase(value)
          const roundTrip = unit.fromBase(base)
          expect(roundTrip).toBeCloseTo(value, 4)
        })
      })
    })
  })
})
