export default {
  id: 'kinematics-calculator',
  title: 'Kinematics Calculator',
  description: 'Solve kinematics equations for displacement, velocity, acceleration, and time in linear motion.',
  content: {
    whatIs: {
      heading: 'What is the Kinematics Calculator?',
      body: 'The Kinematics Calculator solves the standard kinematic equations for uniformly accelerated motion. Enter any three of the five kinematic variables (displacement, initial velocity, final velocity, acceleration, time) and compute the remaining two. Supports both horizontal and free-fall (vertical) motion scenarios.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Kinematics problems require selecting the right equation and solving for unknowns. This tool automatically selects the appropriate kinematic equation based on the given variables, solves it, and shows the step-by-step work — ideal for physics homework and exam preparation.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the known variables (at least 3 of 5).',
        'Select the motion type (horizontal or free-fall).',
        'Click solve to compute the unknown variables.',
        'View the step-by-step solution.',
        'See which kinematic equation was used.',
        'Optionally view a motion diagram.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Solves for any two unknowns given three known values.',
        'All four kinematic equations covered.',
        'Free-fall mode with g = 9.8 m/s².',
        'Step-by-step equation selection and solution.',
        'Unit support (m, km, mph, etc.).',
        'Motion diagram visualization.',
        'Multiple unit system support (SI, imperial).'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Introductory physics kinematics problems.',
        'Projectile motion analysis (vertical component).',
        'Vehicle braking distance calculations.',
        'Free-fall and drop problems.',
        'Exam preparation and homework verification.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Braking Distance', description: 'v₀ = 20 m/s, v = 0, a = -5 m/s² → d = 40 m, t = 4 s.' },
        { title: 'Free Fall', description: 'h = 45 m, v₀ = 0, g = 9.8 m/s² → t ≈ 3.03 s, v ≈ 29.7 m/s.' },
        { title: 'Acceleration', description: 'v₀ = 0, v = 30 m/s, t = 6 s → a = 5 m/s², d = 90 m.' },
        { title: 'Displacement', description: 'v₀ = 10 m/s, a = 2 m/s², t = 5 s → d = 75 m.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Displacement (d)', definition: 'The change in position — a vector quantity with direction.' },
        { term: 'Velocity (v)', definition: 'The rate of change of displacement — speed with direction.' },
        { term: 'Acceleration (a)', definition: 'The rate of change of velocity over time.' },
        { term: 'Free Fall', definition: 'Motion under gravity alone, with acceleration g ≈ 9.8 m/s² downward.' },
        { term: 'Uniform Acceleration', definition: 'Motion where acceleration is constant throughout.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Which kinematic equation do I use?', answer: 'Use the equation that contains all three known variables plus the unknown you need. The calculator selects it automatically.' },
        { question: 'Can I use this for projectile motion?', answer: 'Yes, for the vertical or horizontal component separately. Projectile motion decomposes into independent horizontal and vertical kinematics.' },
        { question: 'What about air resistance?', answer: 'The kinematic equations assume no air resistance (ideal conditions).' },
        { question: 'What units does it support?', answer: 'SI units (m, m/s, m/s²) by default, with optional conversion to imperial units.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'List all known and unknown variables before choosing an equation.',
        'Choose a positive direction and stick with it — watch signs for deceleration.',
        'Use g = 9.8 m/s² (or 9.81) consistently for free-fall problems.',
        'Check units: all variables must use consistent units (e.g., all SI).',
        'Verify results by substituting back into a different kinematic equation.',
        'Draw a diagram to visualize the motion before solving.'
      ]
    }
  },
  relatedTools: ['newtons-laws-calculator', 'energy-work-calculator', 'gravitational-calculator', 'unit-converter-scientific'],
  seo: {
    metaTitle: 'Kinematics Calculator — Displacement, Velocity, Acceleration | UnTrackt Wiki',
    metaDescription: 'Solve kinematics equations for displacement, velocity, acceleration, and time. Step-by-step solutions for linear and free-fall motion.',
    keywords: ['kinematics calculator', 'physics equations', 'displacement velocity', 'free fall', 'acceleration calculator', 'motion calculator']
  }
};
