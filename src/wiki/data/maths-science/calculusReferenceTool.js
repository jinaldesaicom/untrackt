export default {
  id: 'calculus-reference-tool',
  title: 'Calculus Reference Tool',
  description: 'Quick reference for derivative and integral rules, common formulas, limits, and series expansions.',
  content: {
    whatIs: {
      heading: 'What is the Calculus Reference Tool?',
      body: 'The Calculus Reference Tool is a comprehensive quick-reference for calculus formulas, rules, and theorems. Look up derivative rules (power, product, quotient, chain), integral formulas, common limits, Taylor/Maclaurin series, and fundamental theorems. It is a study companion and cheat sheet for calculus students and practitioners.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Calculus involves dozens of rules and formulas that are hard to memorize. Having a well-organized reference at your fingertips saves time during problem solving and exam preparation, letting you focus on understanding and applying concepts rather than memorizing formulas.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Browse categories: derivatives, integrals, limits, series.',
        'Search for a specific rule or formula.',
        'View the formula with notation and explanation.',
        'See examples of each rule applied.',
        'Use as a study reference during problem solving.',
        'Bookmark frequently used formulas.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Derivative rules (power, product, quotient, chain).',
        'Common derivatives table.',
        'Integration formulas and techniques.',
        'Common integrals table.',
        'Limit rules and common limits.',
        'Taylor and Maclaurin series.',
        'Searchable formula database.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Quick lookup during homework and problem sets.',
        'Exam preparation and review.',
        'Refreshing calculus knowledge for engineering work.',
        'Teaching calculus with formula reference.',
        'Verifying differentiation and integration rules during derivations.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Power Rule', description: 'd/dx[xⁿ] = nxⁿ⁻¹.' },
        { title: 'Chain Rule', description: 'd/dx[f(g(x))] = f\'(g(x)) · g\'(x).' },
        { title: 'Integration by Parts', description: '∫u dv = uv - ∫v du.' },
        { title: 'Taylor Series', description: 'eˣ = 1 + x + x²/2! + x³/3! + ...' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Derivative', definition: 'The rate of change of a function — the slope of the tangent line at any point.' },
        { term: 'Integral', definition: 'The accumulation of a function — the area under the curve between two points.' },
        { term: 'Limit', definition: 'The value a function approaches as the input approaches a specified value.' },
        { term: 'Chain Rule', definition: 'A rule for differentiating composite functions: the derivative of the outer function times the derivative of the inner function.' },
        { term: 'Taylor Series', definition: 'An infinite sum of terms calculated from the function\'s derivatives at a single point, approximating the function.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does this tool compute derivatives?', answer: 'No. It is a reference. Use it to look up rules and formulas, then apply them to your specific problem.' },
        { question: 'Which calculus topics are covered?', answer: 'Differential calculus (derivatives), integral calculus (integrals), limits, and series.' },
        { question: 'Is it suitable for Calc I, II, and III?', answer: 'It covers Calc I and II topics primarily (single variable). Multivariable topics are partially covered.' },
        { question: 'Can I search for a specific formula?', answer: 'Yes. Use the search function to find formulas by name or keywords.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Learn the derivation of rules, not just the formulas — understanding aids memory.',
        'Practice recognizing which rule applies to a given problem.',
        'Use the reference to verify your work, not replace understanding.',
        'Group related formulas (trig derivatives together, exponential integrals together) for efficient study.',
        'Create flashcards from the reference for active recall practice.',
        'Combine with the Graph Plotter to visualize the functions you are differentiating or integrating.'
      ]
    }
  },
  relatedTools: ['equation-solver', 'graph-plotter', 'trigonometry-calculator', 'polynomial-calculator'],
  seo: {
    metaTitle: 'Calculus Reference Tool — Derivatives, Integrals & Series | UnTrackt Wiki',
    metaDescription: 'Quick reference for calculus formulas: derivative rules, integral formulas, common limits, and Taylor series. Searchable calculus cheat sheet.',
    keywords: ['calculus reference', 'derivative rules', 'integral formulas', 'calculus cheat sheet', 'Taylor series', 'calculus formulas']
  }
};
