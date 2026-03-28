export default {
  id: 'gas-laws-calculator',
  title: 'Gas Laws Calculator',
  description: 'Apply Boyle\'s, Charles\'s, Gay-Lussac\'s, combined, and ideal gas laws to solve gas behavior problems.',
  content: {
    whatIs: {
      heading: 'What is the Gas Laws Calculator?',
      body: 'The Gas Laws Calculator applies the individual and combined gas laws to solve problems about gas behavior. Enter pressure, volume, temperature, and amount (moles) to apply Boyle\'s law, Charles\'s law, Gay-Lussac\'s law, the combined gas law, Avogadro\'s law, and the ideal gas law (PV = nRT).'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Gas law problems require selecting the right law based on which variables are constant, then solving the equation. This tool identifies the applicable law, handles the calculation, and shows the step-by-step work with unit conversions.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the gas law or let the tool identify it from your inputs.',
        'Enter the known state variables (P, V, T, n).',
        'For initial-final problems, enter initial and final state values.',
        'Click solve for the unknown variable.',
        'View the formula and step-by-step solution.',
        'Convert units as needed (atm, kPa, mmHg for pressure; K, °C for temperature).'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Boyle\'s law (P₁V₁ = P₂V₂, constant T).',
        'Charles\'s law (V₁/T₁ = V₂/T₂, constant P).',
        'Gay-Lussac\'s law (P₁/T₁ = P₂/T₂, constant V).',
        'Combined gas law.',
        'Ideal gas law (PV = nRT).',
        'Avogadro\'s law (V/n = constant).',
        'Automatic law identification.',
        'Pressure and temperature unit conversions.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Chemistry gas law homework.',
        'Lab calculations for gas experiments.',
        'Engineering gas system design.',
        'Atmospheric science calculations.',
        'Scuba diving and altitude pressure problems.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Boyle\'s Law', description: 'P₁ = 2 atm, V₁ = 3 L → at P₂ = 6 atm: V₂ = 1 L.' },
        { title: 'Charles\'s Law', description: 'V₁ = 10 L at 300 K → at 600 K: V₂ = 20 L.' },
        { title: 'Ideal Gas', description: 'n = 2 mol, T = 273 K, P = 1 atm → V = nRT/P = 44.8 L.' },
        { title: 'Combined', description: 'P₁V₁/T₁ = P₂V₂/T₂ → solve for any one unknown.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Boyle\'s Law', definition: 'At constant temperature, pressure and volume are inversely proportional: P₁V₁ = P₂V₂.' },
        { term: 'Charles\'s Law', definition: 'At constant pressure, volume is directly proportional to temperature: V₁/T₁ = V₂/T₂.' },
        { term: 'Ideal Gas', definition: 'A theoretical gas that follows PV = nRT perfectly. Real gases approximate this at low pressure and high temperature.' },
        { term: 'R (Gas Constant)', definition: '8.314 J/(mol·K) or 0.0821 L·atm/(mol·K).' },
        { term: 'STP', definition: 'Standard Temperature and Pressure: 273.15 K (0°C) and 1 atm. 1 mol of ideal gas = 22.4 L at STP.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Which gas law should I use?', answer: 'Identify which variables are constant. Constant T → Boyle\'s, constant P → Charles\'s. If none are constant, use combined or ideal gas law.' },
        { question: 'Why must temperature be in Kelvin?', answer: 'Gas laws relate volume and pressure to absolute temperature. Celsius has an arbitrary zero; Kelvin starts at absolute zero.' },
        { question: 'When does the ideal gas law fail?', answer: 'At high pressures and low temperatures, where gas molecules interact significantly. Use the van der Waals equation for real gases.' },
        { question: 'Which value of R should I use?', answer: 'Use 0.0821 L·atm/(mol·K) when P is in atm and V in liters. Use 8.314 J/(mol·K) for SI units.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'ALWAYS convert temperature to Kelvin before applying gas laws.',
        'Identify what is held constant to choose the correct gas law.',
        'Use consistent units for R: match pressure and volume units to R\'s units.',
        'Verify by checking that increased T at constant P gives increased V (makes physical sense).',
        'At STP, use the shortcut: 1 mol = 22.4 L.',
        'For mixtures, use Dalton\'s law of partial pressures: P_total = P₁ + P₂ + ...'
      ]
    }
  },
  relatedTools: ['thermodynamics-calculator', 'mole-calculator', 'unit-converter-scientific', 'solution-concentration-calculator'],
  seo: {
    metaTitle: 'Gas Laws Calculator — Boyle, Charles, Ideal Gas Law | UnTrackt Wiki',
    metaDescription: 'Apply Boyle\'s, Charles\'s, Gay-Lussac\'s, combined, and ideal gas laws. Step-by-step gas behavior problem solving.',
    keywords: ['gas laws calculator', 'Boyles law', 'Charles law', 'ideal gas law', 'PV=nRT', 'gas law solver']
  }
};
