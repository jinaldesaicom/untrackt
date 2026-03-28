export default {
  id: 'unit-converter-scientific',
  title: 'Scientific Unit Converter',
  description: 'Convert between SI and other scientific units — length, mass, time, temperature, pressure, energy, and more.',
  content: {
    whatIs: {
      heading: 'What is the Scientific Unit Converter?',
      body: 'The Scientific Unit Converter converts between units commonly used in science and engineering. Cover length (m, cm, mm, μm, nm, Å, km, mi, ft), mass (kg, g, mg, μg, lb, oz, amu), temperature (K, °C, °F), pressure (Pa, atm, bar, mmHg, psi), energy (J, kJ, cal, eV, kWh), and many more categories.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Science and engineering use many different unit systems. Converting between them — especially with SI prefixes and less common units — is a frequent source of calculation errors. This tool handles conversions instantly and accurately across all major scientific unit categories.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the unit category (length, mass, temperature, pressure, energy, etc.).',
        'Enter the value.',
        'Select the source unit.',
        'Select the target unit.',
        'View the converted value.',
        'See the conversion factor used.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Length: m, cm, mm, μm, nm, Å, km, mi, ft, in.',
        'Mass: kg, g, mg, μg, lb, oz, amu.',
        'Temperature: K, °C, °F.',
        'Pressure: Pa, kPa, atm, bar, mmHg, Torr, psi.',
        'Energy: J, kJ, cal, kcal, eV, kWh.',
        'Volume: L, mL, m³, cm³, gal, fl oz.',
        'Time, frequency, force, and more.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Converting lab measurements to SI units.',
        'Physics and chemistry homework unit conversions.',
        'Engineering calculations across unit systems.',
        'Converting between metric and imperial.',
        'Quick SI prefix conversions (micro, nano, kilo, mega).'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Length', description: '1 nm = 10 Å = 10⁻⁹ m.' },
        { title: 'Temperature', description: '100°C = 373.15 K = 212°F.' },
        { title: 'Pressure', description: '1 atm = 101,325 Pa = 760 mmHg.' },
        { title: 'Energy', description: '1 eV = 1.602 × 10⁻¹⁹ J.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'SI Units', definition: 'The International System of Units — the standard metric system used in science worldwide.' },
        { term: 'SI Prefix', definition: 'Prefixes like kilo (10³), milli (10⁻³), micro (10⁻⁶), nano (10⁻⁹) for scaling units.' },
        { term: 'Conversion Factor', definition: 'A ratio that converts one unit to another while preserving the quantity\'s value.' },
        { term: 'Dimensional Analysis', definition: 'A method for converting units by multiplying by conversion factors arranged so unwanted units cancel.' },
        { term: 'Base Unit', definition: 'One of the seven fundamental SI units: meter, kilogram, second, ampere, kelvin, mole, candela.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What categories are supported?', answer: 'Length, mass, volume, temperature, pressure, energy, force, time, frequency, speed, area, and more.' },
        { question: 'How accurate are the conversions?', answer: 'Conversions use exact factors where possible and high-precision values otherwise.' },
        { question: 'Can I chain conversions?', answer: 'Yes. Convert step by step or directly between any two units in the same category.' },
        { question: 'What about derived units?', answer: 'Derived units like newtons (kg·m/s²), pascals (N/m²), and joules (N·m) are supported through their categories.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always convert to SI units before performing calculations.',
        'Use dimensional analysis to catch unit errors.',
        'Learn common SI prefixes: kilo (k), milli (m), micro (μ), nano (n).',
        'Temperature conversion requires formulas, not simple multiplication (°C to °F is not a ratio).',
        'When converting area or volume, remember to square or cube the linear conversion factor.',
        'Keep track of significant figures — the conversion should not imply more precision than the original measurement.'
      ]
    }
  },
  relatedTools: ['significant-figures-calculator', 'scientific-notation-calculator', 'error-uncertainty-calculator', 'mole-calculator'],
  seo: {
    metaTitle: 'Scientific Unit Converter — SI & Engineering Units | UnTrackt Wiki',
    metaDescription: 'Convert between scientific units: length, mass, temperature, pressure, energy, volume. SI, metric, and imperial unit conversions.',
    keywords: ['unit converter', 'scientific units', 'SI conversion', 'metric conversion', 'pressure units', 'energy units']
  }
};
