export default {
  id: 'optics-calculator',
  title: 'Optics Calculator',
  description: 'Calculate refraction, reflection, lens equations, mirror equations, and optical phenomena.',
  content: {
    whatIs: {
      heading: 'What is the Optics Calculator?',
      body: 'The Optics Calculator solves equations related to light and optics. Apply Snell\'s law for refraction, compute focal lengths and image positions with the thin lens equation, analyze mirrors, calculate magnification, and determine critical angles for total internal reflection.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Optics problems involve sign conventions, multiple equations, and ray diagram analysis. This tool handles the calculations correctly while showing which equation is being used and plotting ray diagrams, helping students and professionals avoid common sign errors.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the optics topic (refraction, lenses, mirrors, etc.).',
        'Enter the known values (indices of refraction, distances, focal length).',
        'Click solve to compute unknowns.',
        'View the result with the formula used.',
        'See the ray diagram visualization.',
        'Check image properties (real/virtual, upright/inverted, magnification).'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Snell\'s law (n₁ sin θ₁ = n₂ sin θ₂).',
        'Thin lens equation (1/f = 1/do + 1/di).',
        'Mirror equation.',
        'Magnification calculation.',
        'Critical angle and total internal reflection.',
        'Ray diagram visualization.',
        'Lens maker\'s equation.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Physics optics homework and exam preparation.',
        'Camera and lens design calculations.',
        'Fiber optics critical angle analysis.',
        'Telescope and microscope magnification.',
        'Optical engineering calculations.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Snell\'s Law', description: 'Light from air (n=1) to glass (n=1.5), θ₁ = 30° → θ₂ = 19.5°.' },
        { title: 'Thin Lens', description: 'f = 10 cm, do = 20 cm → di = 20 cm (real, same-size image).' },
        { title: 'Magnification', description: 'M = -di/do = -20/20 = -1 (inverted, same size).' },
        { title: 'Critical Angle', description: 'Glass to air: θc = arcsin(1/1.5) ≈ 41.8°.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Refraction', definition: 'The bending of light when it passes from one medium to another due to a change in speed.' },
        { term: 'Index of Refraction (n)', definition: 'A ratio of the speed of light in vacuum to the speed of light in the medium.' },
        { term: 'Focal Length (f)', definition: 'The distance from the lens (or mirror) to the focal point where parallel rays converge.' },
        { term: 'Magnification', definition: 'The ratio of image height to object height: M = hi/ho = -di/do.' },
        { term: 'Total Internal Reflection', definition: 'When light traveling in a denser medium hits the boundary at an angle greater than the critical angle, it reflects completely.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'What sign convention do you use?', answer: 'The standard convention: real objects/images have positive distances, virtual have negative. Converging lenses have positive focal length.' },
        { question: 'How do I determine if an image is real or virtual?', answer: 'If di is positive, the image is real (formed on the opposite side). If negative, it is virtual.' },
        { question: 'What is total internal reflection?', answer: 'When light passes from a denser to a less dense medium at an angle beyond the critical angle, it reflects completely back.' },
        { question: 'Does this handle curved mirrors?', answer: 'Yes. Use the mirror equation (1/f = 1/do + 1/di) with appropriate sign conventions for concave and convex mirrors.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Draw a ray diagram before solving numerically — it provides intuition about the result.',
        'Pay careful attention to sign conventions — most optics errors come from wrong signs.',
        'For lenses: positive f = converging, negative f = diverging.',
        'For mirrors: positive f = concave, negative f = convex.',
        'Check magnification sign: negative = inverted, positive = upright.',
        'Use Snell\'s law with consistent angle measurement from the normal, not the surface.'
      ]
    }
  },
  relatedTools: ['wave-sound-calculator', 'electromagnetic-calculator', 'trigonometry-calculator', 'unit-converter-scientific'],
  seo: {
    metaTitle: 'Optics Calculator — Refraction, Lenses & Mirrors | UnTrackt Wiki',
    metaDescription: 'Calculate refraction with Snell\'s law, thin lens and mirror equations, magnification, and critical angles. Ray diagram visualization included.',
    keywords: ['optics calculator', 'Snells law', 'lens equation', 'mirror equation', 'refraction', 'magnification']
  }
};
