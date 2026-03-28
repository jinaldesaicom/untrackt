export default {
  id: 'scientific-calculator',
  title: 'Scientific Calculator',
  description: 'A full-featured scientific calculator with trigonometric, logarithmic, exponential functions, and expression evaluation.',
  content: {
    whatIs: {
      heading: 'What is the Scientific Calculator?',
      body: 'The Scientific Calculator is a comprehensive mathematical tool that goes far beyond basic arithmetic. It supports trigonometric functions (sin, cos, tan and their inverses), logarithms (natural and base-10), exponential operations, square roots, nth roots, factorials, powers, constants (π, e), and parenthetical expression evaluation. It handles both degree and radian angle modes and includes memory functions for storing intermediate results. It\'s the digital equivalent of a physical scientific calculator--always available in your browser and free to use.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Students in algebra, trigonometry, precalculus, physics, chemistry, and engineering regularly need scientific calculator functions that go beyond basic phone calculators. This tool provides those functions without requiring you to buy an expensive physical calculator or install software. It\'s available instantly on any device, supports expression entry (type the whole equation at once), and follows proper mathematical order of operations automatically.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your mathematical expression using the on-screen buttons or type it directly.',
        'Use function buttons for trigonometric (sin, cos, tan), logarithmic (log, ln), and other scientific operations.',
        'Toggle between degree and radian modes for angle calculations.',
        'Use parentheses to group operations and ensure correct order of evaluation.',
        'Press "=" or Enter to evaluate the expression and display the result.',
        'Use memory functions (M+, M-, MR, MC) to store and recall intermediate values.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Full trigonometric functions: sin, cos, tan, and their inverse (arcsin, arccos, arctan).',
        'Logarithmic functions: natural log (ln) and base-10 log, plus custom base logarithms.',
        'Exponential and power operations including square root, nth root, and exponents.',
        'Constants: π (pi), e (Euler\'s number), and other mathematical constants.',
        'Degree and radian mode toggle for trigonometric calculations.',
        'Expression evaluation with proper order of operations (PEMDAS/BODMAS).',
        'Memory functions (M+, M-, MR, MC) for multi-step calculations.',
        'Factorial, absolute value, and modulo operations.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Trigonometry students solving triangle problems using sin, cos, and tan.',
        'Physics students calculating forces, velocities, and energy using scientific notation.',
        'Chemistry students working with logarithms for pH calculations and reaction kinetics.',
        'Precalculus students evaluating complex expressions with multiple nested functions.',
        'Engineering students performing unit-heavy calculations requiring precise arithmetic.',
        'Statistics students computing probabilities and distribution values.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Trigonometric Calculation',
          description: 'sin(30°) = 0.5. In degree mode, enter sin(30) to get the sine of 30 degrees.'
        },
        {
          title: 'Logarithmic Expression',
          description: 'log(1000) = 3. The base-10 logarithm of 1000 equals 3 because 10³ = 1000.'
        },
        {
          title: 'Compound Expression',
          description: '√(3² + 4²) = 5. Using the Pythagorean theorem to find the hypotenuse of a 3-4-5 right triangle.'
        },
        {
          title: 'Natural Exponential',
          description: 'e^2 ≈ 7.389. Euler\'s number raised to the power of 2, commonly used in continuous growth calculations.'
        },
        {
          title: 'Radian Mode Calculation',
          description: 'cos(π/3) = 0.5. In radian mode, π/3 radians equals 60 degrees, and cos(60°) = 0.5.'
        },
        {
          title: 'Factorial for Combinations',
          description: '10! ÷ (3! × 7!) = 120. This computes "10 choose 3" (C(10,3)), the number of ways to select 3 items from 10.'
        }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Trigonometric Functions', definition: 'Functions (sin, cos, tan) that relate angles to ratios of sides in a right triangle. Essential in geometry, physics, and engineering.' },
        { term: 'Logarithm', definition: 'The inverse of exponentiation. log_b(x) asks "to what power must b be raised to get x?" log₁₀(100) = 2 because 10² = 100.' },
        { term: 'Radians', definition: 'A unit of angle measurement where 2π radians equals a full circle (360°). One radian ≈ 57.3 degrees.' },
        { term: 'PEMDAS/BODMAS', definition: 'The order of operations: Parentheses/Brackets, Exponents/Orders, Multiplication and Division, Addition and Subtraction--evaluated left to right within equal precedence.' },
        { term: 'Factorial', definition: 'The product of all positive integers up to n, written as n!. For example, 5! = 5 × 4 × 3 × 2 × 1 = 120.' },
        { term: 'Scientific Notation', definition: 'A way to express very large or small numbers as a coefficient times a power of 10. Example: 3.0 × 10⁸ for the speed of light in m/s.' },
        { term: 'Euler\'s Number (e)', definition: 'A mathematical constant approximately equal to 2.71828, the base of natural logarithms, fundamental to calculus and continuous growth models.' },
        { term: 'Inverse Trigonometric Functions', definition: 'Functions (arcsin, arccos, arctan) that return the angle given a trigonometric ratio. arcsin(0.5) = 30° because sin(30°) = 0.5.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'When should I use degree mode vs. radian mode?', answer: 'Use degree mode for geometry and everyday angle problems (most high school math). Use radian mode for calculus, physics, and any context where angles are expressed in terms of π.' },
        { question: 'Why does sin(90) give a wrong answer?', answer: 'Check your angle mode. In radian mode, sin(90) treats 90 as radians (not degrees) and gives ≈0.894. Switch to degree mode for sin(90°) = 1.' },
        { question: 'How do I enter exponents?', answer: 'Use the ^ button or key. For example, 2^10 computes 2 raised to the 10th power (1024). For e^x, use the dedicated exp button.' },
        { question: 'Can I type the whole expression at once?', answer: 'Yes. You can type complex expressions like "sqrt(3^2 + 4^2)" or "sin(pi/6) + cos(pi/3)" and evaluate them in one step.' },
        { question: 'What\'s the difference between log and ln?', answer: '"log" is the base-10 (common) logarithm. "ln" is the natural logarithm (base e ≈ 2.718). In some math contexts, "log" may mean natural log--check your textbook\'s convention.' },
        { question: 'Does the calculator follow order of operations?', answer: 'Yes. It follows standard PEMDAS/BODMAS rules automatically. Use parentheses to override the default precedence when needed.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always check whether you\'re in degree or radian mode before performing trigonometric calculations.',
        'Use parentheses liberally to make complex expressions unambiguous--it\'s better to over-parenthesize than get wrong results.',
        'For multi-step problems, use memory functions (M+) to store intermediate results rather than retyping them.',
        'Verify answers by working backward: if sin(θ) = 0.5, check that arcsin(0.5) returns the expected angle.',
        'When entering negative numbers in expressions, wrap them in parentheses: (-3)^2 = 9, but -3^2 may be interpreted as -(3^2) = -9.',
        'Familiarize yourself with common values: sin(30°) = 0.5, cos(60°) = 0.5, tan(45°) = 1, ln(e) = 1, log(10) = 1.'
      ]
    }
  },
  relatedTools: ['quadratic-solver', 'percentage-calculator', 'unit-converter', 'roman-numeral-converter'],
  seo: {
    metaTitle: 'Scientific Calculator - Trig, Log & Expression Evaluator - Wiki | UnTrackt',
    metaDescription: 'Free online scientific calculator with trigonometric, logarithmic, and exponential functions. Supports degree/radian modes, expression evaluation, and memory functions.',
    keywords: ['scientific calculator', 'trigonometry calculator', 'logarithm calculator', 'online calculator', 'sin cos tan', 'math calculator', 'expression evaluator', 'PEMDAS calculator']
  }
};
