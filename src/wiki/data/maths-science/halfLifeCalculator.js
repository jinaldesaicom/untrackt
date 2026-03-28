export default {
  id: 'half-life-calculator',
  title: 'Half-Life Calculator',
  description: 'Calculate radioactive decay — half-life, remaining amount, elapsed time, and decay constant.',
  content: {
    whatIs: {
      heading: 'What is the Half-Life Calculator?',
      body: 'The Half-Life Calculator computes radioactive decay quantities using the exponential decay formula. Enter any three of the four variables — initial amount, remaining amount, half-life, and elapsed time — and solve for the fourth. It also calculates the decay constant (λ) and number of half-lives elapsed.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Half-life problems involve exponential math that is error-prone to compute by hand. This tool handles the exponential calculations, logarithms, and unit conversions, giving you accurate results for nuclear physics, chemistry, medicine, and environmental science problems.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the initial amount (N₀).',
        'Enter the half-life (t₁/₂) with units.',
        'Enter the elapsed time or remaining amount (whichever is known).',
        'Click solve for the unknown.',
        'View the decay constant and number of half-lives.',
        'See the decay curve visualization.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Solve for any unknown: N₀, N, t, or t₁/₂.',
        'Decay constant (λ = ln2/t₁/₂).',
        'Number of half-lives elapsed.',
        'Exponential decay curve chart.',
        'Activity (decay rate) calculation.',
        'Multiple time units (seconds, minutes, hours, days, years).',
        'Step-by-step formula application.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Nuclear physics decay problems.',
        'Carbon dating age calculations.',
        'Medical isotope dosage timing.',
        'Environmental radioactive contamination analysis.',
        'Chemistry kinetics (first-order reactions).'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Basic Decay', description: '100 g with t₁/₂ = 5 years, after 15 years → 100/2³ = 12.5 g remaining.' },
        { title: 'Find Time', description: 'Start with 80 g, 20 g remaining, t₁/₂ = 10 days → elapsed = 20 days (2 half-lives).' },
        { title: 'Carbon-14', description: 'C-14 half-life = 5,730 years. 25% remaining → 2 half-lives → 11,460 years old.' },
        { title: 'Decay Constant', description: 'I-131 half-life = 8 days → λ = ln(2)/8 = 0.0866 per day.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Half-Life (t₁/₂)', definition: 'The time for half of the radioactive atoms to decay.' },
        { term: 'Decay Constant (λ)', definition: 'The probability of decay per unit time: λ = ln(2)/t₁/₂.' },
        { term: 'Activity', definition: 'The rate of decay (disintegrations per second). Measured in becquerels (Bq) or curies (Ci).' },
        { term: 'Exponential Decay', definition: 'N(t) = N₀ × (1/2)^(t/t₁/₂) or N(t) = N₀ × e^(-λt).' },
        { term: 'Radioactive Isotope', definition: 'An unstable atom that naturally decays by emitting radiation.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Does the formula work for non-whole half-lives?', answer: 'Yes. The exponential formula handles any time value, not just whole multiples of the half-life.' },
        { question: 'Can I use this for non-radioactive decay?', answer: 'Yes. Any first-order exponential decay process (drug metabolism, charge decay) uses the same math.' },
        { question: 'How does carbon dating work?', answer: 'Measure the fraction of C-14 remaining in a sample and use the C-14 half-life (5,730 years) to calculate the age.' },
        { question: 'What is activity?', answer: 'The number of decays per second: A = λN. It decreases over time as N decreases.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use consistent time units throughout the calculation.',
        'For whole numbers of half-lives, divide by 2 repeatedly — no formula needed.',
        'For non-whole half-lives, use the exponential formula.',
        'Convert between decay constant and half-life using λ = ln(2)/t₁/₂.',
        'Check reasonableness: after 1 half-life, 50% remains; after 10 half-lives, < 0.1% remains.',
        'The same formulas apply to first-order chemical kinetics.'
      ]
    }
  },
  relatedTools: ['scientific-notation-calculator', 'logarithm-calculator', 'unit-converter-scientific', 'statistics-calculator'],
  seo: {
    metaTitle: 'Half-Life Calculator — Radioactive Decay & Dating | UnTrackt Wiki',
    metaDescription: 'Calculate half-life, remaining amount, elapsed time, and decay constant for radioactive decay and first-order processes.',
    keywords: ['half-life calculator', 'radioactive decay', 'exponential decay', 'carbon dating', 'decay constant', 'half-life formula']
  }
};
