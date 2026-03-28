export default {
  id: 'microscopy-calculator',
  title: 'Microscopy Calculator',
  description: 'Calculate microscope magnification, resolution, field of view, and specimen size from microscope images.',
  content: {
    whatIs: {
      heading: 'What is the Microscopy Calculator?',
      body: 'The Microscopy Calculator helps with light microscopy calculations. Compute total magnification, estimate specimen size, calculate field of view diameter at different magnifications, determine resolution limits, and convert between actual and image sizes using the magnification formula.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Microscopy calculations are common in biology labs but the relationships between magnification, field of view, and specimen size can be confusing. This tool handles the formulas correctly and converts between units (μm, mm, nm) — essential for biology coursework and lab work.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the calculation type (magnification, field of view, specimen size).',
        'Enter the known values (eyepiece power, objective power, image size, etc.).',
        'Click calculate.',
        'View the result with the formula used.',
        'Convert between μm, mm, and nm as needed.',
        'For field of view, enter the magnification change to calculate new FOV.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Total magnification (eyepiece × objective).',
        'Specimen size calculation (actual size = image size / magnification).',
        'Field of view diameter at different magnifications.',
        'Resolution limit calculation.',
        'Unit conversion (nm, μm, mm).',
        'Scale bar interpretation.',
        'Common microscope objective reference.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Biology lab microscopy calculations.',
        'Estimating cell and organelle sizes.',
        'Calculating magnification for lab reports.',
        'AP Biology and IB Biology practical work.',
        'Interpreting micrograph images.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Total Magnification', description: '10× eyepiece × 40× objective = 400× total magnification.' },
        { title: 'Specimen Size', description: 'Image = 20 mm, magnification = 400× → actual size = 20/400 = 0.05 mm = 50 μm.' },
        { title: 'Field of View', description: 'FOV at 40× = 4 mm → at 400× = 0.4 mm (inversely proportional).' },
        { title: 'Scale Bar', description: 'Scale bar = 10 μm and is 2 cm on image → magnification = 20,000/10 = 2000×.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Magnification', definition: 'How many times larger the image is compared to the actual specimen.' },
        { term: 'Field of View', definition: 'The visible area seen through the microscope at a given magnification.' },
        { term: 'Resolution', definition: 'The minimum distance between two points that can be distinguished as separate.' },
        { term: 'Objective Lens', definition: 'The lens closest to the specimen. Common powers: 4×, 10×, 40×, 100×.' },
        { term: 'Eyepiece', definition: 'The lens you look through, typically 10× or 15× magnification.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How do I estimate specimen size?', answer: 'Actual size = image size / magnification. Measure the image size with a ruler, divide by total magnification.' },
        { question: 'Why does field of view shrink at higher magnification?', answer: 'FOV is inversely proportional to magnification. Doubling magnification halves the visible area.' },
        { question: 'What is the resolution limit of a light microscope?', answer: 'About 200 nm (0.2 μm). Objects smaller than this cannot be resolved with visible light.' },
        { question: 'How do I use a scale bar?', answer: 'Measure the scale bar in the image (mm), then use the labeled actual size to calculate magnification.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always record total magnification when making observations.',
        'Convert all measurements to the same unit before calculating.',
        'Use μm for cell sizes, nm for organelles and viruses.',
        'Field of view at low power can be measured with a transparent ruler.',
        'For higher magnifications, calculate FOV from the low-power measurement.',
        'Remember: magnification ≠ resolution. Higher magnification without better resolution just gives a blurrier image.'
      ]
    }
  },
  relatedTools: ['genetics-calculator', 'dna-rna-tools', 'unit-converter-scientific', 'significant-figures-calculator'],
  seo: {
    metaTitle: 'Microscopy Calculator — Magnification, FOV & Specimen Size | UnTrackt Wiki',
    metaDescription: 'Calculate microscope magnification, field of view, specimen size, and resolution. Essential for biology lab microscopy work.',
    keywords: ['microscopy calculator', 'magnification calculator', 'field of view', 'specimen size', 'microscope calculations', 'biology lab']
  }
};
