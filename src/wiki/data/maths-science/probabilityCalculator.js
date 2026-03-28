export default {
  id: 'probability-calculator',
  title: 'Probability Calculator',
  description: 'Calculate probabilities — permutations, combinations, Bayes theorem, binomial and normal distributions.',
  content: {
    whatIs: {
      heading: 'What is the Probability Calculator?',
      body: 'The Probability Calculator computes probabilities for common scenarios. Calculate permutations (nPr), combinations (nCr), conditional probabilities using Bayes\' theorem, binomial distribution probabilities, normal distribution values, and compound event probabilities. Each calculation includes the formula and step-by-step work.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Probability calculations involve factorials, distributions, and conditional formulas that are easy to get wrong. This tool handles the number-crunching and shows the work, making it valuable for coursework, data science, risk analysis, and quick sanity checks.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the calculation type (combinations, permutations, Bayes, binomial, normal).',
        'Enter the required parameters (n, r, probabilities, etc.).',
        'View the computed probability with step-by-step work.',
        'For distributions, view the probability table or curve.',
        'Copy results or switch to a different calculation type.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Permutations (nPr) and combinations (nCr).',
        'Bayes\' theorem calculator.',
        'Binomial probability distribution.',
        'Normal distribution (z-scores, areas).',
        'Compound probability (AND, OR, NOT).',
        'Step-by-step formulas shown.',
        'Distribution visualizations.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Calculating lottery or game odds.',
        'Statistics and probability coursework.',
        'A/B testing probability analysis.',
        'Risk assessment probability calculations.',
        'Data science probability modeling.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Combinations', description: 'C(52,5) = 2,598,960 — number of possible 5-card poker hands.' },
        { title: 'Binomial', description: 'P(getting exactly 3 heads in 5 fair coin flips) = C(5,3) × 0.5³ × 0.5² = 0.3125.' },
        { title: 'Bayes Theorem', description: 'Given disease prevalence of 1%, test sensitivity of 95%, specificity of 90% → P(disease|positive test).' },
        { title: 'Normal Distribution', description: 'P(X < 1.96) for standard normal = 0.975 (97.5th percentile).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Permutation', definition: 'An arrangement of objects where order matters. nPr = n! / (n-r)!.' },
        { term: 'Combination', definition: 'A selection of objects where order does not matter. nCr = n! / (r!(n-r)!).' },
        { term: 'Bayes\' Theorem', definition: 'A formula for calculating conditional probability: P(A|B) = P(B|A)×P(A) / P(B).' },
        { term: 'Binomial Distribution', definition: 'The probability distribution for the number of successes in a fixed number of independent trials.' },
        { term: 'Normal Distribution', definition: 'A bell-shaped continuous probability distribution defined by mean and standard deviation.' },
        { term: 'z-score', definition: 'The number of standard deviations a value is from the mean in a normal distribution.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'When do I use permutations vs combinations?', answer: 'Use permutations when order matters (rankings, arrangements). Use combinations when order does not matter (selections, groups).' },
        { question: 'What is the maximum n for factorials?', answer: 'The calculator handles large factorials using efficient computation. Practically, nCr and nPr work for n up to several hundred.' },
        { question: 'How do I use Bayes\' theorem?', answer: 'Enter the prior probability, the likelihood (sensitivity), and the false positive rate. The calculator computes the posterior probability.' },
        { question: 'Can I look up z-scores?', answer: 'Yes. Enter a z-score to get the cumulative probability, or enter a probability to get the corresponding z-score.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Identify whether order matters before choosing permutations or combinations.',
        'Check that probabilities sum to 1 (or less for partial events) as a sanity check.',
        'Use Bayes\' theorem when updating beliefs with new evidence.',
        'For large n, use the normal approximation to the binomial.',
        'Verify results with simpler cases you can calculate mentally.',
        'Remember: P(A or B) = P(A) + P(B) - P(A and B) for non-mutually-exclusive events.'
      ]
    }
  },
  relatedTools: ['statistics-calculator', 'number-theory-calculator', 'graph-plotter', 'significant-figures-calculator'],
  seo: {
    metaTitle: 'Probability Calculator — Permutations, Combinations, Bayes | UnTrackt Wiki',
    metaDescription: 'Calculate permutations, combinations, Bayes theorem, binomial and normal distribution probabilities with step-by-step formulas.',
    keywords: ['probability calculator', 'permutations combinations', 'Bayes theorem', 'binomial distribution', 'normal distribution', 'probability tool']
  }
};
