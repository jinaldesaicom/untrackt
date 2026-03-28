export default {
  id: 'trigonometry-calculator',
  title: 'Trigonometry Calculator',
  description: 'Calculate sin, cos, tan and their inverses. Solve triangles, convert degrees/radians, and explore identities.',
  content: {
    whatIs: {
      heading: 'What is the Trigonometry Calculator?',
      body: 'The Trigonometry Calculator evaluates all six trig functions (sin, cos, tan, csc, sec, cot) and their inverses. Solve triangles using the law of sines and cosines, convert between degrees and radians, look up exact values for common angles, and reference key identities.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Trig calculations come up constantly in math, physics, engineering, and computer graphics. This tool evaluates functions, solves triangles, and provides a reference for identities and exact values, saving time and reducing errors.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select a mode: function evaluation, triangle solver, or unit conversion.',
        'For function evaluation: enter an angle and select the function.',
        'For triangle solving: enter known sides and angles.',
        'Choose degrees or radians as the angle unit.',
        'View results with exact values when available.',
        'Reference the identity sheet for verification.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'All six trig functions and their inverses.',
        'Degree and radian mode.',
        'Exact values for standard angles (30°, 45°, 60°, etc.).',
        'Triangle solver (law of sines, law of cosines).',
        'Degree ↔ radian conversion.',
        'Identity reference sheet.',
        'Unit circle visualization.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Evaluating trig functions for physics problems.',
        'Solving triangles for engineering and surveying.',
        'Precalculus and trig coursework.',
        'Quick angle conversions between degrees and radians.',
        'Verifying trig identity work.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Exact Values', description: 'sin(30°) = 1/2, cos(60°) = 1/2, tan(45°) = 1.' },
        { title: 'Triangle Solver', description: 'Given a = 5, b = 7, C = 60° → c = 6.24 using law of cosines.' },
        { title: 'Radian Conversion', description: '180° = π rad, 90° = π/2 rad, 45° = π/4 rad.' },
        { title: 'Inverse Trig', description: 'arcsin(0.5) = 30° = π/6 rad.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Sine (sin)', definition: 'In a right triangle, the ratio of the opposite side to the hypotenuse.' },
        { term: 'Cosine (cos)', definition: 'In a right triangle, the ratio of the adjacent side to the hypotenuse.' },
        { term: 'Tangent (tan)', definition: 'In a right triangle, the ratio of the opposite side to the adjacent side. tan = sin/cos.' },
        { term: 'Radian', definition: 'An angle measure where one full revolution = 2π radians = 360°.' },
        { term: 'Unit Circle', definition: 'A circle of radius 1 centered at the origin, used to define trig functions for all angles.' },
        { term: 'Law of Cosines', definition: 'c² = a² + b² - 2ab·cos(C) — generalizes the Pythagorean theorem to any triangle.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Should I use degrees or radians?', answer: 'Use degrees for everyday angles. Use radians for calculus and most scientific applications.' },
        { question: 'What is the difference between arcsin and sin⁻¹?', answer: 'They are the same thing — the inverse sine function that returns the angle whose sine is the input.' },
        { question: 'Why is tan(90°) undefined?', answer: 'Because cos(90°) = 0, and tan = sin/cos would involve division by zero.' },
        { question: 'Can the triangle solver handle any triangle?', answer: 'Yes. It uses the law of sines and cosines for any triangle, not just right triangles.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Memorize exact values for 0°, 30°, 45°, 60°, and 90° — they appear constantly.',
        'Always check if you are calculating in degrees or radians.',
        'Use the law of cosines when you know two sides and the included angle.',
        'Use the law of sines when you know a side and its opposite angle.',
        'Verify triangle solutions: angles must sum to 180° and sides must satisfy the triangle inequality.',
        'Use trig identities to simplify expressions before computing.'
      ]
    }
  },
  relatedTools: ['equation-solver', 'graph-plotter', 'calculus-reference-tool', 'unit-converter-scientific'],
  seo: {
    metaTitle: 'Trigonometry Calculator — Sin, Cos, Tan & Triangle Solver | UnTrackt Wiki',
    metaDescription: 'Calculate trig functions, solve triangles, convert degrees and radians, and reference identities. Complete trigonometry toolkit.',
    keywords: ['trigonometry calculator', 'sin cos tan', 'triangle solver', 'degrees radians', 'trig functions', 'law of cosines']
  }
};
