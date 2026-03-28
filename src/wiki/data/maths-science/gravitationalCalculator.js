export default {
  id: 'gravitational-calculator',
  title: 'Gravitational Calculator',
  description: 'Calculate gravitational force, field strength, orbital velocity, escape velocity, and gravitational potential energy.',
  content: {
    whatIs: {
      heading: 'What is the Gravitational Calculator?',
      body: 'The Gravitational Calculator applies Newton\'s law of universal gravitation and orbital mechanics formulas. Compute gravitational force between two masses, gravitational field strength, orbital velocity, escape velocity, orbital period, and gravitational potential energy.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Gravitational calculations involve large numbers (masses of planets, distances in space) and specific formulas. This tool handles the numbers, unit conversions, and formula selection, making it valuable for astronomy coursework, space science, and physics problem solving.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the calculation type (force, field, orbital, escape velocity).',
        'Enter the known values (masses, distance, radius, etc.).',
        'Click solve for the unknown quantities.',
        'View the formula and step-by-step solution.',
        'Use preset values for common celestial bodies (Earth, Moon, Sun, etc.).',
        'Convert between units as needed.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Gravitational force (F = Gm₁m₂/r²).',
        'Gravitational field strength (g = GM/r²).',
        'Orbital velocity (v = √(GM/r)).',
        'Escape velocity (v = √(2GM/r)).',
        'Orbital period (Kepler\'s third law).',
        'Gravitational potential energy (U = -GMm/r).',
        'Preset values for planets and moons.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics gravitation unit homework.',
        'Astronomy and space science calculations.',
        'Satellite orbit design.',
        'Calculating surface gravity on other planets.',
        'Escape velocity and mission planning concepts.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Gravitational Force', description: 'Two 1 kg masses 1 m apart: F = 6.67 × 10⁻¹¹ N.' },
        { title: 'Surface Gravity', description: 'Earth: g = GM/R² = 9.8 m/s². Mars: g ≈ 3.7 m/s².' },
        { title: 'Escape Velocity', description: 'Earth: v = √(2GM/R) ≈ 11,186 m/s (11.2 km/s).' },
        { title: 'Orbital Period', description: 'ISS at 408 km altitude: T ≈ 92.7 minutes.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'G (Gravitational Constant)', definition: '6.674 × 10⁻¹¹ N·m²/kg² — the universal gravitational constant.' },
        { term: 'Gravitational Field', definition: 'The force per unit mass at a point in space: g = F/m = GM/r².' },
        { term: 'Orbital Velocity', definition: 'The velocity needed to maintain a circular orbit at a given altitude.' },
        { term: 'Escape Velocity', definition: 'The minimum velocity needed to escape a gravitational field without further propulsion.' },
        { term: 'Kepler\'s Third Law', definition: 'T² ∝ r³ — the square of the orbital period is proportional to the cube of the orbital radius.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is g always 9.8 m/s²?', answer: 'Only at Earth\'s surface. It varies with altitude and differs on other planets. Use g = GM/r².' },
        { question: 'What is the difference between g and G?', answer: 'G is the universal gravitational constant. g is the local gravitational field strength (acceleration due to gravity).' },
        { question: 'Why is gravitational PE negative?', answer: 'By convention, U = 0 at infinite separation. As objects come together, they lose potential energy, making it negative.' },
        { question: 'Can I calculate for other planets?', answer: 'Yes. Use the preset values for common celestial bodies or enter custom mass and radius values.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always use SI units (kg, m, s) with G = 6.674 × 10⁻¹¹.',
        'Remember: r is measured from the center of mass, not the surface.',
        'For orbits, the orbital radius = planet radius + altitude.',
        'Escape velocity is √2 times orbital velocity at the same radius.',
        'Use Kepler\'s third law for comparing different orbits around the same body.',
        'Enter mass in kg — use scientific notation for planetary masses (e.g., 5.97 × 10²⁴ kg for Earth).'
      ]
    }
  },
  relatedTools: ['kinematics-calculator', 'newtons-laws-calculator', 'energy-work-calculator', 'unit-converter-scientific'],
  seo: {
    metaTitle: 'Gravitational Calculator — Force, Orbits & Escape Velocity | UnTrackt Wiki',
    metaDescription: 'Calculate gravitational force, orbital and escape velocity, gravitational field strength, and PE using universal gravitation formulas.',
    keywords: ['gravitational calculator', 'gravity calculator', 'orbital velocity', 'escape velocity', 'gravitational force', 'Newtons law of gravitation']
  }
};
