export default {
  id: 'discount-markup-calculator',
  title: 'Discount & Markup Calculator',
  description:
    'Calculate discounts, markups, profit margins, and final selling prices to optimize your freelance and product pricing strategy.',
  content: {
    whatIs: {
      heading: 'What is the Discount & Markup Calculator?',
      body: 'The Discount & Markup Calculator is a versatile pricing tool that lets you compute the final price after applying a discount, determine the markup needed to reach a target price, or reverse-engineer the original cost from a sale price. It handles percentage-based and fixed-amount discounts, stacked discounts, and margin-to-markup conversions--making it an indispensable companion for freelancers who sell productized services, digital goods, or bundled packages.',
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Pricing mistakes erode profits faster than almost anything else. Confusing markup with margin is a classic error that can turn a profitable project into a loss. This calculator clearly separates the two concepts, shows you exactly how much profit each pricing strategy generates, and helps you set prices that are competitive yet sustainable. Whether you are running a holiday promotion, offering volume discounts, or creating tiered service packages, this tool ensures correctness.',
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Select the calculation mode: Discount, Markup, or Margin.',
        'Enter the original price or cost of the item or service.',
        'Input the discount percentage, markup percentage, or target margin.',
        'Optionally add a second stacked discount or fee.',
        'Review the calculated final price, savings, profit, and margin percentage.',
        'Experiment with different values to find the optimal pricing point.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Supports percentage-based and fixed-amount discounts.',
        'Stacked discount mode for applying multiple successive discounts.',
        'Markup-to-margin and margin-to-markup conversion.',
        'Bulk pricing calculator for volume-based discounts.',
        'Reverse calculation: find original price from final price and discount.',
        'Profit breakdown showing cost, revenue, and net profit per unit.',
        'Currency-aware formatting for international pricing.',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Setting prices for productized service packages with built-in margins.',
        'Running promotional discounts while ensuring minimum profitability.',
        'Quoting bulk or retainer pricing to clients at a volume discount.',
        'Converting between margin and markup when communicating with accountants.',
        'Comparing competitor pricing strategies by reverse-engineering their margins.',
      ],
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Service Package Discount',
          description:
            'A freelancer sells a website audit for $500. Offering a 20 % discount brings the price to $400, representing a $100 savings for the client.',
        },
        {
          title: 'Markup on Subcontracted Work',
          description:
            'A project manager subcontracts design work at $2,000 and applies a 40 % markup. The client price is $2,800, yielding $800 profit (28.6 % margin).',
        },
        {
          title: 'Stacked Holiday Discounts',
          description:
            'A digital product priced at $120 receives a 15 % Black Friday discount ($102), then an additional 10 % newsletter coupon ($91.80). Total savings: $28.20 (23.5 %).',
        },
        {
          title: 'Target Margin Pricing',
          description:
            'A consultant\'s cost for delivering a workshop is $3,000. Targeting a 35 % margin means charging $4,615 ($3,000 ÷ 0.65).',
        },
        {
          title: 'Volume Discount Tiers',
          description:
            'A copywriter charges $200/article. Clients buying 10+ get 10 % off ($180), and 25+ get 20 % off ($160), incentivizing larger orders while maintaining profitability.',
        },
        {
          title: 'Reverse-Engineering Competitor Pricing',
          description:
            'A competitor sells a course for $299. Assuming a 60 % margin, their estimated cost is $119.60--useful intel for positioning your own offer.',
        },
      ],
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        {
          term: 'Markup',
          definition:
            'The amount added to the cost price to determine the selling price, usually expressed as a percentage of cost.',
        },
        {
          term: 'Margin',
          definition:
            'The percentage of the selling price that is profit, calculated as (Price − Cost) ÷ Price × 100.',
        },
        {
          term: 'Discount',
          definition:
            'A reduction in the listed price, typically offered as a percentage off or a fixed dollar amount.',
        },
        {
          term: 'Stacked Discount',
          definition:
            'Two or more discounts applied sequentially, where each subsequent discount is calculated on the already-reduced price.',
        },
        {
          term: 'Cost Price',
          definition:
            'The total expense incurred to produce or deliver a product or service before any markup or profit.',
        },
        {
          term: 'Selling Price',
          definition:
            'The final price charged to the customer after markups, discounts, and taxes are applied.',
        },
        {
          term: 'Break-Even Point',
          definition:
            'The price at which total revenue equals total cost, resulting in zero profit or loss.',
        },
        {
          term: 'Volume Discount',
          definition:
            'A reduced per-unit price offered to customers who purchase in larger quantities.',
        },
      ],
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'What is the difference between markup and margin?',
          answer:
            'Markup is based on cost (e.g., 50 % markup on a $100 cost = $150 price), while margin is based on selling price (e.g., 33.3 % margin on a $150 price = $50 profit). They describe the same profit differently.',
        },
        {
          question: 'Can I apply multiple discounts at once?',
          answer:
            'Yes. Use the stacked discount mode. Note that two 20 % discounts do not equal 40 % off--the second discount applies to the already-reduced price, resulting in 36 % total.',
        },
        {
          question: 'How do I decide on the right markup?',
          answer:
            'Consider your industry benchmarks, competition, perceived value, and cost structure. Service-based freelancers often use 30-60 % margins.',
        },
        {
          question: 'Does this include tax in the final price?',
          answer:
            'Tax is not automatically applied. You can add it as a separate line or adjust the final price manually.',
        },
        {
          question: 'Can I use this for e-commerce products?',
          answer:
            'Absolutely. The calculator works for any pricing scenario--physical products, digital goods, and services alike.',
        },
      ],
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Always know your true cost before setting prices--include hidden costs like transaction fees and support time.',
        'Use margin rather than markup when communicating profitability to stakeholders; it is more intuitive.',
        'Limit stacked discounts to two levels to avoid confusing customers and eroding margins.',
        'Test different discount levels with A/B promotions to find the sweet spot that maximizes conversions without sacrificing profit.',
        'Anchor your price by showing the original amount alongside the discounted price.',
        'Review your margins quarterly and adjust for changes in costs or competitive landscape.',
        'Offer value-adds (bonuses, extended support) instead of straight discounts to preserve perceived value.',
      ],
    },
  },
  relatedTools: [
    'hourly-rate-calculator',
    'invoice-generator',
    'client-profitability-estimator',
    'tax-bracket-estimator',
    'proposal-builder',
  ],
  seo: {
    metaTitle: 'Discount & Markup Calculator - Wiki | UnTrackt',
    metaDescription:
      'Calculate discounts, markups, and profit margins accurately. Optimize your freelance pricing strategy with stacked discounts and margin-to-markup conversions.',
    keywords: [
      'discount calculator',
      'markup calculator',
      'profit margin calculator',
      'markup vs margin',
      'stacked discounts',
      'pricing strategy',
      'volume discount',
      'freelance pricing',
    ],
  },
};
