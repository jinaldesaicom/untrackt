import { useState, useMemo } from 'react'

const elements = [
  { z:1,sym:'H',name:'Hydrogen',mass:1.008,cat:'nonmetal',group:1,period:1 },
  { z:2,sym:'He',name:'Helium',mass:4.003,cat:'noble-gas',group:18,period:1 },
  { z:3,sym:'Li',name:'Lithium',mass:6.941,cat:'alkali',group:1,period:2 },
  { z:4,sym:'Be',name:'Beryllium',mass:9.012,cat:'alkaline',group:2,period:2 },
  { z:5,sym:'B',name:'Boron',mass:10.81,cat:'metalloid',group:13,period:2 },
  { z:6,sym:'C',name:'Carbon',mass:12.011,cat:'nonmetal',group:14,period:2 },
  { z:7,sym:'N',name:'Nitrogen',mass:14.007,cat:'nonmetal',group:15,period:2 },
  { z:8,sym:'O',name:'Oxygen',mass:15.999,cat:'nonmetal',group:16,period:2 },
  { z:9,sym:'F',name:'Fluorine',mass:18.998,cat:'halogen',group:17,period:2 },
  { z:10,sym:'Ne',name:'Neon',mass:20.180,cat:'noble-gas',group:18,period:2 },
  { z:11,sym:'Na',name:'Sodium',mass:22.990,cat:'alkali',group:1,period:3 },
  { z:12,sym:'Mg',name:'Magnesium',mass:24.305,cat:'alkaline',group:2,period:3 },
  { z:13,sym:'Al',name:'Aluminium',mass:26.982,cat:'post-transition',group:13,period:3 },
  { z:14,sym:'Si',name:'Silicon',mass:28.086,cat:'metalloid',group:14,period:3 },
  { z:15,sym:'P',name:'Phosphorus',mass:30.974,cat:'nonmetal',group:15,period:3 },
  { z:16,sym:'S',name:'Sulfur',mass:32.065,cat:'nonmetal',group:16,period:3 },
  { z:17,sym:'Cl',name:'Chlorine',mass:35.453,cat:'halogen',group:17,period:3 },
  { z:18,sym:'Ar',name:'Argon',mass:39.948,cat:'noble-gas',group:18,period:3 },
  { z:19,sym:'K',name:'Potassium',mass:39.098,cat:'alkali',group:1,period:4 },
  { z:20,sym:'Ca',name:'Calcium',mass:40.078,cat:'alkaline',group:2,period:4 },
  { z:21,sym:'Sc',name:'Scandium',mass:44.956,cat:'transition',group:3,period:4 },
  { z:22,sym:'Ti',name:'Titanium',mass:47.867,cat:'transition',group:4,period:4 },
  { z:23,sym:'V',name:'Vanadium',mass:50.942,cat:'transition',group:5,period:4 },
  { z:24,sym:'Cr',name:'Chromium',mass:51.996,cat:'transition',group:6,period:4 },
  { z:25,sym:'Mn',name:'Manganese',mass:54.938,cat:'transition',group:7,period:4 },
  { z:26,sym:'Fe',name:'Iron',mass:55.845,cat:'transition',group:8,period:4 },
  { z:27,sym:'Co',name:'Cobalt',mass:58.933,cat:'transition',group:9,period:4 },
  { z:28,sym:'Ni',name:'Nickel',mass:58.693,cat:'transition',group:10,period:4 },
  { z:29,sym:'Cu',name:'Copper',mass:63.546,cat:'transition',group:11,period:4 },
  { z:30,sym:'Zn',name:'Zinc',mass:65.38,cat:'transition',group:12,period:4 },
  { z:31,sym:'Ga',name:'Gallium',mass:69.723,cat:'post-transition',group:13,period:4 },
  { z:32,sym:'Ge',name:'Germanium',mass:72.630,cat:'metalloid',group:14,period:4 },
  { z:33,sym:'As',name:'Arsenic',mass:74.922,cat:'metalloid',group:15,period:4 },
  { z:34,sym:'Se',name:'Selenium',mass:78.96,cat:'nonmetal',group:16,period:4 },
  { z:35,sym:'Br',name:'Bromine',mass:79.904,cat:'halogen',group:17,period:4 },
  { z:36,sym:'Kr',name:'Krypton',mass:83.798,cat:'noble-gas',group:18,period:4 },
  { z:37,sym:'Rb',name:'Rubidium',mass:85.468,cat:'alkali',group:1,period:5 },
  { z:38,sym:'Sr',name:'Strontium',mass:87.62,cat:'alkaline',group:2,period:5 },
  { z:39,sym:'Y',name:'Yttrium',mass:88.906,cat:'transition',group:3,period:5 },
  { z:40,sym:'Zr',name:'Zirconium',mass:91.224,cat:'transition',group:4,period:5 },
  { z:41,sym:'Nb',name:'Niobium',mass:92.906,cat:'transition',group:5,period:5 },
  { z:42,sym:'Mo',name:'Molybdenum',mass:95.96,cat:'transition',group:6,period:5 },
  { z:43,sym:'Tc',name:'Technetium',mass:98,cat:'transition',group:7,period:5 },
  { z:44,sym:'Ru',name:'Ruthenium',mass:101.07,cat:'transition',group:8,period:5 },
  { z:45,sym:'Rh',name:'Rhodium',mass:102.91,cat:'transition',group:9,period:5 },
  { z:46,sym:'Pd',name:'Palladium',mass:106.42,cat:'transition',group:10,period:5 },
  { z:47,sym:'Ag',name:'Silver',mass:107.87,cat:'transition',group:11,period:5 },
  { z:48,sym:'Cd',name:'Cadmium',mass:112.41,cat:'transition',group:12,period:5 },
  { z:49,sym:'In',name:'Indium',mass:114.82,cat:'post-transition',group:13,period:5 },
  { z:50,sym:'Sn',name:'Tin',mass:118.71,cat:'post-transition',group:14,period:5 },
  { z:51,sym:'Sb',name:'Antimony',mass:121.76,cat:'metalloid',group:15,period:5 },
  { z:52,sym:'Te',name:'Tellurium',mass:127.60,cat:'metalloid',group:16,period:5 },
  { z:53,sym:'I',name:'Iodine',mass:126.90,cat:'halogen',group:17,period:5 },
  { z:54,sym:'Xe',name:'Xenon',mass:131.29,cat:'noble-gas',group:18,period:5 },
  { z:55,sym:'Cs',name:'Caesium',mass:132.91,cat:'alkali',group:1,period:6 },
  { z:56,sym:'Ba',name:'Barium',mass:137.33,cat:'alkaline',group:2,period:6 },
  { z:57,sym:'La',name:'Lanthanum',mass:138.91,cat:'lanthanide',group:3,period:6 },
  { z:58,sym:'Ce',name:'Cerium',mass:140.12,cat:'lanthanide',group:3,period:6 },
  { z:59,sym:'Pr',name:'Praseodymium',mass:140.91,cat:'lanthanide',group:3,period:6 },
  { z:60,sym:'Nd',name:'Neodymium',mass:144.24,cat:'lanthanide',group:3,period:6 },
  { z:61,sym:'Pm',name:'Promethium',mass:145,cat:'lanthanide',group:3,period:6 },
  { z:62,sym:'Sm',name:'Samarium',mass:150.36,cat:'lanthanide',group:3,period:6 },
  { z:63,sym:'Eu',name:'Europium',mass:151.96,cat:'lanthanide',group:3,period:6 },
  { z:64,sym:'Gd',name:'Gadolinium',mass:157.25,cat:'lanthanide',group:3,period:6 },
  { z:65,sym:'Tb',name:'Terbium',mass:158.93,cat:'lanthanide',group:3,period:6 },
  { z:66,sym:'Dy',name:'Dysprosium',mass:162.50,cat:'lanthanide',group:3,period:6 },
  { z:67,sym:'Ho',name:'Holmium',mass:164.93,cat:'lanthanide',group:3,period:6 },
  { z:68,sym:'Er',name:'Erbium',mass:167.26,cat:'lanthanide',group:3,period:6 },
  { z:69,sym:'Tm',name:'Thulium',mass:168.93,cat:'lanthanide',group:3,period:6 },
  { z:70,sym:'Yb',name:'Ytterbium',mass:173.05,cat:'lanthanide',group:3,period:6 },
  { z:71,sym:'Lu',name:'Lutetium',mass:174.97,cat:'lanthanide',group:3,period:6 },
  { z:72,sym:'Hf',name:'Hafnium',mass:178.49,cat:'transition',group:4,period:6 },
  { z:73,sym:'Ta',name:'Tantalum',mass:180.95,cat:'transition',group:5,period:6 },
  { z:74,sym:'W',name:'Tungsten',mass:183.84,cat:'transition',group:6,period:6 },
  { z:75,sym:'Re',name:'Rhenium',mass:186.21,cat:'transition',group:7,period:6 },
  { z:76,sym:'Os',name:'Osmium',mass:190.23,cat:'transition',group:8,period:6 },
  { z:77,sym:'Ir',name:'Iridium',mass:192.22,cat:'transition',group:9,period:6 },
  { z:78,sym:'Pt',name:'Platinum',mass:195.08,cat:'transition',group:10,period:6 },
  { z:79,sym:'Au',name:'Gold',mass:196.97,cat:'transition',group:11,period:6 },
  { z:80,sym:'Hg',name:'Mercury',mass:200.59,cat:'transition',group:12,period:6 },
  { z:81,sym:'Tl',name:'Thallium',mass:204.38,cat:'post-transition',group:13,period:6 },
  { z:82,sym:'Pb',name:'Lead',mass:207.2,cat:'post-transition',group:14,period:6 },
  { z:83,sym:'Bi',name:'Bismuth',mass:208.98,cat:'post-transition',group:15,period:6 },
  { z:84,sym:'Po',name:'Polonium',mass:209,cat:'post-transition',group:16,period:6 },
  { z:85,sym:'At',name:'Astatine',mass:210,cat:'halogen',group:17,period:6 },
  { z:86,sym:'Rn',name:'Radon',mass:222,cat:'noble-gas',group:18,period:6 },
  { z:87,sym:'Fr',name:'Francium',mass:223,cat:'alkali',group:1,period:7 },
  { z:88,sym:'Ra',name:'Radium',mass:226,cat:'alkaline',group:2,period:7 },
  { z:89,sym:'Ac',name:'Actinium',mass:227,cat:'actinide',group:3,period:7 },
  { z:90,sym:'Th',name:'Thorium',mass:232.04,cat:'actinide',group:3,period:7 },
  { z:91,sym:'Pa',name:'Protactinium',mass:231.04,cat:'actinide',group:3,period:7 },
  { z:92,sym:'U',name:'Uranium',mass:238.03,cat:'actinide',group:3,period:7 },
  { z:93,sym:'Np',name:'Neptunium',mass:237,cat:'actinide',group:3,period:7 },
  { z:94,sym:'Pu',name:'Plutonium',mass:244,cat:'actinide',group:3,period:7 },
  { z:95,sym:'Am',name:'Americium',mass:243,cat:'actinide',group:3,period:7 },
  { z:96,sym:'Cm',name:'Curium',mass:247,cat:'actinide',group:3,period:7 },
  { z:97,sym:'Bk',name:'Berkelium',mass:247,cat:'actinide',group:3,period:7 },
  { z:98,sym:'Cf',name:'Californium',mass:251,cat:'actinide',group:3,period:7 },
  { z:99,sym:'Es',name:'Einsteinium',mass:252,cat:'actinide',group:3,period:7 },
  { z:100,sym:'Fm',name:'Fermium',mass:257,cat:'actinide',group:3,period:7 },
  { z:101,sym:'Md',name:'Mendelevium',mass:258,cat:'actinide',group:3,period:7 },
  { z:102,sym:'No',name:'Nobelium',mass:259,cat:'actinide',group:3,period:7 },
  { z:103,sym:'Lr',name:'Lawrencium',mass:266,cat:'actinide',group:3,period:7 },
  { z:104,sym:'Rf',name:'Rutherfordium',mass:267,cat:'transition',group:4,period:7 },
  { z:105,sym:'Db',name:'Dubnium',mass:268,cat:'transition',group:5,period:7 },
  { z:106,sym:'Sg',name:'Seaborgium',mass:269,cat:'transition',group:6,period:7 },
  { z:107,sym:'Bh',name:'Bohrium',mass:270,cat:'transition',group:7,period:7 },
  { z:108,sym:'Hs',name:'Hassium',mass:277,cat:'transition',group:8,period:7 },
  { z:109,sym:'Mt',name:'Meitnerium',mass:278,cat:'transition',group:9,period:7 },
  { z:110,sym:'Ds',name:'Darmstadtium',mass:281,cat:'transition',group:10,period:7 },
  { z:111,sym:'Rg',name:'Roentgenium',mass:282,cat:'transition',group:11,period:7 },
  { z:112,sym:'Cn',name:'Copernicium',mass:285,cat:'transition',group:12,period:7 },
  { z:113,sym:'Nh',name:'Nihonium',mass:286,cat:'post-transition',group:13,period:7 },
  { z:114,sym:'Fl',name:'Flerovium',mass:289,cat:'post-transition',group:14,period:7 },
  { z:115,sym:'Mc',name:'Moscovium',mass:290,cat:'post-transition',group:15,period:7 },
  { z:116,sym:'Lv',name:'Livermorium',mass:293,cat:'post-transition',group:16,period:7 },
  { z:117,sym:'Ts',name:'Tennessine',mass:294,cat:'halogen',group:17,period:7 },
  { z:118,sym:'Og',name:'Oganesson',mass:294,cat:'noble-gas',group:18,period:7 },
]

const catColors = {
  'alkali': 'bg-red-200 dark:bg-red-900/40 text-red-800 dark:text-red-300',
  'alkaline': 'bg-orange-200 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300',
  'transition': 'bg-yellow-200 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300',
  'post-transition': 'bg-green-200 dark:bg-green-900/40 text-green-800 dark:text-green-300',
  'metalloid': 'bg-teal-200 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300',
  'nonmetal': 'bg-blue-200 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300',
  'halogen': 'bg-indigo-200 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300',
  'noble-gas': 'bg-purple-200 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300',
  'lanthanide': 'bg-pink-200 dark:bg-pink-900/40 text-pink-800 dark:text-pink-300',
  'actinide': 'bg-rose-200 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300',
}

const catLabels = {
  'alkali':'Alkali Metal','alkaline':'Alkaline Earth','transition':'Transition Metal',
  'post-transition':'Post-Transition','metalloid':'Metalloid','nonmetal':'Nonmetal',
  'halogen':'Halogen','noble-gas':'Noble Gas','lanthanide':'Lanthanide','actinide':'Actinide',
}

export default function PeriodicTableReference() {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    let f = elements
    if (filter !== 'all') f = f.filter(e => e.cat === filter)
    if (search) {
      const s = search.toLowerCase()
      f = f.filter(e => e.name.toLowerCase().includes(s) || e.sym.toLowerCase().includes(s) || String(e.z).includes(s))
    }
    return new Set(f.map(e => e.z))
  }, [search, filter])

  const getGridPos = (el) => {
    if (el.z >= 57 && el.z <= 71) return { row: 9, col: el.z - 57 + 3 }
    if (el.z >= 89 && el.z <= 103) return { row: 10, col: el.z - 89 + 3 }
    return { row: el.period, col: el.group }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex flex-wrap gap-3 items-center">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search elements..."
          className="border rounded-lg px-3 py-1.5 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-48" />
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="border rounded-lg px-3 py-1.5 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
          <option value="all">All Categories</option>
          {Object.entries(catLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap gap-1 text-xs">
        {Object.entries(catLabels).map(([k, v]) => (
          <span key={k} className={`px-2 py-0.5 rounded ${catColors[k]} cursor-pointer`} onClick={() => setFilter(filter === k ? 'all' : k)}>
            {v}
          </span>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div className="inline-grid gap-0.5" style={{ gridTemplateColumns: 'repeat(18, minmax(0, 1fr))' }}>
          {elements.map(el => {
            const pos = getGridPos(el)
            const active = filtered.has(el.z)
            return (
              <div key={el.z}
                onClick={() => setSelected(selected?.z === el.z ? null : el)}
                style={{ gridRow: pos.row, gridColumn: pos.col }}
                className={`w-12 h-12 p-0.5 rounded cursor-pointer text-center leading-tight border transition-all
                  ${active ? catColors[el.cat] : 'bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600'}
                  ${selected?.z === el.z ? 'ring-2 ring-purple-500 scale-110 z-10' : 'border-transparent hover:scale-105'}
                `}>
                <div className="text-[8px] opacity-60">{el.z}</div>
                <div className="text-xs font-bold leading-none">{el.sym}</div>
                <div className="text-[7px] opacity-60 truncate">{el.mass}</div>
              </div>
            )
          })}
        </div>
      </div>

      {selected && (
        <div className={`rounded-xl border border-gray-200 dark:border-gray-700 p-5 ${catColors[selected.cat]}`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{selected.name}</h2>
              <p className="text-lg font-mono">{selected.sym} — Atomic #{selected.z}</p>
            </div>
            <button onClick={() => setSelected(null)} className="text-sm opacity-60 hover:opacity-100">✕</button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
            <div><span className="opacity-60">Atomic Mass:</span> <strong>{selected.mass} u</strong></div>
            <div><span className="opacity-60">Category:</span> <strong>{catLabels[selected.cat]}</strong></div>
            <div><span className="opacity-60">Group:</span> <strong>{selected.group}</strong></div>
            <div><span className="opacity-60">Period:</span> <strong>{selected.period}</strong></div>
          </div>
        </div>
      )}
    </div>
  )
}
