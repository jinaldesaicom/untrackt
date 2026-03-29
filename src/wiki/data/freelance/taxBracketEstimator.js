export default {
  id: 'tax-bracket-estimator',
  title: 'Tax Bracket Estimator',
  description:
    'Estimate your income tax liability across federal and state brackets, compare marginal vs. effective rates, and plan your freelance tax strategy.',
  content: {
    whatIs: {
      heading: 'What is the Tax Bracket Estimator?',
      body: 'The Tax Bracket Estimator helps freelancers and self-employed professionals project their income tax obligations by applying progressive tax brackets to their expected annual income. It breaks down how much of your income falls into each bracket, calculates both marginal and effective tax rates, and optionally includes self-employment tax. Understanding your tax brackets is essential for accurate pricing, quarterly estimated payments, and year-end planning.',
    },
    whyUse: {
      heading: 'Why Use This Tool?',
      body: 'Many freelancers are surprised by their tax bills because they confuse marginal rates with effective rates or forget about self-employment tax. This tool demystifies the math by showing exactly how each dollar is taxed. It helps you set aside the right amount for quarterly payments, avoid underpayment penalties, and identify opportunities to reduce your taxable income through deductions. It is particularly useful when your income fluctuates and you need to model different scenarios.',
    },
    howToUse: {
      heading: 'How to Use',
      steps: [
        'Enter your estimated gross annual income from freelance work.',
        'Select your filing status (single, married filing jointly, head of household, etc.).',
        'Add any above-the-line deductions such as retirement contributions or health insurance premiums.',
        'Choose whether to use the standard deduction or itemize.',
        'Select your state to include state income tax brackets.',
        'Review the detailed breakdown showing tax owed per bracket, total liability, marginal rate, and effective rate.',
      ],
    },
    features: {
      heading: 'Key Features',
      items: [
        'Up-to-date federal tax brackets for all filing statuses.',
        'State income tax support for all 50 US states plus DC.',
        'Self-employment tax calculation (Social Security + Medicare).',
        'Side-by-side comparison of marginal vs. effective tax rates.',
        'Deduction modeler for standard and itemized deductions.',
        'Quarterly estimated payment breakdown for freelancers.',
        'Scenario comparison to see how income changes affect your bracket.',
      ],
    },
    useCases: {
      heading: 'Common Use Cases',
      items: [
        'Determining how much to set aside from each payment for taxes.',
        'Comparing the tax impact of different annual income scenarios.',
        'Deciding whether to make additional retirement contributions to lower taxable income.',
        'Modeling the effect of moving to a state with no income tax.',
        'Planning year-end strategies like deferring income or accelerating deductions.',
      ],
    },
    examples: {
      heading: 'Examples',
      items: [
        {
          title: 'Single Freelancer Earning $80,000',
          description:
            'After the standard deduction of $15,000, taxable income is $65,000. Federal tax: approximately $9,500 (14.6 % effective rate). Adding $9,100 in self-employment tax brings total federal burden to ~$18,600.',
        },
        {
          title: 'Married Filing Jointly at $150,000',
          description:
            'Combined freelance income of $150,000 with a $30,000 standard deduction leaves $120,000 taxable. Federal tax: approximately $16,200 (10.8 % effective). Self-employment tax adds another ~$17,200.',
        },
        {
          title: 'High Earner Approaching the 32 % Bracket',
          description:
            'A consultant earning $200,000 (single) sees most income taxed at 22 % and 24 %, with only the amount above ~$191,950 taxed at 32 %. Effective rate: approximately 21 %.',
        },
        {
          title: 'State Tax Comparison',
          description:
            'A $100,000 earner in California faces a ~6.5 % effective state rate, while the same income in Texas incurs zero state income tax--a difference of $6,500.',
        },
        {
          title: 'IRA Contribution Impact',
          description:
            'Contributing $7,000 to a traditional IRA reduces taxable income from $90,000 to $83,000, saving approximately $1,540 in federal tax at the 22 % marginal rate.',
        },
        {
          title: 'Quarterly Payment Calculation',
          description:
            'Total estimated annual tax of $24,000 divided by 4 equals $6,000 per quarter, due April 15, June 15, September 15, and January 15.',
        },
      ],
    },
    terminology: {
      heading: 'Key Terminology',
      terms: [
        {
          term: 'Marginal Tax Rate',
          definition:
            'The tax rate applied to the next dollar of income. It corresponds to the highest bracket your income reaches.',
        },
        {
          term: 'Effective Tax Rate',
          definition:
            'The average rate at which your total income is taxed, calculated by dividing total tax by gross income.',
        },
        {
          term: 'Progressive Tax System',
          definition:
            'A structure where higher portions of income are taxed at higher rates, applied in brackets.',
        },
        {
          term: 'Self-Employment Tax',
          definition:
            'The Social Security (12.4 %) and Medicare (2.9 %) taxes paid by freelancers on net earnings, totaling 15.3 %.',
        },
        {
          term: 'Standard Deduction',
          definition:
            'A fixed dollar amount that reduces taxable income, available to all taxpayers who do not itemize.',
        },
        {
          term: 'Estimated Quarterly Payments',
          definition:
            'Prepayments of income and self-employment tax made four times a year to avoid underpayment penalties.',
        },
        {
          term: 'Above-the-Line Deduction',
          definition:
            'A deduction subtracted from gross income before calculating adjusted gross income, such as retirement contributions or student loan interest.',
        },
        {
          term: 'Taxable Income',
          definition:
            'Gross income minus all applicable deductions and exemptions, which is the amount actually subject to tax.',
        },
      ],
    },
    faqs: {
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'Does earning more ever result in less take-home pay?',
          answer:
            'No. In a progressive system, only the income within a higher bracket is taxed at the higher rate. Your overall take-home always increases with more income.',
        },
        {
          question: 'Do I need to pay self-employment tax on all income?',
          answer:
            'Self-employment tax applies to net earnings from self-employment over $400. You can deduct the employer-equivalent portion (7.65 %) when calculating income tax.',
        },
        {
          question: 'How do I avoid underpayment penalties?',
          answer:
            'Pay at least 90 % of current-year tax or 100 % of prior-year tax (110 % for high earners) through quarterly estimated payments.',
        },
        {
          question: 'Should I form an LLC or S-Corp for tax savings?',
          answer:
            'It depends on your income level and state. An S-Corp election can reduce self-employment tax but adds administrative costs. Consult a tax professional for personalized advice.',
        },
        {
          question: 'Is this tool a substitute for a tax professional?',
          answer:
            'No. It provides estimates for planning purposes. Always consult a CPA or tax advisor for filing and complex tax situations.',
        },
      ],
    },
    bestPractices: {
      heading: 'Tips & Best Practices',
      items: [
        'Set aside 25-30 % of every payment for federal and state taxes as a baseline.',
        'Make quarterly estimated tax payments to avoid large year-end bills and penalties.',
        'Max out tax-advantaged retirement contributions (SEP-IRA, Solo 401(k)) to reduce taxable income.',
        'Track all business expenses throughout the year--they directly lower your tax liability.',
        'Model multiple income scenarios to understand how winning or losing a client affects your bracket.',
        'Review your withholding and estimates in September to make year-end adjustments.',
        'Keep a separate bank account for tax funds so they are never accidentally spent.',
      ],
    },
  },
  relatedTools: [
    'hourly-rate-calculator',
    'invoice-generator',
    'client-profitability-estimator',
    'discount-markup-calculator',
    'late-payment-fee-calculator',
  ],
  seo: {
    metaTitle: 'Tax Bracket Estimator for Freelancers - Wiki | UnTrackt',
    metaDescription:
      'Estimate your freelance income tax by bracket, compare marginal and effective rates, and plan quarterly payments with the UnTrackt Tax Bracket Estimator.',
    keywords: [
      'tax bracket estimator',
      'freelance tax calculator',
      'marginal vs effective tax rate',
      'self-employment tax',
      'quarterly tax payments',
      'income tax brackets',
      'freelancer tax planning',
      'estimated taxes',
    ],
  },
};
