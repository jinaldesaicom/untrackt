export default {
  id: 'tdee-calculator',
  title: 'TDEE Calculator',
  description: 'Calculate your Total Daily Energy Expenditure to determine accurate calorie targets for weight loss, maintenance, or muscle gain.',
  content: {
    whatIs: {
      heading: 'What is the TDEE Calculator?',
      body: 'The TDEE Calculator estimates your Total Daily Energy Expenditure--the total number of calories you burn in a day, including your Basal Metabolic Rate, physical activity, and the thermic effect of food. By selecting your activity level, the tool multiplies your BMR by the appropriate factor to produce a practical daily calorie target. This tool provides general estimates for educational purposes and should not replace individualized advice from a qualified healthcare provider or registered dietitian.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'BMR alone tells you what your body burns at rest, but it does not account for walking, exercising, or even fidgeting. TDEE gives you a complete picture of your daily energy needs, making it far more useful for setting calorie goals. Whether you want to lose fat, build muscle, or maintain weight, starting from your TDEE ensures your plan is grounded in real energy balance.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your age, sex, height, and weight.',
        'Select your activity level: sedentary, lightly active, moderately active, very active, or extremely active.',
        'Choose the underlying BMR equation (Mifflin-St Jeor is recommended).',
        'Click "Calculate" to see your estimated TDEE in calories per day.',
        'Review suggested calorie targets for deficit (weight loss), maintenance, and surplus (muscle gain).',
        'Adjust your activity level if your routine changes and recalculate.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Five activity levels from sedentary (desk job, no exercise) to extremely active (physical labor + intense training).',
        'Built-in BMR calculation using the Mifflin-St Jeor equation with optional Harris-Benedict comparison.',
        'Automatic calorie targets for mild deficit (−250), moderate deficit (−500), maintenance, and surplus (+250, +500).',
        'Metric and imperial unit support with seamless conversion.',
        'Clear breakdown showing BMR, activity multiplier, and final TDEE.',
        'No data leaves your browser--everything is calculated client-side.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting a daily calorie goal for a structured weight-loss plan with a defined deficit.',
        'Determining calorie surplus requirements for a lean bulk or muscle-building phase.',
        'Adjusting calorie intake when transitioning between training seasons (off-season vs. competition).',
        'Nutritionists and coaches providing initial calorie recommendations to clients.',
        'Pairing with a macro calculator to split TDEE into protein, carbs, and fat grams.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Sedentary office worker', description: '30-year-old male, 175 cm, 78 kg. BMR ≈ 1,737 kcal × 1.2 (sedentary) = TDEE ≈ 2,084 kcal/day.' },
        { title: 'Moderately active female', description: '28-year-old, 165 cm, 62 kg. BMR ≈ 1,380 kcal × 1.55 (moderate) = TDEE ≈ 2,139 kcal/day.' },
        { title: 'Very active athlete', description: '24-year-old male, 185 cm, 90 kg. BMR ≈ 1,934 kcal × 1.725 (very active) = TDEE ≈ 3,336 kcal/day.' },
        { title: 'Weight loss target (500 kcal deficit)', description: 'TDEE of 2,200 kcal − 500 = 1,700 kcal/day, aiming for ~0.45 kg (1 lb) of fat loss per week.' },
        { title: 'Lean bulk target (300 kcal surplus)', description: 'TDEE of 2,500 kcal + 300 = 2,800 kcal/day, supporting gradual muscle gain while minimizing fat accumulation.' },
        { title: 'Comparing activity levels', description: 'The same 70 kg male has a TDEE range of ~2,000 (sedentary) to ~3,200 (extremely active), illustrating how much movement affects energy needs.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Total Daily Energy Expenditure (TDEE)', definition: 'The total calories burned in 24 hours, combining BMR, activity, and the thermic effect of food.' },
        { term: 'Activity Factor', definition: 'A multiplier (1.2-1.9) applied to BMR based on exercise frequency and occupation to estimate TDEE.' },
        { term: 'Caloric Deficit', definition: 'Eating fewer calories than your TDEE, forcing the body to use stored energy (fat) and resulting in weight loss.' },
        { term: 'Caloric Surplus', definition: 'Eating more calories than your TDEE, providing extra energy for muscle growth or weight gain.' },
        { term: 'Non-Exercise Activity Thermogenesis (NEAT)', definition: 'Calories burned through everyday movements like walking, standing, and fidgeting--not structured exercise.' },
        { term: 'Exercise Activity Thermogenesis (EAT)', definition: 'Calories burned during planned, structured physical activity such as gym workouts or sports.' },
        { term: 'Thermic Effect of Food (TEF)', definition: 'Energy used to digest and process food, accounting for roughly 8-15 % of total calorie intake.' },
        { term: 'Adaptive Thermogenesis', definition: 'The body\'s tendency to reduce energy expenditure in response to prolonged caloric restriction, slowing weight loss over time.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How accurate is the TDEE calculation?', answer: 'TDEE estimates are typically within ±10-15 % for most people. Real-world accuracy depends on honest activity-level selection and individual metabolic variation. Treat the result as a starting point and adjust based on actual weight trends over 2-4 weeks. This is an estimate, not medical advice.' },
        { question: 'What activity level should I choose?', answer: 'Be honest and conservative. Sedentary = desk job with no exercise. Lightly active = 1-3 days of light exercise. Moderate = 3-5 days. Very active = 6-7 days of hard exercise. Extremely active = physical job + intense daily training.' },
        { question: 'How do I use TDEE for weight loss?', answer: 'Subtract 250-500 kcal from your TDEE to create a sustainable deficit. Larger deficits can accelerate loss but may also reduce muscle mass and energy.' },
        { question: 'Should I eat back exercise calories?', answer: 'If your activity factor already accounts for exercise, additional calories are not needed. If you use the sedentary multiplier and track exercise separately, you may add a portion of estimated exercise calories.' },
        { question: 'Does TDEE change over time?', answer: 'Yes. Weight loss reduces BMR, and the body may adapt by lowering NEAT. Recalculate every few weeks and consider periodic diet breaks to counter adaptive thermogenesis.' },
        { question: 'Is this tool a substitute for professional guidance?', answer: 'No. It is an educational estimator. People with medical conditions or specific performance goals should work with a registered dietitian or sports nutritionist.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Start with the calculated TDEE and track weight for 2-4 weeks before making large adjustments.',
        'Use a moderate deficit (300-500 kcal) rather than an aggressive one to preserve muscle and energy.',
        'Recalculate your TDEE whenever your weight changes by 5 kg or your activity level shifts.',
        'Combine TDEE with a macro calculator to ensure adequate protein, especially during a deficit.',
        'Consider diet breaks (eating at maintenance for 1-2 weeks) every 8-12 weeks of dieting to manage adaptive thermogenesis.',
        'Track food intake consistently for accurate results--untracked snacks can easily erase a 300 kcal deficit.',
        'Remember that NEAT varies significantly between individuals and can account for 200-900 kcal/day.',
        'Consult a healthcare professional before starting any significant dietary change, particularly if you have underlying health conditions.'
      ]
    }
  },
  relatedTools: ['bmr-calculator', 'macro-calculator', 'calorie-burn-estimator', 'ideal-weight-calculator', 'body-fat-calculator'],
  seo: {
    metaTitle: 'TDEE Calculator - Total Daily Energy Expenditure | Wiki | UnTrackt',
    metaDescription: 'Calculate your Total Daily Energy Expenditure based on BMR and activity level. Get accurate calorie targets for weight loss, maintenance, or muscle gain.',
    keywords: ['TDEE calculator', 'total daily energy expenditure', 'calorie calculator', 'weight loss calories', 'calorie target', 'activity factor', 'energy balance', 'maintenance calories']
  }
};
