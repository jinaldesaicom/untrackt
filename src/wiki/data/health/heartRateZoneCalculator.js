export default {
  id: 'heart-rate-zone-calculator',
  title: 'Heart Rate Zone Calculator',
  description: 'Calculate personalized heart rate training zones using the Karvonen method or percentage of max HR to optimize cardio workouts.',
  content: {
    whatIs: {
      heading: 'What is the Heart Rate Zone Calculator?',
      body: 'The Heart Rate Zone Calculator determines your five heart rate training zones based on either the Karvonen (heart rate reserve) method or simple percentage of max heart rate. By entering your age and optionally your resting heart rate, you receive zone-specific BPM ranges for warm-up, fat burning, aerobic, anaerobic, and VO₂ max efforts. This tool provides general fitness guidance and is not a substitute for exercise testing or medical advice--consult a healthcare professional before starting a new exercise program.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Training in the right heart rate zone maximizes the benefit of every workout minute. Too low and you miss cardiovascular improvements; too high and you risk overtraining or injury. Zone-based training helps you build an aerobic base, improve lactate threshold, and peak for competitions--all while managing fatigue and recovery.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your age to estimate your maximum heart rate (220 − age).',
        'Optionally enter your resting heart rate for the more accurate Karvonen method.',
        'Select the calculation method: Karvonen (recommended) or % of max HR.',
        'Click "Calculate" to see all five training zones with BPM ranges.',
        'Use the zone descriptions to target specific training goals in your workouts.',
        'Recalculate if your resting heart rate or age changes.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Two calculation methods: Karvonen (heart rate reserve) and percentage of max HR.',
        'Five training zones: Zone 1 (warm-up/recovery), Zone 2 (fat burn), Zone 3 (aerobic), Zone 4 (anaerobic/threshold), Zone 5 (VO₂ max).',
        'Personalized ranges using resting heart rate for Karvonen precision.',
        'Clear descriptions of the physiological benefit of each zone.',
        'Max heart rate input override for users who know their tested max HR.',
        'Fully client-side--no data is collected or stored.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Runners structuring easy runs (Zone 2), tempo runs (Zone 3-4), and intervals (Zone 4-5).',
        'Cyclists using a heart rate monitor to stay in the targeted zone during rides.',
        'Beginners learning to exercise at a safe, effective intensity.',
        'Cardiac rehabilitation patients following physician-prescribed target zones.',
        'Athletes periodizing training blocks based on heart rate zone distribution.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: '30-year-old, resting HR 65 bpm (Karvonen)', description: 'Max HR ≈ 190, HRR = 125. Zone 2 (60-70 %): 140-153 bpm. Zone 4 (80-90 %): 165-178 bpm.' },
        { title: '45-year-old, resting HR 72 bpm (Karvonen)', description: 'Max HR ≈ 175, HRR = 103. Zone 3 (70-80 %): 144-154 bpm. Suitable for sustained aerobic efforts.' },
        { title: '25-year-old, % of max HR method', description: 'Max HR ≈ 195. Zone 1 (50-60 %): 98-117. Zone 5 (90-100 %): 176-195. Simpler but less individualized.' },
        { title: 'Trained athlete with tested max HR of 198', description: 'Overriding the 220 − age estimate with an actual tested max provides more accurate zone calculations, especially for fit individuals.' },
        { title: 'Cardiac rehab patient, age 60, resting HR 70', description: 'Max HR ≈ 160. Physician-prescribed Zone 1-2 (50-70 %): 115-133 bpm. Avoids excessive cardiac stress during recovery.' },
        { title: 'Zone 2 base building for marathon training', description: 'A 35-year-old runner (resting HR 55) targets Zone 2 at 131-145 bpm for 80 % of weekly mileage to build aerobic efficiency.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Maximum Heart Rate (MHR)', definition: 'The highest heart rate achievable during maximal exertion, commonly estimated as 220 minus age.' },
        { term: 'Resting Heart Rate (RHR)', definition: 'Heart rate measured at complete rest, typically first thing in the morning. A lower RHR generally indicates better cardiovascular fitness.' },
        { term: 'Heart Rate Reserve (HRR)', definition: 'The difference between maximum and resting heart rate (MHR − RHR), used in the Karvonen formula.' },
        { term: 'Karvonen Method', definition: 'A heart rate zone formula that uses HRR: Target HR = ((MHR − RHR) × intensity %) + RHR, providing personalized zones.' },
        { term: 'VO₂ Max', definition: 'The maximum rate of oxygen consumption during intense exercise, a key indicator of aerobic fitness.' },
        { term: 'Lactate Threshold', definition: 'The exercise intensity at which lactate begins to accumulate in the blood faster than it can be cleared, roughly corresponding to Zone 4.' },
        { term: 'Aerobic Zone', definition: 'An intensity range (Zone 3, ~70-80 % HRR) where the body primarily uses oxygen to produce energy, improving cardiovascular endurance.' },
        { term: 'Anaerobic Zone', definition: 'An intensity range (Zone 4, ~80-90 % HRR) where energy demand exceeds oxygen supply, building speed and power tolerance.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is the "220 minus age" formula accurate?', answer: 'It provides a population average estimate but can be off by ±10-15 bpm for individuals. A lab-based VO₂ max test or field test gives a more accurate max HR.' },
        { question: 'Which method is better--Karvonen or % of max HR?', answer: 'The Karvonen method is more personalized because it incorporates resting heart rate. It is recommended when you know your RHR.' },
        { question: 'How do I measure my resting heart rate?', answer: 'Measure your pulse first thing in the morning before getting out of bed, at least 3 days in a row, and take the average.' },
        { question: 'Should beginners start in Zone 1?', answer: 'Yes. Zone 1 (warm-up/recovery) and Zone 2 (aerobic/fat burn) are ideal starting points. Build a base before tackling higher-intensity zones.' },
        { question: 'Can medications affect my heart rate zones?', answer: 'Yes. Beta-blockers and other medications can lower max and resting heart rate, making standard formulas inaccurate. Consult your doctor for adjusted targets.' },
        { question: 'Is this tool a substitute for medical exercise testing?', answer: 'No. It provides general estimates for fitness planning. Individuals with cardiovascular conditions or those new to exercise should consult a healthcare provider before training at high intensities.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use a chest strap heart rate monitor for the most accurate real-time readings during exercise.',
        'Spend the majority (70-80 %) of your training time in Zones 1-2 to build aerobic fitness and prevent burnout.',
        'Limit Zone 4-5 work to 1-2 sessions per week with adequate recovery between efforts.',
        'Re-test or recalculate zones every 3-6 months as fitness improves and resting HR drops.',
        'Warm up in Zone 1 for 5-10 minutes before entering higher zones.',
        'Note that heat, humidity, altitude, and dehydration can elevate heart rate independent of effort--adjust intensity accordingly.',
        'Combine heart rate data with perceived exertion (RPE) for a more complete picture of workout intensity.',
        'If on medication that affects heart rate, ask your doctor for personalized zone guidance rather than relying solely on formulas.'
      ]
    }
  },
  relatedTools: ['calorie-burn-estimator', 'blood-pressure-classifier', 'bmr-calculator', 'tdee-calculator'],
  seo: {
    metaTitle: 'Heart Rate Zone Calculator - Karvonen & Max HR Zones | Wiki | UnTrackt',
    metaDescription: 'Calculate your five heart rate training zones using the Karvonen method or max HR percentage. Optimize cardio workouts for fat burning, endurance, and performance.',
    keywords: ['heart rate zone calculator', 'Karvonen method', 'max heart rate', 'training zones', 'fat burning zone', 'VO2 max', 'cardio training', 'heart rate reserve', 'aerobic zone']
  }
};
