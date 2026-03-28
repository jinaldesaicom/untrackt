export default {
  id: 'calorie-burn-estimator',
  title: 'Calorie Burn Estimator',
  description: 'Estimate calories burned during exercise and daily activities using MET values, body weight, and duration.',
  content: {
    whatIs: {
      heading: 'What is the Calorie Burn Estimator?',
      body: 'The Calorie Burn Estimator calculates the approximate number of calories you burn during physical activities using the Metabolic Equivalent of Task (MET) system. MET values represent the energy cost of an activity relative to resting metabolism. Simply select an activity, enter your body weight and duration, and the tool returns an estimate of calories burned. These are population-average estimates for educational purposes and are not a substitute for individualized guidance from a healthcare or fitness professional.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Understanding how many calories different activities burn helps you make informed decisions about exercise and nutrition. Whether you are trying to create a caloric deficit for weight loss, balance energy intake for maintenance, or fuel performance, knowing the energy cost of your workouts allows for smarter planning and realistic expectations.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select an activity from the dropdown list (e.g., running, cycling, swimming, walking).',
        'Enter your body weight in kilograms or pounds.',
        'Enter the duration of the activity in minutes.',
        'Click "Calculate" to see the estimated calories burned.',
        'Add multiple activities to see a total session or daily burn.',
        'Compare activities to find the most efficient options for your goals.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Extensive activity database with MET values from the Compendium of Physical Activities.',
        'Supports over 50 activities including sports, gym exercises, household tasks, and occupational activities.',
        'Weight-based calculation for personalized estimates.',
        'Multi-activity session tracking with cumulative calorie total.',
        'Side-by-side activity comparison to evaluate burn efficiency.',
        'Client-side calculation--no personal data is sent to any server.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Runners estimating calories burned during a 5K, 10K, or half marathon.',
        'Gym-goers calculating the burn from a combined cardio and weights session.',
        'People on a weight-loss plan balancing exercise calories with dietary intake.',
        'Fitness professionals providing clients with activity-based calorie estimates.',
        'Comparing the relative calorie burn of walking vs. cycling vs. swimming.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Running (8 km/h), 75 kg, 30 min', description: 'MET ≈ 8.3. Calories ≈ 8.3 × 75 × 0.5 = ~311 kcal.' },
        { title: 'Cycling (moderate), 68 kg, 45 min', description: 'MET ≈ 6.8. Calories ≈ 6.8 × 68 × 0.75 = ~347 kcal.' },
        { title: 'Walking (5 km/h), 80 kg, 60 min', description: 'MET ≈ 3.5. Calories ≈ 3.5 × 80 × 1.0 = ~280 kcal.' },
        { title: 'Swimming (moderate laps), 70 kg, 30 min', description: 'MET ≈ 7.0. Calories ≈ 7.0 × 70 × 0.5 = ~245 kcal.' },
        { title: 'Weight training (vigorous), 85 kg, 45 min', description: 'MET ≈ 6.0. Calories ≈ 6.0 × 85 × 0.75 = ~383 kcal.' },
        { title: 'Yoga (Hatha), 60 kg, 60 min', description: 'MET ≈ 2.5. Calories ≈ 2.5 × 60 × 1.0 = ~150 kcal. Lower intensity but valuable for flexibility and stress reduction.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'MET (Metabolic Equivalent of Task)', definition: 'A unit expressing the energy cost of an activity relative to rest. 1 MET ≈ 1 kcal/kg/hour (resting metabolism).' },
        { term: 'Compendium of Physical Activities', definition: 'A standardized reference of MET values for hundreds of activities, maintained by researchers at Arizona State University.' },
        { term: 'Excess Post-Exercise Oxygen Consumption (EPOC)', definition: 'Elevated calorie burn after exercise as the body recovers; also called the "afterburn effect."' },
        { term: 'Active Calories', definition: 'Calories burned through physical movement, as opposed to resting/basal calories.' },
        { term: 'Resting Metabolic Rate', definition: 'The number of calories burned at complete rest, equivalent to approximately 1 MET.' },
        { term: 'Exercise Intensity', definition: 'How hard the body works during an activity, often described as light (<3 METs), moderate (3-6 METs), or vigorous (>6 METs).' },
        { term: 'Heart Rate-Calorie Relationship', definition: 'Higher heart rates generally correlate with higher calorie burn, though the MET method does not directly use heart rate.' },
        { term: 'Non-Exercise Activity Thermogenesis (NEAT)', definition: 'Calories burned from daily movements that are not structured exercise, such as walking, standing, and fidgeting.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How accurate are MET-based calorie estimates?', answer: 'MET values are population averages and can vary by ±15-20 % depending on fitness level, technique, and environmental conditions. They are useful for general planning but not precision accounting. This tool provides estimates, not medical advice.' },
        { question: 'Does weight affect calorie burn?', answer: 'Yes. Heavier individuals expend more energy performing the same activity because they move more mass. That is why body weight is a key input in the formula.' },
        { question: 'Do I burn more calories in the heat?', answer: 'Slightly. The body expends extra energy for thermoregulation, but the increase is modest (5-10 %). MET values do not account for environmental conditions.' },
        { question: 'Should I eat back exercise calories?', answer: 'It depends on your goals. For weight loss, eat back only a portion (50-75 %) since estimates can overstate actual burn. For maintenance or performance, replace most exercise calories.' },
        { question: 'Is walking really effective for calorie burning?', answer: 'Yes. While lower intensity than running, walking for longer durations accumulates significant calorie burn and is sustainable for most fitness levels.' },
        { question: 'Does muscle mass affect the estimate?', answer: 'Indirectly. More muscle increases resting metabolic rate. MET estimates use total body weight, so they may slightly underestimate burn for muscular individuals and overestimate for higher body fat levels.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Use MET-based estimates as a guide, not an exact count--real-world burn varies with intensity and form.',
        'Weigh yourself under consistent conditions for the most accurate input.',
        'Combine higher-MET activities (running, cycling) with lower-MET activities (yoga, walking) for a balanced routine.',
        'Do not use exercise calorie estimates as a justification for excessive eating--they can be overstated.',
        'Track exercise alongside dietary intake for a complete energy balance picture.',
        'Update activity selections to match actual intensity--"moderate cycling" and "vigorous cycling" have very different MET values.',
        'Account for warm-up and cool-down periods, which are lower intensity than the main workout.',
        'Consult a fitness professional for activity recommendations tailored to your health status and goals.'
      ]
    }
  },
  relatedTools: ['tdee-calculator', 'bmr-calculator', 'macro-calculator', 'heart-rate-zone-calculator', 'water-intake-calculator'],
  seo: {
    metaTitle: 'Calorie Burn Estimator - MET-Based Exercise Calculator | Wiki | UnTrackt',
    metaDescription: 'Estimate calories burned during any exercise or activity using MET values, body weight, and duration. Compare activities and plan your fitness routine effectively.',
    keywords: ['calorie burn estimator', 'calories burned', 'MET values', 'exercise calories', 'workout calorie calculator', 'activity tracker', 'running calories', 'walking calories', 'calorie expenditure']
  }
};
