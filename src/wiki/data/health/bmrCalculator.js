export default {
  id: 'bmr-calculator',
  title: 'BMR Calculator',
  description: 'Calculate your Basal Metabolic Rate using the Mifflin-St Jeor and Harris-Benedict equations to understand your daily calorie needs at rest.',
  content: {
    whatIs: {
      heading: 'What is the BMR Calculator?',
      body: 'The BMR Calculator estimates your Basal Metabolic Rate--the number of calories your body burns at complete rest to maintain vital functions such as breathing, circulation, and cell production. It supports both the Mifflin-St Jeor equation (widely regarded as the most accurate for most adults) and the revised Harris-Benedict equation. Simply enter your age, sex, height, and weight to receive an instant estimate. Please note: this tool provides estimates for educational purposes only and is not a substitute for professional medical or nutritional advice.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Understanding your BMR is the foundation of any calorie-management plan. Whether you want to lose weight, gain muscle, or maintain your current physique, knowing how many calories your body burns at rest helps you set realistic daily calorie targets. By starting with BMR and then factoring in activity level, you can calculate your Total Daily Energy Expenditure (TDEE) for precise meal planning.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select your biological sex (male or female) as the equations use sex-specific coefficients.',
        'Enter your age in years.',
        'Input your height in centimeters or feet/inches.',
        'Input your weight in kilograms or pounds.',
        'Choose the equation you prefer: Mifflin-St Jeor or Harris-Benedict.',
        'Click "Calculate" to see your estimated BMR in calories per day.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports both Mifflin-St Jeor and Harris-Benedict equations for comparison.',
        'Accepts metric (kg/cm) and imperial (lb/ft-in) units with automatic conversion.',
        'Displays results in calories per day with a breakdown of the formula used.',
        'Provides a quick TDEE estimate by letting you select an activity multiplier.',
        'Instant client-side calculation--no data is sent to any server.',
        'Clean, mobile-friendly interface for quick lookups on any device.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting a calorie baseline before starting a weight-loss or muscle-gain program.',
        'Comparing results from different BMR equations to get a realistic range.',
        'Helping personal trainers provide initial calorie recommendations to clients.',
        'Educational reference for nutrition students studying energy expenditure.',
        'Pairing with a TDEE calculator to plan macronutrient splits.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: '25-year-old male, 180 cm, 80 kg', description: 'Mifflin-St Jeor: BMR ≈ 1,822 kcal/day. This person burns roughly 1,822 calories at complete rest.' },
        { title: '30-year-old female, 165 cm, 60 kg', description: 'Mifflin-St Jeor: BMR ≈ 1,354 kcal/day. A moderate activity multiplier of 1.55 gives a TDEE of ~2,099 kcal.' },
        { title: '45-year-old male, 175 cm, 90 kg', description: 'Harris-Benedict: BMR ≈ 1,858 kcal/day. Age-related metabolic decline is reflected in the lower multiplier.' },
        { title: '22-year-old female, 170 cm, 55 kg', description: 'Mifflin-St Jeor: BMR ≈ 1,331 kcal/day. Useful as a minimum calorie floor for safe dieting.' },
        { title: 'Comparing equations', description: 'A 35-year-old male (183 cm, 85 kg) may see ~50-100 kcal difference between Mifflin-St Jeor and Harris-Benedict, illustrating why using a range is practical.' },
        { title: 'Sedentary office worker', description: 'A sedentary 40-year-old female (160 cm, 65 kg) with BMR ≈ 1,330 kcal and TDEE ≈ 1,596 kcal (×1.2) should target around 1,600 kcal/day for maintenance.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Basal Metabolic Rate (BMR)', definition: 'The number of calories your body needs at complete rest to sustain basic life functions over 24 hours.' },
        { term: 'Mifflin-St Jeor Equation', definition: 'A BMR formula published in 1990, considered the most accurate for most healthy adults: (10 × weight kg) + (6.25 × height cm) − (5 × age) + sex factor.' },
        { term: 'Harris-Benedict Equation', definition: 'An older BMR formula first published in 1919 and revised in 1984, still widely used in clinical and fitness settings.' },
        { term: 'Total Daily Energy Expenditure (TDEE)', definition: 'The total calories burned in a day, calculated by multiplying BMR by an activity factor (1.2-1.9).' },
        { term: 'Activity Factor', definition: 'A multiplier applied to BMR that accounts for physical activity level, ranging from sedentary (1.2) to extremely active (1.9).' },
        { term: 'Thermic Effect of Food (TEF)', definition: 'The energy expended to digest, absorb, and metabolize nutrients, typically 8-15 % of total calorie intake.' },
        { term: 'Resting Metabolic Rate (RMR)', definition: 'Similar to BMR but measured under slightly less strict conditions; RMR is typically 10-20 % higher than BMR.' },
        { term: 'Caloric Deficit', definition: 'Consuming fewer calories than your TDEE, leading to weight loss over time.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How accurate is the BMR Calculator?', answer: 'The Mifflin-St Jeor equation is accurate within about ±10 % for most healthy adults. Individual variation due to genetics, muscle mass, and metabolic conditions can affect results. This tool provides estimates and is not a substitute for medical advice.' },
        { question: 'Which equation should I choose?', answer: 'The Mifflin-St Jeor equation is recommended by the Academy of Nutrition and Dietetics for most people. Harris-Benedict may be useful for comparison or if your practitioner prefers it.' },
        { question: 'Does BMR change with age?', answer: 'Yes. BMR decreases by roughly 1-2 % per decade after age 20, primarily due to loss of lean muscle mass.' },
        { question: 'Can I use BMR alone for weight loss?', answer: 'BMR tells you the minimum calories your body needs at rest. For a practical calorie target, multiply BMR by your activity factor to get TDEE, then create a moderate deficit (250-500 kcal/day).' },
        { question: 'Is this tool a substitute for medical advice?', answer: 'No. The BMR Calculator provides general estimates for educational purposes. Always consult a healthcare professional or registered dietitian before making significant dietary changes.' },
        { question: 'Why are results different for males and females?', answer: 'Males typically have more lean muscle mass, which burns more calories at rest. Both equations include a sex-specific constant to account for this difference.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use consistent units--do not mix metric and imperial values when entering data.',
        'Calculate your BMR using both equations and use the average for a more robust estimate.',
        'Recalculate your BMR every 5-10 kg of weight change or once every few months.',
        'Never eat below your BMR for extended periods without medical supervision.',
        'Pair your BMR result with an activity factor for a practical TDEE target.',
        'Remember that BMR formulas assume average body composition--they may overestimate for very overweight individuals and underestimate for athletes.',
        'Use BMR as a starting point and adjust based on real-world results over 2-4 weeks.',
        'Consult a registered dietitian for personalized calorie recommendations, especially if you have a medical condition.'
      ]
    }
  },
  relatedTools: ['tdee-calculator', 'macro-calculator', 'calorie-burn-estimator', 'ideal-weight-calculator', 'body-fat-calculator'],
  seo: {
    metaTitle: 'BMR Calculator - Basal Metabolic Rate Estimator | Wiki | UnTrackt',
    metaDescription: 'Calculate your Basal Metabolic Rate using the Mifflin-St Jeor and Harris-Benedict equations. Understand your daily calorie needs at rest for effective weight management.',
    keywords: ['BMR calculator', 'basal metabolic rate', 'Mifflin-St Jeor', 'Harris-Benedict', 'calorie needs', 'TDEE', 'resting metabolism', 'calorie calculator', 'weight management']
  }
};
