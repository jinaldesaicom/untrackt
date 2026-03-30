export default {
  id: 'thermodynamics-calculator',
  title: 'Thermodynamics Calculator',
  description: 'Calculate heat transfer, specific heat, entropy, and thermodynamic processes — ideal gas law and calorimetry.',
  content: {
    whatIs: {
      heading: 'What is the Thermodynamics Calculator?',
      body: 'The Thermodynamics Calculator solves heat transfer, ideal gas law, and thermodynamic process equations. Calculate heat transfer (Q = mcΔT), apply the ideal gas law (PV = nRT), compute work done in gas processes, and analyze entropy changes. Support for isothermal, adiabatic, isobaric, and isochoric processes.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Thermodynamics problems involve choosing the correct process equations and keeping track of signs for heat and work. This tool selects the right formulas, handles unit conversions, and shows the step-by-step work for each type of process.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the calculation type (heat transfer, ideal gas, process, entropy).',
        'Enter the known values (mass, temperature, pressure, volume, etc.).',
        'Click solve for the unknown quantities.',
        'View the formulas and step-by-step solution.',
        'For gas processes, select the process type.',
        'Check energy balance and sign conventions.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Heat transfer (Q = mcΔT) calorimetry.',
        'Ideal gas law (PV = nRT).',
        'Isothermal, adiabatic, isobaric, isochoric process calculations.',
        'Work done by/on gas.',
        'Entropy change calculations.',
        'Temperature unit conversions (K, °C, °F).',
        'Specific heat reference table.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics and chemistry thermodynamics coursework.',
        'Engineering heat transfer analysis.',
        'HVAC system calculations.',
        'Calorimetry lab calculations.',
        'Thermodynamic cycle analysis.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Heat Transfer', description: 'Heating 2 kg of water from 20°C to 100°C: Q = 2 × 4186 × 80 = 669,760 J.' },
        { title: 'Ideal Gas', description: 'P = 1 atm, V = 22.4 L, T = 273 K → n ≈ 1 mol.' },
        { title: 'Isothermal', description: '1 mol gas at 300 K, V doubles → W = nRT ln(V₂/V₁) = 1729 J.' },
        { title: 'Calorimetry', description: '50g metal at 100°C into 200g water at 25°C → find equilibrium temperature.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Heat (Q)', definition: 'Energy transferred due to a temperature difference, measured in joules.' },
        { term: 'Specific Heat (c)', definition: 'Energy needed to raise 1 kg of a substance by 1 K.' },
        { term: 'Ideal Gas Law', definition: 'PV = nRT — relates pressure, volume, temperature, and amount of gas.' },
        { term: 'Entropy (S)', definition: 'A measure of disorder in a system. ΔS = Q_rev/T for reversible processes.' },
        { term: 'Adiabatic Process', definition: 'A process where no heat is exchanged with the surroundings (Q = 0).' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the difference between heat and temperature?', answer: 'Heat is energy transferred. Temperature is a measure of average kinetic energy of particles.' },
        { question: 'When do I use PV = nRT?', answer: 'For ideal gas calculations relating pressure, volume, temperature, and moles. Use it when dealing with gases at moderate conditions.' },
        { question: 'What is an adiabatic process?', answer: 'A process with no heat exchange (Q = 0). Temperature changes come from work done on/by the gas.' },
        { question: 'How do I handle mixed units?', answer: 'The calculator converts between temperature units and pressure units. Always use absolute temperature (K) for gas law calculations.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always use Kelvin for gas law calculations (never Celsius or Fahrenheit).',
        'Remember sign conventions: positive Q = heat added, positive W = work done by the system.',
        'First law: ΔU = Q - W (internal energy change = heat in minus work out).',
        'Identify the process type (isothermal, adiabatic, etc.) before choosing equations.',
        'In calorimetry, heat lost by hot object = heat gained by cold object.',
        'Check units: R = 8.314 J/(mol·K) when using SI, or 0.0821 L·atm/(mol·K) for liter-atmosphere.'
      ]
    }
  },
  relatedTools: ['gas-laws-calculator', 'energy-work-calculator', 'unit-converter-scientific', 'kinematics-calculator'],
  seo: {
    metaTitle: 'Thermodynamics Calculator — Heat, Ideal Gas Law & Entropy | UnTrackt Wiki',
    metaDescription: 'Calculate heat transfer, apply the ideal gas law, analyze thermodynamic processes, and compute entropy changes with step-by-step solutions.',
    keywords: ['thermodynamics calculator', 'heat transfer', 'ideal gas law', 'calorimetry', 'entropy', 'thermodynamic processes']
  }
};
