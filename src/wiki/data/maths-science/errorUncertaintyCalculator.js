export default {
  id: 'error-uncertainty-calculator',
  title: 'Error & Uncertainty Calculator',
  description: 'Calculate absolute error, relative error, percentage error, and propagate uncertainties through calculations.',
  content: {
    whatIs: {
      heading: 'What is the Error & Uncertainty Calculator?',
      body: 'The Error & Uncertainty Calculator computes and propagates measurement errors. Calculate absolute error, relative (fractional) error, and percentage error from experimental and accepted values. Propagate uncertainties through addition, subtraction, multiplication, division, and power operations using standard propagation rules.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Every scientific measurement has uncertainty. Properly calculating and propagating errors ensures results are reported with appropriate confidence. Error propagation formulas are easy to misapply — this tool handles them correctly and shows the work.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'For basic error: enter the measured and accepted values.',
        'View absolute, relative, and percentage error.',
        'For propagation: enter values with their uncertainties.',
        'Select the operation (+, -, ×, ÷, power).',
        'View the result with propagated uncertainty.',
        'See the propagation formula applied.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Absolute error calculation.',
        'Relative (fractional) error.',
        'Percentage error.',
        'Uncertainty propagation for + - × ÷.',
        'Power function propagation.',
        'Multi-step propagation.',
        'Formula display for each propagation rule.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics lab error analysis.',
        'Chemistry lab uncertainty reporting.',
        'Engineering measurement tolerance analysis.',
        'Experimental data analysis with error bars.',
        'IB and AP science internal assessments.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Percentage Error', description: 'Measured: 9.7 m/s², Accepted: 9.8 m/s² → %error = |9.7-9.8|/9.8 × 100 = 1.02%.' },
        { title: 'Addition Propagation', description: '(5.0 ± 0.1) + (3.0 ± 0.2) = 8.0 ± 0.22 (add uncertainties in quadrature).' },
        { title: 'Multiplication', description: '(4.0 ± 0.1) × (2.0 ± 0.05) = 8.0 ± 0.28 (add relative uncertainties in quadrature).' },
        { title: 'Power', description: '(3.0 ± 0.1)² = 9.0 ± 0.6 (relative uncertainty doubles).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Absolute Error', definition: 'The magnitude of the difference between the measured and accepted values: |measured - accepted|.' },
        { term: 'Relative Error', definition: 'Absolute error divided by the accepted value: |error|/accepted.' },
        { term: 'Percentage Error', definition: 'Relative error × 100%.' },
        { term: 'Uncertainty', definition: 'The estimated range within which the true value lies, denoted with ±.' },
        { term: 'Propagation', definition: 'The process of calculating how measurement uncertainties affect the uncertainty of a calculated result.' },
        { term: 'Quadrature', definition: 'Adding uncertainties in quadrature: √(δa² + δb²). Used for independent random errors.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'When do I add absolute vs relative uncertainties?', answer: 'For + and -: add absolute uncertainties (in quadrature). For × and ÷: add relative uncertainties (in quadrature).' },
        { question: 'What is propagation in quadrature?', answer: 'Instead of simply adding uncertainties, take the square root of the sum of squares: √(δa² + δb²). This is more accurate for independent errors.' },
        { question: 'Should I use max/min or quadrature method?', answer: 'Quadrature is more statistically valid for random errors. Max/min (linear addition) gives a worst-case estimate.' },
        { question: 'What about systematic errors?', answer: 'Systematic errors are not random — they shift all values in one direction. They should be identified and corrected, not propagated.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always report results with uncertainty: value ± uncertainty.',
        'Use quadrature for independent random uncertainties.',
        'For powers, multiply relative uncertainty by the exponent.',
        'Match uncertainty precision to the result (e.g., 9.8 ± 0.1, not 9.8 ± 0.1234).',
        'Identify and separate systematic and random errors.',
        'Percentage error tells you accuracy; uncertainty tells you precision.'
      ]
    }
  },
  relatedTools: ['significant-figures-calculator', 'statistics-calculator', 'scientific-notation-calculator', 'unit-converter-scientific'],
  seo: {
    metaTitle: 'Error & Uncertainty Calculator — Error Propagation | UnTrackt Wiki',
    metaDescription: 'Calculate absolute, relative, and percentage error. Propagate uncertainties through arithmetic operations using standard error propagation rules.',
    keywords: ['error calculator', 'uncertainty propagation', 'percentage error', 'error analysis', 'measurement uncertainty', 'error propagation']
  }
};
