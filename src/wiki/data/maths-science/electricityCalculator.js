export default {
  id: 'electricity-calculator',
  title: 'Electricity Calculator',
  description: 'Calculate voltage, current, resistance, and power using Ohm\'s law and circuit analysis formulas.',
  content: {
    whatIs: {
      heading: 'What is the Electricity Calculator?',
      body: 'The Electricity Calculator solves Ohm\'s law (V = IR) and related electrical formulas. Calculate voltage, current, resistance, and power for circuits. Compute series and parallel resistance, capacitance, and energy consumption. Enter any two electrical quantities and solve for the others.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Electrical calculations involve multiple interrelated formulas. This tool lets you enter what you know and instantly computes everything else, handling series/parallel combinations and power calculations that would otherwise require multiple steps.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the calculation type (Ohm\'s law, series/parallel, power, energy).',
        'Enter the known values (voltage, current, resistance, etc.).',
        'Click solve to compute the unknowns.',
        'View the formulas used and results.',
        'For series/parallel: enter resistor values.',
        'View the power triangle and related quantities.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Ohm\'s law (V = IR) solver.',
        'Electrical power (P = IV, P = I²R, P = V²/R).',
        'Series and parallel resistance.',
        'Series and parallel capacitance.',
        'Energy consumption (kWh).',
        'Voltage divider calculator.',
        'Power triangle visualization.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics electricity homework.',
        'Basic circuit design and analysis.',
        'Electrical engineering coursework.',
        'Home electrical calculations (energy cost, wire sizing).',
        'Electronics hobby projects.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Ohm\'s Law', description: 'V = 12V, R = 4Ω → I = 3A, P = 36W.' },
        { title: 'Parallel Resistance', description: 'R₁ = 10Ω, R₂ = 10Ω in parallel → R_total = 5Ω.' },
        { title: 'Power', description: 'I = 2A, R = 100Ω → P = I²R = 400W.' },
        { title: 'Energy Cost', description: '100W bulb for 10 hours → 1 kWh.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Voltage (V)', definition: 'Electric potential difference, measured in volts (V). The "pressure" driving current.' },
        { term: 'Current (I)', definition: 'Flow of electric charge, measured in amperes (A).' },
        { term: 'Resistance (R)', definition: 'Opposition to current flow, measured in ohms (Ω).' },
        { term: 'Power (P)', definition: 'Rate of energy transfer: P = IV. Measured in watts (W).' },
        { term: 'Ohm\'s Law', definition: 'V = IR — voltage equals current times resistance.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Which values do I need to enter?', answer: 'Any two of voltage, current, and resistance. The calculator derives the others using Ohm\'s law.' },
        { question: 'How do I compute total resistance in parallel?', answer: '1/R_total = 1/R₁ + 1/R₂ + ... The calculator handles this automatically.' },
        { question: 'What is a kWh?', answer: 'A kilowatt-hour — a unit of energy equal to using 1000 watts for 1 hour.' },
        { question: 'Does it handle AC circuits?', answer: 'It covers basic DC and simple AC power calculations. For complex impedance, use the Complex Number Calculator.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with Ohm\'s law — it is the foundation of circuit analysis.',
        'Remember: series resistors add, parallel resistors combine as reciprocals.',
        'Series capacitors combine as reciprocals (opposite of resistors).',
        'Check power dissipation to ensure components are within rated limits.',
        'Use the voltage divider formula for quick voltage reference designs.',
        'Convert all values to consistent SI units (volts, amps, ohms) before calculating.'
      ]
    }
  },
  relatedTools: ['electromagnetic-calculator', 'energy-work-calculator', 'unit-converter-scientific', 'equation-solver'],
  seo: {
    metaTitle: 'Electricity Calculator — Ohm\'s Law, Power & Circuits | UnTrackt Wiki',
    metaDescription: 'Calculate voltage, current, resistance, and power with Ohm\'s law. Solve series/parallel circuits and energy consumption problems.',
    keywords: ['electricity calculator', 'Ohms law', 'voltage current resistance', 'circuit calculator', 'power calculator', 'electrical formulas']
  }
};
