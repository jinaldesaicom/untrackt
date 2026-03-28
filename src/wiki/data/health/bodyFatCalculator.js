export default {
  id: 'body-fat-calculator',
  title: 'Body Fat Calculator',
  description: 'Estimate your body fat percentage using the US Navy method and BMI-based method to assess body composition without specialized equipment.',
  content: {
    whatIs: {
      heading: 'What is the Body Fat Calculator?',
      body: 'The Body Fat Calculator estimates your body fat percentage using two non-invasive methods: the US Navy circumference method and the BMI-based estimation formula. The US Navy method uses measurements of the neck, waist, and (for females) hips alongside height to produce a reasonably accurate estimate. The BMI method provides a secondary reference using only height, weight, age, and sex. These are screening estimates for educational purposes--they are not a substitute for clinical body composition testing or medical advice.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Scale weight alone does not distinguish between fat and lean mass. Two people at the same weight and height can have very different health profiles depending on their body composition. Estimating body fat percentage gives a clearer picture of fitness and metabolic risk, and helps you track meaningful changes during a training or diet program that the scale might miss.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select your biological sex.',
        'Enter your height and weight.',
        'For the US Navy method: measure and enter your neck, waist, and (females only) hip circumferences.',
        'Click "Calculate" to see body fat percentage results from both methods.',
        'Review the classification (essential, athletic, fit, average, obese) based on standard ranges.',
        'Track changes over time by repeating measurements under the same conditions.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'US Navy circumference method--validated for field use without specialized equipment.',
        'BMI-based body fat estimation as a secondary reference point.',
        'Automatic classification into standard body fat categories.',
        'Displays lean body mass and fat mass in kilograms/pounds alongside body fat percentage.',
        'Supports both metric and imperial measurements.',
        'Fully client-side--no personal measurements are sent to any server.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Tracking body composition changes during a fat-loss or muscle-building program.',
        'Military and law enforcement fitness assessments that use the US Navy method.',
        'Gym-goers who want a quick body fat estimate without expensive DEXA scans.',
        'Health coaches screening clients during initial consultations.',
        'Comparing two estimation methods to get a confidence range.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Male, 180 cm, 82 kg, waist 84 cm, neck 38 cm', description: 'US Navy estimate ≈ 17 % body fat. Classification: Fit. Lean mass ≈ 68 kg.' },
        { title: 'Female, 165 cm, 62 kg, waist 72 cm, neck 32 cm, hips 96 cm', description: 'US Navy estimate ≈ 25 % body fat. Classification: Fit. Fat mass ≈ 15.5 kg.' },
        { title: 'Male athlete, 185 cm, 90 kg, waist 78 cm, neck 40 cm', description: 'US Navy estimate ≈ 12 % body fat. Classification: Athletic. Low body fat reflects high training volume.' },
        { title: 'BMI-based estimation comparison', description: 'A 35-year-old male (BMI 26) may show ≈ 22 % via BMI formula vs. 19 % via Navy method, highlighting how muscle mass affects BMI-based estimates.' },
        { title: 'Progress tracking over 12 weeks', description: 'Starting at 28 % and reaching 22 % while weight drops only 3 kg shows significant fat loss offset by muscle gain--exactly the insight body fat tracking provides.' },
        { title: 'Female, 170 cm, 70 kg, waist 80 cm, neck 33 cm, hips 100 cm', description: 'US Navy estimate ≈ 29 %. Classification: Average. Targeted reduction to 24 % would improve metabolic markers.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Body Fat Percentage', definition: 'The proportion of total body weight that is adipose (fat) tissue, expressed as a percentage.' },
        { term: 'Lean Body Mass (LBM)', definition: 'Total body weight minus fat mass; includes muscle, bones, organs, and water.' },
        { term: 'US Navy Method', definition: 'A circumference-based body fat estimation developed by the US Department of Defense using neck, waist, and hip measurements.' },
        { term: 'Essential Fat', definition: 'The minimum fat necessary for basic physiological functions: ~2-5 % in males and ~10-13 % in females.' },
        { term: 'Visceral Fat', definition: 'Fat stored around internal organs in the abdominal cavity, strongly linked to metabolic disease risk.' },
        { term: 'Subcutaneous Fat', definition: 'Fat stored directly under the skin; less metabolically dangerous than visceral fat.' },
        { term: 'DEXA Scan', definition: 'Dual-Energy X-ray Absorptiometry--a clinical imaging method considered the gold standard for body composition analysis.' },
        { term: 'Skinfold Calipers', definition: 'A handheld device that measures subcutaneous fat thickness at specific body sites to estimate total body fat.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How accurate is the US Navy method?', answer: 'Studies show it is accurate within ±3-4 % for most individuals when measurements are taken correctly. It is less accurate for very lean or very obese populations.' },
        { question: 'Why does the BMI method give a different result?', answer: 'The BMI formula does not account for muscle mass, so muscular individuals often receive inflated body fat estimates from the BMI approach alone.' },
        { question: 'What is a healthy body fat percentage?', answer: 'General guidelines: Males--essential 2-5 %, athletic 6-13 %, fit 14-17 %, average 18-24 %, obese 25 %+. Females--essential 10-13 %, athletic 14-20 %, fit 21-24 %, average 25-31 %, obese 32 %+.' },
        { question: 'How should I take circumference measurements?', answer: 'Use a flexible tape measure. Measure the waist at the navel, the neck just below the larynx, and (females) the hips at the widest point. Stand relaxed, do not pull the tape tight.' },
        { question: 'Can I track body fat changes over time?', answer: 'Yes. For consistency, measure at the same time of day, under the same conditions, and use the same method each time.' },
        { question: 'Is this a replacement for DEXA or hydrostatic testing?', answer: 'No. This calculator provides estimates for screening and educational purposes. For clinical accuracy, consult a healthcare provider for a DEXA scan or other professional body composition assessment.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Measure circumferences first thing in the morning before eating or drinking for consistency.',
        'Use the same tape measure and technique each time to reduce measurement error.',
        'Do not suck in your stomach when measuring waist circumference--stand relaxed.',
        'Compare results from both methods (US Navy and BMI) and use the range for a realistic estimate.',
        'Track trends over weeks and months rather than obsessing over a single measurement.',
        'Combine body fat percentage with other markers like waist-to-hip ratio and blood work for a complete health picture.',
        'Remember that these are estimates--individual variation in fat distribution can affect accuracy.',
        'Consult a healthcare professional for precise body composition assessment, especially if results influence a medical or dietary plan.'
      ]
    }
  },
  relatedTools: ['ideal-weight-calculator', 'bmr-calculator', 'tdee-calculator', 'macro-calculator', 'calorie-burn-estimator'],
  seo: {
    metaTitle: 'Body Fat Calculator - US Navy & BMI Method | Wiki | UnTrackt',
    metaDescription: 'Estimate your body fat percentage using the US Navy circumference method and BMI-based formula. Assess body composition, lean mass, and fat mass without special equipment.',
    keywords: ['body fat calculator', 'body fat percentage', 'US Navy method', 'lean body mass', 'body composition', 'fat mass', 'BMI body fat', 'visceral fat', 'DEXA alternative']
  }
};
