export default {
  id: 'macro-calculator',
  title: 'Macro Calculator',
  description: 'Calculate your optimal daily macronutrient split--protein, carbohydrates, and fat--based on your calorie target and dietary goals.',
  content: {
    whatIs: {
      heading: 'What is the Macro Calculator?',
      body: 'The Macro Calculator divides your daily calorie target into grams of protein, carbohydrates, and fat based on your goals (weight loss, maintenance, or muscle gain) and preferred diet style. Whether you follow a balanced, high-protein, low-carb, or ketogenic approach, the tool converts your TDEE or chosen calorie target into actionable gram amounts for each macronutrient. This tool provides general estimates for educational purposes and is not a substitute for personalized nutrition advice from a registered dietitian.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Calories alone do not tell the full story--where those calories come from matters. Adequate protein preserves muscle during fat loss, sufficient carbohydrates fuel training performance, and healthy fats support hormones and nutrient absorption. A macro-based approach helps you hit your calorie target while optimizing body composition and energy levels.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your daily calorie target (or use the built-in TDEE estimator).',
        'Select your primary goal: fat loss, maintenance, or muscle gain.',
        'Choose a diet style or manually set your macro ratios (e.g., 40/30/30).',
        'Optionally specify your body weight for protein calculations (e.g., 1.6-2.2 g/kg).',
        'Click "Calculate" to see grams and calories for protein, carbs, and fat.',
        'Use the results to plan meals and track daily intake.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Preset diet profiles: balanced, high-protein, low-carb, ketogenic, and custom.',
        'Protein target based on grams per kilogram of body weight for precision.',
        'Displays macros in grams, calories, and percentage of total intake.',
        'Goal-specific adjustments for fat loss, maintenance, and muscle gain.',
        'Integrates with TDEE calculation or accepts a manual calorie input.',
        'Entirely client-side--your dietary data is never transmitted or stored.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Meal prepping for a week using exact gram targets for each macronutrient.',
        'Athletes adjusting macro splits between training and rest days.',
        'People starting a ketogenic diet who need to calculate net carb limits.',
        'Personal trainers providing clients with clear daily macro targets.',
        'Anyone transitioning from simple calorie counting to macro tracking for better results.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Balanced fat loss: 1,800 kcal', description: '40 % protein / 30 % carbs / 30 % fat = 180 g protein, 135 g carbs, 60 g fat.' },
        { title: 'High-protein muscle gain: 2,800 kcal', description: '35 % protein / 40 % carbs / 25 % fat = 245 g protein, 280 g carbs, 78 g fat.' },
        { title: 'Ketogenic: 2,000 kcal', description: '25 % protein / 5 % carbs / 70 % fat = 125 g protein, 25 g carbs, 156 g fat.' },
        { title: 'Low-carb maintenance: 2,200 kcal', description: '30 % protein / 20 % carbs / 50 % fat = 165 g protein, 110 g carbs, 122 g fat.' },
        { title: 'Weight-based protein for 75 kg individual', description: 'At 2.0 g/kg, protein = 150 g (600 kcal). Remaining 1,400 kcal split between carbs and fat per goals.' },
        { title: 'Training vs. rest day adjustment', description: 'Training day: 45 % carbs for fuel. Rest day: reduce carbs to 30 % and increase fat to maintain calories while promoting recovery.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Macronutrients', definition: 'The three primary nutrient categories that provide energy: protein (4 kcal/g), carbohydrates (4 kcal/g), and fat (9 kcal/g).' },
        { term: 'Protein', definition: 'An essential macronutrient composed of amino acids, critical for muscle repair, immune function, and enzyme production.' },
        { term: 'Carbohydrates', definition: 'The body\'s primary energy source, broken down into glucose. Found in grains, fruits, vegetables, and sugars.' },
        { term: 'Dietary Fat', definition: 'An essential macronutrient required for hormone production, cell membrane integrity, and absorption of fat-soluble vitamins (A, D, E, K).' },
        { term: 'Macro Ratio', definition: 'The percentage split of daily calories among protein, carbs, and fat (e.g., 40/30/30).' },
        { term: 'Net Carbs', definition: 'Total carbohydrates minus fiber and sugar alcohols; commonly used in low-carb and ketogenic diets.' },
        { term: 'Leucine', definition: 'A branched-chain amino acid that plays a key role in triggering muscle protein synthesis.' },
        { term: 'Glycogen', definition: 'The stored form of glucose in muscles and liver, serving as a readily available energy reserve during exercise.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How much protein do I actually need?', answer: 'Research supports 1.6-2.2 g per kg of body weight for active individuals aiming to build or preserve muscle. Sedentary adults may be fine with 0.8-1.2 g/kg. These are general guidelines--consult a dietitian for personalized advice.' },
        { question: 'Does the 40/30/30 ratio work for everyone?', answer: 'It is a solid starting point for most people, but optimal ratios depend on goals, activity, and individual tolerance. Athletes may need higher carbs; those on keto need much higher fat.' },
        { question: 'Should I count net carbs or total carbs?', answer: 'For ketogenic diets, net carbs are standard. For general nutrition, total carbs provide a more complete picture. Choose whichever aligns with your dietary framework.' },
        { question: 'Can I hit my macros with any foods?', answer: 'Technically yes, but food quality matters for micronutrients, fiber, and long-term health. Prioritize whole foods and treat the macro targets as a framework, not a license for junk food.' },
        { question: 'Do macros matter more than calories?', answer: 'Calories determine weight change; macros determine body composition and performance. Both matter--macros optimize how your body uses the calories you consume.' },
        { question: 'Is this tool medical advice?', answer: 'No. The Macro Calculator provides general educational estimates. Individuals with diabetes, kidney disease, or other conditions should work with a healthcare professional for macro planning.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Prioritize protein first--it is the macro most people under-consume and the hardest to redistribute later.',
        'Spread protein intake across 3-5 meals for optimal muscle protein synthesis (25-40 g per meal).',
        'Adjust carb and fat ratios based on activity: more carbs on training days, more fat on rest days.',
        'Use a food tracking app alongside this calculator to monitor daily adherence.',
        'Aim for ±5 g accuracy on each macro rather than obsessing over exact numbers.',
        'Recalculate macros when your calorie target or body weight changes significantly.',
        'Include fiber-rich carb sources (vegetables, legumes, whole grains) for satiety and gut health.',
        'Consult a registered dietitian if you have specific health conditions that affect macronutrient needs.'
      ]
    }
  },
  relatedTools: ['tdee-calculator', 'bmr-calculator', 'calorie-burn-estimator', 'ideal-weight-calculator', 'body-fat-calculator'],
  seo: {
    metaTitle: 'Macro Calculator - Protein, Carbs & Fat Planner | Wiki | UnTrackt',
    metaDescription: 'Calculate your daily macronutrient targets--protein, carbs, and fat--based on your calorie goal and diet style. Optimize body composition with precise macro planning.',
    keywords: ['macro calculator', 'macronutrients', 'protein calculator', 'carbs and fat', 'diet planning', 'keto macros', 'high protein', 'macro ratio', 'meal planning']
  }
};
