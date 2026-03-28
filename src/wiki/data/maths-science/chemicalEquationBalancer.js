export default {
  id: 'chemical-equation-balancer',
  title: 'Chemical Equation Balancer',
  description: 'Balance chemical equations automatically. Enter reactants and products and get balanced stoichiometric coefficients.',
  content: {
    whatIs: {
      heading: 'What is the Chemical Equation Balancer?',
      body: 'The Chemical Equation Balancer takes an unbalanced chemical equation and finds the smallest whole-number coefficients that balance it. Enter the reactants and products, and the tool systematically balances atoms of each element. It shows the step-by-step balancing process and verifies atom counts.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Balancing equations, especially complex ones with many elements, can be challenging by trial and error. This tool balances them instantly and correctly, verifies the result, and shows the balancing steps — making it a reliable homework helper and verification tool.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the unbalanced equation (e.g., Fe + O₂ → Fe₂O₃).',
        'Click balance.',
        'View the balanced equation with coefficients.',
        'See the atom count verification for each element.',
        'View the balancing steps.',
        'Copy the balanced equation.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Automatic equation balancing.',
        'Smallest whole-number coefficients.',
        'Atom count verification table.',
        'Step-by-step balancing process.',
        'Support for complex equations with multiple elements.',
        'Handles combustion, synthesis, decomposition, and redox equations.',
        'Chemical formula parser.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Chemistry homework equation balancing.',
        'Verifying manually balanced equations.',
        'Stoichiometry problem setup.',
        'Lab prep — determining reagent ratios.',
        'Learning balancing techniques.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Combustion', description: 'CH₄ + O₂ → CO₂ + H₂O → CH₄ + 2O₂ → CO₂ + 2H₂O.' },
        { title: 'Synthesis', description: 'Fe + O₂ → Fe₂O₃ → 4Fe + 3O₂ → 2Fe₂O₃.' },
        { title: 'Single Replacement', description: 'Zn + HCl → ZnCl₂ + H₂ → Zn + 2HCl → ZnCl₂ + H₂.' },
        { title: 'Photosynthesis', description: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Balanced Equation', definition: 'An equation where the number of atoms of each element is equal on both sides.' },
        { term: 'Coefficient', definition: 'The number in front of a chemical formula indicating the number of molecules.' },
        { term: 'Reactants', definition: 'Substances on the left side of the equation (starting materials).' },
        { term: 'Products', definition: 'Substances on the right side of the equation (what is formed).' },
        { term: 'Conservation of Mass', definition: 'Matter cannot be created or destroyed — atoms are rearranged, not gained or lost.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Why must equations be balanced?', answer: 'To satisfy conservation of mass — the same atoms must appear on both sides.' },
        { question: 'What if the equation cannot be balanced?', answer: 'The tool will indicate if no valid integer coefficients exist, which may mean the equation is incorrect.' },
        { question: 'Can I enter subscripts directly?', answer: 'Yes. Enter subscripts as regular numbers after the element (e.g., H2O for H₂O).' },
        { question: 'Does it handle polyatomic ions?', answer: 'Yes. Enter them as part of the formula (e.g., Ca(OH)2).' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Write the correct unbalanced equation first — balancing cannot fix wrong formulas.',
        'Balance metals first, then non-metals, then hydrogen, and finally oxygen.',
        'Never change subscripts to balance — only adjust coefficients.',
        'Verify by counting each element on both sides after balancing.',
        'For combustion equations, balance C first, then H, then O last.',
        'Use the balanced equation to set up mole ratios for stoichiometry.'
      ]
    }
  },
  relatedTools: ['mole-calculator', 'periodic-table-reference', 'solution-concentration-calculator', 'gas-laws-calculator'],
  seo: {
    metaTitle: 'Chemical Equation Balancer — Auto-Balance Chemical Reactions | UnTrackt Wiki',
    metaDescription: 'Balance chemical equations automatically with smallest whole-number coefficients. Step-by-step balancing with atom count verification.',
    keywords: ['equation balancer', 'balance chemical equation', 'stoichiometric coefficients', 'chemistry balancer', 'chemical reaction balancer']
  }
};
