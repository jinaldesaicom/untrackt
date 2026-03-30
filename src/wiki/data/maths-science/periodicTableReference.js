export default {
  id: 'periodic-table-reference',
  title: 'Periodic Table Reference',
  description: 'Interactive periodic table — look up element properties, atomic mass, electron configuration, and more.',
  content: {
    whatIs: {
      heading: 'What is the Periodic Table Reference?',
      body: 'The Periodic Table Reference provides an interactive periodic table of elements. Click on any element to view its properties: atomic number, atomic mass, electron configuration, electronegativity, ionization energy, melting/boiling point, density, and more. Filter by groups, periods, or element categories.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Quick access to element data is essential for chemistry coursework, lab work, and research. This interactive reference lets you look up any property instantly and compare elements without flipping through textbooks or switching between tabs.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Browse the periodic table by clicking on elements.',
        'View the element detail card with all properties.',
        'Filter by element category (metals, nonmetals, metalloids, etc.).',
        'Search for an element by name, symbol, or atomic number.',
        'Compare properties across elements.',
        'Use the electron configuration for orbital diagrams.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'All 118 elements with properties.',
        'Atomic number, mass, symbol.',
        'Electron configuration.',
        'Electronegativity and ionization energy.',
        'Melting and boiling points.',
        'Density and phase at room temperature.',
        'Category highlighting (alkali metals, halogens, noble gases, etc.).'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Looking up molar mass for calculations.',
        'Finding electron configurations for quantum chemistry.',
        'Comparing electronegativity for bond type prediction.',
        'Identifying element groups and trends.',
        'General chemistry reference during problem solving.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Carbon', description: 'Atomic number 6, mass 12.011 g/mol, config: 1s² 2s² 2p², nonmetal.' },
        { title: 'Iron', description: 'Atomic number 26, mass 55.845 g/mol, config: [Ar] 3d⁶ 4s², transition metal.' },
        { title: 'Gold', description: 'Atomic number 79, mass 196.967 g/mol, melting point 1064°C.' },
        { title: 'Trend Example', description: 'Electronegativity increases left to right across a period and up a group.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Atomic Number', definition: 'The number of protons in the nucleus, defining the element.' },
        { term: 'Atomic Mass', definition: 'The weighted average mass of all naturally occurring isotopes of an element, in atomic mass units (amu).' },
        { term: 'Electron Configuration', definition: 'The arrangement of electrons in an atom\'s orbitals (e.g., 1s² 2s² 2p⁶).' },
        { term: 'Electronegativity', definition: 'A measure of an atom\'s ability to attract electrons in a chemical bond.' },
        { term: 'Ionization Energy', definition: 'The energy required to remove an electron from a gaseous atom.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How many elements are there?', answer: '118 confirmed elements as of 2024, organized by atomic number.' },
        { question: 'What determines an element\'s position?', answer: 'Atomic number determines the position. Rows (periods) represent electron shells, columns (groups) represent similar properties.' },
        { question: 'What is a transition metal?', answer: 'Elements in groups 3-12 with partially filled d orbitals. They typically form colored compounds.' },
        { question: 'Why do noble gases rarely react?', answer: 'They have full outer electron shells, making them very stable and unreactive.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Learn periodic trends: electronegativity, atomic radius, ionization energy.',
        'Use the atomic mass for molar mass calculations (same numerical value, g/mol units).',
        'Group number often indicates number of valence electrons for main group elements.',
        'Use electron configuration to predict chemical behavior and bonding.',
        'Noble gas shorthand notation simplifies long electron configurations (e.g., [Ar] for argon core).',
        'Cross-reference electronegativity differences to predict bond type (ionic vs covalent).'
      ]
    }
  },
  relatedTools: ['mole-calculator', 'chemical-equation-balancer', 'ph-calculator', 'solution-concentration-calculator'],
  seo: {
    metaTitle: 'Periodic Table Reference — Element Properties & Data | UnTrackt Wiki',
    metaDescription: 'Interactive periodic table with element properties: atomic mass, electron configuration, electronegativity, melting point, and more.',
    keywords: ['periodic table', 'element properties', 'atomic mass', 'electron configuration', 'periodic table reference', 'chemical elements']
  }
};
