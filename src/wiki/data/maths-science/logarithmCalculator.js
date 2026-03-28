export default {
  id: 'logarithm-calculator',
  title: 'Logarithm Calculator',
  description: 'Calculate logarithms with any base — log, ln, log₂, and custom bases. Evaluate expressions and apply log rules.',
  content: {
    whatIs: {
      heading: 'What is the Logarithm Calculator?',
      body: 'The Logarithm Calculator evaluates logarithms with any base. Compute log₁₀ (common), ln (natural), log₂ (binary), and logarithms with custom bases. It also applies log properties (product rule, quotient rule, power rule) to simplify expressions and converts between different bases.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Logarithm calculations, especially with non-standard bases, require the change of base formula. This tool handles any base directly, simplifies log expressions, and shows the applicable properties, making it useful for math coursework and science calculations.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the logarithm base (10, e, 2, or custom).',
        'Enter the value to compute the logarithm of.',
        'View the result.',
        'For base conversion, enter the source and target base.',
        'For expression simplification, enter a log expression.',
        'See the properties and rules applied.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Common log (log₁₀), natural log (ln), binary log (log₂).',
        'Custom base logarithms.',
        'Change of base formula.',
        'Log expression simplification.',
        'Antilogarithm (inverse log) calculation.',
        'Log properties reference (product, quotient, power rules).',
        'High-precision results.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Evaluating logarithms in math coursework.',
        'Computing pH values (chemistry).',
        'Calculating decibel levels (physics).',
        'Information theory calculations (log₂).',
        'Solving exponential equations.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Common Log', description: 'log₁₀(1000) = 3.' },
        { title: 'Natural Log', description: 'ln(e²) = 2.' },
        { title: 'Binary Log', description: 'log₂(256) = 8.' },
        { title: 'Change of Base', description: 'log₃(81) = log(81)/log(3) = 4.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Logarithm', definition: 'The inverse of exponentiation. logb(x) = y means b^y = x.' },
        { term: 'Natural Log (ln)', definition: 'Logarithm with base e ≈ 2.71828.' },
        { term: 'Common Log', definition: 'Logarithm with base 10, written as log or log₁₀.' },
        { term: 'Change of Base', definition: 'Formula: logb(x) = log(x) / log(b), converting any base to common or natural log.' },
        { term: 'Antilogarithm', definition: 'The inverse operation: if log(x) = y, then antilog(y) = 10^y = x.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the logarithm of a negative number?', answer: 'In real numbers, logarithms of negative numbers are undefined. In complex analysis, they have complex values.' },
        { question: 'What is log(0)?', answer: 'log(0) is undefined — it approaches negative infinity.' },
        { question: 'What is the difference between log and ln?', answer: 'log usually means base 10 (common log). ln means base e (natural log). In some fields, log means natural log.' },
        { question: 'How do I solve exponential equations?', answer: 'Take the log of both sides. For example, 2^x = 16 → x = log₂(16) = 4.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Know the three key log rules: product (log(ab) = log(a) + log(b)), quotient, and power.',
        'Use the change of base formula when your calculator only has log₁₀ and ln.',
        'Remember: log(1) = 0 for any base.',
        'Remember: logb(b) = 1 for any base b.',
        'Verify by converting back: if log₁₀(x) = 3, then x = 10³ = 1000.',
        'Use natural log for calculus and growth problems; common log for orders of magnitude.'
      ]
    }
  },
  relatedTools: ['equation-solver', 'scientific-notation-calculator', 'graph-plotter', 'calculus-reference-tool'],
  seo: {
    metaTitle: 'Logarithm Calculator — log, ln, log₂ & Custom Base | UnTrackt Wiki',
    metaDescription: 'Calculate logarithms with any base. Evaluate log₁₀, ln, log₂, custom bases, change of base, and apply log properties.',
    keywords: ['logarithm calculator', 'log calculator', 'natural log', 'log base 2', 'change of base', 'logarithm tool']
  }
};
