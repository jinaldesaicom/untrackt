export default {
  id: 'energy-work-calculator',
  title: 'Energy & Work Calculator',
  description: 'Calculate work, kinetic energy, potential energy, power, and apply the work-energy theorem.',
  content: {
    whatIs: {
      heading: 'What is the Energy & Work Calculator?',
      body: 'The Energy & Work Calculator computes work done by forces, kinetic energy, gravitational potential energy, elastic potential energy, power, and applies the work-energy theorem. Enter known values and solve for unknowns with step-by-step solutions.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Energy methods often provide simpler solutions to mechanics problems than force methods. This tool handles the calculations for work, energy, and power, making it easy to apply conservation of energy and the work-energy theorem correctly.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the calculation type (work, kinetic energy, potential energy, power).',
        'Enter the known values (force, distance, mass, velocity, height, etc.).',
        'Click solve to compute the result.',
        'View the formula used and step-by-step work.',
        'For energy conservation problems, enter initial and final states.',
        'See the energy bar chart visualization.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Work calculation (W = Fd cos θ).',
        'Kinetic energy (KE = ½mv²).',
        'Gravitational potential energy (PE = mgh).',
        'Elastic potential energy (PE = ½kx²).',
        'Power (P = W/t).',
        'Work-energy theorem.',
        'Conservation of energy problems.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics energy and work homework problems.',
        'Roller coaster and pendulum energy analysis.',
        'Power output calculations.',
        'Comparing energy methods to force methods.',
        'Engineering energy efficiency calculations.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Work', description: 'Push a box with 50 N over 10 m at 0° → W = 500 J.' },
        { title: 'Kinetic Energy', description: '2 kg object at 5 m/s → KE = ½(2)(25) = 25 J.' },
        { title: 'Conservation', description: 'Ball dropped from 20 m: PE at top = KE at bottom → v = √(2gh) ≈ 19.8 m/s.' },
        { title: 'Power', description: '1000 J of work in 5 seconds → P = 200 W.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Work', definition: 'Energy transferred by a force over a distance: W = Fd cos θ. Measured in joules (J).' },
        { term: 'Kinetic Energy', definition: 'Energy of motion: KE = ½mv². Increases with mass and velocity.' },
        { term: 'Potential Energy', definition: 'Stored energy due to position (gravitational: mgh) or deformation (elastic: ½kx²).' },
        { term: 'Power', definition: 'The rate of doing work: P = W/t. Measured in watts (W).' },
        { term: 'Conservation of Energy', definition: 'Total energy in a closed system remains constant — energy is transferred between forms but not created or destroyed.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'When is work negative?', answer: 'When the force component is opposite to the displacement direction (angle > 90°), such as friction doing negative work.' },
        { question: 'Can I use energy methods instead of forces?', answer: 'Often yes, and it is easier. Energy methods avoid vector decomposition and are ideal for finding speeds.' },
        { question: 'What is the work-energy theorem?', answer: 'The net work done on an object equals its change in kinetic energy: W_net = ΔKE.' },
        { question: 'How do I handle non-conservative forces?', answer: 'Add the work done by non-conservative forces (like friction) to the energy equation: KE₁ + PE₁ + W_nc = KE₂ + PE₂.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Define a reference height (h = 0) for gravitational PE before starting.',
        'Use energy conservation when only conservative forces act.',
        'Include work done by friction as W_nc in energy balance equations.',
        'Check units: energy in joules (J), power in watts (W).',
        'Verify by checking that total energy is conserved (or accounts for friction losses).',
        'Draw an energy bar chart showing initial and final energy for visualization.'
      ]
    }
  },
  relatedTools: ['kinematics-calculator', 'newtons-laws-calculator', 'thermodynamics-calculator', 'electricity-calculator'],
  seo: {
    metaTitle: 'Energy & Work Calculator — KE, PE, Power & Conservation | UnTrackt Wiki',
    metaDescription: 'Calculate work, kinetic energy, potential energy, and power. Apply the work-energy theorem and conservation of energy with step-by-step solutions.',
    keywords: ['energy calculator', 'work calculator', 'kinetic energy', 'potential energy', 'power calculator', 'work-energy theorem']
  }
};
