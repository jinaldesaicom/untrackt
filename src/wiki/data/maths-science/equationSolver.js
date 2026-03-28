export default {
  id: 'equation-solver',
  title: 'Equation Solver',
  description: 'Solve linear, quadratic, and polynomial equations step by step. Enter an equation and get solutions with work shown.',
  content: {
    whatIs: {
      heading: 'What is the Equation Solver?',
      body: 'The Equation Solver finds solutions to algebraic equations including linear (ax + b = 0), quadratic (ax² + bx + c = 0), and higher-degree polynomial equations. Enter an equation and get the solutions with step-by-step work shown, including the methods used (factoring, quadratic formula, numerical methods).'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Solving equations is fundamental to mathematics, science, and engineering. This tool provides instant solutions with detailed steps, making it valuable for checking homework, verifying manual calculations, and learning solution techniques.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the equation in standard form or as an expression equal to zero.',
        'Select the equation type if needed (linear, quadratic, polynomial).',
        'Click solve to find the solutions.',
        'View the step-by-step solution process.',
        'For quadratic equations, see the discriminant and nature of roots.',
        'Copy the solution or start a new problem.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Linear equation solving.',
        'Quadratic formula with discriminant analysis.',
        'Polynomial equation solving up to degree 4.',
        'Step-by-step solution display.',
        'Real and complex root identification.',
        'Factored form output.',
        'Graphical representation of solutions.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Solving algebra homework problems with verification.',
        'Finding roots of quadratic equations in physics.',
        'Solving engineering equations for unknowns.',
        'Learning factoring and solution techniques.',
        'Quick root-finding during problem sets.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Linear', description: '3x + 7 = 22 → x = 5.' },
        { title: 'Quadratic (real roots)', description: 'x² - 5x + 6 = 0 → x = 2 and x = 3 (using factoring).' },
        { title: 'Quadratic (complex roots)', description: 'x² + 1 = 0 → x = i and x = -i.' },
        { title: 'Cubic', description: 'x³ - 6x² + 11x - 6 = 0 → x = 1, 2, 3.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Root', definition: 'A value of x that makes the equation equal to zero, also called a solution or zero.' },
        { term: 'Discriminant', definition: 'b² - 4ac for quadratic equations. Determines if roots are real (positive), repeated (zero), or complex (negative).' },
        { term: 'Quadratic Formula', definition: 'x = (-b ± √(b²-4ac)) / 2a — the formula for solving any quadratic equation.' },
        { term: 'Factoring', definition: 'Expressing an equation as a product of simpler factors to find roots.' },
        { term: 'Polynomial', definition: 'An expression with variables raised to non-negative integer powers: aₙxⁿ + ... + a₁x + a₀.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Can it solve equations with fractions?', answer: 'Yes. Enter fractions and the solver will handle clearing denominators in the solution steps.' },
        { question: 'What if the equation has no real solutions?', answer: 'The solver identifies complex roots and displays them in a + bi form.' },
        { question: 'Can it handle systems of equations?', answer: 'For systems, use the Matrix Calculator which can solve via row reduction.' },
        { question: 'What about higher-degree polynomials?', answer: 'The solver handles polynomials up to degree 4 analytically and uses numerical methods for higher degrees.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Simplify the equation before entering it for cleaner steps.',
        'Check the discriminant first for quadratic equations to know what to expect.',
        'Verify solutions by substituting back into the original equation.',
        'Use the step-by-step output to learn techniques, not just get answers.',
        'For word problems, set up the equation first, then use the solver.',
        'Try factoring mentally before resorting to the quadratic formula.'
      ]
    }
  },
  relatedTools: ['polynomial-calculator', 'matrix-calculator', 'complex-number-calculator', 'graph-plotter'],
  seo: {
    metaTitle: 'Equation Solver — Linear, Quadratic & Polynomial | UnTrackt Wiki',
    metaDescription: 'Solve linear, quadratic, and polynomial equations with step-by-step solutions. See factoring, quadratic formula, and root analysis.',
    keywords: ['equation solver', 'quadratic equation', 'solve equations', 'polynomial roots', 'algebra solver', 'quadratic formula']
  }
};
