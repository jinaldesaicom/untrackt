export default {
  id: 'complex-number-calculator',
  title: 'Complex Number Calculator',
  description: 'Arithmetic on complex numbers — add, multiply, divide, find modulus, argument, and convert between forms.',
  content: {
    whatIs: {
      heading: 'What is the Complex Number Calculator?',
      body: 'The Complex Number Calculator performs arithmetic on complex numbers in both rectangular (a + bi) and polar (r∠θ) form. Add, subtract, multiply, divide, find modulus, argument, conjugate, and convert between rectangular and polar forms. Each operation shows the detailed work.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Complex number arithmetic, especially multiplication and division, involves multiple steps and is easy to get wrong by hand. This tool handles all operations correctly, converts between forms, and shows intermediate steps for learning.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter complex numbers in a + bi form or r∠θ polar form.',
        'Select an operation: add, subtract, multiply, divide, modulus, conjugate.',
        'View the result in both rectangular and polar form.',
        'See the step-by-step calculation.',
        'Convert between rectangular and polar forms.',
        'Compute powers using De Moivre\'s theorem.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Arithmetic: add, subtract, multiply, divide.',
        'Modulus (absolute value) and argument (angle).',
        'Conjugate calculation.',
        'Rectangular ↔ polar form conversion.',
        'Powers via De Moivre\'s theorem.',
        'Step-by-step work shown.',
        'Argand diagram visualization.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Electrical engineering (impedance, phasor analysis).',
        'Signal processing calculations.',
        'Complex analysis coursework.',
        'Quantum mechanics computations.',
        'Control theory transfer function analysis.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Multiplication', description: '(3 + 2i)(1 - 4i) = 3 - 12i + 2i - 8i² = 11 - 10i.' },
        { title: 'Division', description: '(4 + 3i)/(2 - i) = multiply by conjugate → (5 + 10i)/5 = 1 + 2i.' },
        { title: 'Modulus', description: '|3 + 4i| = √(9 + 16) = 5.' },
        { title: 'Polar Form', description: '1 + i = √2 ∠ 45° = √2 · e^(iπ/4).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Complex Number', definition: 'A number of the form a + bi where a is the real part, b is the imaginary part, and i = √(-1).' },
        { term: 'Modulus', definition: 'The absolute value |z| = √(a² + b²) — the distance from the origin in the complex plane.' },
        { term: 'Argument', definition: 'The angle θ from the positive real axis to the complex number in the complex plane.' },
        { term: 'Conjugate', definition: 'The complex number with the imaginary part negated: if z = a + bi, then z̄ = a - bi.' },
        { term: 'Polar Form', definition: 'Expressing a complex number as r(cos θ + i sin θ) or r∠θ.' },
        { term: 'De Moivre\'s Theorem', definition: '(r∠θ)^n = r^n ∠ nθ — efficient computation of powers and roots of complex numbers.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'When is polar form more useful?', answer: 'Polar form makes multiplication, division, and powers much easier than rectangular form.' },
        { question: 'What is i²?', answer: 'i² = -1 by definition. This is the fundamental property of imaginary numbers.' },
        { question: 'How do I divide complex numbers?', answer: 'Multiply numerator and denominator by the conjugate of the denominator to get a real denominator.' },
        { question: 'What is the Argand diagram?', answer: 'A plot of complex numbers on a plane where the x-axis is the real part and y-axis is the imaginary part.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use rectangular form for addition and subtraction.',
        'Use polar form for multiplication, division, and powers.',
        'Always multiply by the conjugate when dividing in rectangular form.',
        'Remember i² = -1 when expanding products.',
        'Verify results by converting back to the other form.',
        'Use De Moivre\'s theorem for computing roots of complex numbers.'
      ]
    }
  },
  relatedTools: ['matrix-calculator', 'equation-solver', 'trigonometry-calculator', 'graph-plotter'],
  seo: {
    metaTitle: 'Complex Number Calculator — Arithmetic & Conversions | UnTrackt Wiki',
    metaDescription: 'Perform arithmetic on complex numbers. Add, multiply, divide, find modulus and argument, and convert between rectangular and polar forms.',
    keywords: ['complex number calculator', 'complex arithmetic', 'polar form', 'modulus argument', 'imaginary numbers', 'complex math']
  }
};
