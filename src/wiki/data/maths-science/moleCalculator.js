export default {
  id: 'mole-calculator',
  title: 'Mole Calculator',
  description: 'Convert between moles, grams, molecules, and atoms. Calculate molar mass and perform stoichiometry.',
  content: {
    whatIs: {
      heading: 'What is the Mole Calculator?',
      body: 'The Mole Calculator converts between moles, grams, number of particles (molecules/atoms), and volume of gas (at STP). Enter any quantity and the molar mass to convert to all other representations. It also helps with basic stoichiometry by computing molar ratios for chemical reactions.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Mole conversions are the backbone of chemistry calculations. Converting between grams, moles, and particles requires Avogadro\'s number and molar mass. This tool handles the conversions quickly and accurately, eliminating arithmetic errors in multi-step problems.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the substance\'s molar mass (g/mol) or select from common compounds.',
        'Enter the known quantity (grams, moles, or number of particles).',
        'View the converted values for moles, grams, molecules, and atoms.',
        'For gas at STP, see the volume in liters.',
        'For stoichiometry, enter the balanced equation and a known quantity.',
        'Copy results or start a new conversion.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Grams ↔ moles conversion.',
        'Moles ↔ particles (molecules/atoms).',
        'Gas volume at STP (22.4 L/mol).',
        'Molar mass reference for common compounds.',
        'Basic stoichiometric calculations.',
        'Avogadro\'s number (6.022 × 10²³) application.',
        'Step-by-step dimensional analysis.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'General chemistry homework and lab calculations.',
        'Converting lab measurements to moles for stoichiometry.',
        'Calculating reagent amounts for experiments.',
        'AP Chemistry and IB Chemistry preparation.',
        'Biochemistry and pharmacology dosage calculations.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Grams to Moles', description: '36 g of H₂O (molar mass 18 g/mol) = 2 moles.' },
        { title: 'Moles to Molecules', description: '0.5 mol of CO₂ = 0.5 × 6.022 × 10²³ = 3.011 × 10²³ molecules.' },
        { title: 'Gas Volume', description: '1 mol of any gas at STP = 22.4 L.' },
        { title: 'Stoichiometry', description: '2H₂ + O₂ → 2H₂O: 4 g H₂ (2 mol) requires 1 mol O₂ (32 g).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Mole', definition: 'A unit of amount: 1 mole = 6.022 × 10²³ particles (Avogadro\'s number).' },
        { term: 'Molar Mass', definition: 'The mass of one mole of a substance, in grams per mole (g/mol).' },
        { term: 'Avogadro\'s Number', definition: '6.022 × 10²³ — the number of particles in one mole.' },
        { term: 'STP', definition: 'Standard Temperature and Pressure: 0°C (273.15 K) and 1 atm.' },
        { term: 'Stoichiometry', definition: 'Using balanced equations to calculate the amounts of reactants and products.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How do I find the molar mass?', answer: 'Add up the atomic masses of all atoms in the chemical formula. For H₂O: 2(1.008) + 16.00 = 18.02 g/mol.' },
        { question: 'What is STP?', answer: '0°C and 1 atm. At STP, 1 mole of an ideal gas occupies 22.4 L.' },
        { question: 'What is the difference between molecules and atoms?', answer: 'Molecules are groups of bonded atoms (e.g., H₂O). One molecule of H₂O contains 3 atoms.' },
        { question: 'Can I use this for stoichiometry?', answer: 'Yes. Enter the balanced equation and a known mass or moles to find other quantities.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always start with a balanced chemical equation for stoichiometry problems.',
        'Convert grams → moles → use mole ratio → convert back to desired units.',
        'Double-check molar mass by looking up atomic masses on the periodic table.',
        'Use dimensional analysis to track units through multi-step conversions.',
        'At STP, use 22.4 L/mol. At other conditions, use the ideal gas law.',
        'For atoms, multiply molecules by the number of atoms per molecule.'
      ]
    }
  },
  relatedTools: ['chemical-equation-balancer', 'periodic-table-reference', 'solution-concentration-calculator', 'gas-laws-calculator'],
  seo: {
    metaTitle: 'Mole Calculator — Grams, Moles, Molecules & Stoichiometry | UnTrackt Wiki',
    metaDescription: 'Convert between grams, moles, molecules, and gas volume. Perform stoichiometric calculations with step-by-step dimensional analysis.',
    keywords: ['mole calculator', 'grams to moles', 'mole conversion', 'stoichiometry', 'Avogadros number', 'molar mass']
  }
};
