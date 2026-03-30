export default {
  id: 'solution-concentration-calculator',
  title: 'Solution Concentration Calculator',
  description: 'Calculate molarity, molality, dilution, and mass percent. Convert between concentration units for solutions.',
  content: {
    whatIs: {
      heading: 'What is the Solution Concentration Calculator?',
      body: 'The Solution Concentration Calculator computes and converts between concentration units: molarity (M), molality (m), mass percent, volume percent, ppm, and ppb. It also applies the dilution formula (M₁V₁ = M₂V₂) and helps prepare solutions by calculating the required amounts of solute and solvent.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Chemistry labs and coursework constantly involve concentration calculations and conversions. This tool handles the math for solution preparation, dilution, and unit conversion, reducing errors in lab work and homework.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the calculation type (molarity, dilution, conversion, etc.).',
        'Enter the known values (moles, volume, mass, density, etc.).',
        'Click calculate to get the concentration.',
        'For dilution, enter M₁, V₁, and M₂ or V₂.',
        'For solution preparation, enter target concentration and volume.',
        'View the amount of solute and solvent needed.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Molarity (mol/L) calculation.',
        'Molality (mol/kg) calculation.',
        'Mass percent and volume percent.',
        'Parts per million (ppm) and parts per billion (ppb).',
        'Dilution formula (M₁V₁ = M₂V₂).',
        'Solution preparation guide.',
        'Concentration unit conversion.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Preparing laboratory solutions.',
        'Diluting stock solutions.',
        'Converting between concentration units.',
        'Chemistry homework concentration problems.',
        'Environmental science pollutant concentration analysis.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Molarity', description: '2 mol NaCl in 500 mL water → M = 2/0.5 = 4 M.' },
        { title: 'Dilution', description: 'Dilute 50 mL of 6 M HCl to 1 M: V₂ = (6 × 50)/1 = 300 mL final volume.' },
        { title: 'Mass Percent', description: '10 g salt in 90 g water → mass% = 10/100 × 100 = 10%.' },
        { title: 'ppm', description: '5 mg substance per liter of water = 5 ppm.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Molarity (M)', definition: 'Moles of solute per liter of solution.' },
        { term: 'Molality (m)', definition: 'Moles of solute per kilogram of solvent.' },
        { term: 'Mass Percent', definition: '(mass of solute / total mass of solution) × 100%.' },
        { term: 'Dilution', definition: 'Adding solvent to decrease concentration. M₁V₁ = M₂V₂.' },
        { term: 'ppm (Parts Per Million)', definition: 'mg of solute per liter of solution (for dilute aqueous solutions).' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between molarity and molality?', answer: 'Molarity uses volume of solution (mol/L). Molality uses mass of solvent (mol/kg). Molality is temperature-independent.' },
        { question: 'When do I use M₁V₁ = M₂V₂?', answer: 'When diluting a concentrated solution to a lower concentration with the same solute.' },
        { question: 'How do I convert between concentration units?', answer: 'You need density of the solution and molar mass of the solute to convert between molarity, molality, and mass percent.' },
        { question: 'What does ppm mean?', answer: 'Parts per million — equivalent to mg/L for dilute aqueous solutions.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Label all solutions with name, concentration, and date.',
        'For dilution, always add acid to water (never water to acid) for safety.',
        'Use molality for colligative property calculations (boiling point elevation, freezing point depression).',
        'Use molarity for reaction stoichiometry in solution.',
        'Convert mL to L before molarity calculations (divide by 1000).',
        'Double-check dilution calculations — M₁V₁ = M₂V₂ assumes no volume change on mixing.'
      ]
    }
  },
  relatedTools: ['mole-calculator', 'ph-calculator', 'periodic-table-reference', 'unit-converter-scientific'],
  seo: {
    metaTitle: 'Solution Concentration Calculator — Molarity, Dilution & More | UnTrackt Wiki',
    metaDescription: 'Calculate molarity, molality, mass percent, ppm, and dilutions. Convert concentration units and plan solution preparation.',
    keywords: ['solution concentration', 'molarity calculator', 'dilution calculator', 'molality', 'concentration conversion', 'chemistry solutions']
  }
};
