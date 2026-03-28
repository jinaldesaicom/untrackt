export default {
  id: 'quadratic-solver',
  title: 'Quadratic Solver',
  description: 'Solve quadratic equations step by step, find real and complex roots, vertex, axis of symmetry, and graph the parabola.',
  content: {
    whatIs: {
      heading: 'What is the Quadratic Solver?',
      body: 'The Quadratic Solver is a mathematical tool that solves any quadratic equation of the form ax² + bx + c = 0. It computes the roots (solutions) using the quadratic formula, determines whether the roots are real or complex, calculates the discriminant, identifies the vertex and axis of symmetry, and provides a step-by-step breakdown of the entire solution process. It\'s the ideal companion for algebra, precalculus, and physics students who need to solve quadratic equations quickly while understanding the underlying mathematics.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Quadratic equations appear throughout mathematics and science--from projectile motion in physics to optimization problems in calculus. While the quadratic formula is straightforward, arithmetic errors with negative numbers, radicals, and complex numbers are extremely common. This solver eliminates calculation mistakes, shows every step of the solution process for learning, and provides the geometric interpretation (vertex, parabola direction) that helps build deeper mathematical intuition.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the coefficients a, b, and c from your equation ax² + bx + c = 0.',
        'Click "Solve" to compute the roots and all related properties.',
        'Review the discriminant value to understand the nature of the roots (two real, one repeated, or two complex).',
        'Examine the step-by-step solution showing the quadratic formula applied to your specific values.',
        'View the vertex (h, k) and axis of symmetry for graphing the parabola.',
        'Check whether the parabola opens upward (a > 0) or downward (a < 0).'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Solves any quadratic equation ax² + bx + c = 0 with real or complex coefficients.',
        'Computes exact roots in simplified radical form and decimal approximations.',
        'Handles all discriminant cases: positive (two real roots), zero (repeated root), and negative (complex roots).',
        'Step-by-step solution walkthrough showing the quadratic formula application.',
        'Calculates vertex coordinates (h, k), axis of symmetry, and parabola direction.',
        'Shows the factored form of the equation when roots are rational.',
        'Displays the discriminant (b² - 4ac) and its interpretation.',
        'Instant calculation with no page reloads.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Algebra students solving quadratic equations for homework and test preparation.',
        'Physics students finding the time at which a projectile reaches a certain height.',
        'Precalculus students analyzing parabolas and their properties.',
        'Engineering students solving design equations that reduce to quadratic form.',
        'Students verifying their hand calculations before submitting assignments.',
        'Tutors demonstrating step-by-step solution methods to students.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Two Real Roots',
          description: 'x² - 5x + 6 = 0 → Discriminant = 1 (positive). Roots: x = 3 and x = 2. Factored form: (x - 3)(x - 2) = 0.'
        },
        {
          title: 'One Repeated Root',
          description: 'x² - 6x + 9 = 0 → Discriminant = 0. One repeated root: x = 3. Factored form: (x - 3)² = 0.'
        },
        {
          title: 'Complex Roots',
          description: 'x² + 2x + 5 = 0 → Discriminant = -16 (negative). Roots: x = -1 + 2i and x = -1 - 2i. No real x-intercepts.'
        },
        {
          title: 'Projectile Motion',
          description: 'A ball thrown upward follows h = -16t² + 48t + 5. Setting h = 0 and solving: t ≈ 3.10 seconds (positive root) is when it hits the ground.'
        },
        {
          title: 'Vertex and Axis of Symmetry',
          description: 'For y = 2x² - 8x + 3: vertex = (2, -5), axis of symmetry: x = 2, opens upward since a = 2 > 0.'
        },
        {
          title: 'Irrational Roots',
          description: 'x² - 3x + 1 = 0 → Roots: x = (3 ± √5) / 2 ≈ 2.618 and ≈ 0.382. Exact radical form preserved.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Quadratic Equation', definition: 'A polynomial equation of degree 2, in standard form ax² + bx + c = 0, where a ≠ 0.' },
        { term: 'Discriminant', definition: 'The expression b² - 4ac that determines the nature of the roots. Positive: two real roots. Zero: one repeated root. Negative: two complex conjugate roots.' },
        { term: 'Quadratic Formula', definition: 'x = (-b ± √(b² - 4ac)) / 2a -- the universal formula for finding the roots of any quadratic equation.' },
        { term: 'Vertex', definition: 'The highest or lowest point of a parabola, located at (h, k) where h = -b/(2a) and k = f(h). It\'s the turning point of the curve.' },
        { term: 'Axis of Symmetry', definition: 'A vertical line x = -b/(2a) that divides the parabola into two mirror-image halves, passing through the vertex.' },
        { term: 'Parabola', definition: 'The U-shaped curve defined by a quadratic function y = ax² + bx + c. Opens upward when a > 0 and downward when a < 0.' },
        { term: 'Complex Roots', definition: 'Solutions involving imaginary numbers (i = √(-1)). They occur in conjugate pairs when the discriminant is negative.' },
        { term: 'Factored Form', definition: 'An equivalent way to write a quadratic: a(x - r₁)(x - r₂), where r₁ and r₂ are the roots. Only has rational factors when roots are rational.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What does the discriminant tell me?', answer: 'If b² - 4ac > 0, the equation has two distinct real roots. If it equals 0, there\'s exactly one repeated real root. If it\'s negative, the roots are complex conjugates (involving imaginary numbers).' },
        { question: 'Can I solve equations not in standard form?', answer: 'Yes. Rearrange your equation to the form ax² + bx + c = 0 first, then enter the coefficients. For example, 3x² = 12 becomes 3x² - 12 = 0, so a=3, b=0, c=-12.' },
        { question: 'What are complex roots and do they matter?', answer: 'Complex roots contain the imaginary unit i (√(-1)). They mean the parabola doesn\'t cross the x-axis. They\'re important in advanced math, engineering, and physics even though they\'re not "real" numbers.' },
        { question: 'How do I find the vertex from the equation?', answer: 'The vertex is at x = -b/(2a). Plug this x value back into the equation to find the y-coordinate. The solver calculates this automatically.' },
        { question: 'Can this solve higher-degree equations?', answer: 'This tool is specifically for degree-2 (quadratic) equations. For cubic or quartic equations, different formulas and methods are needed.' },
        { question: 'Why can\'t a equal zero?', answer: 'If a = 0, the equation becomes bx + c = 0, which is linear, not quadratic. A quadratic equation must have a non-zero x² coefficient.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always write your equation in standard form (ax² + bx + c = 0) before identifying coefficients.',
        'Double-check the sign of each coefficient, especially b and c. Sign errors are the most common mistake.',
        'Use this tool to verify your hand calculations, not replace learning the quadratic formula.',
        'When the discriminant is a perfect square, the roots are rational--try factoring the original equation as practice.',
        'For word problems (projectile motion, area), set up the equation carefully before plugging in coefficients.',
        'Remember that the vertex form y = a(x - h)² + k immediately gives you the vertex (h, k) without calculation.',
        'Sketch a rough graph using the vertex, direction (sign of a), and roots to build geometric intuition.'
      ]
    }
  },
  relatedTools: ['scientific-calculator', 'percentage-calculator', 'gpa-calculator', 'unit-converter'],
  seo: {
    metaTitle: 'Quadratic Solver - Roots, Vertex & Step-by-Step Solutions - Wiki | UnTrackt',
    metaDescription: 'Solve quadratic equations step by step. Find real and complex roots, discriminant, vertex, axis of symmetry, and factored form for any ax² + bx + c = 0.',
    keywords: ['quadratic solver', 'quadratic formula', 'solve quadratic equation', 'discriminant', 'vertex', 'parabola', 'roots of equation', 'quadratic calculator', 'complex roots']
  }
};
