export default {
  id: 'wave-sound-calculator',
  title: 'Wave & Sound Calculator',
  description: 'Calculate wave properties — frequency, wavelength, speed, period, amplitude, and sound intensity.',
  content: {
    whatIs: {
      heading: 'What is the Wave & Sound Calculator?',
      body: 'The Wave & Sound Calculator computes wave properties and sound-related quantities. Calculate frequency, wavelength, wave speed, period, and amplitude using the wave equation (v = fλ). For sound, compute decibel levels, sound intensity, the Doppler effect, and speed of sound in different media.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Wave and sound calculations involve interrelated quantities that are easy to mix up. This tool handles the formulas correctly, converts between units, and covers both general waves and sound-specific topics like decibels and the Doppler effect.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the calculation type (wave equation, sound intensity, Doppler, etc.).',
        'Enter the known values.',
        'Click solve to compute the unknowns.',
        'View the formula and step-by-step solution.',
        'For the Doppler effect, enter source and observer velocities.',
        'Convert between decibels and intensity.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Wave equation (v = fλ) solver.',
        'Period and frequency conversion.',
        'Sound intensity and decibel calculations.',
        'Doppler effect formula.',
        'Speed of sound in different media.',
        'Standing wave and harmonic calculations.',
        'Beat frequency calculator.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics wave and sound homework.',
        'Audio engineering decibel calculations.',
        'Music frequency and wavelength analysis.',
        'Ultrasound and sonar calculations.',
        'Acoustic design computations.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Wave Equation', description: 'f = 440 Hz (A note), v = 343 m/s (sound in air) → λ ≈ 0.78 m.' },
        { title: 'Decibels', description: 'Intensity of 10⁻⁵ W/m² → dB = 10 log(I/I₀) = 70 dB.' },
        { title: 'Doppler Effect', description: 'Source approaching at 30 m/s, f₀ = 500 Hz → f = 500 × 343/(343-30) ≈ 548 Hz.' },
        { title: 'Period', description: 'f = 60 Hz → T = 1/60 ≈ 0.0167 s.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Frequency (f)', definition: 'Number of wave cycles per second, measured in hertz (Hz).' },
        { term: 'Wavelength (λ)', definition: 'The distance between consecutive corresponding points on a wave.' },
        { term: 'Amplitude', definition: 'The maximum displacement from the rest position — relates to energy and loudness for sound.' },
        { term: 'Decibel (dB)', definition: 'A logarithmic unit measuring sound intensity relative to a reference: dB = 10 log₁₀(I/I₀).' },
        { term: 'Doppler Effect', definition: 'The change in observed frequency when source and observer are moving relative to each other.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What is the speed of sound in air?', answer: 'Approximately 343 m/s at 20°C. It varies with temperature and medium.' },
        { question: 'How do I convert between frequency and period?', answer: 'T = 1/f and f = 1/T. They are reciprocals.' },
        { question: 'What is the reference intensity for decibels?', answer: 'I₀ = 10⁻¹² W/m² (the threshold of human hearing).' },
        { question: 'Does the Doppler effect apply to light?', answer: 'Yes. The relativistic Doppler effect applies to electromagnetic waves (redshift/blueshift).' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use v = fλ as the foundation — it connects speed, frequency, and wavelength.',
        'Remember: f and T are reciprocals (f = 1/T).',
        'For decibels, every 10 dB increase means 10× more intensity.',
        'Doubling intensity adds about 3 dB.',
        'In Doppler problems, carefully assign positive/negative based on approach vs. recession.',
        'Check if the medium matters — sound speed differs significantly in air, water, and solids.'
      ]
    }
  },
  relatedTools: ['optics-calculator', 'kinematics-calculator', 'unit-converter-scientific', 'logarithm-calculator'],
  seo: {
    metaTitle: 'Wave & Sound Calculator — Frequency, Wavelength & Decibels | UnTrackt Wiki',
    metaDescription: 'Calculate wave properties: frequency, wavelength, speed, decibels, Doppler effect, and sound intensity with step-by-step solutions.',
    keywords: ['wave calculator', 'sound calculator', 'frequency wavelength', 'decibel calculator', 'Doppler effect', 'wave equation']
  }
};
