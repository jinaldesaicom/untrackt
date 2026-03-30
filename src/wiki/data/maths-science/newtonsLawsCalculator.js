export default {
  id: 'newtons-laws-calculator',
  title: 'Newton\'s Laws Calculator',
  description: 'Calculate force, mass, and acceleration using Newton\'s laws. Solve friction, tension, and net force problems.',
  content: {
    whatIs: {
      heading: 'What is the Newton\'s Laws Calculator?',
      body: 'The Newton\'s Laws Calculator applies F = ma and related force equations to solve mechanics problems. Enter known forces, masses, and angles to compute net force, acceleration, friction, tension, normal force, and weight. It handles inclined planes, pulley systems, and multi-body problems with step-by-step free body diagram analysis.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Force problems require careful free body diagram analysis and vector decomposition. This tool handles the trigonometry, force resolution, and equation solving while showing each step, making it a powerful learning aid for physics students.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the scenario type (flat surface, inclined plane, pulley, etc.).',
        'Enter mass, applied force, angle, and friction coefficient as needed.',
        'Click solve to compute net force and acceleration.',
        'View the free body diagram breakdown.',
        'See individual force components.',
        'Read the step-by-step solution.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'F = ma calculations.',
        'Friction force (static and kinetic).',
        'Inclined plane analysis.',
        'Normal force computation.',
        'Weight and gravitational force.',
        'Multiple force resolution.',
        'Free body diagram breakdown.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics I mechanics homework.',
        'Engineering statics and dynamics problems.',
        'Inclined plane and friction problems.',
        'Pulley and tension problems.',
        'Exam preparation with step-by-step verification.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Basic F = ma', description: 'F = 50 N, m = 10 kg → a = 5 m/s².' },
        { title: 'Inclined Plane', description: '30° incline, 10 kg mass, μk = 0.2 → acceleration down the plane.' },
        { title: 'Friction', description: '20 kg box on flat surface, μs = 0.4 → max static friction = 78.4 N.' },
        { title: 'Two Bodies', description: 'Two masses connected by a string over a pulley — find acceleration and tension.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Force', definition: 'A push or pull on an object, measured in newtons (N). F = ma.' },
        { term: 'Normal Force', definition: 'The perpendicular contact force exerted by a surface on an object.' },
        { term: 'Friction', definition: 'A force opposing relative motion between surfaces. f = μN.' },
        { term: 'Net Force', definition: 'The vector sum of all forces acting on an object.' },
        { term: 'Free Body Diagram', definition: 'A diagram showing all forces acting on a single object, used to set up Newton\'s second law.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between static and kinetic friction?', answer: 'Static friction prevents motion from starting (μs). Kinetic friction acts during motion (μk). Usually μs > μk.' },
        { question: 'How do I handle forces at angles?', answer: 'Decompose each force into x and y components using sin and cos, then sum components separately.' },
        { question: 'What about Newton\'s third law?', answer: 'Every action force has an equal and opposite reaction. The calculator handles this in pulley and contact problems.' },
        { question: 'Can it solve equilibrium problems?', answer: 'Yes. Set acceleration to zero and solve for the unknown force.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always draw a free body diagram before solving.',
        'Choose coordinate axes aligned with the motion direction (e.g., along the incline).',
        'Include all forces: weight, normal, friction, applied, tension.',
        'Use Newton\'s second law for each axis separately: ΣFx = max, ΣFy = may.',
        'Check signs carefully — forces opposite to your positive direction are negative.',
        'Verify: if the object is in equilibrium, net force must be zero in all directions.'
      ]
    }
  },
  relatedTools: ['kinematics-calculator', 'energy-work-calculator', 'gravitational-calculator', 'trigonometry-calculator'],
  seo: {
    metaTitle: 'Newton\'s Laws Calculator — Force, Mass & Acceleration | UnTrackt Wiki',
    metaDescription: 'Calculate force, mass, and acceleration with Newton\'s laws. Solve friction, inclined plane, and net force problems step by step.',
    keywords: ['Newtons laws', 'force calculator', 'F=ma', 'friction calculator', 'inclined plane', 'physics calculator']
  }
};
