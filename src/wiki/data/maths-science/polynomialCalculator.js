export default {
  id: 'polynomial-calculator',
  title: 'Polynomial Calculator',
  description: 'Add, subtract, multiply, divide, and factor polynomials. Find roots, degree, and perform synthetic division.',
  content: {
    whatIs: {
      heading: 'What is the Polynomial Calculator?',
      body: 'The Polynomial Calculator performs arithmetic and analysis on polynomials. Add, subtract, multiply, and divide polynomials. Factor them, find their roots, determine degree, and perform synthetic division. Enter polynomials by their coefficients and get results with step-by-step work.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Polynomial operations get progressively harder as degree increases. Long division and factoring of higher-degree polynomials are time-consuming and error-prone. This calculator does the heavy lifting and shows the work so you can learn the technique or verify your manual calculations.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter polynomial coefficients or type an expression like 3x³ - 2x + 1.',
        'For binary operations, enter a second polynomial.',
        'Select the operation: add, subtract, multiply, divide, factor, find roots.',
        'View the result and step-by-step solution.',
        'For division, see quotient and remainder.',
        'Copy results or start a new calculation.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Polynomial addition, subtraction, and multiplication.',
        'Polynomial long division and synthetic division.',
        'Factoring over integers and rationals.',
        'Root-finding for polynomials up to degree 4.',
        'Degree and leading coefficient identification.',
        'Step-by-step work shown.',
        'Coefficient and expression input modes.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Algebra coursework involving polynomial manipulation.',
        'Factoring polynomials for calculus integration.',
        'Checking polynomial long division work.',
        'Finding rational roots using the rational root theorem.',
        'Engineering and physics problems involving polynomial expressions.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Multiplication', description: '(x + 2)(x - 3) = x² - x - 6.' },
        { title: 'Long Division', description: '(x³ - 6x² + 11x - 6) ÷ (x - 1) = x² - 5x + 6.' },
        { title: 'Factoring', description: 'x² - 5x + 6 = (x - 2)(x - 3).' },
        { title: 'Synthetic Division', description: 'Divide by (x - 2) using synthetic division for a quick quotient.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Polynomial', definition: 'An expression of the form aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀.' },
        { term: 'Degree', definition: 'The highest power of x with a non-zero coefficient in a polynomial.' },
        { term: 'Synthetic Division', definition: 'A shorthand method for dividing a polynomial by (x - c) using only the coefficients.' },
        { term: 'Factor', definition: 'To express a polynomial as a product of lower-degree polynomials.' },
        { term: 'Remainder', definition: 'The polynomial left over after division when the divisor does not divide evenly.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What degree polynomials are supported?', answer: 'Any degree for arithmetic operations. Root-finding is analytical up to degree 4 and numerical for higher degrees.' },
        { question: 'Can it factor over complex numbers?', answer: 'It factors over integers and rationals. Complex roots are identified but not used for factoring.' },
        { question: 'How does synthetic division work?', answer: 'It uses only the coefficients and the divisor root value, performing additions and multiplications in a compact table.' },
        { question: 'Can I enter the polynomial as an expression?', answer: 'Yes. Type expressions like 2x^3 - 4x + 1 or enter coefficients as a list.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Double-check that all terms are entered, including zero coefficients for missing powers.',
        'Use synthetic division when dividing by (x - c) — it is faster than long division.',
        'Factor before finding roots when possible — it simplifies the problem.',
        'Verify division by multiplying quotient × divisor + remainder = original polynomial.',
        'Use the rational root theorem to identify possible rational roots.',
        'Graph the polynomial to visually verify the number and location of roots.'
      ]
    }
  },
  relatedTools: ['equation-solver', 'graph-plotter', 'complex-number-calculator', 'calculus-reference-tool'],
  seo: {
    metaTitle: 'Polynomial Calculator — Operations, Factoring & Roots | UnTrackt Wiki',
    metaDescription: 'Add, subtract, multiply, divide, and factor polynomials. Find roots, perform synthetic division, and see step-by-step solutions.',
    keywords: ['polynomial calculator', 'factor polynomial', 'polynomial division', 'synthetic division', 'polynomial roots', 'algebra calculator']
  }
};
