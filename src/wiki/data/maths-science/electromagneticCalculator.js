export default {
  id: 'electromagnetic-calculator',
  title: 'Electromagnetic Calculator',
  description: 'Calculate electromagnetic quantities — Coulomb\'s law, electric fields, magnetic fields, and electromagnetic waves.',
  content: {
    whatIs: {
      heading: 'What is the Electromagnetic Calculator?',
      body: 'The Electromagnetic Calculator solves equations for electric charges, fields, and electromagnetic phenomena. Apply Coulomb\'s law to compute electric force between charges, calculate electric field strength, magnetic field from current-carrying conductors, Lorentz force, and electromagnetic wave properties (frequency, wavelength, energy).'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Electromagnetic calculations involve multiple constants, vector quantities, and unfamiliar units. This tool handles the formulas and constants correctly while showing the work, making it essential for physics and electrical engineering coursework.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the topic (electric force, electric field, magnetic field, EM waves).',
        'Enter the known values (charges, distances, currents, etc.).',
        'Click solve for the unknown quantities.',
        'View the formula and step-by-step solution.',
        'For EM waves, enter frequency or wavelength to get the other.',
        'See vector direction indications where applicable.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Coulomb\'s law (F = kq₁q₂/r²).',
        'Electric field (E = kq/r², E = F/q).',
        'Magnetic field from a wire (B = μ₀I/2πr).',
        'Lorentz force (F = qv × B).',
        'EM wave equation (c = fλ).',
        'Photon energy (E = hf).',
        'Capacitor and inductor formulas.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics II electricity & magnetism homework.',
        'Electrical engineering field calculations.',
        'EM wave and photon energy analysis.',
        'Radio frequency and antenna calculations.',
        'Capacitor and inductor design.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Coulomb\'s Law', description: 'Two +1 μC charges 1 m apart: F = 8.99 × 10⁹ × (10⁻⁶)² / 1² = 8.99 × 10⁻³ N.' },
        { title: 'Electric Field', description: '1 μC charge at 2 m: E = kq/r² = 2248 N/C.' },
        { title: 'EM Wave', description: 'f = 100 MHz → λ = c/f = 3 m (FM radio wavelength).' },
        { title: 'Photon Energy', description: 'Green light (550 nm): E = hc/λ = 3.61 × 10⁻¹⁹ J = 2.25 eV.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Coulomb\'s Law', definition: 'The force between two charges: F = kq₁q₂/r². Attractive for opposite charges, repulsive for like charges.' },
        { term: 'Electric Field', definition: 'Force per unit charge at a point in space: E = F/q, measured in N/C or V/m.' },
        { term: 'Magnetic Field (B)', definition: 'A field produced by moving charges or currents, measured in tesla (T).' },
        { term: 'Lorentz Force', definition: 'The force on a charged particle moving in a magnetic field: F = qvB sin θ.' },
        { term: 'Electromagnetic Wave', definition: 'A wave of oscillating electric and magnetic fields traveling at the speed of light.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is k in Coulomb\'s law?', answer: 'k = 8.99 × 10⁹ N·m²/C² — Coulomb\'s constant.' },
        { question: 'What is the speed of light?', answer: 'c ≈ 3 × 10⁸ m/s in vacuum.' },
        { question: 'How do electric and magnetic fields relate?', answer: 'A changing electric field creates a magnetic field and vice versa — this is the basis of electromagnetic waves (Maxwell\'s equations).' },
        { question: 'What units are used for magnetic field?', answer: 'Tesla (T) in SI. 1 T = 10⁴ gauss.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use SI units throughout (C, m, T, N) for consistency.',
        'Remember: force is attractive between opposite charges, repulsive between like charges.',
        'Use superposition to add fields from multiple charges (vector addition).',
        'For EM waves: c = fλ connects frequency and wavelength.',
        'E = hf gives photon energy — higher frequency means higher energy.',
        'Convert micro/nano prefixes carefully — charge is often in μC or nC.'
      ]
    }
  },
  relatedTools: ['electricity-calculator', 'wave-sound-calculator', 'optics-calculator', 'unit-converter-scientific'],
  seo: {
    metaTitle: 'Electromagnetic Calculator — Coulomb\'s Law, Fields & EM Waves | UnTrackt Wiki',
    metaDescription: 'Calculate electric force, electric and magnetic fields, EM wave properties, and photon energy with step-by-step electromagnetic formulas.',
    keywords: ['electromagnetic calculator', 'Coulombs law', 'electric field', 'magnetic field', 'EM waves', 'photon energy']
  }
};
