export default {
  id: 'ideal-weight-calculator',
  title: 'Ideal Weight Calculator',
  description: 'Estimate your ideal body weight using the Devine, Hamwi, Robinson, and Miller formulas based on height and sex.',
  content: {
    whatIs: {
      heading: 'What is the Ideal Weight Calculator?',
      body: 'The Ideal Weight Calculator estimates a healthy weight range using four widely referenced formulas: Devine, Hamwi, Robinson, and Miller. Each formula uses height and sex to produce a target weight, and the tool presents all four results so you can see a consensus range rather than a single number. These formulas were originally developed for medication dosing and clinical reference--they provide rough guidelines, not absolute targets. This tool is for educational purposes only and is not a substitute for personalized guidance from a healthcare professional.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'No single formula perfectly captures the right weight for every body type, frame size, or composition. By showing results from multiple equations, this tool gives you a practical range rather than an unrealistic single number. It helps set reasonable goals for weight management and provides context when discussing targets with your doctor or dietitian.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select your biological sex (male or female).',
        'Enter your height in centimeters or feet and inches.',
        'Click "Calculate" to view ideal weight estimates from all four formulas.',
        'Review the range and average to identify a realistic target.',
        'Discuss the results with a healthcare provider to account for muscle mass, frame size, and individual factors.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Four evidence-based formulas: Devine (1974), Hamwi (1964), Robinson (1983), and Miller (1983).',
        'Side-by-side comparison with an overall range and average.',
        'Supports both metric and imperial input with automatic conversion.',
        'Instant client-side calculation--no personal data is transmitted.',
        'Educational notes explaining the assumptions and limitations of each formula.',
        'Mobile-friendly layout for quick reference during clinic or gym visits.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting an initial weight goal when starting a structured fitness program.',
        'Clinicians estimating ideal body weight for drug dosing calculations (e.g., aminoglycosides).',
        'Nutrition students comparing formula outputs as part of coursework.',
        'Individuals seeking a reality check on social-media weight targets.',
        'Pairing with a BMI or body-fat calculator for a more complete picture.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Male, 180 cm (5\'11")', description: 'Devine: 75.0 kg, Hamwi: 77.3 kg, Robinson: 73.6 kg, Miller: 71.5 kg. Range: 71-77 kg.' },
        { title: 'Female, 165 cm (5\'5")', description: 'Devine: 56.2 kg, Hamwi: 57.6 kg, Robinson: 57.0 kg, Miller: 56.0 kg. Range: 56-58 kg.' },
        { title: 'Male, 170 cm (5\'7")', description: 'Devine: 66.0 kg, Hamwi: 68.2 kg, Robinson: 65.5 kg, Miller: 63.6 kg. Range: 64-68 kg.' },
        { title: 'Female, 175 cm (5\'9")', description: 'Devine: 63.0 kg, Hamwi: 65.0 kg, Robinson: 63.5 kg, Miller: 62.2 kg. Range: 62-65 kg.' },
        { title: 'Tall male, 193 cm (6\'4")', description: 'Devine: 86.8 kg, Robinson: 83.7 kg. Taller frames produce wider inter-formula variation highlighting the need for clinical context.' },
        { title: 'Short female, 152 cm (5\'0")', description: 'Devine: 50.0 kg, Hamwi: 47.7 kg. Shorter heights tend to produce tighter agreement between formulas.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Ideal Body Weight (IBW)', definition: 'A calculated estimate of what a person should weigh based on height and sex, originally designed for clinical drug dosing.' },
        { term: 'Devine Formula', definition: 'IBW formula (1974): Males = 50 + 2.3 × (height in inches − 60); Females = 45.5 + 2.3 × (height in inches − 60).' },
        { term: 'Hamwi Formula', definition: 'IBW formula (1964): Males = 48 + 2.7 × (height in inches − 60); Females = 45.5 + 2.2 × (height in inches − 60).' },
        { term: 'Robinson Formula', definition: 'IBW formula (1983): Males = 52 + 1.9 × (height in inches − 60); Females = 49 + 1.7 × (height in inches − 60).' },
        { term: 'Miller Formula', definition: 'IBW formula (1983): Males = 56.2 + 1.41 × (height in inches − 60); Females = 53.1 + 1.36 × (height in inches − 60).' },
        { term: 'Frame Size', definition: 'A classification (small, medium, large) based on wrist circumference or elbow breadth that adjusts ideal weight targets.' },
        { term: 'Body Mass Index (BMI)', definition: 'A ratio of weight to height squared (kg/m²) used as a population-level screening tool for underweight, normal, overweight, and obesity.' },
        { term: 'Adjusted Body Weight', definition: 'A clinical calculation used for obese patients: IBW + 0.4 × (actual weight − IBW), often used for medication dosing.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Which formula is the most accurate?', answer: 'No single formula is universally accurate. They were designed for clinical dosing, not fitness goals. Use the range from all four as a general guideline and consult a healthcare provider for personalized targets.' },
        { question: 'Do these formulas account for muscle mass?', answer: 'No. They use only height and sex. Athletes or muscular individuals will often exceed ideal weight estimates while being perfectly healthy.' },
        { question: 'Should I aim for the exact ideal weight number?', answer: 'No. Treat the results as a reference range. A healthy weight also depends on body composition, fitness level, waist circumference, and metabolic health markers.' },
        { question: 'Why are results different for males and females?', answer: 'Biological males typically carry more lean mass, so the base values and per-inch increments differ between sexes in each formula.' },
        { question: 'Can I use this for children or teenagers?', answer: 'These formulas are designed for adults. Pediatric ideal weight should be assessed using age- and sex-specific growth charts.' },
        { question: 'Is this medical advice?', answer: 'No. The Ideal Weight Calculator provides general estimates for informational and educational purposes. Consult your doctor or a registered dietitian for weight management guidance tailored to your situation.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Look at the range across all four formulas, not just one number, for a realistic target.',
        'Combine ideal weight with body-fat percentage for a more meaningful health assessment.',
        'Consider your frame size--small-framed people may fall at the low end of the range, large-framed at the high end.',
        'Do not use ideal weight as the sole indicator of health; waist circumference, blood pressure, and metabolic markers matter too.',
        'Reconsider your target if you strength-train regularly, as muscle mass will raise your weight above formula estimates.',
        'Discuss results with a healthcare provider, especially if you have a history of disordered eating.',
        'Use ideal weight as a directional guide, not an obsessive target--health is multidimensional.',
        'Pair this tool with BMR and TDEE calculators for a complete picture of energy needs at your goal weight.'
      ]
    }
  },
  relatedTools: ['body-fat-calculator', 'bmr-calculator', 'tdee-calculator', 'macro-calculator'],
  seo: {
    metaTitle: 'Ideal Weight Calculator - Devine, Hamwi, Robinson, Miller | Wiki | UnTrackt',
    metaDescription: 'Estimate your ideal body weight using four proven formulas: Devine, Hamwi, Robinson, and Miller. Compare results for a realistic healthy weight range.',
    keywords: ['ideal weight calculator', 'ideal body weight', 'Devine formula', 'Hamwi formula', 'Robinson formula', 'Miller formula', 'healthy weight', 'target weight', 'IBW']
  }
};
