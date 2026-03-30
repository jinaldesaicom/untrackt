export default {
  id: 'fraction-calculator',
  title: 'Fraction Calculator',
  description: 'Add, subtract, multiply, and divide fractions. Simplify, convert to decimals, and work with mixed numbers.',
  content: {
    whatIs: {
      heading: 'What is the Fraction Calculator?',
      body: 'The Fraction Calculator performs arithmetic on fractions and mixed numbers. Add, subtract, multiply, and divide fractions, simplify to lowest terms, convert between improper fractions and mixed numbers, and convert to/from decimals. Each operation shows the step-by-step solution.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Fraction arithmetic involving finding common denominators, cross-multiplying, and simplifying is error-prone by hand. This calculator does it accurately and shows the work, making it useful for homework verification, teaching, and quick calculations.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the first fraction (numerator and denominator).',
        'Select the operation (+, -, ×, ÷).',
        'Enter the second fraction.',
        'View the result in simplified form.',
        'Toggle between improper fraction and mixed number display.',
        'See the step-by-step solution.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Add, subtract, multiply, and divide fractions.',
        'Mixed number support.',
        'Auto-simplification to lowest terms.',
        'Improper fraction to mixed number conversion.',
        'Fraction to decimal conversion.',
        'Step-by-step solution display.',
        'Multiple fractions in a single calculation.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Elementary and middle school math homework.',
        'Cooking recipe scaling with fractional measurements.',
        'Construction and woodworking calculations.',
        'Verifying manual fraction work.',
        'Quick fraction-to-decimal conversions.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Addition', description: '1/3 + 1/4 = 4/12 + 3/12 = 7/12.' },
        { title: 'Multiplication', description: '2/3 × 3/5 = 6/15 = 2/5 (simplified).' },
        { title: 'Division', description: '3/4 ÷ 2/3 = 3/4 × 3/2 = 9/8 = 1 1/8.' },
        { title: 'Mixed Numbers', description: '2 1/2 + 1 3/4 = 5/2 + 7/4 = 10/4 + 7/4 = 17/4 = 4 1/4.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Fraction', definition: 'A number expressed as a ratio of two integers: numerator / denominator.' },
        { term: 'Numerator', definition: 'The top number in a fraction — the number of parts taken.' },
        { term: 'Denominator', definition: 'The bottom number in a fraction — the total number of equal parts.' },
        { term: 'Mixed Number', definition: 'A whole number combined with a proper fraction (e.g., 3 1/2).' },
        { term: 'Improper Fraction', definition: 'A fraction where the numerator is greater than or equal to the denominator (e.g., 7/4).' },
        { term: 'Lowest Terms', definition: 'A fraction where the numerator and denominator share no common factors other than 1.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How do I find a common denominator?', answer: 'The calculator finds the LCD automatically. To do it manually, find the LCM of the denominators.' },
        { question: 'Can I enter negative fractions?', answer: 'Yes. Enter a negative numerator for negative fractions.' },
        { question: 'What about whole numbers?', answer: 'Enter a whole number as a fraction with denominator 1 (e.g., 5/1) or use mixed number mode.' },
        { question: 'How does simplification work?', answer: 'The calculator divides numerator and denominator by their GCD to get lowest terms.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Simplify fractions before multiplying to keep numbers small.',
        'Convert mixed numbers to improper fractions before operating.',
        'Use the GCD to simplify — divide both numerator and denominator by their greatest common divisor.',
        'For division, multiply by the reciprocal of the divisor.',
        'Double-check by converting the result to a decimal for a sanity check.',
        'Use the step-by-step display to learn the technique, not just get the answer.'
      ]
    }
  },
  relatedTools: ['equation-solver', 'prime-number-tools', 'statistics-calculator', 'significant-figures-calculator'],
  seo: {
    metaTitle: 'Fraction Calculator — Add, Subtract, Multiply, Divide Fractions | UnTrackt Wiki',
    metaDescription: 'Perform fraction arithmetic with step-by-step solutions. Add, subtract, multiply, divide fractions, simplify, and convert mixed numbers.',
    keywords: ['fraction calculator', 'add fractions', 'fraction arithmetic', 'mixed numbers', 'simplify fractions', 'fraction tool']
  }
};
