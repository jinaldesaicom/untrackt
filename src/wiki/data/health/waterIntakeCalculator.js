export default {
  id: 'water-intake-calculator',
  title: 'Water Intake Calculator',
  description: 'Estimate your optimal daily water intake based on body weight, activity level, and climate to stay properly hydrated.',
  content: {
    whatIs: {
      heading: 'What is the Water Intake Calculator?',
      body: 'The Water Intake Calculator estimates how much water you should drink each day based on your body weight, physical activity level, and environmental factors such as climate and altitude. Proper hydration supports digestion, circulation, temperature regulation, and cognitive function. This tool provides general estimates for educational purposes only and is not a substitute for personalized medical advice from a healthcare professional.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Most people underestimate how much water they need, especially during exercise or in hot climates. A personalized estimate removes guesswork and helps you build a consistent hydration habit. Chronic mild dehydration can impair concentration, mood, and physical performance without obvious symptoms, making proactive tracking essential.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your body weight in kilograms or pounds.',
        'Select your typical daily activity level (sedentary, moderate, active, very active).',
        'Indicate your climate or environment (temperate, hot/humid, cold, high altitude).',
        'Optionally note if you are pregnant or breastfeeding for adjusted recommendations.',
        'Click "Calculate" to see your recommended daily water intake in liters and glasses.',
        'Use the result as a baseline and adjust based on thirst, urine color, and personal comfort.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Weight-based calculation using the widely cited 30-35 mL per kg guideline.',
        'Activity level adjustment that adds fluid for exercise duration and intensity.',
        'Climate modifier for hot, humid, cold, or high-altitude environments.',
        'Displays results in liters, milliliters, ounces, and standard 250 mL glasses.',
        'Optional pregnancy/breastfeeding modifier per WHO recommendations.',
        'Fully client-side--no personal data is transmitted or stored.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Athletes planning fluid intake before, during, and after training sessions.',
        'Office workers setting daily hydration goals to improve focus and energy.',
        'Travelers adjusting water intake for hot climates or high-altitude destinations.',
        'Pregnant or breastfeeding individuals checking recommended fluid increases.',
        'Health coaches providing clients with simple, evidence-based hydration targets.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: '70 kg sedentary adult, temperate climate', description: 'Recommended intake ≈ 2.1-2.5 L/day (~8-10 glasses). A solid baseline for desk-based workers.' },
        { title: '85 kg active male, hot climate', description: 'Recommended intake ≈ 3.4-4.0 L/day. The combination of higher body mass, exercise, and heat significantly increases fluid needs.' },
        { title: '55 kg moderately active female', description: 'Recommended intake ≈ 1.9-2.2 L/day. Adding a 30-minute jog increases the target by roughly 350-500 mL.' },
        { title: 'Pregnant woman, 65 kg', description: 'Recommended intake ≈ 2.3-2.6 L/day, reflecting the additional ~300 mL recommended during pregnancy.' },
        { title: 'High-altitude hiker, 75 kg', description: 'Recommended intake ≈ 3.0-3.5 L/day. Altitude increases respiration rate and insensible water loss.' },
        { title: 'Breastfeeding mother, 60 kg', description: 'Recommended intake ≈ 2.6-3.1 L/day, adding roughly 700 mL to account for milk production.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Hydration', definition: 'The process of providing adequate fluid to body tissues for optimal physiological function.' },
        { term: 'Insensible Water Loss', definition: 'Water lost through breathing, skin evaporation, and other non-measurable routes--typically 500-800 mL/day.' },
        { term: 'Electrolytes', definition: 'Minerals like sodium, potassium, and magnesium that help regulate fluid balance, nerve function, and muscle contraction.' },
        { term: 'Hyponatremia', definition: 'A dangerously low sodium level caused by drinking excessive water, diluting blood sodium concentration.' },
        { term: 'Urine Specific Gravity', definition: 'A lab measure of urine concentration; values above 1.020 may indicate dehydration.' },
        { term: 'Total Body Water (TBW)', definition: 'The total amount of water in the body, typically 50-60 % of body weight in adults.' },
        { term: 'Adequate Intake (AI)', definition: 'The recommended daily nutrient intake level set by health authorities when there is insufficient evidence for an RDA.' },
        { term: 'Diuretic', definition: 'A substance (e.g., caffeine, alcohol) that increases urine production and may contribute to fluid loss.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Is the "8 glasses a day" rule accurate?', answer: 'It is a reasonable starting point for an average sedentary adult, but individual needs vary widely based on weight, activity, and climate. This calculator gives a more personalized estimate.' },
        { question: 'Does coffee count toward my water intake?', answer: 'Yes. While caffeine has a mild diuretic effect, the net fluid contribution of coffee and tea is still positive. However, plain water remains the best hydration source.' },
        { question: 'Can I drink too much water?', answer: 'Yes. Overhydration can lead to hyponatremia, a dangerous drop in blood sodium. Follow your calculated target and listen to your body rather than forcing excessive intake.' },
        { question: 'Should I drink more water when sick?', answer: 'Generally yes, especially with fever, vomiting, or diarrhea, which increase fluid loss. Consult a doctor for specific guidance.' },
        { question: 'Is this tool a substitute for medical advice?', answer: 'No. The Water Intake Calculator provides general estimates for informational purposes. Individuals with kidney conditions, heart failure, or other medical issues should consult their healthcare provider for fluid recommendations.' },
        { question: 'How do I know if I am dehydrated?', answer: 'Common signs include dark yellow urine, dry mouth, fatigue, headache, and dizziness. Pale straw-colored urine generally indicates adequate hydration.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start your day with a glass of water to kick-start hydration after overnight fasting.',
        'Carry a reusable water bottle and sip regularly rather than consuming large amounts at once.',
        'Monitor urine color--aim for pale straw yellow as a simple hydration indicator.',
        'Increase intake by 350-500 mL for every 30 minutes of moderate-to-vigorous exercise.',
        'In hot or dry climates, drink before you feel thirsty--thirst is a late signal of dehydration.',
        'Include water-rich foods like cucumbers, watermelon, and oranges to supplement fluid intake.',
        'If you consume alcohol, match each alcoholic drink with an equal glass of water.',
        'Recalculate your target when your weight, activity level, or environment changes significantly.'
      ]
    }
  },
  relatedTools: ['bmr-calculator', 'tdee-calculator', 'calorie-burn-estimator', 'macro-calculator'],
  seo: {
    metaTitle: 'Water Intake Calculator - Daily Hydration Estimator | Wiki | UnTrackt',
    metaDescription: 'Calculate your optimal daily water intake based on body weight, activity level, and climate. Stay properly hydrated with personalized fluid recommendations.',
    keywords: ['water intake calculator', 'daily water intake', 'hydration calculator', 'how much water to drink', 'fluid needs', 'dehydration', 'water consumption', 'hydration guide']
  }
};
