export default {
  id: 'scientific-notation-calculator',
  title: 'Scientific Notation Calculator',
  description: 'Convert numbers to and from scientific notation. Perform arithmetic in scientific notation with proper formatting.',
  content: {
    whatIs: {
      heading: 'What is the Scientific Notation Calculator?',
      body: 'The Scientific Notation Calculator converts numbers between standard form and scientific notation. Perform addition, subtraction, multiplication, and division on numbers in scientific notation, and get results properly formatted with the correct number of significant figures.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Science deals with very large (speed of light: 3 × 10⁸) and very small (electron mass: 9.1 × 10⁻³¹) numbers. Scientific notation makes these manageable. This tool converts and computes with them correctly, handling exponent arithmetic and sig figs.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter a number in standard form or scientific notation.',
        'View the conversion to the other form.',
        'For calculations, enter two numbers in scientific notation.',
        'Select the operation (×, ÷, +, -).',
        'View the result in proper scientific notation.',
        'Check significant figures in the result.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Standard to scientific notation conversion.',
        'Scientific to standard notation conversion.',
        'Arithmetic in scientific notation.',
        'Proper normalization (coefficient between 1 and 10).',
        'Significant figure tracking.',
        'Engineering notation (exponents in multiples of 3).',
        'Copy formatted output.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics calculations with very large or small numbers.',
        'Chemistry mole and atom calculations.',
        'Astronomy distance and mass calculations.',
        'Formatting lab results in scientific notation.',
        'Quick conversions during problem solving.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Standard to Scientific', description: '0.000045 = 4.5 × 10⁻⁵.' },
        { title: 'Large Number', description: '602,200,000,000,000,000,000,000 = 6.022 × 10²³.' },
        { title: 'Multiplication', description: '(3.0 × 10⁸) × (2.0 × 10⁻³) = 6.0 × 10⁵.' },
        { title: 'Division', description: '(8.4 × 10⁶) ÷ (2.1 × 10²) = 4.0 × 10⁴.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Scientific Notation', definition: 'A number written as a coefficient (1 ≤ |c| < 10) times a power of 10: c × 10ⁿ.' },
        { term: 'Coefficient', definition: 'The number in front of the power of 10. Must be between 1 and 10 (exclusive) for proper scientific notation.' },
        { term: 'Exponent', definition: 'The power of 10. Positive for large numbers, negative for small numbers.' },
        { term: 'Normalization', definition: 'Adjusting the coefficient and exponent so the coefficient is between 1 and 10.' },
        { term: 'Engineering Notation', definition: 'Like scientific notation but exponents are restricted to multiples of 3 (matching SI prefixes).' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How do I multiply in scientific notation?', answer: 'Multiply the coefficients and add the exponents: (a × 10ⁿ)(b × 10ᵐ) = (ab) × 10ⁿ⁺ᵐ. Then normalize.' },
        { question: 'How do I add in scientific notation?', answer: 'Convert to the same exponent first, then add the coefficients. Re-normalize if needed.' },
        { question: 'What is engineering notation?', answer: 'Exponents are multiples of 3, aligning with SI prefixes (kilo = 10³, micro = 10⁻⁶, etc.).' },
        { question: 'How many sig figs should the result have?', answer: 'For ×/÷: same as the operand with fewest sig figs. For +/-: same decimal place as the least precise operand.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always normalize: coefficient should be between 1 and 10.',
        'For multiplication: multiply coefficients, add exponents.',
        'For division: divide coefficients, subtract exponents.',
        'For addition/subtraction: match exponents first, then compute.',
        'Track significant figures through operations.',
        'Use engineering notation when working with SI prefixes for easier interpretation.'
      ]
    }
  },
  relatedTools: ['significant-figures-calculator', 'unit-converter-scientific', 'logarithm-calculator', 'error-uncertainty-calculator'],
  seo: {
    metaTitle: 'Scientific Notation Calculator — Convert & Compute | UnTrackt Wiki',
    metaDescription: 'Convert numbers to and from scientific notation. Perform arithmetic in scientific notation with proper normalization and significant figures.',
    keywords: ['scientific notation', 'scientific notation calculator', 'powers of ten', 'exponent arithmetic', 'engineering notation', 'number format']
  }
};
