export default {
  id: 'tip-splitter',
  title: 'Tip Splitter',
  description: 'Calculate tips and split bills evenly or by custom amounts among any number of people for stress-free group dining.',
  content: {
    whatIs: {
      heading: 'What is the Tip Splitter?',
      body: 'The Tip Splitter is a fast, intuitive calculator that helps you determine the tip amount on a bill and divide the total evenly or by custom shares among a group. Enter the bill total, choose a tip percentage (or type a custom amount), specify the number of people, and instantly see what each person owes--including tax considerations and rounding options.'
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Splitting a restaurant bill by hand leads to rounding errors, forgotten tax, and awkward conversations. This tool removes the guesswork by providing precise per-person amounts in seconds. It supports custom tip percentages, unequal splits, and currency rounding so everyone pays their fair share without the mental math.'
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter the total bill amount (before tip).',
        'Select a preset tip percentage (10%, 15%, 18%, 20%, 25%) or enter a custom percentage.',
        'Enter the number of people splitting the bill.',
        'Optionally toggle tax-inclusive mode if tax is already included in the bill total.',
        'View the calculated tip, total with tip, and per-person amount instantly.',
        'Adjust rounding preference (round up, round down, or exact) for each person\'s share.'
      ]
    },
    features: {
      heading: 'Key Features',
      items: [
        'Preset tip percentages (10%, 15%, 18%, 20%, 25%) with one-tap selection.',
        'Custom tip percentage or fixed dollar-amount tip input.',
        'Split among 1-99 people with instant per-person calculation.',
        'Rounding options: round up to nearest cent, dollar, or keep exact amounts.',
        'Tax-inclusive toggle for regions where tax is included in the menu price.',
        'Visual breakdown showing subtotal, tip, tax, total, and per-person share.',
        'Real-time updates as you change any input--no submit button required.'
      ]
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Splitting a restaurant dinner bill among friends or coworkers.',
        'Calculating appropriate tips for food delivery, rideshare, or salon services.',
        'Dividing shared expenses like group hotel rooms or vacation rentals.',
        'Quickly verifying that a restaurant\'s suggested tip amounts are correct.',
        'Teaching students or travelers about local tipping customs and percentages.'
      ]
    },
    examples: {
      heading: 'Examples',
      items: [
        { title: 'Dinner for four with 20% tip', description: 'Bill: $120.00 → Tip: $24.00 → Total: $144.00 → Each person pays $36.00.' },
        { title: 'Coffee for two with 15% tip', description: 'Bill: $9.50 → Tip: $1.43 → Total: $10.93 → Each person pays $5.47 (rounded up).' },
        { title: 'Large group brunch (10 people)', description: 'Bill: $340.00 → 18% tip: $61.20 → Total: $401.20 → Each person pays $40.12.' },
        { title: 'Custom $10 flat tip', description: 'Bill: $55.00 → Flat tip: $10.00 → Total: $65.00 → Split 3 ways: $21.67 each.' },
        { title: 'Tax-inclusive bill', description: 'Bill: $88.00 (tax included) → 20% tip on pre-tax estimate ($80.00): $16.00 → Total: $104.00 → 2 people: $52.00 each.' },
        { title: 'Round-up split', description: 'Bill: $73.00 → 15% tip: $10.95 → Total: $83.95 → 4 people: $21.00 each (rounded up from $20.99).' }
      ]
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        { term: 'Gratuity', definition: 'A voluntary additional payment (tip) given to service staff, usually expressed as a percentage of the pre-tax bill.' },
        { term: 'Pre-tax total', definition: 'The bill amount before sales tax is added, which is the standard base for calculating tips in the United States.' },
        { term: 'Split', definition: 'Dividing the total bill (including tip) equally or proportionally among multiple people.' },
        { term: 'Rounding', definition: 'Adjusting per-person amounts to convenient values (nearest cent or dollar) to simplify payment.' },
        { term: 'Auto-gratuity', definition: 'A mandatory tip (often 18-20%) automatically added by restaurants for large parties, typically 6 or more guests.' },
        { term: 'Service charge', definition: 'A fixed fee added to a bill by the establishment, distinct from a voluntary tip, common in catering and events.' },
        { term: 'Tax-inclusive pricing', definition: 'Menu prices that already include sales tax, common in many countries outside the United States.' }
      ]
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'Should I tip on the pre-tax or post-tax amount?', answer: 'In the US, tipping on the pre-tax subtotal is standard etiquette. This tool defaults to pre-tax calculation but supports tax-inclusive mode.' },
        { question: 'What is a standard tip percentage?', answer: '15-20% is standard for sit-down restaurants in the US. 18% is common for large groups. Adjust based on service quality and local customs.' },
        { question: 'How does rounding work?', answer: 'You can choose to round each person\'s share up to the nearest cent, nearest dollar, or keep the exact calculated amount. Rounding up slightly overpays the bill.' },
        { question: 'Can I split unevenly?', answer: 'The default mode splits evenly. For uneven splits, you can manually adjust individual shares or use the custom amount field.' },
        { question: 'Does this tool handle multiple currencies?', answer: 'The math is currency-agnostic. Enter your bill in any currency and the percentages and splits work the same way.' }
      ]
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always double-check whether the restaurant has already added an auto-gratuity before calculating additional tip.',
        'Tip on the pre-tax subtotal for the most accurate and fair calculation.',
        'When in doubt, round up--a few extra cents are a kind gesture and simplify payment.',
        'For delivery and rideshare, 15-20% is standard; consider higher tips for difficult conditions.',
        'Use the tool before asking for the check so you can confidently request separate payments.',
        'In countries with tax-inclusive pricing, enable the tax-inclusive toggle to avoid double-counting tax.'
      ]
    }
  },
  relatedTools: ['countdown-timer', 'random-number-generator', 'word-frequency-counter', 'aspect-ratio-calculator'],
  seo: {
    metaTitle: 'Tip Splitter - Calculate Tips & Split Bills Easily | Wiki | UnTrackt',
    metaDescription: 'Calculate tips and split restaurant bills evenly among any group size. Supports custom tip percentages, rounding options, and tax-inclusive pricing.',
    keywords: ['tip calculator', 'bill splitter', 'split bill', 'tip percentage', 'restaurant tip', 'group dining calculator', 'gratuity calculator', 'per person cost']
  }
};
