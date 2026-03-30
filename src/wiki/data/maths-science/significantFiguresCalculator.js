export default {
  id: 'significant-figures-calculator',
  title: 'Significant Figures Calculator',
  description: 'Count significant figures, round to the correct number of sig figs, and apply sig fig rules to calculations.',
  content: {
    whatIs: {
      heading: 'What is the Significant Figures Calculator?',
      body: 'The Significant Figures Calculator counts the number of significant figures in a number, rounds values to a specified number of sig figs, and applies significant figure rules to arithmetic operations. Enter a number or an expression and get the correctly rounded result with an explanation of which sig fig rules were applied.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Significant figures determine the precision of scientific measurements. Getting sig fig counts wrong leads to false precision or unnecessary truncation. This tool applies the rules consistently and shows its reasoning, making it a reliable reference for lab work and coursework.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a number to count its significant figures.',
        'Enter a target number of sig figs to round to.',
        'For calculations, enter the expression (e.g., 3.42 × 1.7).',
        'View the result rounded to the correct number of sig figs.',
        'See which rules were applied.',
        'Copy the result or try another number.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Count significant figures in any number.',
        'Round to a specified number of sig figs.',
        'Apply sig fig rules to + - × ÷ operations.',
        'Handle trailing zeros, leading zeros, and exact numbers.',
        'Rule explanation for each operation.',
        'Scientific notation sig fig counting.',
        'Multi-step calculation tracking.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Lab report data with proper significant figures.',
        'Chemistry and physics homework sig fig problems.',
        'Rounding experimental results correctly.',
        'Verifying sig fig counts in scientific papers.',
        'Teaching sig fig rules with worked examples.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Counting', description: '0.00340 has 3 sig figs (leading zeros are not significant, trailing zero after decimal is).' },
        { title: 'Rounding', description: '3.14159 rounded to 3 sig figs = 3.14.' },
        { title: 'Multiplication', description: '2.5 × 3.42 = 8.55 → 8.6 (2 sig figs, limited by 2.5).' },
        { title: 'Addition', description: '12.11 + 0.3 = 12.41 → 12.4 (1 decimal place, limited by 0.3).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Significant Figures', definition: 'The digits in a number that carry meaningful precision about the measurement.' },
        { term: 'Leading Zeros', definition: 'Zeros before the first non-zero digit (e.g., 0.005). They are NOT significant.' },
        { term: 'Trailing Zeros', definition: 'Zeros at the end of a number. Significant if after a decimal point (e.g., 2.50), ambiguous without (e.g., 200).' },
        { term: 'Exact Number', definition: 'A number with infinite sig figs — defined values or counts (e.g., 12 inches = 1 foot, exactly).' },
        { term: 'Precision', definition: 'The degree of refinement of a measurement, indicated by the number of significant figures.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Are trailing zeros significant?', answer: 'After a decimal point: yes (2.50 = 3 sig figs). Before a decimal or without one: ambiguous (200 could be 1, 2, or 3 sig figs).' },
        { question: 'Multiplication vs addition rules?', answer: 'For ×/÷: result has the same number of sig figs as the operand with fewest. For +/-: result has the same number of decimal places as the operand with fewest.' },
        { question: 'How do I handle exact numbers?', answer: 'Exact numbers (definitions, counts) have infinite sig figs and never limit the result.' },
        { question: 'What about scientific notation?', answer: 'In scientific notation, all digits in the coefficient are significant. 3.40 × 10³ has 3 sig figs.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use scientific notation to make sig fig counts unambiguous (e.g., 2.00 × 10² vs 200).',
        'Apply rounding only at the final step of multi-step calculations to avoid cumulative rounding error.',
        'Remember: leading zeros never count. Captive zeros always count. Trailing zeros count after a decimal.',
        'For addition/subtraction, think in terms of decimal places, not sig figs.',
        'Use the calculator to verify your sig fig count before submitting lab reports.',
        'When in doubt, write numbers in scientific notation.'
      ]
    }
  },
  relatedTools: ['scientific-notation-calculator', 'error-uncertainty-calculator', 'unit-converter-scientific', 'statistics-calculator'],
  seo: {
    metaTitle: 'Significant Figures Calculator — Count, Round & Apply Rules | UnTrackt Wiki',
    metaDescription: 'Count significant figures, round to sig figs, and apply sig fig rules to calculations. Handle trailing zeros, scientific notation, and more.',
    keywords: ['significant figures', 'sig figs calculator', 'rounding sig figs', 'significant figures rules', 'precision', 'scientific measurement']
  }
};
