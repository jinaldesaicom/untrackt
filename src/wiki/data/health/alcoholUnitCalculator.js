export default {
  id: 'alcohol-unit-calculator',
  title: 'Alcohol Unit Calculator',
  description: 'Calculate the number of alcohol units and estimated processing time for any drink based on volume and ABV percentage.',
  content: {
    whatIs: {
      heading: 'What is the Alcohol Unit Calculator?',
      body: 'The Alcohol Unit Calculator determines how many standard alcohol units are in a drink based on its volume and alcohol by volume (ABV) percentage. It also estimates how long your body will take to process the alcohol. One UK unit equals 10 mL (8 g) of pure alcohol, while one US "standard drink" contains about 14 g. The tool supports both systems. This calculator provides general estimates for educational purposes and is not medical advice. Alcohol affects individuals differently--consult a healthcare provider regarding safe consumption limits.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Many people underestimate the alcohol content of their drinks, especially craft beers, cocktails, and generous pours of wine. Converting any drink into standardized units makes it easy to compare across beverages and track weekly consumption against recommended guidelines (e.g., 14 UK units/week). Understanding processing time also helps you make safer decisions about driving and next-day activities.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the drink volume in milliliters (or fluid ounces).',
        'Enter the alcohol by volume (ABV) percentage (found on the label).',
        'Optionally select the unit system: UK units or US standard drinks.',
        'Click "Calculate" to see the number of units and estimated processing time.',
        'Add multiple drinks to see a cumulative total for a session or week.',
        'Compare your weekly total against recommended guidelines.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports both UK alcohol units (10 mL / 8 g) and US standard drinks (14 g).',
        'Calculates units for any custom volume and ABV combination.',
        'Estimates processing time based on the average rate of ~1 unit per hour.',
        'Cumulative session tracker for adding multiple drinks.',
        'Preset drink templates: pint of beer, glass of wine, shot of spirit, cocktail.',
        'Client-side calculation--no drinking data is stored or transmitted.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Checking how many units are in a pint of craft beer with higher ABV.',
        'Calculating total units consumed during a social event to stay within guidelines.',
        'Estimating when it will be safe to drive after drinking.',
        'Health-conscious individuals tracking weekly alcohol intake alongside calorie tracking.',
        'Healthcare professionals providing patient education on alcohol consumption.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Pint of lager (568 mL, 4.5 % ABV)', description: '≈ 2.6 UK units. Processing time ≈ 2.6 hours at 1 unit/hour.' },
        { title: 'Glass of red wine (175 mL, 13.5 % ABV)', description: '≈ 2.4 UK units. A standard restaurant pour is often 175-250 mL, so large glasses may be 3+ units.' },
        { title: 'Shot of vodka (25 mL, 40 % ABV)', description: '≈ 1.0 UK unit. Standard pub measure; a double (50 mL) = 2.0 units.' },
        { title: 'Craft IPA (330 mL can, 7.2 % ABV)', description: '≈ 2.4 UK units. Higher ABV makes even small cans equivalent to a large glass of wine.' },
        { title: 'Cocktail (Margarita, 200 mL, ~13 % ABV)', description: '≈ 2.6 UK units. Mixed drinks can be deceptive as they combine multiple spirits with juice.' },
        { title: 'Weekly total example', description: '3 pints of lager (7.8 units) + 2 glasses of wine (4.8 units) = 12.6 units, just under the UK 14-unit weekly guideline.' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Alcohol Unit (UK)', definition: 'A measure equal to 10 mL (8 g) of pure alcohol. Calculated as (volume in mL × ABV %) / 1,000.' },
        { term: 'Standard Drink (US)', definition: 'A measure containing approximately 14 g (0.6 fl oz) of pure alcohol, equivalent to 12 oz of 5 % beer, 5 oz of 12 % wine, or 1.5 oz of 40 % spirit.' },
        { term: 'Alcohol by Volume (ABV)', definition: 'The percentage of pure alcohol in a beverage by volume, displayed on product labels.' },
        { term: 'Blood Alcohol Concentration (BAC)', definition: 'The percentage of alcohol in the bloodstream, affected by weight, sex, food intake, and drinking rate.' },
        { term: 'Metabolism Rate', definition: 'The liver processes roughly one UK unit (~10 mL of pure alcohol) per hour on average, though this varies by individual.' },
        { term: 'Binge Drinking', definition: 'Consuming 6+ UK units (women) or 8+ UK units (men) in a single session, significantly increasing short-term health risks.' },
        { term: 'Unit Guidelines', definition: 'UK Chief Medical Officers recommend no more than 14 units per week, spread over 3+ days, with alcohol-free days included.' },
        { term: 'Proof', definition: 'An older measure of alcohol strength. In the US: proof = 2 × ABV. In the UK (historical): proof ≈ 1.75 × ABV.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'How do I calculate alcohol units?', answer: 'UK units = (volume in mL × ABV %) / 1,000. For example, 500 mL of 5 % beer = (500 × 5) / 1,000 = 2.5 units.' },
        { question: 'How long does it take to process alcohol?', answer: 'On average, the liver processes roughly 1 UK unit per hour. A 3-unit drink takes about 3 hours to fully metabolize. This varies by body weight, sex, food intake, and liver health.' },
        { question: 'Is it safe to drive after one drink?', answer: 'It depends on the drink size, your body weight, and the legal BAC limit in your jurisdiction. When in doubt, do not drive after drinking. This tool estimates processing time but cannot guarantee sobriety.' },
        { question: 'Do mixers affect the alcohol content?', answer: 'Mixers dilute ABV in the glass but do not reduce the total alcohol consumed. A vodka-soda contains the same units as the same amount of neat vodka.' },
        { question: 'Is this tool a substitute for medical guidance?', answer: 'No. Alcohol tolerance and health risks vary significantly between individuals. People with liver conditions, those taking medications, or pregnant individuals should consult a healthcare provider regarding alcohol use.' },
        { question: 'What is the recommended weekly limit?', answer: 'In the UK, the recommended limit is 14 units per week for both men and women, ideally spread over 3 or more days. US guidelines suggest up to 2 standard drinks/day for men and 1 for women.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always check the ABV on the label--craft beers and wines can be significantly higher than you assume.',
        'Use the preset drink templates as a quick reference rather than guessing unit values.',
        'Track your weekly total, not just single-session consumption, to stay within guidelines.',
        'Space drinks with water or non-alcoholic beverages to slow intake.',
        'Eat before and while drinking to slow alcohol absorption.',
        'Never rely on "feeling fine" to determine sobriety--alcohol can impair judgment before you feel noticeably drunk.',
        'Plan transportation in advance if you expect to drink--use the processing time estimate for general guidance only.',
        'If you are pregnant, trying to conceive, or on medication, consult your doctor about alcohol consumption.'
      ]
    }
  },
  relatedTools: ['calorie-burn-estimator', 'medical-unit-converter', 'water-intake-calculator', 'mood-tracker'],
  seo: {
    metaTitle: 'Alcohol Unit Calculator - Units, ABV & Processing Time | Wiki | UnTrackt',
    metaDescription: 'Calculate alcohol units and estimated processing time for any drink by volume and ABV. Track weekly intake against recommended guidelines with this free tool.',
    keywords: ['alcohol unit calculator', 'alcohol units', 'ABV calculator', 'standard drink', 'alcohol processing time', 'weekly alcohol limit', 'blood alcohol', 'drinking guidelines', 'unit tracker']
  }
};
